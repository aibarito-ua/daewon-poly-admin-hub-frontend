import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useLearningManagementSparkWritingStore from '../../../store/useLearningManagementSparkWritingStore';
import useReportStore from '../../../store/useReportStore';
import { getDraftInfoByDraftId, getReportOneDataByStu } from '../../../api/LearningManagement/LearningManagementSparkWriting.api';
import ReportModalComponent from '../ReportModalComponent';
import PrintPortfolioExportButton from '../../commonComponents/customComponents/exportButtons/portfolio/PrintPortfolioExportButton';
import CalculatorPXtoMM from '../CalculatorPXtoMM';
import { useComponentWillMount } from '../../../hooks/useEffectOnce';
import useLearningResultManagementWHStore from '../../../store/useLearningResultManagementWHStore';
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
          <Typography >{children}</Typography>
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

export default function PortfolioTabComponent() {
    
    const [value, setValue] = React.useState(0);
    // car
    const [availableReports, setAvailableReports] = React.useState<TAvailableReportsArr[]>([]);
    const [isLeftAvailable, setIsLeftAvailable] = React.useState<boolean>(false);
    const [isRightAvailable, setIsRightAvailable] = React.useState<boolean>(false);
    // crown check flag
    const [isCrown, setIsCrown] = React.useState<boolean>(false);

    const {
        report, reportByUnitData, set, currentSelectCodes, reportByUnitAPIData,
        setIsModalOpen,
    } = useReportStore();
    const {getAllReportData} = useLearningResultManagementWHStore();
    const {feedbackDataInStudent, studentDataInClass, setFeedbackDataInStudent} = useLearningManagementSparkWritingStore();
    const navigate = useNavigate();
    const {setMaintenanceData} = useLoginStore()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // final draft is ended
    // data select
    const selectDataByStudentCode = (student_code:string):TLMSparkWritingStudentUnitItemInClass[] => {
        const dumpStudentDataInClass:TLMSparkWritingStudentsListInClass = JSON.parse(JSON.stringify(studentDataInClass));
        console.log('student code in selectData =',student_code)
        console.log('pt = dumpStudent =',dumpStudentDataInClass)
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
    const checkIsPortfolio = (data: TLMSparkWritingStudentUnitItemInClass[]):TAvailableReportsArr[] => {
        let unitFlagArr:TAvailableReportsArr[] = Array.from({length:5},(__v,i)=>{return {availableFlag:false, draft2ndId:-1, draft1stId: -1, unitIdx:-1}});
        // console.log('=== checkIsPortfolio ====',data)
        for (let i = 0; i < data.length; i++) {
            const unitIdx = data[i].unit_index;
            const status2nd = data[i].draft_2_status;

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
        console.log("=== unitFlagArr : ",unitFlagArr)
        return unitFlagArr;
    }
    // LRM connect check reports
    const checkIsReportFromLRM = () => {
        let unitFlagArr:TAvailableReportsArr[] = Array.from({length:5},(__v,i)=>{return {availableFlag:false, draft2ndId:-1, draft1stId: -1, unitIdx:i+1}});
        const allStu = getAllReportData.students;
        const targetCode = feedbackDataInStudent.defautInfo.student_code;
        for (let i = 0; i < allStu.length;i++) {
            const unitsByStudent = allStu[i].unit_reports;
            const currentTargetCode = allStu[i].student_code;
            if (targetCode === currentTargetCode) {
                for (let j = 0; j < unitsByStudent.length; j++) {
                    const unitData = unitsByStudent[j];
                    if (unitData.unit_index === unitFlagArr[j].unitIdx) {
                        unitFlagArr[j].availableFlag = unitData.report.is_completed;
                        unitFlagArr[j].draft1stId = feedbackDataInStudent.status_1st?.draft_id?feedbackDataInStudent.status_1st?.draft_id:-1;
                        unitFlagArr[j].draft2ndId = feedbackDataInStudent.status?.draft_id? feedbackDataInStudent.status?.draft_id:-1;
                    }
                }
            }
            
        }
        return unitFlagArr;
    }
    const checkMoveFlag = (unit:number) => {
        console.log('in checkMoveFlag availableReports =',availableReports)
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
    const initSettingData = async () => {
        console.log("test2")
        let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
        const currentUnit = dumyData.defautInfo.unit_index;
        console.log('currentUnit =',currentUnit)
        const dataByStu = selectDataByStudentCode(feedbackDataInStudent.defautInfo.student_code);
        
        for (let i = 0; i < dataByStu.length; i++) {
            const targetData = dataByStu[i].unit_index;
            if (currentUnit === targetData) {
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
                    campus_code: dumyData.defautInfo.campus.code,
                    level_name: dumyData.defautInfo.level.name,
                    class_code: dumyData.defautInfo.class.code,
                    unit_index: target.unit_index,
                    student_code: feedbackDataInStudent.defautInfo.student_code
                }
                console.log('searche data =',searchData)
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
                    return true;
                }
            }
        }
        return false;
    }
    // useComponentWillMount(async()=>{
    //     // await initSettingData();
    // })
    React.useEffect(()=>{
        console.log(' === Portfolio === modal ===')
        const selectUnit = feedbackDataInStudent.defautInfo.unit_index;
        const selectUnitTopic = feedbackDataInStudent.defautInfo.unit_topic;
        console.log('select unit =',selectUnit)
        set.initCurrentDisplay(selectUnit, selectUnitTopic);
        const data = selectDataByStudentCode(feedbackDataInStudent.defautInfo.student_code);

        const isReportArr = checkIsPortfolio(data);
        setAvailableReports(isReportArr);
        console.log('data ==',data)
        calcAvrCrown(reportByUnitAPIData);
        // checkMoveFlag(selectUnit);
    },[])

    React.useEffect(()=>{
        const currentUnit = reportByUnitData.currentUnitInfo.unit_index;
        // if (availableReports.length === 0) {
        //     const data = selectDataByStudentCode(student_code);
        //     const isReportArr = checkIsReport(data);
        //     setAvailableReports(isReportArr);
        // }
        calcAvrCrown(reportByUnitAPIData);
        checkMoveFlag(currentUnit);
        set.initCurrentDisplay(currentUnit, reportByUnitData.currentUnitInfo.unit_topic);
    }, [
        reportByUnitAPIData,
        availableReports,
        reportByUnitData,
        isLeftAvailable,
        isRightAvailable,
        feedbackDataInStudent
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
                            campus_code: dumyData.defautInfo.campus.code,
                            level_name: dumyData.defautInfo.level.name,
                            class_code: dumyData.defautInfo.class.code,
                            unit_index: target.unit_index,
                            student_code: feedbackDataInStudent.defautInfo.student_code
                        }
                        console.log('search data =',searchData)
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
                            campus_code: dumyData.defautInfo.campus.code,
                            level_name: dumyData.defautInfo.level.name,
                            class_code: dumyData.defautInfo.class.code,
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

    
    const calcAvrCrown = (data:TStudentUnitReportRes) => {
        const targetRubric = data.rubric.categories;
        let allScore = 0;
        for (let i = 0; i < targetRubric.length; i++) {
            allScore += targetRubric[i].score;
        }
        const avrAllScore = allScore/6;
        const isCorwnFlag = avrAllScore >= 8;
        setIsCrown(isCorwnFlag);

    }
    const displayPortfolio = (data:TStudentUnitReportRes) => {
        const portfolio = data.portfolio;
        return portfolio.map((portfolioItem, portfolioIdx) => {
            const orderIdx = portfolioItem.order_index;
            const key = 'display-'+portfolioItem.name+portfolioItem.order_index+'-'+portfolioIdx+orderIdx;
            if (orderIdx === 1) {
                // title
                return <div key={key} className='flex flex-row w-full justify-center pb-[40px]'>
                    <div className='flex portfolio-modal-contents-font-title'>{portfolioItem.content}</div>
                </div>
            } else {
                // body
                const splitText = portfolioItem.content.split('\n');
                return splitText.map((bodyText, bodyTextIdx) => {
                    const bodyKey = key+bodyTextIdx;
                    return <div key={bodyKey} className='flex flex-row w-full justify-start px-[41px]'>
                        <div className='flow-root portfolio-modal-contents-font'>{bodyText}<br /></div>
                        {/* indent-[10px] delete */}
                    </div>
                })
            }
        })
    }
    console.log('feedback data ==',feedbackDataInStudent)
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
          }} label="Portfolio" {...a11yProps(0)}/>
          {/* <StyledTab label="print component" {...a11yProps(1)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <div className='flex flex-col w-[1260px] h-full'>
            <div className='flex flex-row'>
                {/* head 케로셀 & 버튼 */}
                <div className='flex flex-row relative justify-center items-center gap-[20px] w-full mt-[30px] px-[30px]'>
                    <div className={`bg-no-repeat w-[36px] h-[36px] ${isLeftAvailable ? 'bg-svg-bt-left hover:bg-svg-bt-left-over': 'bg-svg-bt-left-disabled'}`}
                        onClick={async () => await onClickStepperLeft()}
                    ></div>
                    <div className='report-by-unit-title-label'>{`Unit ${reportByUnitData.currentUnitInfo.unit_index}. ${reportByUnitData.currentUnitInfo.unit_topic}`}</div>
                    <div className={`bg-no-repeat w-[36px] h-[36px] ${isRightAvailable ? 'bg-svg-bt-right hover:bg-svg-bt-right-over': 'bg-svg-bt-right-disabled'}`}
                        onClick={async()=>await onClickStepperRight()}
                    ></div>
                    <div className='absolute right-[30px] '>
                        <div className={
                            'bg-no-repeat w-[124.3px] h-[40px] bg-svg-bt-go-report hover:bg-svg-bt-go-report-over hover:cursor-pointer select-none'
                        }
                        onClick={async() => {
                            setIsModalOpen({
                                isPortfolioOpen:false,
                                isReportOpen:true,
                            })
                        }}
                        >
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className='flex flex-col w-[1200px] h-[531px] mt-[32px] ml-[30px] border-[1px] bg-[#f9f9f9] border-[#dddddd] border-b-transparent rounded-t-[20px] overflow-y-auto relative'>
                <div className='flex flex-col w-[1200px] min-h-[531px] pt-[50px] '>
                    {displayPortfolio(reportByUnitAPIData)}
                </div>
                {isCrown && <div className='absolute right-[40px] bg-svg-ic-crown w-[60px] h-[50px] ' />}
                
            </div>
            {/* footer */}
            <div className='flex flex-row w-full h-[70px] min-h-[70px] border-t-[1px] border-t-[#e2e3e6] relative pl-[30px] items-center'>
                <PrintPortfolioExportButton feedbackDataInStudent={feedbackDataInStudent} reportByUnitAPIData={reportByUnitAPIData} isCrown={isCrown}/>
                
                <div className='absolute bottom-[25px] right-[30px] flex flex-row capitalize items-center gap-[5px]'>
                    <div className='report-by-unit-completion-date-title'>completion date: </div>
                    <div className='report-by-unit-completion-date-content'>{`[1st draft] ${reportByUnitData.completionDate.draft1st}`}</div>
                    <div className='w-[1px] h-[8px] bg-[#aaa]' />
                    <div className='report-by-unit-completion-date-content'>{`[2nd draft] ${reportByUnitData.completionDate.draft2nd}`}</div>
                </div>
            </div>

        </div>
      </CustomTabPanel>
    </Box>
  );
}