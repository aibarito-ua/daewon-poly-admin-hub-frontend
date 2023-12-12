import React from 'react';
import { CONFIG } from '../../config';
import axios from 'axios';
import { cf } from '../../util/common/commonFunctions';

export async function getLevelAndTextbookSpeakingDataAPI(sortRules:{
    head: {
        speaking: string[];
        writing: string[];
    };
    body: {
        speaking: string[];
        writing: string[];
    };
}):Promise<{
    loadData:TLoadDataItem[],
    loadDataHeadKor:TLoadDataHeadTrans[],
    error?:TErrorData
}> {
    const reqUrl = CONFIG.LEVEL_AND_TEXTBOOK.SPEAKING.GET.DATA;
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((res)=>{
        const loadData:TLoadDataItem[] = res.data.data['loadData'];
        const loadDataHeadKor:TLoadDataHeadTrans[] = res.data.data['loadDataHeadKor'];
        // data sort
        const newDataHeadData = loadDataHeadKor.sort((a,b) =>cf.basicTable.sortByKeyHeadData(a,b, sortRules.head.speaking));
        return {
            loadData:loadData,
            loadDataHeadKor:newDataHeadData
        };
    }).catch((reject) => {
        console.log(reject)
        const error:TErrorData = reject.response.data;
        return {
            loadData:[],
            loadDataHeadKor:[],
            error
        };
    })
}