interface ILearningManagementSparkWritingStore {
    // nav aside in 학습관리
    sideNav: TSideNavData;

    loadDataHead: {
        sparkWriting: TLoadDataHeadTrans[],
    };
    loadData: {
        // SparkWriting: any[]
    };
    filterData: TFilterSparkWriting|null;
    setFilterData: (apiFilterData: TFilterSparkWriting)=>void;

    // api get list
    setStudentDataInClass: (data:TLMSparkWritingStudentsListInClass)=>void;
    studentDataInClass: TLMSparkWritingStudentsListInClass;

    // draft select student display steps
    feedbackDataInStudent: TFeedbackStates;
    setFeedbackDataInStudent: (data:TFeedbackStates) => void;

    // rubric report values
    rubricReportValue: TRubricReportAll;
    setRubricReportAllValue:(data:TRubricReportAll)=>void;
    setRubricInit: ()=>void;
    setRubricReportValue: (data:TRubricReport) => void;
}
type TMLSparkWritingUserLists = {
    students: TMLSparkWritingUserData[];
}
type TMLSparkWritingUserData = {
    student_code: string;
    student_name: string;
    units: TMLSparkWritingUserUnit[];
}
type TMLSparkWritingUserUnit = {
    unit_id: number;
    unit_index: number;
    report: any;
    draft_1_status: TMLSparkWritingUserUnitDraftStatus;
    draft_2_status: TMLSparkWritingUserUnitDraftStatus;
}
type TMLSparkWritingUserUnitDraftStatus = {
    draft_id: number;
    status: number;
    reason: string;
    submit_date: string;
    temp_save_date: string;
    review_reject_date: string;
    review_complete_date: string;
}
type TLoadDataBodySparkWriting={
    no: number;
    memberName: string;
    memberEnglishName: string;
    unit: {
        unit_no: number;
        draft_state: {
            step: string;
            state: number;
            date: {
                "0": string;
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
            };
        }[];
    }[];
}
// nav aside in 학습관리 
type TSideNavData = {
    titleList: TLMSparkWritingNavAsideTitleList[]
}
type TLMSparkWritingNavAsideTitleList = {
    title: string;
    path: string;
    subTitleList: TLMSparkWritingNavAsideSubTitleList[]
}
type TLMSparkWritingNavAsideSubTitleList = {
    title: string;
    path:string;
}

type TFilterSparkWriting={
    "year": number,
    "semester": number,
    "campus": TFilterCampusSparkWriting[]
}
type TFilterCampusSparkWriting={
    "name": string;
    "code": string;
    "level": TFilterLevelSparkWriting[];
}
type TFilterLevelSparkWriting={
    "name": string;
    "code": string;
    "class": TFilterClassSparkWriting[];
}
type TFilterClassSparkWriting={
    "name": string;
    "code": string;
}

// API types
type TFindStudentsReq = {
    campusCode:string;
    levelCode:string;
    classCode:string;
}

// 학습 관리 > spark writing > get students by filter
type TLMSparkWritingStudentsListInClass = {
    book_name: string;
    students: TLMSparkWritingStudentItemInClass[];
}
type TLMSparkWritingStudentItemInClass = {
    student_code:string;
    student_name_kr:string;
    student_name_en:string;
    units: TLMSparkWritingStudentUnitItemInClass[];
}
type TLMSparkWritingStudentUnitItemInClass = {
    draft_1_status: TLMSparkWritingStudentUnitDraft1StatusItemInClass;
    draft_2_status: TLMSparkWritingStudentUnitDraft2StatusItemInClass;
    report: any;
    unit_id: number;
    unit_index: number;
    topic: string;
    rubric: TActivitySparkWritingBookRubricItem;
}
type TLMSparkWritingStudentUnitDraft1StatusItemInClass = {
    draft_id: number;
    reason: string;
    status: number;
    review_complete_date:string|null;
    review_reject_date:string|null;
    review_temp_save_date:string|null;
    submit_date:string|null;
    temp_save_date:string|null;
}
type TLMSparkWritingStudentUnitDraft2StatusItemInClass = {
    draft_id: number;
    reason: string;
    status: number;
    review_complete_date:string|null;
    review_reject_date:string|null;
    review_temp_save_date:string|null;
    submit_date:string|null;
    temp_save_date:string|null;
}
type TLMSparkWritingGetStudentReject = {
    statusCode: number;
    message: string;
    errors: string[];
    data: {
        timestamp: string;
        endpoint: string;
    }
}
type TNamesetData = {
    student_name_kr:string;
    student_name_en:string
}
// mapping value type
type TClassCurrentlyData = {
    key: string;
    width: number;
    value: {
        num: number;
        nameset: TNamesetData|null;
        data: TLMSparkWritingStudentUnitItemInClass|null;
    };
    rowspan: number;
    print: boolean;
    dataIndex: number[];
}

// draft feedback type
type TFeedbackStates = {
    defautInfo: TFeedbackDefaultInfomations;
    draft_data: TFindDraftInfoByDraftIdResponse;
    comment: [];
    overall_comment: string;
    status: TLMSparkWritingStudentUnitDraft1StatusItemInClass|null;
    status_1st?: TLMSparkWritingStudentUnitDraft1StatusItemInClass|null;
    draft_2nd_data?: TFindDraftInfoByDraftIdResponse,
    rubric: TActivitySparkWritingBookRubricItem
}

type TFeedbackDefaultInfomations = {
    campus: TFeedbackfilteredDatas;
    level: TFeedbackfilteredDatas;
    class: TFeedbackfilteredDatas;
    student_code: string;
    student_name: TNamesetData;
    divison: string;
    book_name: string;
    unit_index: number;
    unit_topic: string;
    step_label: string; // "1st or 2nd draft"
    submit_date: string;
    select_draft_id: string;
}
type TFeedbackfilteredDatas = {
    code: string;
    name: string;
}

// find draft by draft id
type TFindDraftInfoByDraftIdResponse = {
    comment: TCommentDataList
    draft_index: number;
    draft_outline: TFindDraftInfoByDraftIdDraftOutline[];
    overall_comment: string;
    return_reason:string;
    return_teacher_comment:string;
    rubric_report?:TRubricReportAll
}
type TFindDraftInfoByDraftIdDraftOutline = {
    grammar_correction_content_teacher: string;
    input_content: string;
    name: string;
    order_index:number;
    screen_data: TParagraphScreenData[]
}
// parsing grammar json data 
type TGrammarCorrectionContentData = {
    correction_reason: string[];
    key: string;
    type: number;
    word: string
}
type TBodyGrammarCorrectionJSONData = {
    data: TGrammarCorrectionContentData[][][][];
    name: string;
    order_index: number;
}

type TComment = {
    start_index: number;
    end_index: number;
    parent_text: string;
    comment_index: number;
    paraghragh_name: string;
    target_text: string;
    comment_className: string;
    comment: string;
    delete_evnet: Function;
    targetStyles: React.CSSProperties;
}

// advisor response
type TWritingAdvisor = {
    draft_index: number;
    draft_outline: TWritingAdvisorDraftOutline[];
}
type TWritingAdvisorDraftOutline = {
    name:string;
    order_index:number;
    revised_text:string;
    similar_text:string;
    original_text:string;
}


// admin 1st draft feedback datas
type TAdminDraft1stCommentData = {
    comment: TCommentDataList;
    data:TCommentAllParagraphData;
    overall_comment: string;
    feedback_return: TReturnFeedback;
    draft_id: number;
    rubric_report: TRubricReportAll
}
type TRubricReportData = {
    category: string;
    selected_value:"excellent"|"very_good"|"good"|"fair"|"poor";
    selected_value_description:string;
}
// "feedback_return"
type TReturnFeedback = {
    reason: string;
    teacher_comment: string;
    is_return: boolean;
}
// "comment"
type TCommentDataList = TCommentData[];
type TCommentData = {
    comment: string;
    comment_className: string;
    comment_index: number;
    start_index: number;
    end_index: number;
    paragraph_name: string;
    target_text: string;
}
// "overall_comment" : string
// "draft_id": number
// "data"
type TCommentAllParagraphData = TParagraphData[];
type TParagraphData = {
    name:string;
    screen_data: TParagraphScreenData[];
}
type TParagraphScreenData = {
    type:-1|0|1|number;
    text: string;
    comment_index: number;
}

// rubric temporary
type TRubricReportAll = TRubricReport[];
type TRubricReport = {
    category: string;
    selected_value: string;
    selected_value_description: string;
}