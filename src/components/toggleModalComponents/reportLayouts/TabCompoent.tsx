import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarChartComponent from '../../chartComponents/barChart'
import DoughnutChartComponent from '../../chartComponents/dounutChat'
import { styled } from '@mui/material/styles';
import ReportByUnitComponent from '../../chartComponents/reportByUnit/ReportByUnitComponent';
import ReportChart from '../../chartComponents/reportChart';
import useLearningManagementSparkWritingStore from '../../../store/useLearningManagementSparkWritingStore';
import useReportStore from '../../../store/useReportStore';
import { getDraftInfoByDraftId, getReportOneDataByStu, getReportOverallDatabyStu } from '../../../api/LearningManagement/LearningManagementSparkWriting.api';
import PrintReportExportButton from '../../commonComponents/customComponents/exportButtons/report/PrintReportExportButton';
import RubricTypeModalComponent from '../RubricTypeModalComponent';
import useActivityWritingHubStore from '../../../store/useActivityWritingHubStore';
import { useNavigate } from 'react-router-dom';
import useLoginStore from '../../../store/useLoginStore';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className='bg-white flex flex-row w-full report-modal-selected-area'
      {...other}
      style={{
        borderRadius: '30px',
      }}
    >
      {value === index && (
        <Box sx={{ 
            borderRadius: '30px'
         }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    
  };
}
interface StyledTabProps {
    label: string;
  }
const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    backgroundColor: '#0fa9cb',
    color: '#fff',
    borderTopLeftRadius:'15px',
    borderTopRightRadius: '15px',
    height:'60px',
    fontFamily: 'NotoSansCJKKR',
    fontSize: '16px',
    fontWeight: 700,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    paddingLeft: '50px',
    paddingRight: '55px',
    textTransform: 'inherit',
    userSelect: 'none',
    '&.Mui-selected': {
      color: '#0fa9cb',
      backgroundColor: '#fff',
      boxShadow: '3px 3px 10px 0 rgba(0, 0, 0, 0.08)',
    },
    '&.Mui-focusVisible': {
    //   backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));

export default function BasicTabs(props: {
    doughnutValues:TAllDoughnutDatas;
}) {
    const {
        doughnutValues
    } = props;
    const [value, setValue] = React.useState(1);
    // car
    const [availableReports, setAvailableReports] = React.useState<TAvailableReportsArr[]>([]);
    const [isLeftAvailable, setIsLeftAvailable] = React.useState<boolean>(false);
    const [isRightAvailable, setIsRightAvailable] = React.useState<boolean>(false);

    // for export button, value reset
    const [exportFeedbackData, setExportFeedbackData] = React.useState<TFeedbackStates|null>(null);
    const [exportReportByUnitAPIData, setExportReportByUnitAPIData] = React.useState<TStudentUnitReportRes|null>(null);
    const [isReplaceExport, setIsReplaceExport] = React.useState<boolean>(false);

    const {
        rubricDataHead
    } = useActivityWritingHubStore();
    const {
        report, reportByUnitData, set, currentSelectCodes, reportByUnitAPIData,
        setOverallReportByStu, overallDoughnutChartData, overallBarChartData,
        isModalOpen, setIsModalOpen
    } = useReportStore();

    const {
        feedbackDataInStudent, studentDataInClass,
        setFeedbackDataInStudent
    } = useLearningManagementSparkWritingStore();
    const navigate = useNavigate();
    const {setMaintenanceData} = useLoginStore();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getOverallDatas = async () => {
        const getOverallDataFromAPI = await getReportOverallDatabyStu({
            level_name: feedbackDataInStudent.defautInfo.level.name,
            student_code: feedbackDataInStudent.defautInfo.student_code
        }).then((res) => {
            if (res.data===null) {
                if (res.error) {
                    const reject = res.error
                    if (reject.data.maintenanceInfo) {
                        let dumyMaintenanceData:TMaintenanceData = {
                            alertTitle: 'System Maintenance Notice',
                            data: reject.data.maintenanceInfo,
                            open: false,
                            type: ''
                        };
                        setMaintenanceData(dumyMaintenanceData)
                        navigate('/');
                    }
                }
            } else {
                return res.data
            }
        });
        if (getOverallDataFromAPI) {
            setOverallReportByStu(getOverallDataFromAPI);
        }
    }
    // tab change effect
    React.useEffect(()=>{
        if (value === 0) {
            getOverallDatas();
        }
    }, [value])
    // final draft is ended
    // data select
    const selectDataByStudentCode = (student_code:string):TLMSparkWritingStudentUnitItemInClass[] => {
        const dumpStudentDataInClass:TLMSparkWritingStudentsListInClass = JSON.parse(JSON.stringify(studentDataInClass));
        const studentsArr = dumpStudentDataInClass.students;
        for (let studentIdx = 0; studentIdx < studentsArr.length; studentIdx++) {
            const currentStudentCode = studentsArr[studentIdx].student_code;
            if (currentStudentCode === student_code) {
                return studentsArr[studentIdx].units;
            }
        }
        return [];
    }
    // check reports 
    const checkIsReport = (data: TLMSparkWritingStudentUnitItemInClass[]):TAvailableReportsArr[] => {
        // console.log('=== checkIsReport ===')
        let unitFlagArr:TAvailableReportsArr[] = Array.from({length:5},(__v,i)=>{return {availableFlag:false, draft2ndId:-1, draft1stId: -1, unitIdx:-1}});
        // console.log('data =',data)
        for (let i = 0; i < data.length; i++) {
            const unitIdx = data[i].unit_index;
            const status2nd = data[i].draft_2_status;
            // console.log('data[i] =',data[i])
            
            if (status2nd) {
                if (status2nd.status === 4) {
                    unitFlagArr[i].unitIdx= unitIdx;
                    unitFlagArr[i].availableFlag = true;
                    unitFlagArr[i].draft1stId = data[i].draft_1_status.draft_id?data[i].draft_1_status.draft_id:-1;
                    unitFlagArr[i].draft2ndId = data[i].draft_2_status.draft_id?data[i].draft_2_status.draft_id:-1;
                } else {
                    unitFlagArr[i].unitIdx= unitIdx;
                    unitFlagArr[i].availableFlag = false;
                    unitFlagArr[i].draft1stId = -1;
                    unitFlagArr[i].draft2ndId = -1;
                }
            } else {
                unitFlagArr[i].unitIdx= unitIdx;
                unitFlagArr[i].availableFlag = false;
                unitFlagArr[i].draft1stId = -1;
                unitFlagArr[i].draft2ndId = -1;
            }
        }
        return unitFlagArr;
    }
    const checkMoveFlag = (unit:number) => {
        let nextIdxs:number[] = [];
        let prevIdxs:number[] = [];
        for (let i =0; i < availableReports.length; i++) {
            const currentAvailableReports = availableReports[i];
            if (currentAvailableReports.availableFlag) {
                if (currentAvailableReports.unitIdx > unit) {
                    nextIdxs.push(currentAvailableReports.unitIdx);
                } else if (currentAvailableReports.unitIdx < unit) {
                    prevIdxs.push(currentAvailableReports.unitIdx);
                }
            }
        }
        if (nextIdxs.length > 0) {
            setIsRightAvailable(true);
        } else {
            setIsRightAvailable(false);
        }

        if (prevIdxs.length > 0) {
            setIsLeftAvailable(true)
        } else {
            setIsLeftAvailable(false)
        }
    }
    React.useEffect(()=>{
        const selectUnit = feedbackDataInStudent.defautInfo.unit_index;
        const selectUnitTopic = feedbackDataInStudent.defautInfo.unit_topic;
        console.log('select unit =',selectUnit)
        set.initCurrentDisplay(selectUnit, selectUnitTopic);
        const data = selectDataByStudentCode(feedbackDataInStudent.defautInfo.student_code);
        // console.log('data ==',data)
        const isReportArr = checkIsReport(data);
        
        setAvailableReports(isReportArr);
        if (exportReportByUnitAPIData===null) {
            setExportReportByUnitAPIData(reportByUnitAPIData)
        }
        if (exportFeedbackData===null) {
            setExportFeedbackData(feedbackDataInStudent)
        }
        
        // checkMoveFlag(selectUnit);
    },[])

    React.useEffect(()=>{
        const currentUnit = reportByUnitData.currentUnitInfo.unit_index;
        checkMoveFlag(currentUnit);
        
    }, [
        availableReports,
        reportByUnitData,
        isLeftAvailable,
        isRightAvailable
    ])
    React.useEffect(()=>{
        let flag = false;
        if (exportFeedbackData!==null && feedbackDataInStudent !== exportFeedbackData) {
            setExportFeedbackData(feedbackDataInStudent)
            flag=true;
        }
        
        if (exportReportByUnitAPIData!==null && reportByUnitAPIData !== exportReportByUnitAPIData) {
            setExportReportByUnitAPIData(reportByUnitAPIData)
            flag=true;
        }
        if (flag) {
            setIsReplaceExport(false)
        }
    }, [reportByUnitAPIData, feedbackDataInStudent])

    const selectDate = (data:TLMSparkWritingStudentUnitDraft1StatusItemInClass,isDraft:boolean):string => {
        const {status} = data;
        if (isDraft) {
            if (status===2) {
                if (data.submit_date) {
                    return data.submit_date;
                } else return ''
            } else if (status===3) {
                if (data.review_temp_save_date) {
                    return data.review_temp_save_date;
                } else return ''
            } else if (status===4) {
                if (data.review_complete_date) {
                    return data.review_complete_date;
                } else return ''
            } else if (status===5) {
                if (data.review_reject_date) {
                    return data.review_reject_date
                } else return ''
            } else {
                return ''
            }
        } else return ''
    }
    const formatDate = (inputDate: string, split?:string): string => {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        // formattedData = 월/일/년도
        // Replace '/' with '.'
        const replaceDate = formattedDate.split('/');
    
        // change locate
        const splitStr = split ? split : '.'
        return `${replaceDate[2]}${splitStr}${replaceDate[0]}${splitStr}${replaceDate[1]}`
    }

    const onClickStepperRight = async () => {
        if (isRightAvailable) {
            // before data set
            let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
            const currentUnit = dumyData.defautInfo.unit_index;
            // next index check
            let nextIndex = 0;
            for (let cIdx = 0; cIdx < availableReports.length; cIdx++) {
                if ( availableReports[cIdx].unitIdx > currentUnit) {
                    if (availableReports[cIdx].availableFlag) {
                        nextIndex = availableReports[cIdx].unitIdx;
                        break;
                    }
                }
            }
            if (nextIndex !== 0) {
                const dataByStu = selectDataByStudentCode(feedbackDataInStudent.defautInfo.student_code);
                
                for (let i = 0; i < dataByStu.length; i++) {
                    const targetData = dataByStu[i].unit_index;
                    if (nextIndex === targetData) {
                        const target = dataByStu[i];
                        const draft_1st_id = target.draft_1_status.draft_id.toString();
                        const draft_2nd_id = target.draft_2_status.draft_id.toString();
                        const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                        const rsp2nd = await getDraftInfoByDraftId(draft_2nd_id);
                        if (rsp1st.error) {
                            const reject = rsp1st.error;
                            if (reject.statusCode===555 && reject.data.maintenanceInfo) {
                                let dumyMaintenanceData:TMaintenanceData = {
                                    alertTitle: 'System Maintenance Notice',
                                    data: reject.data.maintenanceInfo,
                                    open: false,
                                    type: ''
                                };
                                setMaintenanceData(dumyMaintenanceData)
                                navigate('/');
                            }
                        }
                        if (rsp2nd.error) {
                            const reject = rsp2nd.error;
                            if (reject.statusCode===555 && reject.data.maintenanceInfo) {
                                let dumyMaintenanceData:TMaintenanceData = {
                                    alertTitle: 'System Maintenance Notice',
                                    data: reject.data.maintenanceInfo,
                                    open: false,
                                    type: ''
                                };
                                setMaintenanceData(dumyMaintenanceData)
                                navigate('/');
                            }
                        }
                        const searchData = {
                            level_name: dumyData.defautInfo.level.name,
                            unit_index: target.unit_index,
                            student_code: feedbackDataInStudent.defautInfo.student_code
                        }
                        const reportData = await getReportOneDataByStu(searchData).then((res) => {
                            if (res.data===null) {
                                if (res.error) {
                                    const reject = res.error
                                    if (reject.data.maintenanceInfo) {
                                        let dumyMaintenanceData:TMaintenanceData = {
                                            alertTitle: 'System Maintenance Notice',
                                            data: reject.data.maintenanceInfo,
                                            open: false,
                                            type: ''
                                        };
                                        setMaintenanceData(dumyMaintenanceData)
                                        navigate('/');
                                    }
                                }
                            } else {
                                return res.data
                            }
                        })
                        console.log('rsp1st =',rsp1st)
                        console.log('rsp2nd =',rsp2nd)
                        if (rsp1st.draft_index > 0 && rsp2nd.draft_index > 0 && reportData) {
                            dumyData.draft_2nd_data=rsp2nd;
                            dumyData.draft_data=rsp1st;
                            const submitDate2nd = selectDate(target.draft_2_status, true);
                            const submitDate1st = selectDate(target.draft_1_status, true);
                            dumyData.defautInfo.submit_date=formatDate(submitDate2nd);
                            dumyData.defautInfo.unit_index=target.unit_index;
                            dumyData.defautInfo.unit_topic = target.topic;
                            dumyData.defautInfo.select_draft_id= draft_2nd_id;
                            dumyData.defautInfo.step_label="2nd Draft"
    
                            dumyData.status = target.draft_2_status
                            dumyData.overall_comment = rsp2nd.overall_comment;
                            dumyData.rubric = target.rubric
                            dumyData.status_1st = target.draft_1_status;
                            const comments:TDraftStringsData = {
                                draft1st: rsp1st.overall_comment,
                                draft2nd: rsp2nd.overall_comment
                            }
                            const dates:TDraftStringsData = {
                                draft1st: formatDate(submitDate1st,'-'),
                                draft2nd: formatDate(submitDate2nd,'-')
                            }
                            set.setTeachersComments(comments);
                            set.setCompletionDates(dates);
                            set.setReportAPIData(reportData, target.rubric);
                            setFeedbackDataInStudent(dumyData);
                            checkMoveFlag(target.unit_index);
                            set.initCurrentDisplay(target.unit_index, target.topic);
                            
                            break;
                        }
                    }
                }

            }
        }
    }
    const onClickStepperLeft = async () => {
        if (isLeftAvailable) {
            // after unit check and set
            let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
            const currentUnit = dumyData.defautInfo.unit_index;
            // next index check
            let prevIndex = 0;
            for (let cIdx = 4; cIdx < availableReports.length; cIdx--) {
                if ( availableReports[cIdx].unitIdx < currentUnit) {
                    if (availableReports[cIdx].availableFlag) {
                        prevIndex = availableReports[cIdx].unitIdx;
                        break;
                    }
                }
            }
            if (prevIndex !== 0) {
                const dataByStu = selectDataByStudentCode(feedbackDataInStudent.defautInfo.student_code);
                
                for (let i = 0; i < dataByStu.length; i++) {
                    const targetData = dataByStu[i].unit_index;
                    if (prevIndex === targetData) {
                        const target = dataByStu[i];
                        const draft_1st_id = target.draft_1_status.draft_id.toString();
                        const draft_2nd_id = target.draft_2_status.draft_id.toString();
                        const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                        const rsp2nd = await getDraftInfoByDraftId(draft_2nd_id);
                        if (rsp1st.error) {
                            const reject = rsp1st.error;
                            if (reject.statusCode===555 && reject.data.maintenanceInfo) {
                                let dumyMaintenanceData:TMaintenanceData = {
                                    alertTitle: 'System Maintenance Notice',
                                    data: reject.data.maintenanceInfo,
                                    open: false,
                                    type: ''
                                };
                                setMaintenanceData(dumyMaintenanceData)
                                navigate('/');
                            }
                        }
                        if (rsp2nd.error) {
                            const reject = rsp2nd.error;
                            if (reject.statusCode===555 && reject.data.maintenanceInfo) {
                                let dumyMaintenanceData:TMaintenanceData = {
                                    alertTitle: 'System Maintenance Notice',
                                    data: reject.data.maintenanceInfo,
                                    open: false,
                                    type: ''
                                };
                                setMaintenanceData(dumyMaintenanceData)
                                navigate('/');
                            }
                        }
                        const searchData = {
                            level_name: dumyData.defautInfo.level.name,
                            unit_index: target.unit_index,
                            student_code: feedbackDataInStudent.defautInfo.student_code
                        }
                        const reportData = await getReportOneDataByStu(searchData).then((res) => {
                            if (res.data===null) {
                                if (res.error) {
                                    const reject = res.error
                                    if (reject.data.maintenanceInfo) {
                                        let dumyMaintenanceData:TMaintenanceData = {
                                            alertTitle: 'System Maintenance Notice',
                                            data: reject.data.maintenanceInfo,
                                            open: false,
                                            type: ''
                                        };
                                        setMaintenanceData(dumyMaintenanceData)
                                        navigate('/');
                                    }
                                }
                            } else {
                                return res.data
                            }
                        })
                        if (rsp1st.draft_index > 0 && rsp2nd.draft_index > 0 && reportData) {
                            dumyData.draft_2nd_data=rsp2nd;
                            dumyData.draft_data=rsp1st;
                            const submitDate2nd = selectDate(target.draft_2_status, true);
                            const submitDate1st = selectDate(target.draft_1_status, true);
                            dumyData.defautInfo.submit_date=formatDate(submitDate2nd);
                            dumyData.defautInfo.unit_index=target.unit_index;
                            dumyData.defautInfo.unit_topic = target.topic;
                            dumyData.defautInfo.select_draft_id= draft_2nd_id;
                            dumyData.defautInfo.step_label="2nd Draft"
                            dumyData.status = target.draft_2_status
                            dumyData.overall_comment = rsp2nd.overall_comment;
                            dumyData.rubric = target.rubric
                            dumyData.status_1st = target.draft_1_status;
                            const comments:TDraftStringsData = {
                                draft1st: rsp1st.overall_comment,
                                draft2nd: rsp2nd.overall_comment
                            }
        
                            const dates:TDraftStringsData = {
                                draft1st: formatDate(submitDate1st,'-'),
                                draft2nd: formatDate(submitDate2nd,'-')
                            }
                            set.setTeachersComments(comments);
                            set.setCompletionDates(dates)
                            setFeedbackDataInStudent(dumyData);
                            set.setReportAPIData(reportData, target.rubric);
                            checkMoveFlag(target.unit_index);
                            set.initCurrentDisplay(target.unit_index, target.topic);
                            break;
                        }
                    }
                }
            }
        }
    }

  return (
    <Box sx={{ width: '1260px', paddingTop: '20px' }}>
      <Box sx={{ paddingLeft: '72px' }}>
        <Tabs sx={{
            
            '.MuiTabs-indicator': {
                backgroundColor: '#fff'
            }
        }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab sx={{
            marginRight: '10px'
          }} label="Overall Report" {...a11yProps(0)}/>
          
          <StyledTab label="Report by Unit" {...a11yProps(1)} />
          {/* <StyledTab label="print component" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <div className='flex flex-row pb-[65px]'>
            <DoughnutChartComponent data={overallDoughnutChartData} />
            <div className='flex flex-col'>
                <div className='flex flex-row h-[36px] mt-[30px] relative' >
                    <RubricTypeModalComponent 
                        keyValue={'final-draft-rubric-modal'}
                        rubric_type={`Unit ${feedbackDataInStudent.defautInfo.unit_index}. ${feedbackDataInStudent.defautInfo.unit_topic}`}
                        rubric_type_datas={{
                            data: feedbackDataInStudent.rubric.rubric_description,
                            dataHead: rubricDataHead
                        }}
                        isFinalDraft={true}
                    />
                </div>
                <BarChartComponent data={overallBarChartData}/>
            </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className='flex flex-col w-[1260px] h-[700px]'>
            {/* head 케로셀 & 버튼 */}
            <div className='flex flex-row relative justify-center items-center gap-[20px] w-full pt-[30px] px-[30px]'>
                <div className={`bg-no-repeat w-[36px] h-[36px] ${isLeftAvailable ? 'bg-svg-bt-left hover:bg-svg-bt-left-over': 'bg-svg-bt-left-disabled'}`}
                    onClick={async () => await onClickStepperLeft()}
                ></div>
                <div className='report-by-unit-title-label'>{`Unit ${reportByUnitData.currentUnitInfo.unit_index}. ${reportByUnitData.currentUnitInfo.unit_topic}`}</div>
                <div className={`bg-no-repeat w-[36px] h-[36px] ${isRightAvailable ? 'bg-svg-bt-right hover:bg-svg-bt-right-over': 'bg-svg-bt-right-disabled'}`}
                    onClick={async()=>await onClickStepperRight()}
                ></div>
                
                <div className='absolute right-[30px] '>
                <div className={ 
                    'bg-no-repeat w-[124.3px] h-[40px] bg-svg-bt-portfolio hover:bg-svg-bt-portfolio-over hover:cursor-pointer select-none'
                    }
                onClick={async() => {
                    setIsModalOpen({
                        isPortfolioOpen:true,
                        isReportOpen:false,
                    })
                }}
                />
                </div>
            </div>
            {/* 좌 - 그래프, 우 - summary, correction, t comment */}
            <div className='flex flex-row w-full px-[30px] h-[561px]'>
                <div className='flex flex-1 mt-[20px]'>
                    <ReportChart />
                </div>

                <div className='flex flex-1 flex-col'>
                    <ReportByUnitComponent />
                </div>
            </div>
            {/* foot: print, complete date */}
            <div className='flex flex-row w-full h-[70px] min-h-[70px] border-t-[1px] border-t-[#e2e3e6] relative pl-[30px] items-center'>
                {/* <PrintReportExportButton feedbackDataInStudent={feedbackDataInStudent} reportByUnitAPIData={reportByUnitAPIData}/> */}
                {(exportFeedbackData!==null && exportReportByUnitAPIData!==null) && 
                    <PrintReportExportButton 
                        feedbackDataInStudent={exportFeedbackData} reportByUnitAPIData={exportReportByUnitAPIData}
                        isReplace={isReplaceExport}
                        setReplace={setIsReplaceExport}
                    />
                }

                {/* <div className='absolute bottom-[25px] right-[30px] flex flex-row capitalize items-center gap-[5px]'>
                    <div className='report-by-unit-completion-date-title'>completion date: </div>
                    <div className='report-by-unit-completion-date-content'>{`[1st draft] ${reportByUnitData.completionDate.draft1st}`}</div>
                    <div className='w-[1px] h-[8px] bg-[#aaa]' />
                    <div className='report-by-unit-completion-date-content'>{`[2nd draft] ${reportByUnitData.completionDate.draft2nd}`}</div>
                </div> */}
            </div>

        </div>
      </CustomTabPanel>
    </Box>
  );
}