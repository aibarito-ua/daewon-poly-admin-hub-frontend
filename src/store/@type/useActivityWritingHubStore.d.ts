
interface IActivityWHStore {
    isNotFinishWriting: boolean;
    setIsNotFinishWriting: (flag:boolean) => void;
    sideNav: {
        titleList: {title:string}[]
    };
    sortRules: TActivityWritingSortRules,
    loadData: {
        spark_writing: TActivitySparkWritingBooks[],
    };
    saveLoadData: {
        spark_writing: TActivitySparkWritingBooks[],
    };
    loadDataHeadKor: {
        spark_writing: TLoadDataHeadTrans[],
    };
    // 저장 취소 이벤트
    resetSaveLoadData: () => void;
    // 저장 후 덮어쓰기
    savedSaveLoadData: () => void;
    setLoadDataUpdateFlag: (num:number) => void;
    setLoadDataSparkWritingInput: (text:string, unitId:number, outlineFormatIndex:number) => void;
    openControlBox: boolean;
    setOpenControlBox: (flag:boolean) => void;
    loadDataUpdateFlag: number;
    loadDataUpdateFlagInit: ()=>void;

    setSparkWritingData: (loadData: TActivitySparkWritingBooks[]) =>void;
    setSparkWritingHeadData: (loadHeadData: TLoadDataHeadTrans[]) =>void;
    rubricDataHead: TRubricTypeHeader[];

    // 저장 로직 
    innerDataModel: TTableDataModel;
    setInnerDataModel: (dataModel: TTableDataModel ) => void;
}
type TLoadDataHeadTrans = {
    accessor: string,
    header: string
}
type TSparkWritingAccessors = "year"|"semester"|"level"|"book"|"unit"|"topic"|"outline_form"|"outline_index"|"outline_text"|"outline_format_type"|"rubric"
type TActivitySparkWritingBooks = {
    "year": number,
    "semester": number,
    "level": string,
    "interlocking_criteria_code": string,
    "book": string,
    "topic": string,
    "unit_index": number,
    "rubric": TActivitySparkWritingBookRubricItem,
    "outline_format": TActivitySparkWritingOutlineFormat,
    "unit_id":number,
    [key:string]:string|number|TActivitySparkWritingOutlineFormat|TActivitySparkWritingBookRubricItem
}
type TActivitySparkWritingBookRubricItem = {
    "name": string,
    "rubric_description": TRubricTypeDataItem[]
}
type TActivitySparkWritingOutlineFormat={
    "name": string,
    "outline_format": TOLContentItem[]
}
type TOLContentItem = {
    "content": string|string[],
    "name": string,
    "order_index": number
}
type TActivityWritingSortRules = {
    head: {
        spark_writing: string[],
    },
    body: {
        spark_writing: string[],
    }
}

// rubric
type TRubricTypeDataItem = {
    [key in TRubricTypeHeaderAccessor]: string | string[];
} & {
    "category": string;
    "explanation": string[];
    "excellent": string;
    "very_good":string;
    "good":string;
    "fair":string;
    "poor":string;
};
type TRubricTypeHeaderAccessor="category"|"explanation"|"excellent"|"very_good"|"good"|"fair"|"poor";
type TRubricTypeHeader = {
    accessor: TRubricTypeHeaderAccessor
    header: string
}
type TRubricTypeData = {
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
}

type TActivityWritingHubFilterList = {
    year: nunber,
    semester: number,
    level:string
}