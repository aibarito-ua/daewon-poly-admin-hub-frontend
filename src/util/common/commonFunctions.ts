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
    }
}

export const cf = {
    basicTable,
}