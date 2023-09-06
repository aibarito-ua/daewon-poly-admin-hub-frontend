import React from 'react'
import {create} from 'zustand';

const useLearningManagementSparkWritingStore = create<ILearningManagementSparkWritingStore>((set,get)=>({
    sideNav: {
        titleList: [
            {
                title: 'spark writing',
                path: '',
                subTitleList: [
                    {
                        title: 'spark writing 첨삭',
                        path: 'SparkWriting'
                    }
                ]
            }, 
            // {
            //     title: 'free writing',
            //     path: '',
            //     subTitleList:[]
            // }
        ]
    },
    loadDataHead: {
        sparkWriting: [
            {
                accessor: "no",
                header: "no",
            },
            {
                accessor: "memberName",
                header: "student",
            },
            {
                accessor: "unit_1",
                header: "unit1",
            },
            {
                accessor: "unit_2",
                header: "unit2",
            },
            {
                accessor: "unit_3",
                header: "unit3",
            },
            {
                accessor: "unit_4",
                header: "unit4",
            },
            {
                accessor: "unit_5",
                header: "unit5",
            },
        ]
    },
    loadData: {
        
        // draft_state 
        // -1: at first start before step
        // 0: before start
        // 1: student learning start
        // 2: student complete
        // 3: teacher return feedback
        // teacher (admin) state
        // 4: teacher start feedback and save, if do not complete feedback
        // 5: teacher feedback complete.
        // draft state 5 -> 2nd draft open (-1 -> 0 state change)

        sparkWriting: [
            {
                "no": 0,
                "memberName":"aibar",
                "memberEnglishName": "Aibar",
                "unit": [
                    {
                        "unit_no": 0,
                        "draft_state": [
                            {
                                "step": "1st_draft",
                                "state": 0,
                                "date": {
                                    "0": "yy-mm-dd",
                                    "1": "yy-mm-dd",
                                    "2":"yy-mm-dd",
                                    "3":"yy-mm-dd",
                                    "4":"yy-mm-dd",
                                    "5":"yy-mm-dd",
                                },
                            },
                            {
                                "step": "2nd_draft",
                                "state": -1,
                                "date": {
                                    "0":"",
                                    "1":"",
                                    "2":"",
                                    "3":"",
                                    "4":"",
                                    "5":"",
                                },
                            },
                        ],
                    },
                ],
            }
        ],
        studentOutlineItem: {
            "unit": 1,
            "draft": 1,
            "class": ["GT4"],
            "semester": 2,
            "outline":[
                {
                    "class": "GT4",
                    "topic": "Descriptive Essays",
                    "outline_format_type": "OL01",
                    "writing_box": 5,
                    "outline_item": [
                        {
                            "outline_form": "title",
                            "outline_text": "write a title that matches the main idea of your essay.",
                            "outline_index": 0,
                            "student_text": ""
                        },
                        {
                            "outline_form": "introduction",
                            "outline_text": "Begin writing your introduction by explaining why the topic is special or by stating an interesting fact about the topic.",
                            "outline_index": 1,
                            "student_text": ""
                        },
                        {
                            "outline_form": "body_1",
                            "outline_text": "Body Paragraph 1: Start the first paragraph with a sentence that introduces one detail of the special object. Add details that support the topic sentence.",
                            "outline_index": 2,
                            "student_text": ""
                        },
                        {
                            "outline_form": "body_2",
                            "outline_text": "Body Paragraph 2: Start the second paragraph with a sentence that introduces another detail of the special object. Add details that support the topic sentence.",
                            "outline_index": 3,
                            "student_text": ""
                        },
                        {
                            "outline_form": "conclusion",
                            "outline_text": "Begin the conclusion by restating why the object is special or by asking a question.",
                            "outline_index": 4,
                            "student_text": ""
                        },
                    ],
                    "comment": [
                        {
                            "text": "",
                            "startIndex": 0,
                            "endIndex": 10,
                            "comment": ""
                        }
                    ],
                    "return": [
                        {
                            "draft": 1,
                            "reason": "",
                        }
                    ]
                }
            ],
            
        }
    },
    filterData: null,
    setFilterData: (apiFilterData)=>{
        set(()=>({
            filterData:apiFilterData
        }))
    },

    studentDataInClass: {
        book_name: '',
        students: []
    },
    setStudentDataInClass: (data) => {
        const checkData = data.students.length > 0;
        if (checkData) {
            set(()=>({
                studentDataInClass: data
            }))
        }
    },
    // student table in class
    studentInClassList: {
        header: [
            
        ]
    },
    // student's feedback 
    feedbackDataInStudent: {
        defautInfo: {
            campus: {code:'',name:''},
            level: {code:'',name:''},
            class: {code:'',name:''},
            student_code: '',
            student_name: {student_name_en:'',student_name_kr:''},
            divison: '',
            book_name: '',
            unit_index: 0,
            unit_topic: '',
            step_label: '',
            submit_date:'',
            select_draft_id: ''
        },
        draft_data: {
            comment: [],
            draft_index: 0,
            draft_outline: [],
            overall_comment: '',
            return_reason: '',
            return_teacher_comment: ''
        },
        comment: [],
        overall_comment: '',
        status: null
    },
    setFeedbackDataInStudent: (data) => {
        set(()=>({feedbackDataInStudent: data}))
    }
}))

export default useLearningManagementSparkWritingStore;