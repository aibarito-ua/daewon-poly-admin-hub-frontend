import { create } from 'zustand';

const useActivityWritingHubStore = create<IActivityWHStore>((set, get) => ({
    isNotFinishWriting: false,
    setIsNotFinishWriting: (flag:boolean) => {
        set(()=>({
            isNotFinishWriting: flag
        }))
    },
    sideNav: {
        titleList: [
            {
                title:'Spark Writing',
            },
            // {
            //     title: 'Free Writing'
            // },
        ],
    },
    rubricDataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "excellent",
            header: "excellent"
        },
        {
            accessor: "very_good",
            header: "very good"
        },
        {
            accessor: "good",
            header: "good"
        },
        {
            accessor: "fair",
            header: "fair"
        },
        {
            accessor: "poor",
            header: "poor"
        },
    ],
    sortRules: {
        head: {
            spark_writing: [
                "year", "semester", "level", "book",
                "unit", "topic", "outline_form", "outline_index",
                "outline_text", "outline_format_type", "rubric"
            ]
        },
        body: {
            spark_writing: [
                "year", "semester", "level", "book",
                "unit_index", "topic", "outline_format", "rubric"
            ]
        }
    },
    loadDataHeadKor: {
        spark_writing: [],
    },
    loadData: {
        spark_writing: [],
    },

    loadDataUpdateFlag : 0,
    loadDataUpdateFlagInit: () => {
        set(()=>({loadDataUpdateFlag:0}))
    },
    setLoadDataSparkWritingInput: (text:string, unitId:number, outlineFormatIndex:number) => {
        let dumpSparkWritingData = get().loadData.spark_writing;
        dumpSparkWritingData = dumpSparkWritingData.map((dataItem) => {
            if (dataItem.unit_id === unitId) {
                dataItem.outline_format.outline_format[outlineFormatIndex].content=text;
            }
            return dataItem;
            
        })
        set(()=>({
            loadDataUpdateFlag: 1,
            loadData: {
                spark_writing: dumpSparkWritingData,
            }
        }))
    },
    openControlBox: false,
    setOpenControlBox: (flag:boolean) => {
        set(()=>({
            openControlBox: flag
        }))
    },

    // Set Load Data
    setSparkWritingData: (sparkWriting) => {
        set(()=>({
            loadData: {
                spark_writing: sparkWriting
            }
        }))
    },
    setSparkWritingHeadData: (loadHeadData) => {
        set(()=>({
            loadDataHeadKor: { spark_writing: loadHeadData}
        }))
    }
}));

export default useActivityWritingHubStore;