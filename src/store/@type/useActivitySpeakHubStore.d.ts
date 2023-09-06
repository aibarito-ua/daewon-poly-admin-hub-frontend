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
        idea_exchange: TIdeaExchangeBooks[],
        story_vlog: TStoryVlogBook[],
        role_play: TRolePlayBooks[],
    };
    loadDataHeadKor: {
        idea_exchange: TLoadDataHeadTrans[],
        story_vlog: TLoadDataHeadTrans[],
        role_play: TLoadDataHeadTrans[],
    }
}

// type header
type TLoadDataHeadTrans = {
    accessor: string,
    header: string
}

// type story vlog
type TStoryVlogBook = {
    "year": number,
    "semester":number,
    "grade": number,
    "level": string,
    "book": string,
    "lesson": TStoryVlogBookLesson,
    [key:string]: string|number|TStoryVlogBookLesson
}
type TStoryVlogBookLesson = {
    "viewIndex":number,
    "title": string
}

// type idea exchange
type TIdeaExchangeBooks = {
    "year": number,
    "semester":number,
    "grade": number,
    "level": string,
    "book": string,
    "lesson": TIdeaExchangeBooksLesson,
    "question": TIdeaExchengeBooksQuestion,
    "expression": TIdeaExchengeBooksExpression,
    [key:string]: string|number|TIdeaExchangeBooksLesson|TIdeaExchengeBooksQuestion|TIdeaExchengeBooksExpression
}
type TIdeaExchangeBooksLesson = {
    "viewIndex": number,
    "title": string,
}
type TIdeaExchengeBooksQuestion = {
    "viewIndex": number,
    "text": string,
}
type TIdeaExchengeBooksExpression = {
    "url": string,
    "filename": string
}
type TRolePlayBooks = {
    "year": number,
    "semester": number,
    "grade": number,
    "level": string,
    "month": string,
    "topic_title_1st": string,
    "topic_lv_1st": string,
    "topic_title_2nd": string,
    "topic_lv_2nd": string,
    [key:string]:string|number,
}

// type TLesson = {
//     "title": string,
//     "questions": [
//         {
//             "question": string,
//             "expressions": string
//         }, {
//             "question": string,
//             "expressions": string
//         }
//     ]
// }
