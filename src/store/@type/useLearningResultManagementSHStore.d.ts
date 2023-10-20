// LRM in this file means Learning Result Management
interface IuseLearningResultManagementSHStore {
    sideNav: TSideNavData;
    // TODO: change any to some specific type
    loadDataHead: any;
    loadData: any;

    filterData: TAllClassLRMSpeaking|null;
    setFilterData: (apiFilterData: TAllClassLRMSpeaking)=>void;

    studentDataInClass: TLRMSpeakingHubData|null;
    setStudentDataInClass: (data:TLRMSpeakingHubData)=>void;

    // other stuff here
}

type TAllClassLRMSpeaking={
    year: number,
    semester: number,
    campus: TCampusData[]
}
type TCampusData={
    code: string,
    name: string,
    level: TFilterLevelSpeakingHub[];
}
type TFilterLevelSpeakingHub={
    name: string;
    code: string;
    class: TFilterClassSpeakingHub[];
}
type TFilterClassSpeakingHub={
    name: string;
    code: string;
}

type TFilterLRMSpeaking={
    "year": number,
    "semester": number,
    "campus": TCampusData[]
}

type TLRMSpeakingHubGetStudentReject = {
    statusCode: number;
    message: string;
    errors: string[];
    data: {
        timestamp: string;
        endpoint: string;
    }
}

// ===== Speaking Hub Data Type =====

type TLRMSpeakingHubData = {
    idea_exchange: TLRMSpeakingHubIdeaExchange | null;
    story_vlog: TLRMSpeakingHubStoryVlog | null;
    role_play: TLRMSpeakingHubRolePlay | null;
}


// ===== Idea Exchange Types =====

type TLRMSpeakingHubIdeaExchange = {
    book_name: string;
    students: TLRMSpeakingHubIdeaExchangeStudent[]
}

type TLRMSpeakingHubIdeaExchangeStudent = {
    student_code: string;
    student_name_en: string;
    student_name_kr: string;
    lessons: TLRMSpeakingHubIdeaExchangeLesson[]
}

type TLRMSpeakingHubIdeaExchangeLesson = {
    lesson_index: number;
    questions: TLRMSpeakingHubIdeaExchangeQuestion[];
}

type TLRMSpeakingHubIdeaExchangeQuestion = {
    question_index: number;
    is_completed: boolean;
    word_count: number;
    turn_count: number;
    summary: string;
    video: string;
}

// ===== Story Vlog Types =====

type TLRMSpeakingHubStoryVlog = {
    book_name: string;
    students: TLRMSpeakingHubStoryVlogStudent[]
}

type TLRMSpeakingHubStoryVlogStudent = {
    student_code: string;
    student_name_en: string;
    student_name_kr: string;
    lessons: TLRMSpeakingHubStoryVlogLesson[]
}

type TLRMSpeakingHubStoryVlogLesson = {
    lesson_index: number;
    is_completed_recording: boolean;
    is_completed_dialogue: boolean;
    word_count: number;
    turn_count: number;
    summary: string;
    video: string;
}

// ===== Role Play Types =====

type TLRMSpeakingHubRolePlay = {
    students: TLRMSpeakingHubRolePlayStudent[]
}

type TLRMSpeakingHubRolePlayStudent = {
    student_code: string;
    student_name_en: string;
    student_name_kr: string;
    months: TLRMSpeakingHubRolePlayMonth[]
}

type TLRMSpeakingHubRolePlayMonth = {
    month_index: number;
    topics: TLRMSpeakingHubRolePlayTopic[];
}

type TLRMSpeakingHubRolePlayTopic = {
    topic_index: number;
    is_completed: boolean;
    word_count: number;
    turn_count: number;
    summary: string;
    video: string;
}

// student data

type TLRMNamesetData = {
    student_name_kr:string;
    student_name_en:string
}

interface ILRMStudentDataForModal extends TLRMNamesetData {
    class: string
}

// universal table
type TLRMSpeakingHubTableCellData = {
    key: string;
    width: number;
    clickable?: boolean;
    title?: string;
    student?: ILRMStudentDataForModal;
    value: {
        num: number;
        nameset: TNamesetData|null;
        data: TLRMSpeakingHubLessonItem|null; // add more types if needed
        jsxElem: JSX.Element|null; // an Icon or Button that will be shown
        modalContent: JSX.Element|null; // component that will be rendered inside the modal body
        show: boolean;
        description?: string;
    };
    rowspan: number;
    print: boolean;
    dataIndex: number[];
}

// Table Item
type TLRMSpeakingHubLessonItem = {
    lesson?: TLMSpeakingHubLesson,
    month?: TLRMSpeakingHubRolePlayMonth
}   