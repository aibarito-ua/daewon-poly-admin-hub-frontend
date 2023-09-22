interface IuseLearningResultManagementWHStore {
    sideNav: TSideNavData;
    getAllReportData:TGetAllWritingReport;

    setAllReportData: (data: TGetAllWritingReport)=>void;
}

type TGetAllWritingReport = {
    book_name: string;
    students: TGetAllWritingReportStudent[];
}
type TGetAllWritingReportStudent = {
    student_code: string;
    student_name_en: string;
    student_name_kr: string;
    unit_reports: TGetAllWritingReportStudentReports[];
}
type TGetAllWritingReportStudentReports = {
    unit_index: number;
    report: TStudentUnitReportRes;
}
type TLRMWHClassCurrentlyData = {
    key: string;
    width: number;
    value: {
        num: number;
        nameset: TNamesetData|null;
        report: TLMSparkWritingStudentUnitItemInClass|null;
        portfolio: TGetAllWritingReportStudentReports|null;
        userInfo: {
            student_code: string;
            student_name_en: string;
            student_name_kr: string;
        }
    };
    rowspan: number;
    print: boolean;
    dataIndex: number[];
}