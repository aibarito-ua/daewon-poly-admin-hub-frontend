interface IActivitySHStore {
    sideNav: {
        titleList: {title:string}[]
    };
    sortRules: {
        head: {
            idea_exchange: string[],
            story_vlog: string[],
            role_play: string[],
        },
        body: {
            idea_exchange: string[],
            story_vlog: string[],
            role_play: string[],
        }
    }
    loadData: {
        idea_exchange: TBooks[],
        story_vlog: TStoryVlogBook[],
        role_play: TRolePlayBooks[],
    };
    loadDataHeadKor: {
        idea_exchange: TLoadDataHeadTrans[],
        story_vlog: TLoadDataHeadTrans[],
        role_play: TLoadDataHeadTrans[],
    }
}
export type TLoadDataHeadTrans = {
    accessor: string,
    header: string
}
export type TStoryVlogBook = {
    "year": string,
    "semester":string,
    "grade": string,
    "level": string,
    "book": string,
    "lesson": {
        "viewIndex": number,
        "title": string,
    },
}
export type TBooks = {
    "year": string,
    "semester":string,
    "grade": string,
    "level": string,
    "book": string,
    "lesson": {
        "viewIndex": number,
        "title": string,
    },
    "question": {
        "viewIndex": number,
        "text": string,
    },
    "expression": {
        "url": string,
        "fileName": string
    } 
}
export type TRolePlayBooks = {
    "year": string,
    "semester": string,
    "grade": string,
    "level": string,
    "month": string,
    "topic_title_1st": string,
    "topic_lv_1st": string,
    "topic_title_2nd": string,
    "topic_lv_2nd": string
}

export type TLesson = {
    "title": string,
    "questions": [
        {
            "question": string,
            "expressions": string
        }, {
            "question": string,
            "expressions": string
        }
    ]
}
