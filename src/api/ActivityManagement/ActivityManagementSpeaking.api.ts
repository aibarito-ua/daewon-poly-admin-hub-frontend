import React from 'react';
import axios from 'axios';
import { CONFIG } from '../../config';
import { cf } from '../../util/common/commonFunctions';
const reqUrl = CONFIG.ACTIVITY_MANAGEMENT.SPEAKING.GET.DATA;
export async function getActivityManagementSpeakingDataAPI(target: 'idea_exchange'|'story_vlog'|'role_play', sortRules: string[]):Promise<any> {
    const uri=target==='idea_exchange'? reqUrl.IDEA_EXCHANGE : (
        target==='story_vlog' ? reqUrl.STORY_VLOG : reqUrl.ROLE_PLAY
    )
    return await axios.get(uri, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then( (res) => {
        console.log('response =',res.data.data)
        const loadData = res.data.data.loadData.map((bArr: any) => {return cf.basicTable.sortByKeyBodyData(bArr, cf.basicTable.customSort, sortRules); });
        const loadDataHeadKor = res.data.data.loadDataHeadKor.sort( (a:TLoadDataHeadTrans, b:TLoadDataHeadTrans) => cf.basicTable.sortByKeyHeadData(a,b, sortRules));
        return {
            body: loadData,
            head: loadDataHeadKor
        }
    }).catch( (reject) => {
        console.log(reject);

    })
}
