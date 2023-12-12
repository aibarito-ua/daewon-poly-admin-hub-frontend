import React from 'react';
import axios from 'axios';
import { CONFIG } from '../../config';

export async function getLMRSpeakingHubFilterDataAPI():Promise<TFilterSparkWriting> {
    const reqUrl = CONFIG.LEARNING_RESULT_MANAGEMENT.SPEAKING.GET.DATA.FILTER_DATA;
    console.log('filter url =',reqUrl)
    return axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response =',response.data)
        const data:TFilterSparkWriting = response.data.data
        return data
    }).catch((reject)=>{
        console.log(reject)
        const error:TErrorData = reject.response.data;
        return {
            "year": 0,
            "semester": 0,
            "campus": [],
            error
        }
    })
}

export async function getLMRSpeakingHubAllCampusDataAPI():Promise<TAllClassLRMSpeaking> {
    const reqUrl = CONFIG.LEARNING_RESULT_MANAGEMENT.SPEAKING.GET.DATA.ALL_CAMPUS;
    console.log('filter url =',reqUrl)
    return axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response =',response.data)
        const data:TAllClassLRMSpeaking = response.data.data
        return data
    }).catch((reject)=>{
        console.log(reject)
        const error:TErrorData = reject.response.data;
        return {
            "year": 0,
            "semester": 0,
            "campus": [],
            error
        }
    })
}

export async function getLMRSpeakingHubLevelsOfCampusDataAPI(campusCode: string):Promise<TCampusData> {
    const reqUrl = CONFIG.LEARNING_RESULT_MANAGEMENT.SPEAKING.GET.DATA.LEVELS_OF_CAMPUS.replace(/{campus_code}/gmi,campusCode);
    console.log('filter url =',reqUrl)
    return axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response =',response.data)
        const data:TCampusData = response.data.data
        return data
    }).catch((reject)=>{
        console.log(reject)
        const error:TErrorData = reject.response.data;
        return {
            code: '',
            name: '',
            level: [],
            error
        }
    })
}

export async function getLMRSpeakingHubStudents(datas:TFindStudentsReq):Promise<TLRMSpeakingHubData> {
    const reqUrl = CONFIG.LEARNING_RESULT_MANAGEMENT.SPEAKING.GET.DATA.FIND_STUDENTS.replace(/\/writing\//gmi, '/speaking/').replace(/{campus_code}/gmi,datas.campusCode).replace(/{level_code}/gmi, datas.levelCode).replace(/{class_code}/gmi,datas.classCode);
    console.log('url ==',reqUrl)
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response from be =',response.data)
        const responseData:TLRMSpeakingHubData = response.data.data;
        return responseData;
    }).catch((reject) => {
        console.log('reject from be =',reject)
        // const rejectData:TLRMSpeakingHubGetStudentReject = reject;
        const error:TErrorData = reject.response.data;
        return {idea_exchange: null, story_vlog: null, role_play: null, error};
    })
}