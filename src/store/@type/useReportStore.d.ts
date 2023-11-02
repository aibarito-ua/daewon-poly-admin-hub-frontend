interface IUseReportStore {
    report: {
        barChar: TBarchartDatas;
        doughnutChart: TAllDoughnutDatas;
        avrage: TPrintReportDoughnutData
    },
    set: {
        doughnutChart: (data: TRubricScoreData[]) => void;
        barChart: (data: TSetterBarChartData[]) => void;
        initCurrentDisplay: (idx:number, topic:string) => void;
        setWordCoundSummary: (data:TWordSummaryCount[], draft: number) => void;
        setTeachersComments: (data: TDraftStringsData) => void;
        setCompletionDates: (dates: TDraftStringsData) => void;
        setRubricTooltips: (data:TRubricReportAll) => void;

        setReportAPIData: (data:TStudentUnitReportRes, rubric:TActivitySparkWritingBookRubricItem) => void;
    },
    reportByUnitData:TUnitReportModalData;
    reportByUnitAPIData: TStudentUnitReportRes;
    currentSelectCodes: TCurrentSelectCodes;
    setCurrentSelectCodes: (data:TSetCurrentSelectCodesData) => void;

    overallReportByStu: TOverallReportAPI;
    setOverallReportByStu: (data:TOverallReportAPI) => void;
    overallBarChartData: TOverallBarChartData[];
    overallDoughnutChartData: TAllDoughnutDatas;
}
type TOverallBarChartData = {
    name: string;
    unit1: number;
    unit2: number;
    unit3: number;
    unit4: number;
    unit5: number;
    amt: number;
}
type TSetCurrentSelectCodesData = {
    target: 'campus'|'level'|'class';
    name:string;
    code:string;
}

type TCurrentSelectCodes = {
    campus: {name:string; code:string;};
    level: {name:string; code:string;};
    class: {name:string; code:string;};
}

type TSetterBarChartData = {
    unit_index: number;
    rubric: TRubricScoreData[];
}
type TRubricScoreData = {
    name: string;
    score: number;
}
type TBarchartDatas = TBarchartData[];
type TBarchartData = {
    name: string;
    unit1: number;
    unit2: number;
    unit3: number;
    unit4: number;
    unit5: number;
    amt: number;
}

type TUnitScoreData = {
    averageChartData: {
        dataPayload: TPrintReportDoughnutData
    };
    barChartData: TBarChartsData[];
    unitsData: TUnitRubricScore[];
    hexagonChartData: THexagonDoughnutData[];
    reportByUnit: TReportByUnitInfo;
}

type TCircleLegendItems = {
    circleColor: string;
    circleLabel: string;       
}
type TAllDoughnutDatas = {
    target: string;
    data: {
        name: string;
        value: number;
        selectName: string;
        fillColor: string;
        fillBorderColor: string;
        innerLineColor: string;
        tooltip: {
            title:string,
            content: string
        };
    }[];
    addWidth: number;
    fitText: number;
    toolLineColor: string;
}[]

// Report By Unit component
type TUnitReportModalData = {
    wordCountSummary: TWordCountSummaryItem,
    correctionSummary: TCorrectionSummaryItem,
    currentUnitInfo: {
        unit_index:number;
        unit_topic: string;
    },
    teacherComment: TDraftStringsData;
    completionDate: TDraftStringsData;
}
type TDraftStringsData = {
    draft1st: string;
    draft2nd: string;
}
type TWordCountSummaryItem = {
    title: string;
    draft_1st: TWordSummaryCount[];
    draft_2nd: TWordSummaryCount[];
}
// normal report correction type
type TCorrectionSummaryItem = {
    title: string;
    correction: {
        reason: 'grammar'|'spelling'|'punctuation';
        list: TCorrectionSentence[];
        sentence_count: number;
    }[]
}
type TWordSummaryCount = {
    label: string;
    value: number;
}
type TCorrectionSentence = TCorrectionWord[];
type TCorrectionWord = TStudentUnitReportResGrammarCorrectionSentenceItem;

type TPrintReportDoughnutData ={
    target: string;
    data: {
        name: string;
        value: number;
    }[];
    addWidth: number;
    fitText: number;
}
type TAvailableReportsArr = {
    unitIdx: number;
    draft1stId: number;
    draft2ndId: number;
    availableFlag: boolean;
}

// Report By Unit 
type TStudentUnitReportRes = {
    is_completed: boolean;
    word_counts:TStudentUnitReportResWordCount[];
    grammar_correction: {
        grammar: TStudentUnitReportResGrammarCorrectionItems;
        punctuation: TStudentUnitReportResGrammarCorrectionItems;
        spelling: TStudentUnitReportResGrammarCorrectionItems;
    };
    teacher_comments: TStudentUnitReportResTeacherComment[];
    rubric: TStudentUnitReportResRubric;
    completion_date: TStudentUnitReportResCompletionDate[];
    portfolio: TStudentUnitReportResPortfolio[];
}
// word_counts
type TStudentUnitReportResWordCount = {
    draft_index: number;
    word_count: number;
    sentence_count: number;
}
// grammar_correction
type TStudentUnitReportResGrammarCorrectionItems = {
    sentences: TStudentUnitReportResGrammarCorrectionSentences;
    sentences_count: number;
    corrections_count:number;
}
type TStudentUnitReportResGrammarCorrectionSentences=TStudentUnitReportResGrammarCorrectionSentence[]
type TStudentUnitReportResGrammarCorrectionSentence=TStudentUnitReportResGrammarCorrectionSentenceItem[]
type TStudentUnitReportResGrammarCorrectionSentenceItem={
    type:number;
    word: string;
    correction_reason: string[];
    key: string;
}
// teacher_comments
type TStudentUnitReportResTeacherComment = {
    draft_index:number;
    comment: string;
}
// rubric
type TStudentUnitReportResRubric = {
    overall_score: number;
    categories: TStudentUnitReportResRubricCategory[];
}
type TStudentUnitReportResRubricCategory = {
    category: string;
    score: number;
    description: string;
}
// completion_date
type TStudentUnitReportResCompletionDate = {
    draft_index:number;
    date: string;
}
// portfolio
type TStudentUnitReportResPortfolio = {
    content:string;
    name:string;
    order_index:number;
}

// overall rubric score datas 
type TOverallReportAPI = {
    units: TOverallReportAPIUnit[]
}
type TOverallReportAPIUnit = {
    unit_index:number;
    categories: TOverallReportAPIUnitCategory[]
}
type TOverallReportAPIUnitCategory = {
    category: string,
    score: number,
    description: string
}