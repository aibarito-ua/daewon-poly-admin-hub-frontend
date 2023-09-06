import React from 'react';
import axios from 'axios';
import { CONFIG } from '../../config';

export async function getLMSparkWritingFilterDataAPI():Promise<TFilterSparkWriting> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.FILTER_DATA;
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
        return {
            "year": 0,
            "semester": 0,
            "campus": []
        }
    })
}

export async function getLMSparkWritingStudents(datas:TFindStudentsReq):Promise<TLMSparkWritingStudentsListInClass> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.FIND_STUDENTS.replace(/{campus_code}/gmi,datas.campusCode).replace(/{level_code}/gmi, datas.levelCode).replace(/{class_code}/gmi,datas.classCode);
    console.log('url ==',reqUrl)
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response from be =',response.data)
        const responseData:TLMSparkWritingStudentsListInClass = response.data.data;
        return responseData;
    }).catch((reject) => {
        console.log('reject from be =',reject)
        const rejectData:TLMSparkWritingGetStudentReject = reject;
        return {book_name:'',students:[]};
    })
}

export async function getDraftInfoByDraftId(draft_id:string):Promise<TFindDraftInfoByDraftIdResponse> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.FIND_DRAFT.replace(/{draft_id}/gmi, draft_id);
    console.log('url ==',reqUrl)
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        const data:TFindDraftInfoByDraftIdResponse = response.data.data
        console.log('response find draft by draft_id =',data)
        return data;
    }).catch((reject) => {
        console.log('reject find draft by draft_id =',reject)
        return {
            comment: [],
            draft_index:-1,
            draft_outline:[],
            overall_comment:'',
            return_reason:'',
            return_teacher_comment:''
        }
    })
}

// advisor
export async function getSparkWritingAdvisor(draft_id:string): Promise<TWritingAdvisor> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.WRITING_ADVISOR.replace(/{draft_id}/gmi, draft_id);
    return await axios.get(reqUrl,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        const data:TWritingAdvisor = response.data.data;
        console.log('response advisor =',data);
        return data;
    }).catch((reject) => {
        return {
            draft_index:-1,
            draft_outline: []
        }
    })
}
// temporary feedback save
export async function draftFeedbackTemporarySave(data:TAdminDraft1stCommentData):Promise<any> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.POST.FEEDBACK_TEMPORARY_SAVE;
    return await axios.post(reqUrl, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response =',response.data)
        const flag:boolean = response.data.data;
        return flag;
    }).catch((reject) => {
        console.log('reject =',reject)
        return false;
    })
}

// feedback submit send
export async function draftFeedbackSend(data: TAdminDraft1stCommentData):Promise<any>{
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.POST.FEEDBACK_SUBMIT;
    return await axios.post(reqUrl, data, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response =',response.data)
        const flag:boolean = response.data.data;
        return flag;
    }).catch((reject) => {
        console.log('reject =',reject)
        return false;
    })
}