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
}
// AccessorFn<unknown>, column: DisplayColumnDef<unknown, unknown>
type TLoadDataItem = {
    "year": string,
    "semester": string,
    "grade": string,
    "level": string,
    "interlocking_criteria_code": string,
    "book": string,
    "number_of_units": string
}

type TLoadDataHeadTrans = {
    accessor: string,
    header: string
}