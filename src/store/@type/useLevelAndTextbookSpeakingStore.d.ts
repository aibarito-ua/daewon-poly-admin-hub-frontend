interface ILevelAndTextbookSpeakingStore {
    loadDataHeadKor: TLoadDataHeadTrans[],
    sortRules: {
        head: {
            speaking: string[],
            writing: string[],
        },
        body: {
            speaking: string[],
            writing: string[],
        }
    }
    loadData: {
        speaking: TLoadDataItem[];
        writing: any;
    }
    setLoadDataHead: (loadDataHead: TLoadDataHeadTrans[])=>void;
    setLoadData: (speaking: TLoadDataItem[]|undefined, writing: any)=>void;
}
// AccessorFn<unknown>, column: DisplayColumnDef<unknown, unknown>
type TLoadDataItem = {
    "year": number,
    "semester": number,
    "grade": number,
    "level": string,
    "interlocking_criteria_code": string,
    "book": string,
    "number_of_units": number,
    [key:string]:string|number,
}
type TLoadDataItemKeys = "year"|"semester"|"grade"|"level"|"interlocking_criteria_code"|"book"|"number_of_units";

type TLoadDataHeadTrans = {
    accessor: string,
    header: string
}