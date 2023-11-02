import React from 'react';
import useLearningManagementSparkWritingStore from '../../../store/useLearningManagementSparkWritingStore';
import { getDraftInfoByDraftId, getReportOneDataByStu, getReportOverallDatabyStu } from '../../../api/LearningManagement/LearningManagementSparkWriting.api';
import { CommonFunctions } from '../../../util/common/commonFunctions';
import { useNavigate } from 'react-router-dom';
import ReportModalComponent from '../../toggleModalComponents/ReportModalComponent';
import useReportStore from '../../../store/useReportStore';
import useLearningResultManagementWHStore from '../../../store/useLearningResultManagementWHStore';
import PortfolioModalComponent from '../../toggleModalComponents/PortfolioModalComponent';

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
                } 
                else if ( (jCol-2)%2===0 ) {
                    const splitCellData = cellData.split('_');
                    const replaceCellData = `${splitCellData[0]} ${splitCellData[1]}`
                    const accessor = `${splitCellData[0]}_${splitCellData[1]}${defaultKeyIdx}`;
                    const data = {accessor, header: replaceCellData, width: 190};
                    headModel[iRow].push(data)
                }
            } else {
                if (jCol>1) {
                    if ((jCol-2)%2===0) {
                        const splitCellData = cellData.split('_');
                        const replaceCellData = `${splitCellData[2]}`
                        const accessor = `${cellData}${defaultKeyIdx}`;
                        const data = {accessor, header: replaceCellData, width: 95};
                        headModel[iRow].push(data)
                    } else if ((jCol-2)%2===1) {
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
        <thead className='table-thead-basic h-[68px]' style={{maxWidth: '1180px'}}>
            {headModel.map((headerRowItem, headerRowIndex)=>{
                return <tr className='table-thead-tr-basic' key={headerRowIndex}>{headerRowItem.map((headerCell, headerCellIndex) => {
                    if (headerRowIndex===0) {
                        if (headerCellIndex< 2) {
                            return <th
                                rowSpan={2}
                                key={headerCell.accessor}
                                className='table-thead-tr-th-basic border-t-[1px] border-t-[#111]'
                                style={{width: headerCell.width+'px'}}
                            >{headerCell.header}</th>
                        } else {
                            return <th
                                colSpan={2}
                                key={headerCell.accessor}
                                className='table-thead-tr-th-basic border-t-[1px] border-t-[#111] border-r-[1px] border-r-[#aaa]'
                                style={{width: headerCell.width+'px'}}
                            >{headerCell.header}</th>
                        }
                    } else {
                        return <th
                                key={headerCell.accessor}
                                className={`table-thead-tr-th-basic ${headerCell.header==='portfolio'&& 'border-r-[1px] border-r-[#aaa]'}`}
                                style={{width: headerCell.width+'px'}}
                            >{headerCell.header}</th>
                    }
                })
                }</tr>
                })
            }
        </thead>
    )
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
const displayJSX = (data:TLMSparkWritingStudentUnitItemInClass,isReport:boolean) => {
    const defaultDisplayJSX = <span className='w-full inline-flex flex-col justify-center items-center'><span className='flex'>{'-'}</span></span>;
    
    if (data && isReport) {
        const target = data.draft_2_status.review_complete_date;
        console.log('===date target =',data)
        if (target) {
            const displayDate = new Date(target).toISOString().slice(2,10);
            return <span className='learning-management-class-table-text'>{displayDate}</span>

        } else return defaultDisplayJSX;
        
    } else return defaultDisplayJSX;
}

const TableBody = (props:{
    dataModel: TLRMWHClassCurrentlyData[][],
}) => {
    const {
        dataModel
    } = props;
    const navigate = useNavigate();
    const {
        feedbackDataInStudent, setFeedbackDataInStudent, studentDataInClass, setRubricReportAllValue
    } = useLearningManagementSparkWritingStore();
    const {
        getAllReportData
    } = useLearningResultManagementWHStore();
    const {
        set, currentSelectCodes, setOverallReportByStu
    } = useReportStore()
    // click enter feedback page
    const enterFeedbackEvent = (draft:string, unit_index:number, unit_topic:string, step_label:string, ) => {
        // basic info setting
        const dumyFeedbackPageValue:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));


    }
    // console.log('studentDataInClass ::',studentDataInClass)
    // console.log('dataModel:: ',dataModel)
    return (
        <tbody className='table-tbody-basic min-w-[1172px] text-[13px] font-sans font-normal text-[#444444] bg-[#fff] border-b-[1px]'>
            {dataModel&& dataModel.map((rowData, rowIdx)=>{
                // student row
                const isBackgroundChange = rowIdx%2 === 0;
                return <tr key={rowIdx}
                    className={isBackgroundChange ? 'table-tbody-tr-basic min-w-[1172px]':'table-tbody-tr-basic min-w-[1172px] bg-[#f9f9f9]'}
                >{
                    rowData.map((cellData, cellIdx) => {
                        const userInfoData = cellData.value.userInfo;
                        if (cellIdx===0) {
                            // category "NO"
                            return <td
                                key={cellData.key}
                                className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] p-0 h-[76px] max-h-[76px]`}
                                style={{minWidth: cellData.width}}
                            >
                                <span className='inline-flex items-center justify-center w-full'>
                                <span className='learning-management-class-table-no'>{cellData.value.num}</span>
                                </span></td>
                        } else if (cellIdx===1) {
                            // category "Student"
                            return <td
                                key={cellData.key}
                                className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] p-0 h-[76px] max-h-[76px]`}
                                
                            ><span className='w-full inline-flex flex-col justify-center items-center'>
                                <span className='learning-management-class-table-text'>{cellData.value.nameset?.student_name_kr}</span>
                                <span className='learning-management-class-table-text'>{`(${cellData.value.nameset?.student_name_en})`}</span>
                            </span></td>
                        } else if ( (cellIdx-2)%2===0 ) {
                            // report
                            const reportData = cellData.value.report;
                            const portfolioData = cellData.value.portfolio;
                            if (reportData && portfolioData) {
                                const checkReportData = portfolioData.report.is_completed;
                                if (checkReportData) {
                                    const displayDate = displayJSX(reportData,true)
                                    // console.log('displayDate =',displayDate)
                                    return <td
                                        key={cellData.key}
                                        className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] p-0 w-[95px] h-[76px] max-h-[76px]`}
                                        style={{minWidth: '95px'}}
                                    >
                                        <span className='learning-management-class-table-item-wrap'>
                                        <ReportModalComponent 
                                        feedbackStates={feedbackDataInStudent}
                                        studend_code={userInfoData.student_code}
                                        initSettingData={async () => {
                                            const draft_1st_id = reportData.draft_1_status.draft_id.toString();
                                            const draft_2nd_id = reportData.draft_2_status.draft_id.toString();
                                            const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                                            const rsp2nd = await getDraftInfoByDraftId(draft_2nd_id);
                                            const searchData = {
                                                level_name: feedbackDataInStudent.defautInfo.level.name,
                                                unit_index: cellData.dataIndex[2],
                                                student_code: userInfoData.student_code
                                            }
                                            const reportDataAPI = await getReportOneDataByStu(searchData);
                                            const overallDataAPI = await getReportOverallDatabyStu({level_name:searchData.level_name, student_code: searchData.student_code});
                                            if (rsp1st && rsp2nd && reportDataAPI && overallDataAPI) {
                                                let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
                                                dumyData.draft_data=rsp1st;
                                                dumyData.draft_2nd_data = rsp2nd;
                                                const submitDate1st = reportData.draft_1_status.review_complete_date?reportData.draft_1_status.review_complete_date:'';
                                                const submitDate2nd = reportData.draft_2_status.review_complete_date?reportData.draft_2_status.review_complete_date:'';
                                                dumyData.defautInfo.student_code = userInfoData.student_code;
                                                dumyData.defautInfo.student_name = {
                                                    student_name_en: userInfoData.student_name_en,
                                                    student_name_kr: userInfoData.student_name_kr
                                                }
                                                
                                                dumyData.defautInfo.submit_date=formatDate(submitDate2nd);
                                                dumyData.defautInfo.unit_index=reportData.unit_index;
                                                dumyData.defautInfo.unit_topic=reportData.topic;
                                                dumyData.defautInfo.select_draft_id=reportData.draft_2_status.draft_id.toString();
                                                dumyData.defautInfo.step_label="2nd Draft";
                                                dumyData.status=reportData.draft_2_status;
                                                dumyData.overall_comment=rsp2nd.overall_comment;
                                                dumyData.rubric=reportData.rubric;
                                                dumyData.status_1st=reportData.draft_1_status;
                                                const comments: TDraftStringsData = {draft1st: rsp1st.overall_comment, draft2nd: rsp2nd.overall_comment};
                                                const dates:TDraftStringsData = {draft1st: formatDate(submitDate1st,'-'), draft2nd: formatDate(submitDate2nd,'-')};
                                                set.setTeachersComments(comments);
                                                set.setCompletionDates(dates);
                                                set.setReportAPIData(reportDataAPI, reportData.rubric);
                                                setOverallReportByStu(overallDataAPI);
                                                setFeedbackDataInStudent(dumyData);
                                                return true;
                                            }
                                            return false;
                                        }}
                                    />{displayDate}
                                    </span>
                                    </td>
                                } else {
                                    return <td
                                        key={cellData.key}
                                        className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] text-center p-0 h-[76px] max-h-[76px]`}
                                        
                                    >{'-'}</td>
                                }

                            } else {
                                return <td
                                    key={cellData.key}
                                    className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] text-center p-0 h-[76px] max-h-[76px]`}
                                    
                                >{'-'}</td>
                            }
                        } else {
                            // portfolio
                            const firstDraftData = cellData.value.portfolio;
                            const data = cellData.value.report;
                            
                            // console.log('data ===',firstDraftData )
                            if (firstDraftData?.report.is_completed && data) {
                                const isCompleted = firstDraftData.report.is_completed;
                                const targetDate = firstDraftData.report.completion_date[1].date
                                const displayDate =displayJSX(data,isCompleted );
                                // console.log('displayDate =',displayDate)
                                
                                const searchData = {
                                    level_name: feedbackDataInStudent.defautInfo.level.name,
                                    unit_index: cellData.dataIndex[2],
                                    student_code: userInfoData.student_code
                                }

                                return <td
                                    key={cellData.key}
                                    className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#aaa] p-0 h-[76px] max-h-[76px]`}
                                    
                                    onClick={async ()=>{

                                    }}
                                >
                                    <span className='learning-management-class-table-item-wrap'>
                                        <PortfolioModalComponent studentCode={userInfoData.student_code} feedbackStates={feedbackDataInStudent} initSettings={async()=>{
                                            // console.log('displayDate =',displayDate)
                                            // console.log('click report ===',cellData.value)
                                            const reportData = data;
                                            const draft_1st_id = reportData.draft_1_status.draft_id.toString();
                                            const draft_2nd_id = reportData.draft_2_status.draft_id.toString();
                                            
                                            const rsp1st = await getDraftInfoByDraftId(draft_1st_id);
                                            const rsp2nd = await getDraftInfoByDraftId(draft_2nd_id);
                                            const reportDataAPI = await getReportOneDataByStu(searchData);
                                            const overallDataAPI = await getReportOverallDatabyStu({level_name:searchData.level_name, student_code: searchData.student_code});
                                            if (rsp1st && rsp2nd && reportDataAPI && overallDataAPI) {
                                                let dumyData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
                                                dumyData.draft_data=rsp1st;
                                                dumyData.draft_2nd_data = rsp2nd;
                                                dumyData.defautInfo.student_code = userInfoData.student_code;
                                                dumyData.defautInfo.student_name = {
                                                    student_name_en: userInfoData.student_name_en,
                                                    student_name_kr: userInfoData.student_name_kr
                                                }
                                                const submitDate1st = reportData.draft_1_status.review_complete_date?reportData.draft_1_status.review_complete_date:'';
                                                const submitDate2nd = reportData.draft_2_status.review_complete_date?reportData.draft_2_status.review_complete_date:'';
                                                dumyData.defautInfo.submit_date=formatDate(submitDate2nd);
                                                dumyData.defautInfo.unit_index=reportData.unit_index;
                                                dumyData.defautInfo.unit_topic=reportData.topic;
                                                dumyData.defautInfo.select_draft_id=reportData.draft_2_status.draft_id.toString();
                                                dumyData.defautInfo.step_label="2nd Draft";
                                                dumyData.status=reportData.draft_2_status;
                                                dumyData.overall_comment=rsp2nd.overall_comment;
                                                dumyData.rubric=reportData.rubric;
                                                dumyData.status_1st=reportData.draft_1_status;
                                                const comments: TDraftStringsData = {draft1st: rsp1st.overall_comment, draft2nd: rsp2nd.overall_comment};
                                                const dates:TDraftStringsData = {draft1st: formatDate(submitDate1st,'-'), draft2nd: formatDate(submitDate2nd,'-')};
                                                set.setTeachersComments(comments);
                                                set.setCompletionDates(dates);
                                                set.setReportAPIData(reportDataAPI, reportData.rubric);
                                                setOverallReportByStu(overallDataAPI);
                                                setFeedbackDataInStudent(dumyData);
                                                return true;
                                            }
                                            return false;
                                        }}/>
                                        {displayDate}
                                    </span>
                                    
                                </td>
                            } else {
                                return <td
                                    key={cellData.key}
                                    className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#aaa] text-center p-0 h-[76px] max-h-[76px]`}
                                >{'-'}</td>
                            }

                        }
                        
                    })
                }</tr>
            })}
        </tbody>
    )
}
export default function LearningResultManagementStudentsTable (props:{
    dataHead: string[],
    dataModel: TLRMWHClassCurrentlyData[][],
}) {


    if (props.dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-aside min-w-[1172px]'>
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