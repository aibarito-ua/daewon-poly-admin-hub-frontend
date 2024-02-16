import { NavigateFunction } from "react-router-dom";
import {Diff, diff_match_patch} from 'diff-match-patch'
import { CompareDiff } from './grammars/grammarComareDiff';
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";

export const GrammarCF = {
    compareText: (origin_text:string, change_text:string) => {
        const rsp = CompareDiff.diff_lineMode(origin_text, change_text)
        // [[0,origin], [1, add text], [-1, delete text]]
        let dumpRsp:Diff[][] = [];
        for (const diff_index in rsp) {
            const value:Diff = rsp[diff_index]
            const flag_num = value[0]
            if (flag_num===0) {
                dumpRsp.push([value])
            } else if (flag_num === -1) {
                const index = parseInt(diff_index);
                const after_value:Diff = rsp[index+1] ? rsp[index+1] : [0, ''];
                if (after_value[0] === 0) {
                    dumpRsp.push([value])
                }
            } else if (flag_num === 1) {
                const index = parseInt(diff_index);
                const before_value:Diff = rsp[index-1] ? rsp[index-1] : [0,''];
                // console.log('before value in Add===', before_value)
                if (before_value[0]=== -1) {    
                    let dumpThisRsp = [ before_value, value];
                    dumpRsp.splice(index-1, 1, dumpThisRsp)
                } else {
                    // before is nothing or 0 (or 연속으로 추가된 단어)
                    dumpRsp.push([value])
                }
            }
        }
        return dumpRsp;
    }
}
export const CommonFunctions={
    goLink: async (linkPath: string, navigate:NavigateFunction, role?: TRole) => {
        if (role!==undefined) {
            // const rolePath = role==='logout'? '': (role==='Head' ? 'Head' : 'Campus')
            navigate(linkPath);
        } else {

        }
    },
    customNavigate: async(linkPath: string, navigate:NavigateFunction, flag:boolean, messages:string[]) => {
        if (!flag) {
            navigate(linkPath);
        } else {
            alert(messages);
            return false;
        }
    }
}

const customFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    return itemRank.passed;
}


const basicTable = {
    customFilter,
    levelSort: (a: string, b: string) => {
        const gradersLevel = [
            "GT1", "MGT1", "S1", "MAG1",
            "GT2", "MGT2", "S2", "MAG2",
            "GT3", "MGT3", "S3","R3", "MAG3",
            "GT4", "MGT4", "S4","R4", "MAG4" 
        ];
        return gradersLevel.indexOf(a) - gradersLevel.indexOf(b);
    },
    customSort: (a: string, b: string, sortRules: string[]) => {
        return sortRules.indexOf(a) - sortRules.indexOf(b);
    },
    sortByKeyBodyData: (unordered:any, sortFn:(a: string, b: string, sortRules: string[]) => number, sortRules:string[]) => {
        
        return Object.keys(unordered).sort((a, b) => sortFn(a,b,sortRules)).reduce((obj:any ={}, key:string) => {
            // console.log('obj =',obj)
            // console.log('keys = ',key)
            obj[key] = unordered[key];
            return obj;
        }, {});
    },
    sortByLessonInStoryVLogBodyData: (a:TStoryVlogBook, b:TStoryVlogBook)=>{
        return a.lesson.viewIndex - b.lesson.viewIndex;
    },
    sortByKeyHeadData: (a: TLoadDataHeadTrans, b: TLoadDataHeadTrans, sortRules: string[]) => {
        return sortRules.indexOf(a.accessor) - sortRules.indexOf(b.accessor);
    },
    setFilterProperty: (bodyData:any, targetKey: string) => {
        let returnFilterValues:string[]=[];
        let pushTargetData = '';
        for (let i = 0; i < bodyData.length; i++) {
            const currentData = bodyData[i];
            let checkTarget = false;
            if (i > 0) {
                for (let filterIndex = 0; filterIndex < returnFilterValues.length; filterIndex++) {
                    if (returnFilterValues[filterIndex] === currentData[targetKey].toString()) {
                        checkTarget = true;
                        break;
                    }
                }
            }
            if (!checkTarget) {
                pushTargetData=currentData[targetKey].toString();
                returnFilterValues.push(currentData[targetKey].toString());
            }
        }
        return returnFilterValues;
    },
    // speakingHub
    setFilterPropertyDeps: (bodyData:any) => {
        console.log('=== setFilterPropertyDeps ===')
        const allBodyData = bodyData.body;
        console.log('bodyData =',allBodyData)
        let listFilter:TActivitySpeakingHubFilterList[] = [];
        let isAllChecked = false;
        for (let i = 0; i < allBodyData.length; i++) {
            const targetBodyDataRow = allBodyData[i];
            if (i===0) {
                console.log('i === 0 pushed init value')
                const pushListFilterRow:TActivitySpeakingHubFilterList = {
                    year: targetBodyDataRow.year,
                    semester: targetBodyDataRow.semester,
                    grade: targetBodyDataRow.grade,
                    level: targetBodyDataRow.level
                }
                listFilter.push(pushListFilterRow);
            } else {
                // will be push data
                const pushListFilterRow:TActivitySpeakingHubFilterList = {
                    year: targetBodyDataRow.year,
                    semester: targetBodyDataRow.semester,
                    grade: targetBodyDataRow.grade,
                    level: targetBodyDataRow.level
                }
                // check is exist
                let isPush= true;
                for (let j = 0; j < listFilter.length; j++) {
                    const checkListFilterRowValue = listFilter[j];
                    const checkYear = checkListFilterRowValue.year === pushListFilterRow.year;
                    const checkSemester = checkListFilterRowValue.semester === pushListFilterRow.semester;
                    const checkGrade = checkListFilterRowValue.grade === pushListFilterRow.grade;
                    const checkLevel = checkListFilterRowValue.level === pushListFilterRow.level;
                    if (checkYear&&checkSemester&&checkGrade&&checkLevel) {
                        console.log('i ==',i,', j==',j)
                        console.log('checkYear =',checkYear)
                        console.log('checkSemester = ',checkSemester)
                        console.log('checkGrade =',checkGrade)
                        console.log('checkLevel =',checkLevel)
                        isPush=false;
                    }
                };

                if (isPush) {
                    listFilter.push(pushListFilterRow);
                }
            }
        };
        return listFilter;
    },
    // activity 관리 - writing hub
    setFilterPropertyDepsWH: (bodyData:any) => {
        console.log('=== setFilterPropertyDeps ===')
        const allBodyData = bodyData.body;
        // console.log('bodyData =',allBodyData)
        let listFilter:TActivityWritingHubFilterList[] = [];
        
        for (let i = 0; i < allBodyData.length; i++) {
            const targetBodyDataRow = allBodyData[i];
            if (i===0) {
                // console.log('i === 0 pushed init value')
                const pushListFilterRow:TActivityWritingHubFilterList = {
                    year: targetBodyDataRow.year,
                    semester: targetBodyDataRow.semester,
                    level: targetBodyDataRow.level
                }
                listFilter.push(pushListFilterRow);
            } else {
                // will be push data
                const pushListFilterRow:TActivityWritingHubFilterList = {
                    year: targetBodyDataRow.year,
                    semester: targetBodyDataRow.semester,
                    level: targetBodyDataRow.level
                }
                // check is exist
                let isPush= true;
                for (let j = 0; j < listFilter.length; j++) {
                    const checkListFilterRowValue = listFilter[j];
                    const checkYear = checkListFilterRowValue.year === pushListFilterRow.year;
                    const checkSemester = checkListFilterRowValue.semester === pushListFilterRow.semester;
                    const checkLevel = checkListFilterRowValue.level === pushListFilterRow.level;
                    if (checkYear&&checkSemester&&checkLevel) {
                        // console.log('i ==',i,', j==',j)
                        // console.log('checkYear =',checkYear)
                        // console.log('checkSemester = ',checkSemester)
                        // console.log('checkLevel =',checkLevel)
                        isPush=false;
                    }
                };

                if (isPush) {
                    listFilter.push(pushListFilterRow);
                }
            }
        };
        return listFilter;
    },
    // 레벨 및 교재 && activity 관리 셀렉트 후 다른 값 셋팅할때 사용
    // speaking hub
    // selectedValueArray: [year, semester, grade, level]
    // return : string[]
    filterValue: (item: TActivitySpeakingHubFilterList[], selectedValueArray: string[], selectKeyValue:string|number, compareKey: 'year'|'semester'|'grade', outputKey: 'semester'|'grade'|'level') => {
        const selectValue = selectKeyValue.toString();
        let returnList:string[] = []
        for (let i = 0; i < item.length; i++) {
            const currentItem = item[i];
            if (compareKey=== 'grade') {
                const checkYear = currentItem.year.toString() === selectedValueArray[0];
                const checkSemester = currentItem.semester.toString() === selectedValueArray[1];
                const checkGrade = currentItem[compareKey].toString() === selectValue;
                if (checkYear&&checkSemester&&checkGrade) {
                    const pushValue = currentItem['level'].toString();
                    let isPush = true;
                    for (let j = 0; j < returnList.length; j++) {
                        if (returnList[j] === pushValue) {
                            isPush=false;
                        }
                    };
                    if (isPush) {
                        returnList.push(pushValue)
                    }
                }

            } else {
                if (currentItem[compareKey].toString() === selectValue) {
                    const pushValue = currentItem[outputKey].toString();
                    let isPush = true;
                    for (let j = 0; j < returnList.length; j++) {
                        if (returnList[j] === pushValue) {
                            isPush=false;
                        }
                    }
                    if (isPush) {
                        returnList.push(pushValue);
                    }
                }
            }
        }
        return returnList;
    },
    // 레벨 및 교재 && activity 관리 셀렉트 후 다른 값 셋팅할때 사용
    // writing hub
    // selectedValueArray: [year, semester, level]
    // return : string[]
    filterValueWH: (item: TActivityWritingHubFilterList[], selectedValueArray: string[], selectKeyValue:string|number, compareKey: 'year'|'semester', outputKey: 'semester'|'level') => {
        const selectValue = selectKeyValue.toString();
        let returnList:string[] = []
        for (let i = 0; i < item.length; i++) {
            const currentItem = item[i];
            if (compareKey=== 'semester') {
                const checkYear = currentItem.year.toString() === selectedValueArray[0];
                const checkSemester = currentItem[compareKey].toString() === selectValue;
                if (checkYear&&checkSemester) {
                    const pushValue = currentItem['level'].toString();
                    let isPush = true;
                    for (let j = 0; j < returnList.length; j++) {
                        if (returnList[j] === pushValue) {
                            isPush=false;
                        }
                    };
                    if (isPush) {
                        returnList.push(pushValue)
                    }
                }

            } else {
                if (currentItem[compareKey].toString() === selectValue) {
                    const pushValue = currentItem[outputKey].toString();
                    let isPush = true;
                    for (let j = 0; j < returnList.length; j++) {
                        if (returnList[j] === pushValue) {
                            isPush=false;
                        }
                    }
                    if (isPush) {
                        returnList.push(pushValue);
                    }
                }
            }
        }
        return returnList;
    },

    todayYear: () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        // console.log('year =',year)
        // console.log('month =',month+1)
        const semester = (month > 2 && month < 9) ? 1 : 2;
        return {
            year, semester
        }
    },
    todayYearString: () => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = date.getMonth()+1;
        // console.log('year =',year)
        // console.log('month =',month+1)
        const semester = (month > 2 && month < 9) ? '1' : '2';
        return {
            year, semester
        }
    },
    defaultTodayYearAndSemesterSelector: () => {
        const date = new Date();
        const yearNum = date.getFullYear();
        const bfYear = yearNum - 1;
        const beforeYear = bfYear.toString();
        const year = yearNum.toString();
        const month = date.getMonth()+1;

        const semester = (month > 2 && month < 9) ? '1' : '2';
        // 3/1 ~ 8/31 : 1학기
        // 9/1 ~ next year 2/last : 2학기
        const selectYear = semester === '1' ? year : (
            month > 2 ? year : beforeYear
        )
        return {
            year:selectYear, semester
        }
    },
    /**
     * Activity > Speaking Hub > Role Play
     * @param headerData 
     * @returns sortedHeaderData : TLoadDataHeadTrans[]
     */
    activityHeaderSorting: (headerData:TLoadDataHeadTrans[] ) => {
        const accessorList = [
            'year', 'semester','grade','level','month',
            'topic_title_1st', 'topic_lv_1st',
            'topic_title_2nd', 'topic_lv_2nd',
            'topic_title_3rd', 'topic_lv_3rd',
            'topic_title_4th', 'topic_lv_4th',
        ];
        return headerData.sort((a,b) => {
            return accessorList.indexOf(a.accessor.toLowerCase()) - accessorList.indexOf(b.accessor.toLowerCase());
        });
    },
    /**
     * selected data에서 키 동적 추출 후 헤더로 사용
     * @param targetDataItem 
     * @returns filtered head list : TLoadDataHeadTrans[]
     */
    activityHeaderFilter: (targetDataItem:TRolePlayBooks ) => {
        // object 빈값 삭제
        
        const targetDataKeys = Object.keys(targetDataItem);
        const headerFullFormatList:TLoadDataHeadTrans[] = [
            {"accessor":"year","header":"년도"},
            {"accessor":"semester","header":"학기"},
            {"accessor":"grade","header":"grade"},
            {"accessor":"level","header":"level"},
            {"accessor":"month","header":"월"},
            {"accessor":"topic_title_1st","header":"1st topic title"},
            {"accessor":"topic_lv_1st","header":"1st topic lv."},
            {"accessor":"topic_title_2nd","header":"2nd topic title"},
            {"accessor":"topic_lv_2nd","header":"2nd topic lv."},
            {"accessor":"topic_title_3rd","header":"3rd topic title"},
            {"accessor":"topic_lv_3rd","header":"3rd topic lv."},
            {"accessor":"topic_title_4th","header":"4th topic title"},
            {"accessor":"topic_lv_4th","header":"4th topic lv."}
        ];
        return headerFullFormatList.filter((headItem) => {
            const isCurrentDataKey = targetDataKeys.indexOf(headItem.accessor) > 0;
            if (isCurrentDataKey) return headItem;
        });
    },
    removeNOTValueInObject: (obj: TRolePlayBooks) => {
        let newObj:any={};
        Object.keys(obj).forEach(key => {
            if (obj[key]) newObj[key] = obj[key];
        });
        return newObj;
    } 
}

export const cf = {
    basicTable,
}