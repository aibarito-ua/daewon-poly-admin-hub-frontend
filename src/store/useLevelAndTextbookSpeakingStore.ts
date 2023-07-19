import { create } from 'zustand';
const apiData = [
    {
        accessor: "year",
        header: "년도",
    },
    {
        accessor: "semester",
        header: "학기",
    },
    {
        accessor: "grade",
        header: "Grade",
    },
    {
        accessor: "level",
        header: "Level",
    },
    {
        accessor: "interlocking_criteria_code",
        header: "연동기준코드",
    },
    {
        accessor: "book",
        header: "Book",
    },
    {
        accessor: "number_of_units",
        header: "단원수",
    },
]

const useLevelAndTextbookSpeakingStore = create<ILevelAndTextbookSpeakingStore>((set)=>({
    loadDataHeadKor: apiData,
    sortRules: {
        head: {
            speaking: [
                "year", "semester", "grade", "level", "interlocking_criteria_code", "book", "number_of_units"
            ],
            writing: [
                "year", "semester", "grade", "level", "interlocking_criteria_code", "book", "number_of_units"
            ]
        },
        body: {
            speaking: [
                "year", "semester", "grade", "level", "interlocking_criteria_code", "book", "number_of_units"
            ],
            writing: [
                "year", "semester", "grade", "level", "interlocking_criteria_code", "book", "number_of_units"
            ]
        },
    },
    loadData: {
        speaking: [
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },{
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
    
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
        ],
        writing: [
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },{
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "2",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "1",
                "grade": "3",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2020",
                "semester": "2",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2023",
                "semester": "2",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
    
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "GT1",
                "interlocking_criteria_code": "CC-GT-201",
                "book": "Journeys_Ready To Roll",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MGT1",
                "interlocking_criteria_code": "CC-MGT-201",
                "book": "Journeys_In the Spotlight",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "S1",
                "interlocking_criteria_code": "CC-S-201",
                "book": "Wonders_Set Sail Gold",
                "number_of_units": "12"
            },
            {
                "year": "2024",
                "semester": "1",
                "grade": "1",
                "level": "MAG1",
                "interlocking_criteria_code": "CC-MAG-201",
                "book": "Wonders_Into the Horizon",
                "number_of_units": "12"
            },
        ],
    },
    setLoadData: ()=>{
        set(()=>({}))
    }
}))

export default useLevelAndTextbookSpeakingStore;