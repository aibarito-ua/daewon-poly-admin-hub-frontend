import React from "react";
import useActivitySpeakHubStore from "../../../store/useActivitySpeakHubStore";
import useNavStore from "../../../store/useNavStore";
import { cf } from "../../../util/common/commonFunctions";
import { useComponentWillMount } from "../../../hooks/useEffectOnce";
import DebouncedDropdowFilter from "../../../components/commonComponents/BasicTable/stateDebouncedDropdown";
import { SvgSearchIcon } from "../../../components/commonComponents/BasicTable/svgs/SearchIcon";
import { getLMSparkWritingCampusDataAPI, getLMSparkWritingFilterDataAPI, getLMSparkWritingLevelsOfCampusDataAPI, getLMSparkWritingStudents } from "../../../api/LearningManagement/LearningManagementSparkWriting.api";
import useLearningManagementSparkWritingStore from "../../../store/useLearningManagementSparkWritingStore";
import LearningManagementStudentsTable from "../../../components/commonComponents/BasicTable/LearningManagementStudentsTable";
import useReportStore from "../../../store/useReportStore";
import useControlAlertStore from "../../../store/useControlAlertStore";
import { useLocation, useNavigate } from "react-router-dom";
import useLoginStore from "../../../store/useLoginStore";
import { CONFIG } from "../../../config";
import { Cookies } from "react-cookie";

const LMSparkWriting = () => {
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {
        filterData, setFilterData, studentDataInClass, setStudentDataInClass,
        loadDataHead,
        // feedback
        feedbackDataInStudent, setFeedbackDataInStudent,

        // keeping before selected filter values
        setMaintainFilterValues, maintainFilterValues,
        // keeping current page states
        maintainSparkWritingStates, setMaintainSparkWritingStates
    } = useLearningManagementSparkWritingStore();
    const {setCurrentSelectCodes} = useReportStore();
    const {
        commonStandbyScreen, setCommonStandbyScreen
    } = useControlAlertStore();
    const {
        // accessToken, mcYn, clientCode, memberCode
        setMaintenanceData
    } = useLoginStore();
    const navigate = useNavigate();
    const locationInfo = useLocation();
    
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
    const [classCurrentData,setClassCurrentData] = React.useState<TClassCurrentlyData[][]>([]);
    const [classTableHead, setClassTableHead] = React.useState<string[]>([]);

    // year filter api 사용 flag
    const [isLoadData, setIsLoadData] = React.useState<boolean>(false);

    // maintain load and save
    const maintainStates = (startCharacter: 'save'|'load'|'delete',options?: TMaintainStatesOptions) => {
        console.log('=== maintainStates ===::',startCharacter)
        if (startCharacter==='save') {
            let saveMaintainStates:TMaintainStates = {
                data: options?.data ? options.data: data,
                filterStates: options?.filterStates ? options.filterStates : (filterStates?filterStates:undefined),
                selectFilterValues:options?.selectFilterValues ? options.selectFilterValues : selectFIlterValues,
                selectCampusCode: options?.selectCampusCode ? options.selectCampusCode : selectCampusCode,
                selectLevelCode: options?.selectLevelCode ? options.selectLevelCode : selectLevelCode,
                selectClassCode: options?.selectClassCode ? options.selectClassCode : selectClassCode,
                selectFilterCampusList: options?.selectFilterCampusList ? options.selectFilterCampusList : selectFilterCampusList,
                selectFilterClassList: options?.selectFilterClassList ? options.selectFilterClassList : selectFilterClassList,
                selectFilterLevelList: options?.selectFilterLevelList ? options.selectFilterLevelList : selectFilterLevelList,
                filterAllList: options?.filterAllList ? options.filterAllList : filterAllList,
                grouping: options?.grouping ? options.grouping : grouping,
                isAllSelected: options?.isAllSelected ? options.isAllSelected : isAllSelected,
                isSearch: options?.isSearch ? options.isSearch : isSearch,
                classCurrentData: options?.classCurrentData ? options.classCurrentData : classCurrentData,
                classTableHead: options?.classTableHead ? options.classTableHead : classTableHead,
            };
            setMaintainSparkWritingStates(saveMaintainStates);
        } else if (startCharacter==='delete') {
            setMaintainSparkWritingStates(null)
        } else if (startCharacter==='load') {
            if (maintainSparkWritingStates) {
                setIsLoadData(true)
                setData(maintainSparkWritingStates.data);
                setFilterStates(maintainSparkWritingStates.filterStates)
                setSelectFilterValues(maintainSparkWritingStates.selectFilterValues);
                setSelectCampusCode(maintainSparkWritingStates.selectCampusCode);
                setSelectLevelCode(maintainSparkWritingStates.selectLevelCode);
                setSelectClassCode(maintainSparkWritingStates.selectClassCode);
                setSelectFilterCampusList(maintainSparkWritingStates.selectFilterCampusList);
                setSelectFilterClassList(maintainSparkWritingStates.selectFilterClassList);
                setSelectFilterLevelList(maintainSparkWritingStates.selectFilterLevelList);
                setFilterAllList(maintainSparkWritingStates.filterAllList);
                setGrouping(maintainSparkWritingStates.grouping);
                setIsAllSelected(maintainSparkWritingStates.isAllSelected);
                setIsSearch(maintainSparkWritingStates.isSearch);
                setClassCurrentData(maintainSparkWritingStates.classCurrentData);
                setClassTableHead(maintainSparkWritingStates.classTableHead);
            }

        }
    }

    // initialize setting before render screen
    const beforRenderedFn = async () => {
        const loadFilterData = await getLMSparkWritingCampusDataAPI();
        if (loadFilterData.error) {
            const reject = loadFilterData.error
            if (loadFilterData.error.statusCode===555) {
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
        }
        console.log('laod filter data =',loadFilterData)
        setFilterAllList(loadFilterData);
        const cookies = new Cookies();

        const userInfo = cookies.get('data');
        const mcYn = userInfo.mcYn;
        const clientCode:string[] = userInfo.clientCode;
        let defaultCampus = ['', '', ''];
        
        const campus_list_map = loadFilterData.campus.map((item) => {
            for (let i = 0; i < clientCode.length; i++) {
                if (item.code === clientCode[i]) {
                    return item.name;
                }
            }
            return ''
        });
        let campus_list:string[] =[]; 
        for (let l = 0; l < campus_list_map.length; l++) {
            if (campus_list_map[l] !== '') {
                campus_list.push(campus_list_map[l])
            }
        }
        if (campus_list.length === 1) {
            defaultCampus[0] = campus_list[0]
        }
        setSelectFilterCampusList(campus_list);
        setFilterData(loadFilterData);
        setFilterStates(loadFilterData);
        // campus default 
        
        if (maintainFilterValues.length === 0) {
            setSelectFilterValues(defaultCampus)
        }
        // if (campus_list.length === 1) {
        //     setSelectCampusCode(defaultCampus)
        // } else {
        // }
        setSelectCampusCode({name:'',code:''})
        
        setSelectLevelCode({name:'',code:''});
        setSelectClassCode({name:'',code:''});
        if (maintainFilterValues.length > 0) {
            setSelectFilterValues(maintainFilterValues)
        }
        console.log('beforeRenderedFn complete',maintainFilterValues)
    }
    
    
    React.useEffect(()=>{
        console.log('component did mount')
        const beforeUrl:string = locationInfo.search;
        if (maintainSparkWritingStates) {
            if (beforeUrl==="?feedback=end") {
                // draft에서 넘어온 후
                console.log('1')
                maintainStates('load');
                searchEventFunction()
            } else {
                // 다른 곳에서 넘어온 후
                console.log('2')
                maintainStates('delete');
                // beforRenderedFn();
            }
        } else {
            console.log('3')
            // 검색한 적이 없는 경우
            // beforRenderedFn();
        }
        return () => {
            // setCommonStandbyScreen({openFlag:false})
        }
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
            setSelectNavigationTitles(['학습 관리', 'Writing Hub', 'Spark Writing'])
        }
    }, [selectNavigationTitles])
    
    const searchEventFunction = async (e?:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        if (e) {
            e.preventDefault();
        }
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
                setCommonStandbyScreen({openFlag:true})
                setCurrentSelectCodes({target:'campus', name:selectCampusCode.name, code: selectCampusCode.code})
                setCurrentSelectCodes({target:'class', name:selectClassCode.name, code: selectClassCode.code})
                setCurrentSelectCodes({target:'level', name:selectLevelCode.name, code: selectLevelCode.code})
                const reqData:TFindStudentsReq = {
                    campusCode:selectCampusCode.code,
                    levelCode:selectLevelCode.code,
                    classCode:selectClassCode.code
                }
                
                // 데이터 호출 전 대기 화면을 위한 테이블 데이터 초기화
                setClassCurrentData([]);
                setIsLoadData(true);
                const rsp = await getLMSparkWritingStudents(reqData).then(res => {
                    if (res.error) {
                        const reject = res.error;
                        console.log('reject =',reject)
                        if (reject.statusCode===555 && reject.data.maintenanceInfo) {
                            let dumyMaintenanceData:TMaintenanceData = {
                                alertTitle: 'System Maintenance Notice',
                                data: reject.data.maintenanceInfo,
                                open: false,
                                type: ''
                            };
                            setMaintenanceData(dumyMaintenanceData)
                            navigate('/');
                        }
                    } else return res;
                });
                if (rsp) {
                    console.log('stu rsp ==',rsp)
                    if ( rsp.students.length > 0) {
                        // feedback value setting
                        const dumyFeedbackData:TFeedbackStates = JSON.parse(JSON.stringify(feedbackDataInStudent));
                        dumyFeedbackData.defautInfo.campus= selectCampusCode;
                        dumyFeedbackData.defautInfo.level = selectLevelCode;
                        dumyFeedbackData.defautInfo.class = selectClassCode;
                        dumyFeedbackData.defautInfo.book_name = rsp.book_name;
                        dumyFeedbackData.draft_2nd_data=undefined;
                        dumyFeedbackData.defautInfo.student_code='';
                        dumyFeedbackData.defautInfo.student_name={student_name_en:'',student_name_kr:''};
                        dumyFeedbackData.defautInfo.submit_date='';
                        dumyFeedbackData.defautInfo.unit_index=-1;
                        dumyFeedbackData.defautInfo.unit_topic='';
                        dumyFeedbackData.defautInfo.select_draft_id='';
                        dumyFeedbackData.defautInfo.step_label='';
                        dumyFeedbackData.status=null;
                        dumyFeedbackData.overall_comment='';
                        dumyFeedbackData.rubric={
                            name: '',
                            rubric_description:[]
                        }
                        dumyFeedbackData.status_1st=null;
    
                        // setting data year&semester
                        if (rsp.year && rsp.semester) {
                            let newFilterAllList = {...filterAllList};
                            newFilterAllList.semester = rsp.semester;
                            newFilterAllList.year = rsp.year;
                            setFilterAllList(newFilterAllList);
                        }
    
                        setFeedbackDataInStudent(dumyFeedbackData);
                        // table data setting
                        setStudentDataInClass(rsp)
                        const isLoadTableComplete = makeTableData(rsp);
                        if (isLoadTableComplete) {
                            setIsSearch(true)
                            maintainStates('save', {
                                isSearch: true, isAllSelected:true,
                            });
                            setIsLoadData(false);
                            setCommonStandbyScreen({openFlag:false})
                        }
                    } else {
                        console.log('::: No data to display ::: 11')
                        setCommonStandbyScreen({openFlag:false})
                        setIsSearch(false)
                        setStudentDataInClass({book_name:'',students:[]})
                        setEmptyPageMessage('No data to display!')
                    }

                } else {
                    console.log('::: No data to display ::: 222')
                    setCommonStandbyScreen({openFlag:false})
                    setIsSearch(false)
                    setStudentDataInClass({book_name:'',students:[]})
                    setEmptyPageMessage('No data to display!')
                }
            } else {
                setIsSearch(false)
                setStudentDataInClass({book_name:'',students:[]})
                setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
                setCommonStandbyScreen({openFlag:false})
                console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
            setStudentDataInClass({book_name:'',students:[]})
            setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
            setCommonStandbyScreen({openFlag:false})
        };
    }
    const makeTableData = (rsp: TLMSparkWritingStudentsListInClass) =>{
        
        const unitIdxs = Array.from({length:5},(_, valueKIdx) => {return valueKIdx+1});
        const draftIdxs = Array.from({length:3}, (_,valueKIdx) => {return valueKIdx+1});
        const headLabels = [
            ['no','student','unit 1', 'unit 2', 'unit 3', 'unit 4', 'unit 5'],
            ['1st draft', '2nd draft', 'report']
        ]
        let rowKeys:string[] =['no','student'];
        for (let unitIdx=0; unitIdx<unitIdxs.length; unitIdx++) {
            for (let stepIdx=0; stepIdx<draftIdxs.length; stepIdx++) {
                const stepLabel = draftIdxs[stepIdx]===1?'1st_draft': (
                    draftIdxs[stepIdx]===2?'2nd_draft':'report'
                )
                const textUnitVal = `unit_${unitIdxs[unitIdx]}_${stepLabel}`;
                rowKeys.push(textUnitVal)
            }
        }
        console.log('rowKeys ==',rowKeys)
        
        setClassTableHead(rowKeys);
        const bodyData: TClassCurrentlyData[][] = [];
        // // 학생 수 -> row
        for (let row = 0; row < rsp.students.length; row++) {
            const targetStudent = rsp.students[row];
            const student_name_kr = targetStudent.student_name_kr
            const student_name_en = targetStudent.student_name_en
            const studentNameSet:TNamesetData = {student_name_kr,student_name_en};
            let rowData = []
            for (let col = 0; col < rowKeys.length; col++) {
                const unit = parseInt(rowKeys[col].split('_')[1]);
                const draftString = rowKeys[col].split('_')[2];
                const draftNum = draftString==='1st'?1: (draftString==='2nd'?2:0)
                // console.log(`unit = ${unit}`,targetStudent.units[unit-1])
                
                // const targetUnitData = col===0 ? row+1: (col===1 ? studentNameSet : targetStudent.units[unit]);
                if (col===0) {
                    const makeCellData:TClassCurrentlyData = {
                        key: rowKeys[col],
                        width: 70,
                        value:{
                            num:row+1,
                            data:null,
                            nameset:null
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col,unit,draftNum]
                    }
                    rowData.push(makeCellData)
                } else if (col===1) {
                    const makeCellData:TClassCurrentlyData = {
                        key: rowKeys[col],
                        width: 140,
                        value:{
                            num:0,
                            nameset:studentNameSet,
                            data:null
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col,unit,draftNum]
                    }
                    rowData.push(makeCellData)
                } else {
                    const makeCellData:TClassCurrentlyData = {
                        key: rowKeys[col],
                        width: 95,
                        value:{
                            num:0,
                            nameset: null,
                            data: targetStudent.units[unit-1]
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
            return true;
        } else return false;
    }

    const filterButtonEventCampus= async (value:string) => {
        if (filterStates!==undefined) {
            let levelFilterList:any[]=[]
            const targetCampus=filterStates.campus
            let name = '';
            let code = '';
            const serviceLevel = ['MAG3','S3','GT4','MGT4','R4','MAG4']
            if (isLoadData) {

            } else {
                for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                    if (targetCampus[campusIndex].name === value) {
                        setSelectCampusCode({name: value, code: targetCampus[campusIndex].code})
                        setCurrentSelectCodes({target:'campus', name:targetCampus[campusIndex].name, code: targetCampus[campusIndex].code})
                        const levelsAtSelectCampusAPI = await getLMSparkWritingLevelsOfCampusDataAPI(targetCampus[campusIndex].code)
                        console.log('::: levelsAtSelectCampusAPI:::',levelsAtSelectCampusAPI)
                        if (levelsAtSelectCampusAPI.error) {
                            const reject = levelsAtSelectCampusAPI.error;
                            if (reject.statusCode===555 && reject.data.maintenanceInfo) {
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
                        const levelsAtSelectCampus = levelsAtSelectCampusAPI.level
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
                setMaintainFilterValues(dumySelectFilterValues)
            }
        }
    }
    const filterButtonEventLevel=(value:string) => {
        if (filterStates!==undefined) {
            let classFilterList:any[]=[]
            const targetCampus=filterStates.campus
            if (isLoadData) {

            } else {
                for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                    if (targetCampus[campusIndex].name === selectFIlterValues[0]) {
                        const targetLevel = targetCampus[campusIndex].level;
                        if (targetLevel) {
                            for (let levelIndex=0; levelIndex<targetLevel.length; levelIndex++) {
                                if (targetLevel[levelIndex].name === value) {
                                    setSelectLevelCode({name: value, code: targetLevel[levelIndex].code})
                                    setCurrentSelectCodes({target:'level', name:targetLevel[levelIndex].name, code: targetLevel[levelIndex].code})
                                    classFilterList=targetLevel[levelIndex].class.map((classItem) => {
                                        return classItem.name
                                    })
                                }
                            }
                        }
                    }
                }
                setSelectFilterClassList(classFilterList)
                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                dumySelectFilterValues[1] = value
                dumySelectFilterValues[2] = ''
                setSelectFilterValues(dumySelectFilterValues)
                setMaintainFilterValues(dumySelectFilterValues)
            }
        }
    }
    const filterButtonEventClass=(value:string, index?:number)=>{
        if (filterStates!==undefined) {
            const targetCampus=filterStates.campus
            if (isLoadData) {

            } else {
                for (let campusIndex= 0; campusIndex < targetCampus.length; campusIndex++) {
                    if (targetCampus[campusIndex].name === selectFIlterValues[0]) {
                        const targetLevel = targetCampus[campusIndex].level;
                        if (targetLevel) {
                            for (let levelIndex=0; levelIndex<targetLevel.length; levelIndex++) {
                                if (targetLevel[levelIndex].name === selectFIlterValues[1]) {
                                    const targetClass=targetLevel[levelIndex].class.sort((a,b)=>a.name.localeCompare(b.name));
                                    console.log('targetClass =',targetClass)
                                    console.log('index =',index)
                                    for(let classIndex=0; classIndex<targetClass.length; classIndex++) {
                                        console.log('classIndex =',classIndex)
                                        if (targetClass[classIndex].name === value && index === classIndex) {
                                            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                            console.log('dumySelectFilterValues =',dumySelectFilterValues)
                                            console.log('targetClass =',targetClass[classIndex])
                                            dumySelectFilterValues[2] = value
                                            setSelectFilterValues(dumySelectFilterValues)
                                            setMaintainFilterValues(dumySelectFilterValues)
                                            setSelectClassCode({name: value, code: targetClass[classIndex].code})
                                            setCurrentSelectCodes({target:'class', name:targetClass[classIndex].name, code: targetClass[classIndex].code})
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    useComponentWillMount(async()=>{
        console.log('component will mount')
        // 이전 페이지 path 체크
        // 현재 페이지: /LearningManagement/WritingHub/SparkWriting
        // 1st/2nd draft : /LearningManagement/WritingHub/SparkWriting/feedback/{stuCode}/data id
        // match 3 currentPath/feedback/str/str
        const beforeUrl:string = locationInfo.search;
        if (maintainSparkWritingStates) {
            if (beforeUrl==="?feedback=end") {
                // draft에서 넘어온 후
                console.log('1')
                maintainStates('load');
            } else {
                // 다른 곳에서 넘어온 후
                console.log('2')
                maintainStates('delete');
                beforRenderedFn();
            }
        } else {
            console.log('3')
            // 검색한 적이 없는 경우
            beforRenderedFn();
        }
    })

    return (
        
            // <div className='flex flex-1 w-full h-full justify-center items-center'>
                <div className='section-common-canvas'>
                    {/* filter row */}
                    <div className='scetion-common-filter-row-div py-[11px] pl-[20px] bg-white border-b-[1px] border-b-[#ddd]'>
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
                                onChange={(value, index)=>filterButtonEventClass(value, index)}
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
                                    <div className="learning-management-class-info-text justify-end">{`* 현재 학기에 대해서만 Spark Writing 첨삭이 가능합니다.`}</div>
                                </div>
                                <div className="flex flex-row h-[50px] items-center pl-[21px]">
                                    <div className="flex flex-row items-center h-[24px] gap-[8px]">
                                        <div className="flex border-l-[3px] h-[12px] border-l-[#0fa9cb]"/>
                                        <div className="flex learning-management-book-info-text">{`Book: ${studentDataInClass.book_name}`}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <LearningManagementStudentsTable
                                        dataHead={classTableHead}
                                        dataModel={classCurrentData}
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
export default LMSparkWriting;