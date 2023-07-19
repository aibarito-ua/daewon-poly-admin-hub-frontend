
interface IActivityWHStore {
    isNotFinishWriting: boolean;
    setIsNotFinishWriting: (flag:boolean) => void;
    sideNav: {
        titleList: {title:string}[]
    };
    loadData: {
        spark_writing: TActivitySparkWritingBooks[],
    };
    loadDataHeadKor: {
        spark_writing: TLoadDataHeadTrans[],
    };
    setLoadDataSparkWritingInput: (text:string, rowIndex:number) => void;
    openControlBox: boolean;
    setOpenControlBox: (flag:boolean) => void;
    loadDataUpdateFlag: number;
    loadDataUpdateFlagInit: ()=>void;
}
export type TLoadDataHeadTrans = {
    accessor: "year"|"semester"|"level"|"book"|"unit"|"topic"|"outline_form"|"outline_index"|"outline_text"|"outline_format_type"|"rubric_type",
    header: string
}
export type TActivitySparkWritingBooks = {
    "year": string,
    "semester":string,
    "level": string,
    "book": string,
    "unit": string,
    "topic": string,
    "outline_form": string,
    "outline_index": string,
    "outline_text": string,
    "outline_format_type": string,
    "rubric_type": string,
}