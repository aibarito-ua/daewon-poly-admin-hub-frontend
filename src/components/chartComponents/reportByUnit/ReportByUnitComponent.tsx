import useReportStore from "../../../store/useReportStore"
import ReportItemComponents from "./ItemComponents/ReportItemComponents"

const ReportByUnitComponent = () => {

    const { reportByUnitAPIData } = useReportStore();
    
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-center items-center'>
                <span className='report-chart-report-by-unit-title'>
                {/* {unitReportModal.unitTitle} */}
                </span>
            </div>
            <div className='flex flex-row mt-[30px] gap-[40px] justify-center'>
                <div className='flex'>
                    {/* <ReportChart/> */}
                </div>
                <div className='report-chart-right-components-div pb-[20px]'>
                    <ReportItemComponents.ReportWordCountSummaryComponent 
                        // item={reportByUnitData.wordCountSummary}
                        item={reportByUnitAPIData}
                    />
                    <ReportItemComponents.ReportCorrectionSummaryComponent 
                        item={reportByUnitAPIData}
                    />
                    <ReportItemComponents.ReportTeachersComments 
                        teacherComments = {reportByUnitAPIData.teacher_comments}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReportByUnitComponent;