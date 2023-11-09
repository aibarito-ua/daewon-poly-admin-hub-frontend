import React from "react";
import useActivitySpeakHubStore from "../../../../store/useActivitySpeakHubStore";
import useNavStore from "../../../../store/useNavStore";
import { cf } from "../../../../util/common/commonFunctions";
import { useComponentWillMount } from "../../../../hooks/useEffectOnce";
import DebouncedDropdowFilter from "../../../../components/commonComponents/BasicTable/stateDebouncedDropdown";
import { SvgSearchIcon } from "../../../../components/commonComponents/BasicTable/svgs/SearchIcon";
import { getAllReportByCampusLevelClass, getLMSparkWritingCampusDataAPI, getLMSparkWritingFilterDataAPI, getLMSparkWritingLevelsOfCampusDataAPI, getLMSparkWritingStudents, getReportOverallDatabyStu } from "../../../../api/LearningManagement/LearningManagementSparkWriting.api";
import useLearningManagementSparkWritingStore from "../../../../store/useLearningManagementSparkWritingStore";
import LearningResultManagementStudentsTable from "../../../../components/commonComponents/BasicTable/LearningResultManagementStudentsTable";
import useLearningResultManagementWHStore from "../../../../store/useLearningResultManagementWHStore";
import useLoginStore from "../../../../store/useLoginStore";
import { CONFIG } from "../../../../config";
import { Cookies } from "react-cookie";

const ReportAndPortfolio = () => {
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {
        filterData, setFilterData, studentDataInClass, setStudentDataInClass,
        loadDataHead,
        // feedback
        feedbackDataInStudent, setFeedbackDataInStudent
    } = useLearningManagementSparkWritingStore();
    const {
        getAllReportData, setAllReportData
    } = useLearningResultManagementWHStore();
    const {
        // accessToken, mcYn, clientCode, memberCode
    } = useLoginStore();
    
    // page states
    const [emptyPageMessage, setEmptyPageMessage] = React.useState<string>('검색 값을 선택 후 조회하세요.');
    // Table Data 
    const [data, setData] = React.useState<{body: TIdeaExchangeBooks[], head: TLoadDataHeadTrans[]}>({ body: [], head: [] });
    const [filterStates, setFilterStates]=React.useState<TFilterSparkWriting>();
    
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
    const [filterAllList, setFilterAllList] = React.useState<TFilterSparkWriting>({campus:[],semester: 0,year:0});
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    // studen table data
    const [classCurrentData,setClassCurrentData] = React.useState<TLRMWHClassCurrentlyData[][]>();
    const [classTableHead, setClassTableHead] = React.useState<string[]>([]);

    // initialize setting before render screen
    const beforRenderedFn = async () => {
        const loadFilterData = await getLMSparkWritingCampusDataAPI();
        
        console.log('laod filter data =',loadFilterData)
        setFilterAllList(loadFilterData);
        const cookies = new Cookies();
        const userInfo = cookies.get('data');
        const mcYn = userInfo.mcYn;
        const clientCode = userInfo.clientCode;
        let defaultCampus = ['','','']
        const campus_list_map = loadFilterData.campus.map((item) => {
            for (let i = 0; i < clientCode.length; i++) {
                if (item.code === clientCode[i]) {
                    return item.name;
                }
            }
            return '';
        })
        let campus_list:string[] =[]; 
        for (let l = 0; l < campus_list_map.length; l++) {
            if (campus_list_map[l] !== '') {
                campus_list.push(campus_list_map[l])
            }
        }
        if (campus_list.length === 1) {
            defaultCampus[0] = campus_list[0]
        }
        setSelectFilterValues(defaultCampus);
        setSelectFilterCampusList(campus_list);
        setFilterData(loadFilterData);
        setFilterStates(loadFilterData);
        console.log('beforeRenderedFn complete')
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
            setSelectNavigationTitles(['학습 결과 관리', 'Writing Hub', 'Spark Writing','Report & Portfolio'])
        }
    }, [selectNavigationTitles])
    
    const searchEventFunction = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log('is test =',isAllSelected)
        if (isAllSelected) {

            let check = true;
            const maxLength = selectFIlterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFIlterValues[selectIndex];
                // console.log('currentSelectValue =',currentSelectValue, ', idx =',selectIndex)
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
                const rsp = await getLMSparkWritingStudents(reqData);
                const overallData = await getAllReportByCampusLevelClass({
                    campus_code:selectCampusCode.code,
                    level_code:selectLevelCode.code,
                    class_code:selectClassCode.code
                })
                console.log('stu rsp ==',rsp)
                if (rsp.students.length > 0 && overallData) {
                    // feedback value setting
                    const dumyFeedbackData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
                    dumyFeedbackData.defautInfo.campus= selectCampusCode;
                    dumyFeedbackData.defautInfo.level = selectLevelCode;
                    dumyFeedbackData.defautInfo.class = selectClassCode;
                    dumyFeedbackData.defautInfo.book_name = rsp.book_name;
                    setFeedbackDataInStudent(dumyFeedbackData);
                    setAllReportData(overallData);
                    // table data setting
                    makeTableData(rsp, overallData)
                    setStudentDataInClass(rsp)
                    setIsSearch(true)
                } else {
                    setStudentDataInClass({book_name:'',students:[]})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                }
            } else {
                setIsSearch(false)
                setStudentDataInClass({book_name:'',students:[]})
                setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
                console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
            setStudentDataInClass({book_name:'',students:[]})
            setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
        };
    }
    const makeTableData = (rsp: TLMSparkWritingStudentsListInClass, overallPortfolio:TGetAllWritingReport) =>{
        const unitIdxs = Array.from({length:5},(_, valueKIdx) => {return valueKIdx+1});
        const draftIdxs = Array.from({length:2}, (_,valueKIdx) => {return valueKIdx+1});
        const headLabels = [
            ['no','student','unit 1', 'unit 2', 'unit 3', 'unit 4', 'unit 5'],
            ['report','portfolio']
        ]
        let rowKeys:string[] =['no','student'];
        for (let unitIdx=0; unitIdx<unitIdxs.length; unitIdx++) {
            for (let stepIdx=0; stepIdx<draftIdxs.length; stepIdx++) {
                const stepLabel = draftIdxs[stepIdx]===1?'report': 'portfolio'
                const textUnitVal = `unit_${unitIdxs[unitIdx]}_${stepLabel}`;
                rowKeys.push(textUnitVal)
            }
        }
        console.log('rowKeys ==',rowKeys)
        setClassTableHead(rowKeys);
        const bodyData: TLRMWHClassCurrentlyData[][] = [];
        // // 학생 수 -> row
        for (let row = 0; row < rsp.students.length; row++) {
            const targetStudent = rsp.students[row];
            
            const student_name_kr = targetStudent.student_name_kr
            const student_name_en = targetStudent.student_name_en
            const studentNameSet:TNamesetData = {student_name_kr,student_name_en};
            let currentlyPortfolio:TGetAllWritingReportStudent[]=[];
            let userInfoBasic:{student_code: string;
                student_name_en: string;
                student_name_kr: string;} = {student_code:'',student_name_en:'',student_name_kr:''}
            // find portfolio
            for (let i = 0; i < overallPortfolio.students.length; i++) {
                if (overallPortfolio.students[i].student_code === targetStudent.student_code) {
                    userInfoBasic.student_code=overallPortfolio.students[i].student_code;
                    userInfoBasic.student_name_en=overallPortfolio.students[i].student_name_en;
                    userInfoBasic.student_name_kr=overallPortfolio.students[i].student_name_kr;
                    currentlyPortfolio.push(overallPortfolio.students[i]);
                    break;
                }
            }
            let rowData = []
            for (let col = 0; col < rowKeys.length; col++) {
                
                const unit = parseInt(rowKeys[col].split('_')[1]);
                const draftString = rowKeys[col].split('_')[2];
                const draftNum = draftString==='1st'?1: (draftString==='2nd'?2:0)
                console.log(`unit = ${unit}`,targetStudent.units[unit-1])
                
                // const targetUnitData = col===0 ? row+1: (col===1 ? studentNameSet : targetStudent.units[unit]);
                if (col===0) {
                    
                    const makeCellData:TLRMWHClassCurrentlyData = {
                        key: rowKeys[col],
                        width: 70,
                        value:{
                            num:row+1,
                            report:null,
                            portfolio:null,
                            nameset:null,
                            userInfo: userInfoBasic,
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col,unit,draftNum]
                    }
                    rowData.push(makeCellData)
                } else if (col===1) {
                    const makeCellData:TLRMWHClassCurrentlyData = {
                        key: rowKeys[col],
                        width: 140,
                        value:{
                            num:0,
                            nameset:studentNameSet,
                            report:null,
                            portfolio:null,
                            userInfo: userInfoBasic,
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col,unit,draftNum]
                    }
                    rowData.push(makeCellData)
                } else {
                    let currentPortfolioData:TGetAllWritingReportStudentReports|null = null;
                    const targetPD = currentlyPortfolio[0].unit_reports;
                    for (let r = 0; r < targetPD.length; r++) {
                        if (targetPD[r].unit_index === unit) {
                            currentPortfolioData = targetPD[r];
                            break;
                        }
                    };
                    
                    const makeCellData:TLRMWHClassCurrentlyData = {
                        key: rowKeys[col],
                        width: 95,
                        value:{
                            num:0,
                            nameset: null,
                            report: targetStudent.units[unit-1],
                            portfolio: currentPortfolioData? currentPortfolioData: null,
                            userInfo: userInfoBasic,
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col,unit,draftNum]
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
            let levelFilterList:any[]=[]
            const targetCampus=filterStates.campus
            let name = '';
            let code = '';
            const serviceLevel = ['MAG3','GT4','MGT4','R4','MAG4']
            for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                if (targetCampus[campusIndex].name === value) {
                    setSelectCampusCode({name: value, code: targetCampus[campusIndex].code})
                    const levelsAtSelectCampus = (await getLMSparkWritingLevelsOfCampusDataAPI(targetCampus[campusIndex].code)).level
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
            setSelectFilterLevelList(levelFilterList);
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
                    <div className='scetion-common-filter-row-div py-[11px] pl-[20px] bg-white border-b-[1px] border-b-[#111]'>
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
                                <div className="flex flex-row h-[50px] items-center pl-[21px]">
                                    <div className="flex flex-row items-center h-[24px] gap-[8px]">
                                        <div className="flex border-l-[3px] h-[12px] border-l-[#0fa9cb]"/>
                                        <div className="flex learning-management-book-info-text">{`Book: ${studentDataInClass.book_name}`}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <LearningResultManagementStudentsTable
                                        dataHead={classTableHead}
                                        dataModel={classCurrentData?classCurrentData:[]}
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
export default ReportAndPortfolio;