import React from 'react';
import DebouncedDropdowFilter from '../../../components/commonComponents/BasicTable/stateDebouncedDropdown';
import TableComponent from '../../../components/commonComponents/BasicTable/IdeaExchangeTable';
import { SvgSearchIcon } from '../../../components/commonComponents/BasicTable/svgs/SearchIcon';
import useNavStore from '../../../store/useNavStore';
import { cf } from '../../../util/common/commonFunctions';
import useActivitySpeakHubStore from '../../../store/useActivitySpeakHubStore';
import { getActivityManagementSpeakingDataAPI } from '../../../api/ActivityManagement/ActivityManagementSpeaking.api';
import { useComponentWillMount } from '../../../hooks/useEffectOnce';
import useLoginStore from '../../../store/useLoginStore';
import { useNavigate } from 'react-router-dom';

const IdeaExchange = () => {
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {
        loadData,
        loadDataHeadKor,
        sortRules
    } = useActivitySpeakHubStore();
    const navigate = useNavigate();
    const {setMaintenanceData, maintenanceData} = useLoginStore();
    // init check
    
    // Table Data 
    const [data, setData] = React.useState<{body: TIdeaExchangeBooks[], head: TLoadDataHeadTrans[]}>({ body: [], head: [] });
    const [selectedData, setSelectedData] = React.useState<TIdeaExchangeBooks[]>([]);
    // page states
    // searchValue
    const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','','','']);
    // select search target value list
    const [selectFilterYearList, setSelectFilterYearList] = React.useState<string[]>([]);
    const [selectFilterSemesterList, setSelectFilterSemesterList] = React.useState<string[]>([]);
    const [selectFilterGradeList, setSelectFilterGradeList] = React.useState<string[]>([]);
    const [selectFilterLevelList, setSelectFilterLevelList] = React.useState<string[]>([]);

    // all filter lists
    const [allFilterListData, setAllFilterListData] = React.useState<TActivitySpeakingHubFilterList[]>([]);
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    // initialize setting before render screen
    const beforRenderedFn = async () => {
        
        const checkDate = cf.basicTable.defaultTodayYearAndSemesterSelector();
        console.log('today is =',checkDate)
        const loadDataFromAPI = await getActivityManagementSpeakingDataAPI('idea_exchange', sortRules.head.idea_exchange);
        if (loadDataFromAPI.error) {
            const reject = loadDataFromAPI.error
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
        } else {
            const yearFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'year')
            const semesterFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'semester')
            const gradeFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'grade')
            // const levelFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'level')
            const newFilter = cf.basicTable.setFilterPropertyDeps(loadDataFromAPI);
            console.log('newFilter before render ==',newFilter)
            setAllFilterListData(newFilter)
            
            setSelectFilterYearList(yearFilterValues)
            setSelectFilterSemesterList(semesterFilterValues)
            setSelectFilterGradeList(gradeFilterValues)
            setSelectFilterValues([checkDate.year, checkDate.semester,'',''])
            // setSelectFilterLevelList(levelFilterValues)
            setData({
                body: loadDataFromAPI.body,
                head: loadDataFromAPI.head
            })
        }
    }
    
    useComponentWillMount(()=>{
        console.log('component will mount')
        beforRenderedFn();
    })
    // React.useEffect(()=>{
    //     console.log('component did mount')
    //     if (data.body.length===0) {
    //         beforRenderedFn();
    //     }
    // },[])

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
            setSelectNavigationTitles(['Activity 관리', 'Speaking Hub', 'Idea Exchange'])
        }
    }, [selectNavigationTitles])
    
    const searchEventFunction = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log('is test =',isAllSelected)
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
                let selectedTableData:TIdeaExchangeBooks[] = [];
                for (let i = 0; i < data.body.length; i++) {
                    const item = data.body[i];
                    const checkYear = item.year.toString() === selectFIlterValues[0];
                    const checkSemester = item.semester.toString() === selectFIlterValues[1];
                    const checkGrade = item.grade.toString()=== selectFIlterValues[2];
                    const checkLevel = item.level === selectFIlterValues[3];
                    if (checkYear&&checkSemester&&checkGrade&&checkLevel) {
                        selectedTableData.push(item)
                    }
                }
                setSelectedData(selectedTableData);
                setIsSearch(true)
            } else {
                setIsSearch(false)
                console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
        };
    }

    return (
        <div className='section-common-canvas'>
            {/* filter row */}
            <div className='scetion-common-filter-row-div py-[11px] pl-[20px] border-b-[1px] border-b-[#111] bg-white'>
                <div className='section-common-filter-columns-div'>
                    {/* filter 1 : Year */}
                    <DebouncedDropdowFilter 
                        filterTitleLabel='년도'
                        column={selectFilterYearList}
                        onChange={value=>{
                            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                            dumySelectFilterValues[0] = value
                            // allFilterListData
                            console.log('year dumySelectFilterValues=',dumySelectFilterValues)
                            if (selectFilterYearList.length > 1) {
                                dumySelectFilterValues[2] = '';
                                const dumyFilterSemesterList = cf.basicTable.filterValue(allFilterListData,[],value,'year','semester');
                                const dumyFilterGradeList = cf.basicTable.filterValue(allFilterListData,[],value,'year','grade');
                                setSelectFilterSemesterList(dumyFilterSemesterList);
                                setSelectFilterGradeList(dumyFilterGradeList);
                            } 
                            setSelectFilterValues(dumySelectFilterValues);
                        }}
                        value={selectFIlterValues[0]}
                        originData={data}
                        table={data}
                    />
                    {/* filter 2 : Semester */}
                    <DebouncedDropdowFilter 
                        filterTitleLabel='학기'
                        column={selectFilterSemesterList}
                        onChange={value=>{
                            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                            dumySelectFilterValues[1] = value
                            console.log('semester dumySelectFilterValues =',dumySelectFilterValues)
                            if (selectFilterSemesterList.length>1) {
                                dumySelectFilterValues[2] = ''
                                const dumyFilterGradeList = cf.basicTable.filterValue(allFilterListData, [], value, 'semester', 'grade');
                                setSelectFilterGradeList(dumyFilterGradeList)
                            }
                            setSelectFilterValues(dumySelectFilterValues)
                            
                        }}
                        value={selectFIlterValues[1]}
                        originData={data}
                        table={data}
                    />
                    {/* filter 3 : Grade */}
                    <DebouncedDropdowFilter 
                        filterTitleLabel='Grade'
                        column={selectFilterGradeList}
                        onChange={value=>{
                            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                            dumySelectFilterValues[2] = value
                            const dumyFilterLevelList = cf.basicTable.filterValue(allFilterListData, dumySelectFilterValues, value, 'grade','level');
                            setSelectFilterLevelList(dumyFilterLevelList)
                            setSelectFilterValues(dumySelectFilterValues)
                            
                        }}
                        value={selectFIlterValues[2]}
                        originData={data}
                        table={data}
                    />
                    {/* filter 4 : Level */}
                    <DebouncedDropdowFilter 
                        filterTitleLabel='level'
                        column={selectFilterLevelList}
                        onChange={value=>{
                            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                            dumySelectFilterValues[3] = value
                            setSelectFilterValues(dumySelectFilterValues)
                            
                        }}
                        value={selectFIlterValues[3]}
                        originData={data}
                        table={data}
                    />
                </div>
                <button className={`Filter-search-button ${
                    isAllSelected ? 'section-common-filter-search-active': 'section-common-filter-search-normal'
                }`}
                    disabled={!isAllSelected}
                    onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>searchEventFunction(e)}
                ><span className='flex'><SvgSearchIcon className='w-5 h-5'/></span><span className=''>{'Search'}</span>
                </button>
            </div>
            <div className='section-common-table-wrap-div'>
                {/* table */}
                {isSearch ? (
                    <TableComponent 
                        table={{body:selectedData, head: data.head}}
                        options={{
                            sortEventTargetHeaderKeys:['level'],
                            mergeRowSpanKeys: grouping
                        }}
                    />
                ): null}
                <div className={`justify-center items-center ${isSearch ? 'w-0 h-0' :'w-full h-full flex flex-1'}`}>
                    <p className='flex flex-row text-[#bfbfbf] text-2xl'>{isSearch ? '':'검색 값을 선택 후 조회하세요.'}</p>
                </div>
            </div>
        </div>
    )
}
export default IdeaExchange;