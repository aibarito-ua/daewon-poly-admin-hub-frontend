import React from 'react';
import useLearningManagementSparkWritingStore from '../../../store/useLearningManagementSparkWritingStore';
import { getDraftInfoByDraftId, getReportOneDataByStu, getReportOverallDatabyStu } from '../../../api/LearningManagement/LearningManagementSparkWriting.api';
import { CommonFunctions } from '../../../util/common/commonFunctions';
import { useNavigate } from 'react-router-dom';
import ReportModalComponent from '../../toggleModalComponents/ReportModalComponent';
import useReportStore from '../../../store/useReportStore';
import useControlAlertStore from '../../../store/useControlAlertStore';

const TableHeader = (props: {head:string[] }) => {
    let tableHeadDatas = props.head;
    let headModel:{accessor:string, header:string, width: number}[][] = [[],[]];
    for (let iRow = 0; iRow < 2; iRow++) {
        for (let jCol = 0; jCol < tableHeadDatas.length; jCol++) {
            const cellData = tableHeadDatas[jCol];
            const defaultKeyIdx = `_${iRow}_${jCol}`
            if (iRow===0) {
                if (jCol<2) {
                    const accessor = cellData==='no'? `idx${defaultKeyIdx}`: `username${defaultKeyIdx}`
                    const width = cellData==='no'? 70: 140;
                    const data = {accessor, header: cellData, width }
                    headModel[iRow].push(data)
                } else if ( (jCol-2)%3===0 ) {
                    const splitCellData = cellData.split('_');
                    const replaceCellData = `${splitCellData[0]} ${splitCellData[1]}`
                    const accessor = `${splitCellData[0]}_${splitCellData[1]}${defaultKeyIdx}`;
                    const data = {accessor, header: replaceCellData, width: 285};
                    headModel[iRow].push(data)
                }
            } else {
                if (jCol>1) {
                    if ((jCol-2)%3===0||(jCol-2)%3===1) {
                        const splitCellData = cellData.split('_');
                        const replaceCellData = `${splitCellData[2]} ${splitCellData[3]}`
                        const accessor = `${cellData}${defaultKeyIdx}`;
                        const data = {accessor, header: replaceCellData, width: 95};
                        headModel[iRow].push(data)
                    } else if ((jCol-2)%3===2) {
                        const splitCellData = cellData.split('_');
                        const replaceCellData = `${splitCellData[2]}`
                        const accessor = `${cellData}${defaultKeyIdx}`;
                        const data = {accessor, header: replaceCellData, width: 95};
                        headModel[iRow].push(data)
                    }
                }
            }
        }
    }
    // console.log('headModel ==',headModel)
    return (
        <thead className='table-thead-basic h-[68px]'>
            {headModel.map((headerRowItem, headerRowIndex)=>{
                return <tr className='table-thead-tr-basic' key={headerRowIndex}>{headerRowItem.map((headerCell, headerCellIndex) => {
                    if (headerRowIndex===0) {
                        if (headerCellIndex< 2) {
                            return <th
                                rowSpan={2}
                                key={headerCell.accessor}
                                className='table-thead-tr-th-basic'
                                style={{width: headerCell.width+'px'}}
                            >{headerCell.header}</th>
                        } else {
                            return <th
                                colSpan={3}
                                key={headerCell.accessor}
                                className='table-thead-tr-th-basic border-r-[1px] border-r-[#aaa]'
                                // style={{width: headerCell.width+'px'}}
                                style={{width: '296px'}}
                            >{headerCell.header}</th>
                        }
                    } else {
                        return <th
                                key={headerCell.accessor}
                                className={`table-thead-tr-th-basic ${headerCell.header==='report'&& 'border-r-[1px] border-r-[#aaa]'}`}
                                style={{width: '95px'}}
                            >{headerCell.header}</th>
                    }
                })
                }</tr>
                })
            }
        </thead>
    )
}
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
const displayJSX = (data:TLMSparkWritingStudentUnitDraft1StatusItemInClass, isDraft: boolean,) => {
    const {
        status,
    } = data;
    const defaultDisplayJSX = <span className='w-full inline-flex flex-col justify-center items-center'><span className='flex'>{'-'}</span></span>;

    if (isDraft) {
        // draft
        if (status===2) {
            // 2 -> correct white 
            if (data.submit_date) {
                const displayDate = new Date(data.submit_date).toISOString().slice(2,10);
                return <span className='learning-management-class-table-item-wrap'>
                    <span className='learning-management-class-table-button-status-2' />
                    <span className='learning-management-class-table-text'>{displayDate}</span>
                </span>
            } else return defaultDisplayJSX;
        } else if (status === 3) {
            // 3 -> correct yellow
            if (data.review_temp_save_date) {
                const displayDate = new Date(data.review_temp_save_date).toISOString().slice(2,10);
                return <span className='learning-management-class-table-item-wrap'>
                    <span className='learning-management-class-table-button-status-3' />
                    <span className='learning-management-class-table-text'>{displayDate}</span>
                </span>
            } else return defaultDisplayJSX;
        } else if (status === 4) {
            // 4 -> Done
            if (data.review_complete_date) {
                const displayDate = new Date(data.review_complete_date).toISOString().slice(2,10);
                return <span className='learning-management-class-table-item-wrap'>
                    <span className='learning-management-class-table-button-status-4' />
                    <span className='learning-management-class-table-text'>{displayDate}</span>
                </span>
    
            } else return defaultDisplayJSX;
        } else if (status === 5) {
            // 5 -> returned red
            if (data.review_reject_date) {
                const displayDate = new Date(data.review_reject_date).toISOString().slice(2,10);
                return <span className='learning-management-class-table-item-wrap'>
                    <span className='learning-management-class-table-button-status-5' />
                    <span className='learning-management-class-table-text'>{displayDate}</span>
                </span>
            } else return defaultDisplayJSX;
        } else {
            // 0, 1 -> "-"
            return defaultDisplayJSX
        }
    } else {
        // report
        return defaultDisplayJSX
    }
}

const TableBody = (props:{
    dataModel: TClassCurrentlyData[][],
}) => {
    const {
        dataModel
    } = props;
    const navigate = useNavigate();
    const {
        feedbackDataInStudent, setFeedbackDataInStudent, studentDataInClass, setRubricReportAllValue
    } = useLearningManagementSparkWritingStore();
    
    const {
        set, currentSelectCodes, setOverallReportByStu
    } = useReportStore()

    const {
        commonStandbyScreen, setCommonStandbyScreen
    } = useControlAlertStore();
    const [dumpStudentDataInClass,setDumpStudentDataInClass] = React.useState<TLMSparkWritingStudentItemInClass[]>([]);
    
    React.useEffect(()=>{
        if (commonStandbyScreen.openFlag) {
            setCommonStandbyScreen({openFlag:false})
        }
    },[
        studentDataInClass
    ])

    // click enter feedback page
    const enterFeedbackEvent = (draft:string, unit_index:number, unit_topic:string, step_label:string, ) => {
        // basic info setting
        const dumyFeedbackPageValue:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));


    }
    console.log('studentDataInClass ::',studentDataInClass)
    console.log('dataModel:: ',dataModel)
    return (
        <tbody className='table-tbody-basic text-[13px] font-sans font-normal text-[#444444] bg-[#fff] border-b-[1px]'>
            {dataModel&& dataModel.map((rowData, rowIdx)=>{
                const isBackgroundColorWhite = rowIdx%2 === 0;
                // student row
                return <tr key={rowIdx}
                className={isBackgroundColorWhite ? 'table-tbody-tr-basic max-h-[76px] bg-white': 'table-tbody-tr-basic max-h-[76px] bg-[#f9f9f9]'}
                >{
                    rowData.map((cellData, cellIdx) => {
                        console.log('row idx =',rowIdx, ', studendInClass =',studentDataInClass)
                        const studentBasicInfo = {
                            student_code: studentDataInClass.students[rowIdx] ? studentDataInClass.students[rowIdx].student_code: '',
                            student_name_en: studentDataInClass.students[rowIdx] ? studentDataInClass.students[rowIdx].student_name_en:'',
                            student_name_kr: studentDataInClass.students[rowIdx] ? studentDataInClass.students[rowIdx].student_name_kr:'',
                        }
                        if (cellIdx===0) {
                            // category "NO"
                            return <td
                                key={cellData.key}
                                className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] h-[78px]`}
                                style={{minWidth: cellData.width}}
                            >
                                <span className='inline-flex items-center justify-center w-full'>
                                <span className='learning-management-class-table-no'>{cellData.value.num}</span>
                                </span></td>
                        } else if (cellIdx===1) {
                            // category "Student"
                            return <td
                                key={cellData.key}
                                className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6]`}
                                style={{minWidth: cellData.width}}
                            ><span className='w-full inline-flex flex-col justify-center items-center'>
                                <span className='learning-management-class-table-text'>{cellData.value.nameset?.student_name_kr}</span>
                                <span className='learning-management-class-table-text'>{`(${cellData.value.nameset?.student_name_en})`}</span>
                            </span></td>
                        } else if ( (cellIdx-2)%3===0 ) {
                            // first draft
                            const firstDraftData = cellData.value.data;
                            const data = firstDraftData?.draft_1_status;
                            // console.log('data ===',firstDraftData )
                            if (data) {
                                const displayDate = displayJSX(data,true)
                                // console.log('displayDate =',displayDate)
                                return <td
                                    key={cellData.key}
                                    className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] w-[95px]`}
                                    style={{minWidth: cellData.width}}
                                    onClick={async ()=>{
                                        console.log('cellData =',cellData)
                                        const targetData = cellData.value.data?.draft_1_status.draft_id;
                                        const draft_id = targetData? targetData.toString() : '';
                                        const rsp =await getDraftInfoByDraftId(draft_id);
                                        if (rsp.draft_index>0) {
                                            let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent))
                                            dumyData.draft_data = rsp;
                                            dumyData.defautInfo.student_code=studentBasicInfo.student_code;
                                            dumyData.defautInfo.student_name={student_name_en: studentBasicInfo.student_name_en, student_name_kr: studentBasicInfo.student_name_kr}
                                            const currentlyDate = selectDate(data,true);
                                            console.log('currentlyDate ==',)
                                            dumyData.defautInfo.submit_date=formatDate(currentlyDate);
                                            dumyData.defautInfo.unit_index=firstDraftData.unit_index;
                                            dumyData.defautInfo.unit_topic=firstDraftData.topic;
                                            dumyData.defautInfo.select_draft_id=draft_id;
                                            dumyData.defautInfo.step_label='1st Draft'
                                            dumyData.status=firstDraftData.draft_1_status;
                                            dumyData.overall_comment = rsp.overall_comment;
                                            setFeedbackDataInStudent(dumyData);
                                            navigate(`/LearningManagement/WritingHub/SparkWriting/feedback/${studentBasicInfo.student_code}/${draft_id}`);
                                        } else {
                                            
                                        }
                                    }}
                                >{displayDate}</td>
                            } else {
                                return <td
                                    key={cellData.key}
                                    className={`learning-management-class-table-empty-draft`}
                                    style={{minWidth: cellData.width}}
                                >{'-'}</td>
                            }
                        } else if ( (cellIdx-2)%3===1 ) {
                            // second draft
                            const secondDraftData = cellData.value.data;
                            const data = secondDraftData?.draft_2_status;
                            if (data) {
                                const displayDate = displayJSX(data,true)
                                console.log('displayDate =',displayDate)
                                return <td
                                key={cellData.key}
                                className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] w-[95px]`}
                                style={{minWidth: cellData.width}}
                                onClick={async () => {
                                        console.log('data ===',secondDraftData )
                                        const targetData = cellData.value.data?.draft_2_status.draft_id;
                                        const draft_id = targetData ? targetData.toString() : '';
                                        const rsp = await getDraftInfoByDraftId(draft_id);
                                        const target1stData = cellData.value.data?.draft_1_status.draft_id;
                                        const draft_1st_id = target1stData ? target1stData.toString():'';
                                        const rsp1st = await getDraftInfoByDraftId(draft_1st_id)
                                        if (rsp.draft_index > 0) {
                                            let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
                                            console.log('data 2nd draft ==',rsp)
                                            dumyData.draft_2nd_data=rsp;
                                            dumyData.draft_data=rsp1st;
                                            dumyData.defautInfo.student_code=studentBasicInfo.student_code;
                                            dumyData.defautInfo.student_name={student_name_en: studentBasicInfo.student_name_en, student_name_kr: studentBasicInfo.student_name_kr}
                                            const currentlyDate = selectDate(data,true);
                                            dumyData.defautInfo.submit_date=formatDate(currentlyDate);
                                            dumyData.defautInfo.unit_index=secondDraftData.unit_index;
                                            dumyData.defautInfo.unit_topic=secondDraftData.topic;
                                            dumyData.defautInfo.select_draft_id=draft_id;
                                            dumyData.defautInfo.step_label="2nd Draft"
                                            dumyData.status=secondDraftData.draft_2_status;
                                            dumyData.overall_comment = rsp.overall_comment;
                                            dumyData.rubric=secondDraftData.rubric;
                                            dumyData.status_1st=rowData[cellIdx-1].value.data?.draft_1_status;
                                            console.log('dumy ===',dumyData)
                                            setFeedbackDataInStudent(dumyData);
                                            navigate(`/LearningManagement/WritingHub/SparkWriting/feedback/${studentBasicInfo.student_code}/${draft_id}`);
                                        }
                                    }}
                                >{displayDate}</td>
                            } else {
                                return <td
                                    key={cellData.key}
                                    className={`learning-management-class-table-empty-draft`}
                                    style={{minWidth: cellData.width}}
                                >{'-'}</td>
                            }
                        } else {
                            // report
                            const reportData = cellData.value.data;
                            const data = reportData?.report;
                            const checkReportData = reportData?.draft_1_status && reportData?.draft_2_status;


                            
                            // console.log('report data ===',reportData )
                            if (checkReportData) {
                                const draft1Status = reportData?.draft_1_status.status;
                                const draft2Status = reportData?.draft_2_status.status;
                                const checkReport = draft1Status===4 ? (draft2Status===4? true:false):false;
                                
                                if (checkReport) {
                                    const displayDate = displayJSX(data,false)
                                    console.log('displayDate =',displayDate)
                                    return <td
                                        key={cellData.key}
                                        // className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#aaa] h-full flex items-center justify-center`}
                                        className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#aaa] w-[95px]`}
                                        style={{minWidth: cellData.width}}
                                    >
                                        <span className='w-full h-full flex justify-center items-center'>
                                        <ReportModalComponent 
                                        feedbackStates={feedbackDataInStudent}
                                        studend_code={studentBasicInfo.student_code}
                                        initSettingData={async () => {
                                            const secondDraftData = rowData[cellIdx-1].value.data;
                                            const firstDraftData = rowData[cellIdx-2].value.data;
                                            if (firstDraftData && secondDraftData) {
                                                console.log('data ===',secondDraftData )
                                                const targetData = cellData.value.data?.draft_2_status.draft_id;
                                                const draft_id = targetData ? targetData.toString() : '';
                                                const rsp = await getDraftInfoByDraftId(draft_id);
                                                const target1stData = cellData.value.data?.draft_1_status.draft_id;
                                                const draft_1st_id = target1stData ? target1stData.toString():'';
                                                const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                                                const data = {
                                                    level_name: feedbackDataInStudent.defautInfo.level.name,
                                                    unit_index: secondDraftData.unit_index,
                                                    student_code: studentBasicInfo.student_code
                                                }
                                                const reportData = await getReportOneDataByStu(data);
                                                const overallData = await getReportOverallDatabyStu({level_name: data.level_name, student_code: data.student_code})
                                                console.log('onClick reportData = ',reportData)
                                                console.log('onClick overallData =',overallData)
                                                if (rsp.draft_index > 0 && reportData && overallData) {
                                                    let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
                                                    console.log('data 2nd draft ==',rsp)
                                                    dumyData.draft_2nd_data=rsp;
                                                    dumyData.draft_data=rsp1st;
                                                    dumyData.defautInfo.student_code=studentBasicInfo.student_code;
                                                    dumyData.defautInfo.student_name={student_name_en: studentBasicInfo.student_name_en, student_name_kr: studentBasicInfo.student_name_kr}
                                                    
                                                    const submitDate2nd = selectDate(secondDraftData.draft_2_status, true);
                                                    const submitDate1st = selectDate(secondDraftData.draft_1_status, true);
                                                    dumyData.defautInfo.submit_date=formatDate(submitDate2nd);
                                                    dumyData.defautInfo.unit_index=secondDraftData.unit_index;
                                                    dumyData.defautInfo.unit_topic=secondDraftData.topic;
                                                    dumyData.defautInfo.select_draft_id=draft_id;
                                                    dumyData.defautInfo.step_label="2nd Draft"
                                                    dumyData.status=secondDraftData.draft_2_status;
                                                    dumyData.overall_comment = rsp.overall_comment;
                                                    dumyData.rubric=secondDraftData.rubric;
                                                    dumyData.status_1st=rowData[cellIdx-1].value.data?.draft_1_status;
                                                    const comments:TDraftStringsData = {
                                                        draft1st: rsp1st.overall_comment,
                                                        draft2nd: rsp.overall_comment
                                                    }
                                                    const dates:TDraftStringsData = {
                                                        draft1st: formatDate(submitDate1st,'-'),
                                                        draft2nd: formatDate(submitDate2nd,'-')
                                                    }
                                                    set.setTeachersComments(comments);
                                                    set.setCompletionDates(dates);
                                                    set.setReportAPIData(reportData, secondDraftData.rubric);
                                                    setOverallReportByStu(overallData);
                                                    
                                                    console.log('dumy ===',dumyData)
                                                    setFeedbackDataInStudent(dumyData);
                                                    return true;       
                                                }
                                            }
                                            return false;
                                        }}
                                    />
                                    </span>
                                    </td>
                                } else {
                                    return <td
                                        key={cellData.key}
                                        className={`learning-management-class-table-empty-report`}
                                        style={{minWidth: cellData.width}}
                                    >{'-'}</td>
                                }
                            } else {
                                return <td
                                    key={cellData.key}
                                    className={`learning-management-class-table-empty-report`}
                                    style={{minWidth: cellData.width}}
                                >{'-'}</td>
                            }
                        }
                        
                    })
                }</tr>
            })}
        </tbody>
    )
}
export default function LearningManagementStudentsTable (props:{
    dataHead: string[],
    dataModel: TClassCurrentlyData[][],
}) {


    if (props.dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-aside'>
                    <TableHeader head={props.dataHead}/>
                    <TableBody dataModel={props.dataModel}
                    />
                </table>
            </div>
        )
    } else {
        return <div className={`justify-center items-center w-full h-full flex flex-1`}>
            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{'No Data to display!'}</p>
        </div>;
    }
}