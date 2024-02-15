import { create } from 'zustand';

const useActivitySpeakHubStore = create<IActivitySHStore>((set) => ({
    sideNav: {
        titleList: [
            {
                title:'Idea Exchange'
            },
            {
                title: 'Story Vlog'
            },
            {
                title: 'Role-play'
            }
        ],
    },
    sortRules: {
        head: {
            idea_exchange: [
                "year", "semester", "grade", "level", "book", "lesson", "question", "expression", "empty1","empty2"
            ],
            story_vlog: [
                "year", "semester", "grade", "level", "book", "lesson", "empty1", "empty2", "empty3", "empty4"
            ],
            role_play: [
                "year", "semester", "grade", "level", "month",
                "topic_title_1st", "topic_lv_1st", "topic_title_2nd", "topic_lv_2nd",
                //"topic_title_3rd", //"topic_lv_3rd", //"topic_title_4th", //"topic_lv_4th"
            ]
        },
        body: {
            idea_exchange: [
                "year", "semester", "grade", "level", "book", "lesson", "question", "expression"
            ],
            story_vlog: [
                "year", "semester", "grade", "level", "book", "lesson"
            ],
            role_play: [
                "year", "semester", "grade", "level", "month",
                "topic_title_1st", "topic_lv_1st", "topic_title_2nd", "topic_lv_2nd",
                //"topic_title_3rd", //"topic_lv_3rd", //"topic_title_4th", //"topic_lv_4th"
            ]
        }
    },
    loadDataHeadKor: {
        idea_exchange: [
            {
                accessor: "semester",
                header: "학기",
            },
            {
                accessor: "grade",
                header: "Grade",
            },
            {
                accessor: "year",
                header: "년도",
            },
            {
                accessor: "level",
                header: "Level",
            },
            {
                accessor: "book",
                header: "Book",
            },
            {
                accessor: "lesson",
                header: '단원'
            },
            {
                accessor: "question",
                header: '단원명'
            },
            {
                accessor: "expression",
                header: ''
            },
            {
                accessor: "empty1",
                header: ''
            },
            {
                accessor: "empty2",
                header: ''
            },
        ],
        story_vlog: [
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
                accessor: "book",
                header: "Book",
            },
            {
                accessor: "lesson",
                header: '단원'
            },
            {
                accessor: "empty1",
                header: '단원명'
            },{
                accessor: "empty2",
                header: ''
            },
            {
                accessor: "empty3",
                header: ''
            },
            {
                accessor: "empty4",
                header: ''
            },
        ],
        role_play: [
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
                header: "grade",
            },
            {
                accessor: "level",
                header: "level",
            },
            {
                accessor: "month",
                header: "월",
            },
            {
                accessor: "topic_title_1st",
                header: '1st topic title'
            },
            {
                accessor: "topic_lv_1st",
                header: '1st topic lv.'
            },
            {
                accessor: "topic_title_2nd",
                header: '2nd topic title'
            },
            {
                accessor: "topic_lv_2nd",
                header: '2nd topic lv.'
            },
        ],
    },
    loadData: {
        idea_exchange: [
            {
                "book": "Wonders_into the Horizon",
                "year": 2020,
                "grade": 3,
                "level": "GT3",
                "semester": 2,
                "lesson": {
                    "viewIndex": 0,
                    "title": "",
                },
                "question": {
                    "viewIndex": 0,
                    "text": "",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Bruno's New Home",
                },
                "question": {
                    "viewIndex": 0,
                    "text": "",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Bruno's New Home",
                },
                "question": {
                    "viewIndex": 1,
                    "text": "How is learning at school different from learning at home?",
                },
                "expression": {
                    "url": "http://",
                    "filename": "text.jpg",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Bruno's New Home",
                },
                "question": {
                    "viewIndex": 2,
                    "text": "How is school today different from schools in the past?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 2,
                    "title": "The Dream Catcher",
                },
                "question": {
                    "viewIndex": 0,
                    "text": "",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 2,
                    "title": "The Dream Catcher",
                },
                "question": {
                    "viewIndex": 1,
                    "text": "How is learning at school different from learning at home?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 2,
                    "title": "The Dream Catcher",
                },
                "question": {
                    "viewIndex": 2,
                    "text": "How is school today different from schools in the past?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 3,
                    "title": "Room to Grow",
                },
                "question": {
                    "viewIndex": 0,
                    "text": "",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 3,
                    "title": "Room to Grow",
                },
                "question": {
                    "viewIndex": 1,
                    "text": "How is learning at school different from learning at home?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 3,
                    "title": "Room to Grow",
                },
                "question": {
                    "viewIndex": 2,
                    "text": "How is school today different from schools in the past?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 4,
                    "title": "Mary Anderson's Great Invention",
                },
                "question": {
                    "viewIndex": 0,
                    "text": "",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 4,
                    "title": "Mary Anderson's Great Invention",
                },
                "question": {
                    "viewIndex": 1,
                    "text": "How is learning at school different from learning at home?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 4,
                    "title": "Mary Anderson's Great Invention",
                },
                "question": {
                    "viewIndex": 2,
                    "text": "How is school today different from schools in the past?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 5,
                    "title": "Anansi Learns a Lesson",
                },
                "question": {
                    "viewIndex": 0,
                    "text": "",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 5,
                    "title": "Anansi Learns a Lesson",
                },
                "question": {
                    "viewIndex": 1,
                    "text": "How is learning at school different from learning at home?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 5,
                    "title": "Anansi Learns a Lesson",
                },
                "question": {
                    "viewIndex": 2,
                    "text": "How is school today different from schools in the past?",
                },
                "expression": {
                    "url": "",
                    "filename": "",
                },
            },        
        ],
        story_vlog: [
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 0,
                    "title": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Bruno's New Home",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 2,
                    "title": "Bruno's New Home",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 3,
                    "title": "Bruno's New Home",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 4,
                    "title": "The Dream Catcher",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 5,
                    "title": "The Dream Catcher",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 6,
                    "title": "The Dream Catcher",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 7,
                    "title": "Room to Grow",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 8,
                    "title": "Room to Grow",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 9,
                    "title": "Room to Grow",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 10,
                    "title": "Mary Anderson's Great Invention",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 11,
                    "title": "Mary Anderson's Great Invention",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 3,
                "level": "GT3",
                "book": "Wonders_into the Horizon",
                "lesson": {
                    "viewIndex": 12,
                    "title": "Mary Anderson's Great Invention",
                },
            },
    
            {
                "year": 2020,
                "semester": 2,
                "grade": 4,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 0,
                    "title": "",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 4,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Anansi Learns a Lesson",
                },
            },
            {
                "year": 2020,
                "semester": 2,
                "grade": 4,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 2,
                    "title": "Anansi Learns a Lesson",
                },
            },
            {
                "year": 2020,
                "semester": 1,
                "grade": 3,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 0,
                    "title": "",
                },
            },
            {
                "year": 2020,
                "semester": 1,
                "grade": 3,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Anansi Learns a Lesson",
                },
            },
            {
                "year": 2020,
                "semester": 1,
                "grade": 3,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 2,
                    "title": "Anansi Learns a Lesson",
                },
            },       
            {
                "year": 2021,
                "semester": 1,
                "grade": 3,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 0,
                    "title": "",
                },
            },
            {
                "year": 2021,
                "semester": 1,
                "grade": 3,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 1,
                    "title": "Anansi Learns a Lesson",
                },
            },
            {
                "year": 2021,
                "semester": 1,
                "grade": 3,
                "level": "GT3",
                "book": "Journeys_Ready To Roll",
                "lesson": {
                    "viewIndex": 2,
                    "title": "Anansi Learns a Lesson",
                },
            }, 
        ],
        role_play: []
    }
}));

export default useActivitySpeakHubStore;