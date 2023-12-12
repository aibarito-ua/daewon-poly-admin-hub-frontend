import React from 'react';
import axios from 'axios';
import {CONFIG} from '../../config';
import { cf } from '../../util/common/commonFunctions';

export async function getActivityManagementSparkWritingDataAPI(sortRules: TActivityWritingSortRules):Promise<{
    body: TActivitySparkWritingBooks[],
    head: TLoadDataHeadTrans[],
    error?:any;
}> {
    const reqUrl = CONFIG.ACTIVITY_MANAGEMENT.WRITING.SPARK_WRITING.GET.DATA;
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then( (response) => {
        const loadData:TActivitySparkWritingBooks[] = response.data.data['loadData'];
        const loadDataHeadKor: TLoadDataHeadTrans[] = response.data.data['loadDataHeadKor']
        
        // data sort
        const sortLoadDataHead = loadDataHeadKor.sort((a, b) => cf.basicTable.sortByKeyHeadData(a,b,sortRules.head.spark_writing));
        
        return {
            body: loadData,
            head: sortLoadDataHead
        }
    }).catch( (rej)=>{
        console.log('reject =',rej)
        const reject:TErrorData = rej.response.data;
        return {
            body: [],
            head: [],
            error: reject
        }
    })
}

export async function setActivityManagementSparkWritingOutlineAPI(unit_id:number, outline_format: TOLContentItem[]):Promise<any> {
    const reqUrl = CONFIG.ACTIVITY_MANAGEMENT.WRITING.SPARK_WRITING.SET.OUTLINE;
    const data = {
        "body": {
            unit_id,
            outline_format
        }
    }
    return await axios.put(reqUrl, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response update =',response.data)
        return {flag:true};
    }).catch((rej) => {
        console.log('reject update =',rej)
        const reject:TErrorData = rej.response.data;
        return {
            flag:false, error:reject
        }
    })
}