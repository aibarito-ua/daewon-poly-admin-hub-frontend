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
        const error:TErrorData = reject.response.data;
        return {
            "year": 0,
            "semester": 0,
            "campus": [],
            error
        }
    })
}
export async function getLMSparkWritingCampusDataAPI():Promise<TFilterSparkWriting> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.ALL_CAMPUS;
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

export async function getLMSparkWritingLevelsOfCampusDataAPI(campusCode: string):Promise<TFilterCampusSparkWriting> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.LEVELS_OF_CAMPUS.replace(/{campus_code}/gmi,campusCode);
    console.log('filter url =',reqUrl)
    return axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        console.log('response =',response.data)
        const data:TFilterCampusSparkWriting = response.data.data
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
export async function getLMSpeakingFilterDataAPI():Promise<TFilterSparkWriting> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.FILTER_DATA.replace(/\/writing\//gmi, '/speaking/');
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
        // const rejectData:TLMSparkWritingGetStudentReject = reject;
        const error:TErrorData = reject.response.data;
        return {book_name:'',students:[], error};
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
        const error:TErrorData = reject.response.data;
        return {
            comment: [],
            draft_index:-1,
            draft_outline:[],
            overall_comment:'',
            return_reason:'',
            return_teacher_comment:'',
            error
        }
    })
}

// advisor
export async function getSparkWritingAdvisor(draft_id:string, student_name_en:string): Promise<TWritingAdvisor> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.WRITING_ADVISOR.replace(/{draft_id}/gmi, draft_id).replace(/{student_name_en}/gmi, student_name_en);
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
        const error:TErrorData = reject.response.data;
        return {
            draft_index:-1,
            draft_outline: [],
            error
        }
    })
}
// temporary feedback save
export async function draftFeedbackTemporarySave(data:TAdminDraft1stCommentData):Promise<{flag:boolean, error?:TErrorData}> {
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
        return {flag};
    }).catch((reject) => {
        console.log('reject =',reject)
        const error:TErrorData = reject.response.data;
        return {flag:false, error};
    })
}

// feedback submit send
export async function draftFeedbackSend(data: TAdminDraft1stCommentData):Promise<{flag:boolean, error?:TErrorData}>{
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
        return {flag};
    }).catch((reject) => {
        console.log('reject =',reject)
        const error:TErrorData = reject.response.data;
        return {flag:false, error};
    })
}

export async function getReportOneDataByStu(data: {
    level_name: string;
    unit_index: number;
    student_code: string;
}): Promise<{
    data:TStudentUnitReportRes|null,
    error?:TErrorData
}> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.REPORT_BY_STUDENT
        .replace(/{level_name}/gmi, data.level_name).replace(/{unit_index}/gmi, data.unit_index.toString()).replace(/{student_code}/gmi, data.student_code);
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        const data:TStudentUnitReportRes = response.data.data;
        return {data};
    }).catch((reject) => {
        console.log('reject =',reject);
        const error:TErrorData = reject.response.data;
        return {data:null,error};
    })
}

export async function getReportOverallDatabyStu(data: {
    level_name: string;
    student_code: string;
}):Promise<{
    data:TOverallReportAPI|null,
    error?:TErrorData
}> {
    const reqUrl = CONFIG.LEARNING_MANAGEMENT.WRITING.SPARK_WRITING.GET.REPORT_OVERALL_BY_STUDENT
        .replace(/{level_name}/gmi, data.level_name).replace(/{student_code}/gmi, data.student_code);
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        const data:TOverallReportAPI = response.data.data;
        return {data};
    }).catch((reject) => {
        console.log('reject =',reject);
        const error:TErrorData = reject.response.data;
        return {data:null,error};
    })
}
export async function getAllReportByCampusLevelClass(data: {
    campus_code: string;
    level_code:string;
    class_code:string;
}):Promise<{
    data: TGetAllWritingReport|null,
    error?:TErrorData;
}> {
    const reqUrl = CONFIG.LEARNING_RESULT_MANAGEMENT.WRITING.SPARK_WRITING.GET.ALL_REPORTS.replace(/{campus_code}/gmi,data.campus_code).replace(/{level_code}/gmi, data.level_code).replace(/{class_code}/gmi,data.class_code);
    return await axios.get(reqUrl, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZFUkEuQkFORyIsImlhdCI6MTY4OTI5OTkyNywiZXhwIjoxNjg5MzAwODI3fQ.wbRM8nuuAm0Nz4op5D2OnRgbEx22uSuY_nqPBRpYSUs'
        },
    }).then((response) => {
        const data:TGetAllWritingReport = response.data.data;
        return {data};
    }).catch((reject) => {
        console.log('reject ===',reject);
        const error:TErrorData = reject.response.data;
        return {data:null, error };
    })
}