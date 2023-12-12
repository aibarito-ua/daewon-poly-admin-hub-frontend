import React, { FC, SVGAttributes } from "react";
import useActivitySpeakHubStore from "../../../../store/useActivitySpeakHubStore";
import useNavStore from "../../../../store/useNavStore";
import { cf } from "../../../../util/common/commonFunctions";
import { useComponentWillMount } from "../../../../hooks/useEffectOnce";
import DebouncedDropdowFilter from "../../../../components/commonComponents/BasicTable/stateDebouncedDropdown";
import { SvgSearchIcon } from "../../../../components/commonComponents/BasicTable/svgs/SearchIcon";
import LRMSpeakingHubTable from "../../../../components/commonComponents/BasicTable/LRMSpeakingHubTable";
import { getLMRSpeakingHubAllCampusDataAPI, getLMRSpeakingHubFilterDataAPI, getLMRSpeakingHubLevelsOfCampusDataAPI, getLMRSpeakingHubStudents } from "../../../../api/LearningResultManagement/LearningResultManagementSpeakingHub";
import useLearningResultManagementSHStore from "../../../../store/useLearningResultManagementSHStore";
import { CompletedQuestionIconContained } from "../LearningResultManagementIcons";
import useControlAlertStore from "../../../../store/useControlAlertStore";
import useLoginStore from "../../../../store/useLoginStore";
import { useNavigate } from "react-router-dom";

const Progress = () => {
    const navigate = useNavigate();
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {
        sideNav,
        filterData, setFilterData, studentDataInClass, setStudentDataInClass,
        loadDataHead,
        chosenCampus, chosenLevel, chosenClass,
        setChosenCampus, setChosenLevel, setChosenClass,
        dropdown,
        isAllSelected, selectFilterValues,
        setSearchFunction
    } = useLearningResultManagementSHStore();
    const {
        commonStandbyScreen, setCommonStandbyScreen
    } = useControlAlertStore();
    const {setMaintenanceData} = useLoginStore();
    
    // page states
    const [emptyPageMessage, setEmptyPageMessage] = React.useState<string>('검색 값을 선택 후 조회하세요.');
    // const [filterStates, setFilterStates]=React.useState<TFilterLRMSpeaking>();
    
    // searchValue
    // const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','','']);
    // selected filter's code
    const [selectCampusCode, setSelectCampusCode] = React.useState<{name:string, code:string}>(chosenCampus ?? {name:'',code:''});
    const [selectLevelCode, setSelectLevelCode] = React.useState<{name: string, code: string}>(chosenLevel ?? {name:'',code:''});
    const [selectClassCode, setSelectClassCode] = React.useState<{name: string, code: string}>(chosenClass ?? {name:'',code:''});

    // select search target value list
    // const [selectFilterCampusList, setSelectFilterCampusList] = React.useState<string[]>([]);
    // const [selectFilterLevelList, setSelectFilterLevelList] = React.useState<string[]>([]);
    // const [selectFilterClassList, setSelectFilterClassList] = React.useState<string[]>([]);

    // original filter values
    const [filterAllList, setFilterAllList] = React.useState<TFilterLRMSpeaking>(filterData ?? {campus:[],semester: 0,year:0});
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    // const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    // studen table data
    const [classCurrentData,setClassCurrentData] = React.useState<TLRMSpeakingHubTableCellData[][]>();
    const [classTableHead, setClassTableHead] = React.useState<string[]>([]);

    const QuestionAnalysisTable: FC<{question: TLRMSpeakingHubIdeaExchangeQuestion}> = (props: {question: TLRMSpeakingHubIdeaExchangeQuestion}) => {
        return (
            <div>
                <table className='w-[660px] h-[86px] mt-[14px] mb-[0.5px] p-0'>
                    <thead className='h-[42px] mb-[13px] pb-[11px] bg-[#f6fdff] border-t-[1px] border-t-[var(--material-theme-ref-primary-primary-100);]'>
                        <tr>
                            <th className='border-r-[1px] border-r-[#ddd] learning-management-analysis-table-th'>Word Count</th>
                            <th className='border-l-[1px] border-l-[#ddd] learning-management-analysis-table-th'>Speaking Turns</th>
                        </tr>
                    </thead>
                    <tbody className='h-[43px] border-t-[1px] border-t-[#ddd] border-b-[1px] border-b-[#ddd]'>
                        <tr>
                            <td className='border-r-[1px] border-r-[#ddd] learning-management-analysis-table-td'>{props.question.word_count}</td>
                            <td className='border-l-[1px] border-l-[#ddd] learning-management-analysis-table-td'>{props.question.turn_count}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    React.useEffect(()=>{
        console.log('component did mount')
        handleSearch()
        setSearchFunction(searchEventFunction)
    },[])

    React.useEffect(()=>{
        setSearchFunction(searchEventFunction)
    }, [chosenCampus, chosenLevel, chosenClass])
    React.useEffect(()=>{
        if (grouping.length === 0) {
            setGrouping(['year','semester','grade','level'])
        }
        
        return () => {
            setSelectNavigationTitles([])
            // setIsAllSelected(false)
        }
    }, [grouping])
    React.useEffect(()=>{
        if (selectNavigationTitles.length === 0) {
            setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Idea Exchange','Progress'])
        }
    }, [selectNavigationTitles])
    
    const handleSearch = async () => {
        if (isAllSelected) {
            let check = true;
            const maxLength = selectFilterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFilterValues[selectIndex];
                if (currentSelectValue===''||currentSelectValue===null) {
                    check = false;
                    break;
                }
            }
            if (check && chosenCampus && chosenLevel && chosenClass) {
                setCommonStandbyScreen({openFlag: true})
                if(chosenCampus)
                    setSelectCampusCode(chosenCampus)
                if(chosenLevel)
                    setSelectLevelCode(chosenLevel)
                if(chosenClass)
                    setSelectClassCode(chosenClass)
                console.log('props.selectFIlterValues =', selectFilterValues)
                console.log('filter items ==',chosenCampus,chosenLevel,chosenClass)
                const reqData:TFindStudentsReq = {
                    campusCode:chosenCampus.code,
                    levelCode:chosenLevel.code,
                    classCode:chosenClass.code
                }
                // TODO change the response here
                const rsp = await getLMRSpeakingHubStudents(reqData).then((res) => {
                    if (res.error) {
                        const reject = res.error
                        if (reject.data.maintenanceInfo) {
                            let dumyMaintenanceData:TMaintenanceData = {
                                alertTitle: 'System Maintenance Notice',
                                data: reject.data.maintenanceInfo,
                                open: false,
                                type: ''
                            };
                            setMaintenanceData(dumyMaintenanceData)
                            navigate('/');
                        }
                    }
                    return res
                });
                setCommonStandbyScreen({openFlag: false})
                console.log('stu rsp ==',rsp)

                if(!rsp.idea_exchange) {
                    console.log('idea exchange is null')
                    setStudentDataInClass({idea_exchange: {book_name: '', students: []}, story_vlog: rsp.story_vlog, role_play: rsp.role_play})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                    return
                }

                if (rsp.idea_exchange.students.length > 0) {
                    // table data setting
                    makeTableData(rsp.idea_exchange)
                    setStudentDataInClass(rsp)
                    setIsSearch(true)
                } else {
                    setStudentDataInClass({idea_exchange: {book_name: '', students: []}, story_vlog: rsp.story_vlog, role_play: rsp.role_play})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                }
            } else {
                setIsSearch(false)
                setStudentDataInClass({idea_exchange: {book_name: '', students: []}, story_vlog: null, role_play: null})
                setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
                console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
            setStudentDataInClass({idea_exchange: {book_name: '', students: []}, story_vlog: null, role_play: null})
            setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
        };
    }

    const searchEventFunction = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log('allSelected =',isAllSelected)
        handleSearch()
    }
    const makeTableData = (rsp: TLRMSpeakingHubIdeaExchange) =>{
        // we assume that lessons.length > 0 and quessions.length > 0
        const lessonIdxs = Array.from({length: rsp.students[0].lessons.length},(_, valueKIdx) => {return valueKIdx+1});
        const questionsIdxs = Array.from({length: rsp.students[0].lessons[0].questions.length}, (_,valueKIdx) => {return valueKIdx+1});
        let rowKeys:string[] =['no','student'];
        for (let lessonIdx=0; lessonIdx<lessonIdxs.length; lessonIdx++) {
            for (let qIdx=0; qIdx<questionsIdxs.length; qIdx++) {
                const stepLabel = questionsIdxs[qIdx]===1?'Q1': 'Q2';
                const textLessonVal = `lesson_${lessonIdxs[lessonIdx]}_${stepLabel}`; // lesson_i_Qx
                rowKeys.push(textLessonVal)
            }
        }
        console.log('rowKeys ==',rowKeys)
        
        setClassTableHead(rowKeys);
        const bodyData: TLRMSpeakingHubTableCellData[][] = [];
        // // 학생 수 -> row
        for (let row = 0; row < rsp.students.length; row++) {
            const targetStudent = rsp.students[row];
            const student_name_kr = targetStudent.student_name_kr
            const student_name_en = targetStudent.student_name_en
            const studentNameSet:TNamesetData = {student_name_kr,student_name_en};
            const number_of_questions: number = targetStudent.lessons[0].questions.length; // we assume that the number of lessons is bigger than 0
            let rowData = []
            for (let col = 0; col < rowKeys.length; col++) {
                const lessonNumber = parseInt(rowKeys[col].split('_')[1])
                if (col===0) {
                    // NO
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 70,
                        value:{
                            num:row+1,
                            data:null,
                            nameset:null,
                            show: false,
                            jsxElem:null,
                            modalContent:null
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                } else if (col===1) {
                    // username
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 140,
                        value:{
                            num:0,
                            nameset:studentNameSet,
                            data:null,
                            show: false,
                            jsxElem:null,
                            modalContent:null
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                } else {
                    if(!chosenClass){
                        console.log("Chosen class is null")
                        return
                    }
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 60,
                        title: 'Idea Exchange AI Analysis',
                        student: {...studentNameSet, class: chosenClass.name},
                        value:{
                            num:0,
                            nameset: null,
                            description: `Lesson ${lessonNumber} - Question ${targetStudent.lessons[lessonNumber - 1].questions[(col - 2) % number_of_questions].question_index}`,
                            data: {
                                lesson: targetStudent.lessons[lessonNumber - 1]
                            },
                            show: targetStudent.lessons[lessonNumber - 1].questions[(col - 2) % number_of_questions].is_completed,
                            jsxElem: <CompletedQuestionIconContained className='learning-management-class-table-complete-question-icon'/>,
                            modalContent: <QuestionAnalysisTable question={targetStudent.lessons[lessonNumber - 1].questions[(col - 2) % number_of_questions]}/>
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                }
            }
            bodyData.push(rowData)
        }

        console.log('bodyData =',bodyData)
        if (bodyData.length>0) {
            setClassCurrentData(bodyData)
        }
    }

    return (
        <div className='section-common-table-wrap-div bg-white'>
            {/* table */}
            {isSearch ? (
                <div className="flex flex-col">
                    <div className="flex flex-row h-[41px] py-[11px] pl-[21px] pr-[10px] bg-[#f5f5f5] border-t-[1px] border-t-[#ddd] border-b-[1px] border-b-[#ddd]">
                        <div className="learning-management-class-info-text justify-start">{`${filterAllList.year}년 ${filterAllList.semester}학기 / ${selectCampusCode.name} / ${selectLevelCode.name} / ${selectClassCode.name}`}</div>
                        <div className="learning-management-class-info-text justify-end">{`* 현재 학기에 대해서만 결과 조회가 가능합니다.`}</div>
                    </div>
                    <div className="flex flex-row h-[50px] items-center pl-[21px] border-b-[1px] border-b-[#111]">
                        <div className="flex flex-row items-center h-[24px] gap-[8px]">
                            <div className="flex border-l-[3px] h-[12px] border-l-[#0fa9cb]"/>
                            <div className="flex learning-management-book-info-text">{`Book: ${studentDataInClass?.idea_exchange?.book_name}`}</div>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <LRMSpeakingHubTable
                            dataHead={classTableHead}
                            dataModel={classCurrentData?classCurrentData:[]}
                            subHeadingsCount={studentDataInClass?.idea_exchange?.students?.[0]?.lessons?.[0]?.questions?.length ?? 2}
                        />
                    </div>
                </div>

            ): null}
            <div className={`justify-center items-center ${isSearch ? 'w-0 h-0' :'w-full h-full flex flex-1'}`}>
                <p className='flex flex-row text-[#bfbfbf] text-2xl'>{isSearch ? '':emptyPageMessage}</p>
            </div>
        </div>        
    )

}
export default Progress;