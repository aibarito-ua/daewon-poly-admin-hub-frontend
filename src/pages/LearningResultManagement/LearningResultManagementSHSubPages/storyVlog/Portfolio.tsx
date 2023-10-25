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
import { CompletedQuestionIcon, CompletedQuestionIconContained, VideoIcon } from "../LearningResultManagementIcons";

const Portfolio = () => {
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {
        filterData, setFilterData, studentDataInClass, setStudentDataInClass,
        loadDataHead,
    } = useLearningResultManagementSHStore();
    
    // page states
    const [emptyPageMessage, setEmptyPageMessage] = React.useState<string>('검색 값을 선택 후 조회하세요.');
    // Table Data 
    const [data, setData] = React.useState<{body: TIdeaExchangeBooks[], head: TLoadDataHeadTrans[]}>({ body: [], head: [] });
    const [filterStates, setFilterStates]=React.useState<TFilterLRMSpeaking>();
    
    // searchValue
    const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','','']);
    // selected filter's code
    const [selectCampusCode, setSelectCampusCode] = React.useState<{name:string, code:string}>({name:'',code:''});
    const [selectLevelCode, setSelectLevelCode] = React.useState<{name: string, code: string}>({name:'',code:''});
    const [selectClassCode, setSelectClassCode] = React.useState<{name: string, code: string}>({name:'',code:''});

    // select search target value list
    const [selectFilterCampusList, setSelectFilterCampusList] = React.useState<string[]>([]);
    const [selectFilterLevelList, setSelectFilterLevelList] = React.useState<string[]>([]);
    const [selectFilterClassList, setSelectFilterClassList] = React.useState<string[]>([]);

    // original filter values
    const [filterAllList, setFilterAllList] = React.useState<TFilterLRMSpeaking>({campus:[],semester: 0,year:0});
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    // studen table data
    const [classCurrentData,setClassCurrentData] = React.useState<TLRMSpeakingHubTableCellData[][]>();
    const [classTableHead, setClassTableHead] = React.useState<string[]>([]);

    // modal contents when icon is clicked
    const LessonSummary: FC<{lesson: TLRMSpeakingHubStoryVlogLesson}> = ({lesson}) => {
        return (
            <div className="learning-result-management-portfolio-text-box">
                <p className="learning-result-management-portfolio-text-span ">{lesson.summary}</p>
            </div>
        )
    }
    const LessonVlog: FC<{lesson: TLRMSpeakingHubStoryVlogLesson}> = ({lesson}) => {
        return (
            <div className="mt-[14px] w-[660px] h-[346px]">
                <video width="660" height="100%" controls >
                    <source src={lesson.video} type="video/mp4"/>
                </video>
            </div>
        )
    }

    // initialize setting before render screen
    const beforRenderedFn = async () => {
        console.log('progress')
        const loadFilterData = await getLMRSpeakingHubAllCampusDataAPI();
        console.log('laod filter data =',loadFilterData)
        setFilterAllList(loadFilterData);
        if (loadFilterData&& loadFilterData.campus) {
            const campus_list = loadFilterData.campus.map((item) => {
                return item.name;
            })
            setSelectFilterCampusList(campus_list);
            setFilterData(loadFilterData);
            setFilterStates(loadFilterData);
            console.log('beforeRenderedFn complete')
        }
    }
    
    useComponentWillMount(()=>{
        console.log('component will mount')
        beforRenderedFn();
    })
    React.useEffect(()=>{
        console.log('component did mount')
        console.log('filterStates = ',filterStates)
    },[])

    React.useEffect(()=>{
        if (grouping.length === 0) {
            setGrouping(['year','semester','grade','level'])
        }
        
        return () => {
            setSelectNavigationTitles([])
            setIsAllSelected(false)
        }
    }, [grouping])
    React.useEffect(()=>{
        let selectCheck = false;
        for (let checkIndex = 0; checkIndex < selectFIlterValues.length; checkIndex++) {
            const targetSelectValue = selectFIlterValues[checkIndex];
            if (targetSelectValue==='') {
                selectCheck=true;
                break;
            }
        }
        if (selectCheck) {
            setIsAllSelected(false);
        } else {
            setIsAllSelected(true);
        }
    }, [selectFIlterValues])
    React.useEffect(()=>{
        if (selectNavigationTitles.length === 0) {
            setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Idea Exchange','Progress'])
        }
    }, [selectNavigationTitles])
    
    const searchEventFunction = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log('allSelected =',isAllSelected)
        if (isAllSelected) {
            let check = true;
            const maxLength = selectFIlterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFIlterValues[selectIndex];
                if (currentSelectValue===''||currentSelectValue===null) {
                    check = false;
                    break;
                }
            }
            if (check) {
                console.log('selectFIlterValues =',selectFIlterValues)
                console.log('filter items ==',selectCampusCode,selectLevelCode,selectClassCode)
                const reqData:TFindStudentsReq = {
                    campusCode:selectCampusCode.code,
                    levelCode:selectLevelCode.code,
                    classCode:selectClassCode.code
                }
                // TODO change the response here
                const rsp = await getLMRSpeakingHubStudents(reqData);
                console.log('stu rsp ==',rsp)

                if(!rsp.story_vlog){
                    console.log('story vlog is null')
                    setStudentDataInClass({...rsp, story_vlog: {book_name:'',students:[]}})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                    return
                }

                if (rsp.story_vlog.students.length > 0) {
                    // table data setting
                    makeTableData(rsp.story_vlog)
                    setStudentDataInClass(rsp)
                    setIsSearch(true)
                } else {
                    setStudentDataInClass({...rsp, story_vlog: {book_name:'',students:[]}})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                }
            } else {
                setIsSearch(false)
                setStudentDataInClass({idea_exchange: null, role_play: null, story_vlog: {book_name:'',students:[]}})
                setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
                console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
            setStudentDataInClass({idea_exchange: null, role_play: null, story_vlog: {book_name:'',students:[]}})
            setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
        };
    }
    const makeTableData = (rsp: TLRMSpeakingHubStoryVlog) =>{
        const lessonIdxs = Array.from({length: rsp.students[0].lessons.length},(_, valueKIdx) => {return valueKIdx+1});
        let rowKeys:string[] =['no','student'];
        for (let lessonIdx=0; lessonIdx<lessonIdxs.length; lessonIdx++) {
            rowKeys.push(`lesson_${lessonIdxs[lessonIdx]}_Summary`)
            rowKeys.push(`lesson_${lessonIdxs[lessonIdx]}_Vlog`)
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
                } else if (col % 2 == 0){
                    // question data
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 60,
                        title: 'Story Vlog Portfolio',
                        student: {...studentNameSet, class: selectClassCode.name},
                        value:{
                            num:0,
                            nameset: null,
                            description: `Lesson ${lessonNumber} - Summary`,
                            data: {
                                lesson: targetStudent.lessons[lessonNumber - 1]
                            },
                            show: targetStudent.lessons[lessonNumber - 1].is_completed_dialogue,
                            jsxElem: <CompletedQuestionIconContained className='learning-management-class-table-complete-question-icon'/>,
                            modalContent: <LessonSummary lesson={targetStudent.lessons[lessonNumber - 1]}/>
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                } else {
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 60,
                        title: 'Story Vlog Portfolio',
                        student: {...studentNameSet, class: selectClassCode.name},
                        value:{
                            num:0,
                            nameset: null,
                            description: `Lesson ${lessonNumber} - Vlog`,
                            data: {
                                lesson: targetStudent.lessons[lessonNumber - 1]
                            },
                            show: targetStudent.lessons[lessonNumber - 1].is_completed_recording,
                            jsxElem: <VideoIcon className='learning-management-class-table-complete-question-icon'/>,
                            modalContent: <LessonVlog lesson={targetStudent.lessons[lessonNumber - 1]} />
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

    const filterButtonEventCampus= async (value:string) => {
        if (filterStates!==undefined) {
            let levelFilterList:string[]=[]
            const targetCampus=filterStates.campus
            let name = '';
            let code = '';
            const serviceLevel = [
                'GT1', 'MGT1', 'S1','MAG1',
                'GT2', 'MGT2', 'S2','MAG2',
                'GT3', 'MGT3', 'S3','R3','MAG3',
                'GT4', 'MGT4', 'S4','R4','MAG4',
            ]
            for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                if (targetCampus[campusIndex].name === value) {
                    setSelectCampusCode({name: value, code: targetCampus[campusIndex].code})
                    const levelsAtSelectCampus = (await getLMRSpeakingHubLevelsOfCampusDataAPI(targetCampus[campusIndex].code)).level
                    targetCampus[campusIndex].level = levelsAtSelectCampus
                    for (let i = 0; i < levelsAtSelectCampus.length; i++) {
                        const levelTarget = levelsAtSelectCampus[i].name;
                        const findTarget = serviceLevel.includes(levelTarget);
                        if (findTarget) {
                            levelFilterList.push(levelTarget);
                        }
                    }
                }
            }
            const sortLevelFilterList = levelFilterList.sort((a,b) => {
                return serviceLevel.indexOf(a) - serviceLevel.indexOf(b);
            });
            console.log('sortLevelFilterList =',sortLevelFilterList)
            setSelectFilterLevelList(sortLevelFilterList);
            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
            dumySelectFilterValues = [value,'','']
            console.log('dumySelectFilterValues= ',dumySelectFilterValues, selectCampusCode)
            setSelectFilterValues(dumySelectFilterValues)
        }
    }
    const filterButtonEventLevel=(value:string) => {
        if (filterStates!==undefined) {
            let classFilterList:any[]=[]
            const targetCampus=filterStates.campus
            for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                if (targetCampus[campusIndex].name === selectFIlterValues[0]) {
                    const targetLevel = targetCampus[campusIndex].level;
                    for (let levelIndex=0; levelIndex<targetLevel.length; levelIndex++) {
                        if (targetLevel[levelIndex].name === value) {
                            setSelectLevelCode({name: value, code: targetLevel[levelIndex].code})
                            classFilterList=targetLevel[levelIndex].class.map((classItem) => {
                                return classItem.name
                            })
                        }
                    }
                }
            }
            setSelectFilterClassList(classFilterList)
            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
            dumySelectFilterValues[1] = value
            dumySelectFilterValues[2] = ''
            setSelectFilterValues(dumySelectFilterValues)
        }
    }
    const filterButtonEventClass=(value:string)=>{
        if (filterStates!==undefined) {
            const targetCampus=filterStates.campus
            for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                if (targetCampus[campusIndex].name === selectFIlterValues[0]) {
                    const targetLevel = targetCampus[campusIndex].level;
                    for (let levelIndex=0; levelIndex<targetLevel.length; levelIndex++) {
                        if (targetLevel[levelIndex].name === selectFIlterValues[1]) {
                            const targetClass=targetLevel[levelIndex].class
                            for(let classIndex=0; classIndex<targetClass.length; classIndex++) {
                                if (targetClass[classIndex].name === value) {
                                    let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                    dumySelectFilterValues[2] = value
                                    setSelectFilterValues(dumySelectFilterValues)
                                    setSelectClassCode({name: value, code: targetClass[classIndex].code})
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        
            // <div className='flex flex-1 w-full h-full justify-center items-center'>
                <div className='section-common-canvas'>
                    {/* filter row */}
                    <div className='scetion-common-filter-row-div py-[11px] pl-[20px] bg-white border-b border-[#111]'>
                        <div className='section-common-filter-columns-div'>
                            {/* filter 1 : Campus */}
                            <DebouncedDropdowFilter 
                                filterTitleLabel='campus'
                                column={selectFilterCampusList}
                                onChange={value=>filterButtonEventCampus(value)}
                                value={selectFIlterValues[0]}
                                originData={data}
                                table={data}
                            />
                            {/* filter 2 : Level */}
                            <DebouncedDropdowFilter 
                                filterTitleLabel='level'
                                column={selectFilterLevelList}
                                onChange={value=>filterButtonEventLevel(value)}
                                value={selectFIlterValues[1]}
                                originData={data}
                                table={data}
                            />
                            {/* filter 3 : Class */}
                            <DebouncedDropdowFilter 
                                filterTitleLabel='class'
                                column={selectFilterClassList}
                                onChange={value=>filterButtonEventClass(value)}
                                value={selectFIlterValues[2]}
                                originData={data}
                                table={data}
                            />
                        </div>
                        
                        <button className={`Filter-search-button ${
                            isAllSelected ? 'section-common-filter-search-active': 'section-common-filter-search-normal'
                        }`}
                            disabled={!isAllSelected}
                            onClick={async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>await searchEventFunction(e)}
                        ><span className='flex'><SvgSearchIcon className='w-5 h-5'/></span><span className=''>{'Search'}</span>
                        </button>
                        
                    </div>
{/* border-b-[1px] border-b-[#111] */}
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
                                        <div className="flex learning-management-book-info-text">{`Book: ${studentDataInClass?.story_vlog?.book_name}`}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <LRMSpeakingHubTable
                                        dataHead={classTableHead}
                                        dataModel={classCurrentData?classCurrentData:[]}
                                        subHeadingsCount={2} // summary and vlog only
                                    />
                                </div>
                            </div>

                        ): null}
                        <div className={`justify-center items-center ${isSearch ? 'w-0 h-0' :'w-full h-full flex flex-1'}`}>
                            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{isSearch ? '':emptyPageMessage}</p>
                        </div>
                    </div>
                </div>
            // </div> 
        
    )

}
export default Portfolio;