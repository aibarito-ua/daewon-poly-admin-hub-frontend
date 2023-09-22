import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useChartDataStore from '../../../store/useChartDataStore';
import BarChartComponent from '../../chartComponents/barChart'
import DoughnutChartComponent from '../../chartComponents/dounutChat'
import DoughnutChartLegend from '../../chartComponents/dounutChartLegend';
import { styled } from '@mui/material/styles';
import ReportByUnitComponent from '../../chartComponents/reportByUnit/ReportByUnitComponent';
import ReportChart from '../../chartComponents/reportChart';
import useLearningManagementSparkWritingStore from '../../../store/useLearningManagementSparkWritingStore';
import useReportStore from '../../../store/useReportStore';
import { getDraftInfoByDraftId, getReportOneDataByStu, getReportOverallDatabyStu } from '../../../api/LearningManagement/LearningManagementSparkWriting.api';
import PrintReportExportButton from '../../commonComponents/customComponents/exportButtons/report/PrintReportExportButton';
import ReportComponentToPrint from '../../commonComponents/customComponents/exportButtons/report/PrintReportComponent';
import CalculatorPXtoMM from '../CalculatorPXtoMM';
import PortfolioModalComponent from '../PortfolioModalComponent';
import RubricTypeModalComponent from '../RubricTypeModalComponent';
import useActivityWritingHubStore from '../../../store/useActivityWritingHubStore';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const dumyCircleData:TCircleLegendItems[] = [
    {circleColor: '#588ee1', circleLabel:'idea'},
    {circleColor: '#f6914d', circleLabel:'organization'},
    {circleColor: '#aa6bd4', circleLabel:'voice'},
    {circleColor: '#30c194', circleLabel:'word choice'},
    {circleColor: '#6865cc', circleLabel:'sentence fluency'},
    {circleColor: '#db5757', circleLabel:'conventions'},
]

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className='bg-white flex flex-row w-full'
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
    textTransform: 'capitalize',
    userSelect: 'none',
    '&.Mui-selected': {
      color: '#0fa9cb',
      backgroundColor: '#fff',
    },
    '&.Mui-focusVisible': {
    //   backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));

export default function BasicTabs(props: {
    doughnutValues:TAllDoughnutDatas;
    student_code:string;
    otherModalCloseFn?: Function;
}) {
    const {
        doughnutValues,student_code, otherModalCloseFn
    } = props;
    const [value, setValue] = React.useState(0);
    // car
    const [availableReports, setAvailableReports] = React.useState<TAvailableReportsArr[]>([]);
    const [isLeftAvailable, setIsLeftAvailable] = React.useState<boolean>(false);
    const [isRightAvailable, setIsRightAvailable] = React.useState<boolean>(false);
    const [currentUnit, setCurrentUnit] = React.useState<number>(0);
    const {doughnutData, barChartData} = useChartDataStore();
    const {
        rubricDataHead
    } = useActivityWritingHubStore();
    const {
        report, reportByUnitData, set, currentSelectCodes, reportByUnitAPIData,
        setOverallReportByStu, overallDoughnutChartData, overallBarChartData
    } = useReportStore();

    const {feedbackDataInStudent, studentDataInClass, setFeedbackDataInStudent} = useLearningManagementSparkWritingStore();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getOverallDatas = async () => {
        const getOverallDataFromAPI = await getReportOverallDatabyStu({
            level_name: feedbackDataInStudent.defautInfo.level.name,
            student_code: student_code
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
            } else return [];
        }
        return [];
    }
    // check reports 
    const checkIsReport = (data: TLMSparkWritingStudentUnitItemInClass[]):TAvailableReportsArr[] => {
        let unitFlagArr:TAvailableReportsArr[] = Array.from({length:5},(__v,i)=>{return {availableFlag:false, draft2ndId:-1, draft1stId: -1, unitIdx:-1}});
        
        for (let i = 0; i < data.length; i++) {
            const unitIdx = data[i].unit_index;
            const status2nd = data[i].draft_2_status;
            if (data[i].draft_2_status) {
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
        console.log('in checkMoveFlag availableReports =',availableReports)
        for (let i =0; i < availableReports.length; i++) {
            
            const currentUnitIndex = availableReports[i].unitIdx
            if (currentUnitIndex === unit) {
                if (unit===1) {
                    // check next arr
                    const nextTarget = availableReports[i+1];
                    console.log('nextTarget =',nextTarget)
                    setIsLeftAvailable(false);
                    setIsRightAvailable(nextTarget.availableFlag);
                } else if (unit === 5) {
                    // check before arr
                    const beforeTarget = availableReports[i-1];
                    console.log('before Target =',beforeTarget)
                    setIsLeftAvailable(beforeTarget.availableFlag);
                    setIsRightAvailable(false);
                } else {
                    const nextTarget = availableReports[i+1];
                    const beforeTarget = availableReports[i-1];
                    console.log('next ===',nextTarget);
                    console.log('before ===',beforeTarget)
                    setIsLeftAvailable(beforeTarget.availableFlag);
                    setIsRightAvailable(nextTarget.availableFlag)
                }
            }
        }
    }
    React.useEffect(()=>{
        const selectUnit = feedbackDataInStudent.defautInfo.unit_index;
        const selectUnitTopic = feedbackDataInStudent.defautInfo.unit_topic;
        console.log('select unit =',selectUnit)
        set.initCurrentDisplay(selectUnit, selectUnitTopic);
        const data = selectDataByStudentCode(student_code);
        console.log('data ==',data)
        const isReportArr = checkIsReport(data);
        
        setAvailableReports(isReportArr);
        checkMoveFlag(selectUnit);
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
            const dataByStu = selectDataByStudentCode(student_code);
            
            for (let i = 0; i < dataByStu.length; i++) {
                const targetData = dataByStu[i].unit_index;
                if (currentUnit+1 === targetData) {
                    const target = dataByStu[i];
                    const draft_1st_id = target.draft_1_status.draft_id.toString();
                    const draft_2nd_id = target.draft_2_status.draft_id.toString();
                    const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                    const rsp2nd = await getDraftInfoByDraftId(draft_2nd_id);
                    const searchData = {
                        level_name: dumyData.defautInfo.level.name,
                        unit_index: target.unit_index,
                        student_code: student_code
                    }
                    const reportData = await getReportOneDataByStu(searchData)
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
                        set.setReportAPIData(reportData);
                        setFeedbackDataInStudent(dumyData);
                        checkMoveFlag(target.unit_index);
                        set.initCurrentDisplay(target.unit_index, target.topic);
                        break;
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
            console.log('currentUnit =',currentUnit)
            const dataByStu = selectDataByStudentCode(student_code);
            
            for (let i = 0; i < dataByStu.length; i++) {
                const targetData = dataByStu[i].unit_index;
                if (currentUnit-1 === targetData) {
                    const target = dataByStu[i];
                    const draft_1st_id = target.draft_1_status.draft_id.toString();
                    const draft_2nd_id = target.draft_2_status.draft_id.toString();
                    const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                    const rsp2nd = await getDraftInfoByDraftId(draft_2nd_id);
                    const searchData = {
                        level_name: dumyData.defautInfo.level.name,
                        unit_index: target.unit_index,
                        student_code: student_code
                    }
                    const reportData = await getReportOneDataByStu(searchData)
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
                        set.setReportAPIData(reportData);
                        checkMoveFlag(target.unit_index);
                        set.initCurrentDisplay(target.unit_index, target.topic);
                        break;
                    }
                }
            }
        }
    }

    console.log('feedback data ==',feedbackDataInStudent)
  return (
    <Box sx={{ width: '1260px', paddingTop: '30px' }}>
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
            <div className='flex flex-col'>
                <div className='flex'>
                    <DoughnutChartComponent data={overallDoughnutChartData}/>
                </div>
                <div className='flex justify-center'>
                    <DoughnutChartLegend data={dumyCircleData}/>
                </div>
            </div>
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
        <div className='flex flex-col w-[1260px]'>
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
                 <PortfolioModalComponent feedbackStates={feedbackDataInStudent} from='LM-Report' studentCode={student_code}/>
                </div>
            </div>
            {/* 좌 - 그래프, 우 - summary, correction, t comment */}
            <div className='flex flex-row w-full px-[30px]'>
                <div className='flex flex-1'>
                    <ReportChart />
                </div>

                <div className='flex flex-1 flex-col'>
                    <ReportByUnitComponent />
                </div>
            </div>
            {/* foot: print, complete date */}
            <div className="flex flex-row border-t-[1px] border-t-[#e2e3e6] relative h-[70px] w-full pt-[17px] px-[30px]">
                <PrintReportExportButton feedbackDataInStudent={feedbackDataInStudent} reportByUnitAPIData={reportByUnitAPIData}/>

                <div className='absolute bottom-[25px] right-[30px] flex flex-row capitalize items-center gap-[5px]'>
                    <div className='report-by-unit-completion-date-title'>completion date: </div>
                    <div className='report-by-unit-completion-date-content'>{`[1st draft] ${reportByUnitData.completionDate.draft1st}`}</div>
                    <div className='w-[1px] h-[8px] bg-[#aaa]' />
                    <div className='report-by-unit-completion-date-content'>{`[2nd draft] ${reportByUnitData.completionDate.draft2nd}`}</div>
                </div>
            </div>

        </div>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        <div className='flex flex-col gap-[20px]'>
            <CalculatorPXtoMM />

        </div>
      </CustomTabPanel> */}
    </Box>
  );
}