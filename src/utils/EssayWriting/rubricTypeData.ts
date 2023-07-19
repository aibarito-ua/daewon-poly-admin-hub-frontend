export type TRubricTypeHeader = {
    accessor: TRubricTypeHeaderAccessor
    header: string
}
export type TRubricTypeHeaderAccessor = "category"|"explanation"|"5"|"4"|"3"|"2"|"1";
export type TRubricTypeDataItem = {
    [key in TRubricTypeHeaderAccessor]: string | string[];
} & {
    "category": string;
    "explanation": string[];
    "5": string;
    "4": string;
    "3": string;
    "2": string;
    "1": string;
};
export type TRubricTypeData = {
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
}
// const category = ["ideas","organization","voice","word choice","sentence fluency","conventions"];
// const score_value = ["poor","fair","good","very good","excellent"];

const r01_descriptive_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic",
                "contains supporting sentences that give details about the topic or main idea"
            ],
            "5": "The essay is well-focused on a specific topic and is written with a clear purpose. The writing is filled with interesting details about the topic.",
            "4": "The essay is focused on a specific topic and generally has a clear purpose. The writing has several interesting details about the topic.",
            "3": "The essay's purpose is understood but not fully developed. The writing has some interesting details about the topic.",
            "2": "The essay shows a developing process that lacks focus. The writing has few interesting details about the topic.",
            "1": "The essay does not display a clear purpose nor does it focus on a specific topic. The writing is confusing and unclear."
        },
        {
            "category": "organization",
            "explanation": [
                "includes an introduction, a body, and a conclusion",
                "includes parts that work well together and that are well-organized"
            ],
            "5": "The writing is well-structured with a clear introduction, body, and conclusion.",
            "4": "Most parts (introduction, body, and conclusion) of the essay are well-structured and in order.",
            "3":"Some parts (introduction, body, and conclusion) of the essay are adequately structured and/or in order.",
            "2":"Few parts (introduction, body, and conclusion) of the essay are well-structured and/or in order.",
            "1":"The writing lacks structure and unity. The introduction, body, and/or conclusion are missing or are not clearly organized."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows the writer's confidence and knowledge of the topic"
            ],
            "5": "The writer's voice sounds confident, knowledgeable, and enthusiastic.",
            "4": "The writer's voice sounds knowledgeable and confident most of the time.",
            "3":"The writer sometimes sounds unsure.",
            "2":"The writer sounds unsure in many parts.",
            "1":"The writer needs to sound much more confident."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic"
            ],
            "5": "The writer uses strong adjectives, nouns, and verbs that make the writing interesting, clear, and descriptive. The writer correctly uses words that are interesting and related to the topic.",
            "4": "Most adjectives, nouns, and verbs are strong, specific, and clear. The writer correctly uses words that are interesting and related to the topic most of the time.",
            "3":"Some adjectives, nouns, and verbs are strong, specific, and clear, but some are general and repeated throughout the writing. The writer uses some words that are related to the topic, but sometimes incorrectly.",
            "2":"Many adjectives, nouns, and verbs are general, unclear, and repeated throughout the writing. The writer incorrectly uses most words that are related to the topic.",
            "1":"The writer's word choice is poor. Most adjectives, nouns, and verbs are general, unclear, repeated, and often used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "has complete sentences",
                "has sentences that flow smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths"
            ],
            "5": "The overall sentence flow is smooth. The sentences are clear, complete, and varied.",
            "4": "Most of the sentences flow smoothly, and they are clear, complete, and varied.",
            "3":"Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2":"The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many of the sentences are unclear and/or incomplete.",
            "1":"The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar"
            ],
            "5": "Conventions are correct.",
            "4": "Most of the conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3":"Meanings are clear, but there are some errors in conventions that result in some confusion.",
            "2":"Meanings are usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1":"Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r02_informative_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic",
                "contains supporting sentences that give details about the topic or main idea"
            ],
            "5": "The essay is informative with a clear focus and excellent supporting details.",
            "4": "The essay is informative with a clear focus. More or better supporting details would improve the essay.",
            "3": "The focus of the essay needs to be clearer, and more or better supporting details are needed.",
            "2": "The topic needs to be narrowed or expanded. Many more supporting details are needed.",
            "1": "The topic has been chosen but needs to be developed."
        },
        {
            "category": "organization",
            "explanation": [
                "has an introduction, a body, and a conclusion",
                "includes parts that work well together and that are well-organized"
            ],
            "5": "The writing is well-structured with a clear introduction, body, and conclusion.",
            "4": "Most parts (introduction, body, and conclusion) of the essay are well-structured and in order.",
            "3": "Some parts (introduction, body, and conclusion) of the essay are adequately structured and/or in order.",
            "2": "Few parts (introduction, body, and conclusion) of the essay are well-structured and/or in order.",
            "1": "There is a lack of structure in the introduction, body, and conclusion. The essay lacks unity."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows the writer's confidence and knowledge of the topic"
            ],
            "5": "The writer's voice sounds confident, knowledgeable, and enthusiastic.",
            "4": "The writer's voice sounds informative and confident most of the time.",
            "3": "The writer sometimes sounds unsure of the information in some parts of the essay.",
            "2": "The writer sounds unsure of the information in many parts of the essay.",
            "1": "The writer needs to sound much more confident."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic"
            ],
            "5": "Strong nouns and action verbs make the essay interesting and informative.",
            "4": "Most of the nouns and action verbs relate to the topic and make the essay interesting to the reader.",
            "3": "Some of the nouns and verbs are related to the topic, but some are general and repeated.",
            "2": "Many nouns and verbs are general and repeated throughout the essay. More topic-related words are needed.",
            "1": "Word choice is unclear, not specific, and lacks variety."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "has complete sentences",
                "has sentences that flow smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths"
            ],
            "5": "An excellent variety of sentence beginnings and lengths allow the essay to flow smoothly.",
            "4": "A good variety of sentence beginnings and lengths allow the essay to flow smoothly.",
            "3": "There is an adequate variety of sentence beginnings and lengths. Some choppy sentences result in a lack of flow in the essay.",
            "2": "There is little variety of sentence beginnings and lengths. The sentence flow lacks clear transitions.",
            "1": "The overall sentence flow lacks clear transitions and clarity. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "Meanings are is clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meanings are usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r03_personal_narrative:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic and purpose",
                "contains well-developed and interesting details"
            ],
            "5": "The narrative has a clear topic and purpose that is well-focused. All the details are well-developed, interesting, and important to the narrative.",
            "4": "The narrative has a clear and specific topic and purpose. The details are mostly well-developed, interesting, and important to the narrative.",
            "3": "The narrative has a fairly clear topic and purpose, but they may not be fully developed. Some of the details are not very interesting, well-developed, or important to the narrative.",
            "2": "The narrative has a topic and/or purpose that somewhat lacks focus. There are a number of details that do not relate to the topic, are uninteresting, or do not seem important to the narrative.",
            "1": "The narrative lacks a clear topic and/or purpose. The narrative does not show a clear development of details, and many details are not related to the topic, uninteresting, or unimportant."
        },
        {
            "category": "organization",
            "explanation": [
                "includes a clear beginning, middle, and end",
                "has parts that work well together and that are well-organized"
            ],
            "5": "The writing is well-organized with a clear beginning, middle, and end.",
            "4": "Most parts of the narrative are well-organized, and there is a clear beginning, middle, and end.",
            "3": "Some parts are confusing because the organization of the narrative is not very good.",
            "2": "Many parts of the narrative are confusing as a result of poor organization.",
            "1": "There is no clear beginning, middle, or end. Most or all of the writing is confusing as a result of poor organization."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic"
            ],
            "5": "The writer's voice is appropriate for the personal narrative. The writer seems interested and enthusiastic. The writing makes readers want to read more.",
            "4": "The writer's voice is mostly appropriate for the personal narrative. The writer mostly seems interested and enthusiastic. The writing grabs the attention of readers.",
            "3": "The writer's voice is somewhat appropriate for the personal narrative. The writer seems somewhat interested and enthusiastic. The writing does not grab the attention of readers very well.",
            "2": "The writer's voice is not very appropriate for the personal narrative. The writer does not seem interested or enthusiastic. The writing does not make readers want to read more.",
            "1": "The writer's voice is inappropriate for the personal narrative. The writer does not seem interested and enthusiastic, making it difficult for readers to be interested in reading the narrative."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic"
            ],
            "5": "The writer uses strong adjectives, nouns, and verbs that make the writing interesting, clear, and descriptive. The writer correctly uses words that are interesting and related to the topic.",
            "4": "Most adjectives, nouns, and verbs are strong, specific, and clear. The writer correctly uses words that are interesting and related to the topic most of the time.",
            "3": "Some adjectives, nouns, and verbs are strong, specific, and clear, but some are general and repeated throughout the narrative. The writer uses some words that are related to the topic, but sometimes incorrectly.",
            "2": "Many adjectives, nouns, and verbs are general, unclear, and repeated throughout the narrative. The writer incorrectly uses most words that are related to the topic.",
            "1": "The writer's word choice is poor. Most adjectives, nouns, and verbs are general, unclear, repeated, and often used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "has complete sentences",
                "has sentences that flow smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths"
            ],
            "5": "The overall sentence flow is smooth. Sentences are clear, complete, and varied.",
            "4": "Most sentences flow smoothly and are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "Meanings are clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meanings are usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r04_creative_writing:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "includes the following story elements: characters, setting, and plot",
                "ideas are well-developed and interesting"
            ],
            "5": "The story includes all the story elements. All the story elements are well-developed and work well to make a great story (i.e. the setting, characters, and plot work well together; the problem is solved in an appropriate way; the story is interesting;  etc.).",
            "4": "The story includes all the story elements. Almost all the important story elements are well-developed and work well to make a good story.",
            "3": "The story includes most of the needed story elements. Some of the important story elements could be better developed or changed to make the story better.",
            "2": "The story includes most of the needed story elements. Some of the important story elements may be missing or need to be developed more to make the story better.",
            "1": "The story is missing many of the needed story elements. The writing does not show a clear development of the characters and plot."
        },
        {
            "category": "organization",
            "explanation": [
                "includes a clear beginning, middle, and end",
                "has parts that work well together and that are well-organized"
            ],
            "5": "The story is well-organized and has a clear beginning, middle, and end. The beginning introduces the characters, setting, and problem. The middle shows how the characters try to solve the problem. The ending explains how the problem is solved.",
            "4": "The story is mostly well-organized and has a clear beginning, middle, and end. Some parts could be better organized.",
            "3": "The story is somewhat organized. There is a beginning, middle, and end. Some parts could be better organized or made clearer.",
            "2": "The story is not well-organized. There is a beginning, middle, and end, but some parts should be better organized to make the story less confusing.",
            "1": "The story is poorly organized, which makes the story confusing. There is no clear beginning, middle, or end, or the story is missing one of these parts."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic"
            ],
            "5": "The writer's voice is appropriate for the story. The writing is interesting and includes dialogue that matches the character(s) well. Readers will enjoy reading the story.",
            "4": "The writer's voice is mostly appropriate for the story. The writing is mostly interesting and includes dialogue that matches the character(s) most of the time. Readers will enjoy reading the story.",
            "3": "The writer's voice is somewhat appropriate for the story. The writing is somewhat interesting. The writer could improve the story by adding dialogue or by using dialogue that better matches the character(s).",
            "2": "The writer's voice is not very appropriate or does not seem to match the story. The writing should be improved to make the story better. The writer should improve the story by adding dialogue.",
            "1": "The writer's voice is not appropriate or does not match the story. The writer does not use dialogue and does not seem to have thought about voice, making the story boring and uninteresting."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic"
            ],
            "5": "Strong adjectives, nouns, and verbs make the story interesting and descriptive. The writer's word choice is creative, and all words are used appropriately and correctly.",
            "4": "Most adjectives, nouns, and verbs are strong, making the story interesting and descriptive. The writer's word choice is mostly creative, and most words are used appropriately and correctly.",
            "3": "Some adjectives, nouns, and verbs are strong, making the story somewhat interesting and descriptive. The writer's word choice is somewhat creative, but some words are used inappropriately and incorrectly.",
            "2": "Few adjectives, nouns, and verbs are interesting and descriptive. Many words are general and repeated throughout the story. Many words are used inappropriately and incorrectly.",
            "1": "The writer's word choice is not creative, interesting, or descriptive. Most words are general and repeated throughout the story. Most words are used inappropriately and incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "has complete sentences",
                "has sentences that flow smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths"
            ],
            "5": "The overall sentence flow is smooth. Sentences are clear, complete, and varied.",
            "4": "Most sentences flow smoothly and are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "Meanings are clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meanings are usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r05_persuasive_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic and purpose",
                "contains well-developed and interesting details"
            ],
            "5": "The essay has a clear opinion statement. Clear details support the writer's opinion.",
            "4": "The opinion statement is clear, and most of the reasons support the writer's statement.",
            "3": "The opinion statement is clear, but some of the reasons and details are not complete or slightly off-topic.",
            "2": "The opinion statement is unclear, and more or better reasons and details are needed.",
            "1": "An opinion statement and more reasons and details are needed."
        },
        {
            "category": "organization",
            "explanation": [
                "has an introduction, a body, and a conclusion",
                "includes parts that work well together and that are well-organized"
            ],
            "5": "The writing is well-organized with a clear introduction, body, and conclusion.",
            "4": "Most parts (introduction, body, and conclusion) of the essay are well-structured and in order.",
            "3": "Some parts (introduction, body, and conclusion) of the essay are well-structured and/or in order.",
            "2": "Few parts (introduction, body, and conclusion) of the essay are well-structured and/or in order.",
            "1": "There is no clear introduction, body, and conclusion, and the organization is confusing."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic"
            ],
            "5": "The writer's voice is confident, engaging, and persuasive.",
            "4": "The writer's voice is persuasive and distinct.",
            "3": "The writer's voice is present but needs to be more direct in order to persuade readers.",
            "2": "The writer's voice sounds unsure.",
            "1": "The writer needs to work on developing his/her voice. The writer lacks confidence and is not persuasive."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic"
            ],
            "5": "The writer uses clear, direct language that does not result in any confusion. The writer correctly uses all words that are related to the topic.",
            "4": "The writer uses clear, direct language. The writer correctly uses a variety of words that are related to the topic most of the time.",
            "3": "The writer uses clear, direct language most of the time. The writer uses a variety of words that are related to the topic, but sometimes uses words incorrectly.",
            "2": "The writer sometimes uses clear, direct language. The writer's word choice lacks variety. Some words related to the topic are used incorrectly.",
            "1": "The writer does not use very clear, direct language. The writer's word choice lacks variety. Many words are repeated and/or used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "has complete sentences",
                "has sentences that flow smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths"
            ],
            "5": "The overall sentence flow is smooth. The sentences are clear, complete, and varied.",
            "4": "Most of the sentences flow smoothly, and they are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many of the sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most of the conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "Meanings are clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meanings are usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r06_opinion_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic and purpose",
                "contains well-developed and interesting details",
            ],
            "5": "The essay has a clear opinion statement. Clear details support the writer's opinion.",
            "4": "The opinion statement is clear, and most of the reasons support the writer's statement.",
            "3": "The opinion statement is clear, but some of the reasons and details are not complete.",
            "2": "The opinion statement is unclear and reasons and details are needed.",
            "1": "An opinion statement, reasons, and details are needed."
        },
        {
            "category": "organization",
            "explanation": [
                "has an introduction, a body, and a conclusion",
                "includes parts that work well together and that are well-organized",
            ],
            "5": "The writing is well-organized with a clear introduction, body, and conclusion.",
            "4": "Most parts (introduction, body, and conclusion) of the essay are in order.",
            "3": "Some parts (introduction, body, and conclusion) of the essay are in order.",
            "2": "Few parts (introduction, body, and conclusion) of the essay are in order.",
            "1": "There is no clear introduction, body, and conclusion, and the organization is confusing."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic",
            ],
            "5": "The writer's voice is confident, engaging, and persuasive.",
            "4": "The writer's voice is persuasive and distinct.",
            "3": "The writer's voice is present but needs to be more direct in order to persuade readers. ",
            "2": "The writer's voice sounds unsure.",
            "1": "The writer needs to work on developing his/her voice. The writer lacks confidence and is not persuasive."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic",
            ],
            "5": "The writer uses strong adjectives, nouns, and verbs that make the writing interesting, clear, and descriptive. The writer correctly uses words that are interesting and related to the topic.",
            "4": "Most adjectives, nouns, and verbs are strong, specific, and clear. The writer correctly uses words that are interesting and related to the topic most of the time.",
            "3": "Some adjectives, nouns, and verbs are strong, specific, and clear, but some are general and repeated throughout the writing. The writer uses some words that are related to the topic, but sometimes uses them incorrectly.",
            "2": "Many adjectives, nouns, and verbs are general, unclear, and repeated throughout the writing. The writer incorrectly uses most words that are related to the topic.",
            "1": "The writer's word choice is poor. Most adjectives, nouns, and verbs are general, unclear, repeated, and often used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "writes in complete sentences",
                "flows smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths",
            ],
            "5": "The overall sentence flow is smooth. The sentences are clear, complete, and varied.",
            "4": "Most of the sentences flow smoothly, and they are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many of the sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most of the conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "The meaning is clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meaning is usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r07_cause_and_effect_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic and purpose",
                "contains well-developed and interesting details",
            ],
            "5": "The introduction includes a focus statement that clearly states the cause(s) and effect(s). The supporting details clearly explain the causes or the effects.",
            "4": "The introduction includes a focus statement that clearly states the cause(s) and effect(s). Most of the supporting details clearly explain a cause/effect and are on-topic.",
            "3": "The introduction includes a focus statement that states the cause(s) and effect(s). But some of the supporting details are unclear or may be slightly off-topic.",
            "2": "The introduction includes a focus statement. Some of the causes or effects are unclear. Many of the supporting details are weak or off-topic.",
            "1": "The introduction does not include a focus statement. The supporting details do not explain the cause and effect relationship."
        },
        {
            "category": "organization",
            "explanation": [
                "has an introduction, a body, and a conclusion",
                "parts work well together and are clearly organized",
            ],
            "5": "The essay is clearly organized into an introduction, a body, and a conclusion, and each part is well-organized.",
            "4": "The essay is clearly organized into an introduction, a body, and a conclusion, but some parts could be clearer or better organized.",
            "3": "The essay is organized into paragraphs, but one or more parts of the essay are missing or not well-organized.",
            "2": "The essay is missing one of the main parts (introduction, body paragraphs, and conclusion). Other parts are not well-organized.",
            "1": "The essay is confusing as a result of poor organization. One or more of the following are missing: introduction, body, and conclusion."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic",
            ],
            "5": "The writer seems confident and very knowledgeable about the topic.",
            "4": "The writer seems confident and fairly knowledgeable about the topic.",
            "3": "The writer seems somewhat confident and knowledgeable about the topic.",
            "2": "The writer shows little confidence and seems to have limited knowledge about the topic.",
            "1": "The writer does not seem confident and seems to have very little knowledge about the topic."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic",
            ],
            "5": "The writer uses clear, direct language without any confusion. The writer correctly uses all words that are related to the topic.",
            "4": "The writer uses clear, direct language. The writer correctly uses a variety of words that are related to the topic most of the time.",
            "3": "The writer uses clear, direct language most of the time. The writer uses a variety of words that are related to the topic, but sometimes uses words incorrectly.",
            "2": "The writer sometimes uses clear, direct language. The writer's word choice lacks variety. Some words related to the topic are used incorrectly.",
            "1": "The writer does not use very clear, direct language. The writer's word choice lacks variety. Many words are repeated and/or used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "writes in complete sentences",
                "flows smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths",
            ],
            "5": "The overall sentence flow is smooth. The sentences are clear, complete, and varied.",
            "4": "Most of the sentences flow smoothly, and they are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many of the sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most of the conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "The meaning is clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meaning is usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r08_creative_writing:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "includes the following story elements: characters, setting, and plot",
                "ideas are well-developed and interesting",
            ],
            "5": "The story includes all the story elements. All the story elements are well-developed and work well to make a great story (i.e. the setting, characters, and plot work well together; the problem is solved in an appropriate way; the story is interesting; etc.).",
            "4": "The story includes all the story elements. Almost all the important story elements are well-developed and work well to make a good story.",
            "3": "The story includes most of the needed story elements. Some of the important story elements could be better developed or changed to make the story better.",
            "2": "The story includes most of the needed story elements. Some of the important story elements may be missing or need to be better developed to make the story better.",
            "1": "The story is missing many of the needed story elements. The writing does not show a clear development of the characters and plot."
        },
        {
            "category": "organization",
            "explanation": [
                "includes a clear beginning, middle, and end",
                "has parts that work well together and that are well-organized",
            ],
            "5": "The story is well-organized and has a clear beginning, middle, and end. The beginning introduces the characters and setting. The middle introduces the problem and shows how the characters try to solve the problem. The ending explains how the problem is solved.",
            "4": "The story is mostly well-organized and has a clear beginning, middle, and end. Some parts could be better organized.",
            "3": "The story is somewhat organized. There is a beginning, middle, and end. Some parts could be better organized or made clearer.",
            "2": "The story is not well-organized. There is a beginning, middle, and end, but some parts should be better organized to make the story less confusing.",
            "1": "The story is poorly organized, making the story confusing. There is no clear beginning, middle, or end, or the story is missing one of these parts."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic",
            ],
            "5": "The writer's voice is appropriate for the story. The writing is interesting and includes dialogue that matches the character(s) well. Readers will enjoy reading the story.",
            "4": "The writer's voice is mostly appropriate for the story. The writing is mostly interesting and includes dialogue that matches the character(s) most of the time. Readers will enjoy reading the story.",
            "3": "The writer's voice is somewhat appropriate for the story. The writing is somewhat interesting. The writer could improve the story by adding dialogue or by using dialogue that better matches the character(s).",
            "2": "The writer's voice is not very appropriate or does not seem to match the story. The writing should be improved to make the story better. The writer should improve the story by adding dialogue.",
            "1": "The writer's voice is not appropriate or does not match the story. The writer does not use dialogue and does not seem to have thought about voice, making the story boring and uninteresting."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic",
            ],
            "5": "Strong adjectives, nouns, and verbs make the story interesting and descriptive. The writer's word choice is creative, and all words are used appropriately and correctly.",
            "4": "Most adjectives, nouns, and verbs are strong, making the story interesting and descriptive. The writer's word choice is mostly creative, and most words are used appropriately and correctly.",
            "3": "Some adjectives, nouns, and verbs are strong, making the story interesting and descriptive. The writer's word choice is somewhat creative, but some words are used inappropriately and incorrectly.",
            "2": "Few adjectives, nouns, and verbs are interesting and descriptive. Many words are general and repeated throughout the story. Many words are used inappropriately and incorrectly.",
            "1": "The writer's word choice is not creative, interesting, or descriptive. Most words are general and repeated throughout the story. Most words are used inappropriately and incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "writes in complete sentences",
                "flows smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths",
            ],
            "5": "The overall sentence flow is smooth. Sentences are clear, complete, and varied.",
            "4": "Most sentences flow smoothly and are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "The meaning is clear, but there are some errors in conventions that result in some confusion.",
            "2": "The meaning is usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r09_ci_and_re_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic",
                "contains supporting sentences that give details about the topic or main idea",
            ],
            "5": "The essay is very informative and has a clear focus and supporting details that clearly explain the topic.",
            "4": "The essay is informative and has a clear focus. Some supporting details could be explained better or more clearly.",
            "3": "The essay is informative and has a clear focus. Some supporting details need to be expanded or explained further.",
            "2": "The topic/focus is unclear, or it needs to be narrowed or expanded. Many more supporting details are needed, or the connections between the topic and the supporting details are often confusing.",
            "1": "The topic/focus is unclear and/or needs to be developed. The connections between the topic and the supporting details are unclear."
        },
        {
            "category": "organization",
            "explanation": [
                "has an introduction, a body, and a conclusion",
                "includes parts that work well together and that are well-organized",
            ],
            "5": "The essay is clearly organized into an introduction, a body, and a conclusion, and each part is well-organized.",
            "4": "The essay is clearly organized into an introduction, a body, and a conclusion, but some parts could be clearer or better organized.",
            "3": "The essay is organized into paragraphs, but one or more parts of the essay are missing or not well-organized.",
            "2": "The essay is missing one of the main parts (introduction, body paragraphs, and conclusion). Other parts are not well-organized.",
            "1": "The essay is confusing as a result of poor organization. One or more of the following are missing: introduction, body, and conclusion."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows the writer's confidence and knowledge about the topic ",
            ],
            "5": "The writer seems confident, knowledgeable, and enthusiastic.",
            "4": "The writer seems confident and knowledgeable most of the time.",
            "3": "The writer seems confident and knowledgeable some of the time.",
            "2": "The writer seems unsure of the information in many parts of the essay.",
            "1": "The writer lacks confidence and seems to have little knowledge of the topic."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic",
            ],
            "5": "The writer uses strong adjectives, nouns, and verbs that make the writing interesting, clear, and descriptive. The writer correctly uses words that are interesting and related to the topic.",
            "4": "Most adjectives, nouns, and verbs are strong, specific, and clear. The writer correctly uses words that are interesting and related to the topic most of the time.",
            "3": "Some adjectives, nouns, and verbs are strong, specific, and clear, but some are general and repeated throughout the writing. The writer uses some words that are related to the topic, but sometimes uses them incorrectly.",
            "2": "Many adjectives, nouns, and verbs are general, unclear, and repeated throughout the writing. The writer incorrectly uses most words that are related to the topic.",
            "1": "The writer's word choice is poor. Most adjectives, nouns, and verbs are general, unclear, repeated, and often used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "writes in complete sentences",
                "flows smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths",
            ],
            "5": "The overall sentence flow is smooth. The sentences are clear, complete, and varied.",
            "4": "Most of the sentences flow smoothly, and they are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete.",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many of the sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most of the conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "The meaning is clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meaning is usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

const r10_promotional_essay:{
    dataHead: TRubricTypeHeader[],
    data: TRubricTypeDataItem[]
} = {
    dataHead: [
        {
            accessor: "category",
            header: "category"
        },
        {
            accessor: "explanation",
            header: "explanation"
        },
        {
            accessor: "5",
            header: "excellent"
        },
        {
            accessor: "4",
            header: "very good"
        },
        {
            accessor: "3",
            header: "good"
        },
        {
            accessor: "2",
            header: "fair"
        },
        {
            accessor: "1",
            header: "poor"
        },
    ],
    data: [
        {
            "category": "ideas",
            "explanation": [
                "focuses on a specific topic and purpose",
                "contains well-developed and interesting details",
            ],
            "5": "The essay has a clear opinion statement. Clear details support the writer's opinion.",
            "4": "The opinion statement is clear, and most of the reasons support the writer's statement.",
            "3": "The opinion statement is clear, but some of the reasons and details are not complete.",
            "2": "The opinion statement is unclear and reasons and details are needed.",
            "1": "An opinion statement, reasons, and details are needed."
        },
        {
            "category": "organization",
            "explanation": [
                "has an introduction, a body, and a conclusion",
                "includes parts that work well together and that are well-organized",
            ],
            "5": "The writing is well-organized with a clear introduction, body, and conclusion.",
            "4": "Most parts (introduction, body, and conclusion) of the essay are in order.",
            "3": "Some parts (introduction, body, and conclusion) of the essay are in order.",
            "2": "Few parts (introduction, body, and conclusion) of the essay are in order.",
            "1": "There is no clear introduction, body, and conclusion, and the organization is confusing."
        },
        {
            "category": "voice",
            "explanation": [
                "has an appropriate writing voice",
                "shows that the writer is interested in and excited about the topic",
            ],
            "5": "The writer's voice is confident, engaging, and persuasive.",
            "4": "The writer's voice is persuasive and distinct.",
            "3": "The writer's voice is present but needs to be more direct in order to persuade readers.",
            "2": "The writer's voice sounds unsure.",
            "1": "The writer needs to work on developing his/her voice. The writer lacks confidence and is not persuasive."
        },
        {
            "category": "word choice",
            "explanation": [
                "uses strong adjectives, nouns, and verbs",
                "includes a variety of words that are clear, specific, and related to the topic",
            ],
            "5": "The writer uses strong adjectives, nouns, and verbs that make the writing interesting, clear, and descriptive. The writer correctly uses words that are interesting and related to the topic.",
            "4": "Most adjectives, nouns, and verbs are strong, specific, and clear. The writer correctly uses words that are interesting and related to the topic most of the time.",
            "3": "Some adjectives, nouns, and verbs are strong, specific, and clear, but some are general and repeated throughout the writing. The writer uses some words that are related to the topic, but sometimes uses them incorrectly.",
            "2": "Many adjectives, nouns, and verbs are general, unclear, and repeated throughout the writing. The writer incorrectly uses most words that are related to the topic.",
            "1": "The writer's word choice is poor. Most adjectives, nouns, and verbs are general, unclear, repeated, and often used incorrectly."
        },
        {
            "category": "sentence fluency",
            "explanation": [
                "writes in complete sentences",
                "flows smoothly from sentence to sentence",
                "uses a variety of sentence beginnings and lengths",
            ],
            "5": "The overall sentence flow is smooth. The sentences are clear, complete, and varied.",
            "4": "Most of the sentences flow smoothly, and they are clear, complete, and varied.",
            "3": "Some sentences flow smoothly, but there is a lack of variety. Some sentences are unclear or incomplete. ",
            "2": "The overall sentence flow is somewhat choppy, and there is not much sentence variety. Many of the sentences are unclear and/or incomplete.",
            "1": "The overall sentence flow is choppy, and most sentences are unclear and/or incomplete. There is little to no sentence variety."
        },
        {
            "category": "conventions",
            "explanation": [
                "follows the basic rules of capitalization, punctuation, spelling, and grammar",
            ],
            "5": "Conventions are correct.",
            "4": "Most of the conventions are correct. There are a few minor errors, but none of the errors result in confusion.",
            "3": "The meaning is clear, but there are some errors in conventions that result in some confusion.",
            "2": "Meaning is usually clear, but there are many errors in conventions that result in confusion or are a distraction to readers.",
            "1": "Errors make the writing difficult to read and understand. Help is needed to fix the writing conventions."
        }
    ]
}

export const rubric_type_datas:{
    [key:string]:TRubricTypeData
} = {
    r01_descriptive_essay,
    r02_informative_essay,
    r03_personal_narrative,
    r04_creative_writing,
    r05_persuasive_essay,
    r06_opinion_essay,
    r07_cause_and_effect_essay,
    r08_creative_writing,
    r09_ci_and_re_essay,
    r10_promotional_essay
}