import React from 'react'
import useLevelAndTextbookSpeakingStore from '../../store/useLevelAndTextbookSpeakingStore';

import useNavStore from '../../store/useNavStore';
import { SvgSearchIcon } from '../../components/commonComponents/BasicTable/svgs/SearchIcon';
import DebouncedDropdowFilter from '../../components/commonComponents/BasicTable/stateDebouncedDropdown';

import { cf } from '../../util/common/commonFunctions';
import LevelAndTextbookSpeakingTableComponent from '../../components/commonComponents/BasicTable/LevelandTextbookSpeakingTable';
import { useComponentWillMount } from '../../hooks/useEffectOnce';
import { getLevelAndTextbookSpeakingDataAPI } from '../../api/LevelAndTextBook/LevelAndTextBookSpeaking.api';

const LevelAndTextBookSpeakingHub = () => {
    // page usehook zustand
    const {
        selectNavigationTitles,
        setSelectNavigationTitles
    } = useNavStore();
    const {
        loadData,
        sortRules,
        setLoadData,
        setLoadDataHead
    } = useLevelAndTextbookSpeakingStore();
    
    // initialize setting before render screen
    const beforeRendereredFn = async () => {
        const loadDataFromAPI = await getLevelAndTextbookSpeakingDataAPI(sortRules);
        const yearFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.loadData, 'year');
        const semesterFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.loadData, 'semester');

        setSelectFilterYearList(yearFilterValues)
        setSelectFilterSemesterList(semesterFilterValues);

        setLoadDataHead(loadDataFromAPI.loadDataHeadKor);
        setLoadData(loadDataFromAPI.loadData, undefined);
        
        setData({
            body:loadDataFromAPI.loadData,
            head: loadDataFromAPI.loadDataHeadKor
        })
    }
    useComponentWillMount(()=>{
        console.log('component will mount')
        beforeRendereredFn();
    })
    React.useEffect(()=>{
        console.log('component did mount')
        if (data.body.length===0) {
            // if data not found at refresh or reconnection, should set init
            beforeRendereredFn();
        }
    },[])

    // Table Data 
    const [data, setData] = React.useState<{body: TLoadDataItem[], head: TLoadDataHeadTrans[]}>({ body: [], head: [] });
    
    // page states
    // searchValue
    const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','']);
    // select search target value list
    const [selectFilterYearList, setSelectFilterYearList] = React.useState<string[]>([]);
    const [selectFilterSemesterList, setSelectFilterSemesterList] = React.useState<string[]>([]);
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);
    
    React.useEffect(()=>{
        if (grouping.length === 0) {
            setGrouping(['year','semester','grade'])
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
            setIsSearch(false)
        } else {
            setIsAllSelected(true);
        }
    }, [selectFIlterValues])
    React.useEffect(()=>{
        if (selectNavigationTitles.length === 0) {
            setSelectNavigationTitles(['레벨 및 교재', 'Speaking Hub'])
        }
    }, [selectNavigationTitles])
    
    const searchEventFunction = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if (isAllSelected) {
            let check = true;
            const maxLength = selectFIlterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFIlterValues[selectIndex];
                console.log('currentSelectValue =',currentSelectValue, ', idx =',selectIndex)
                if (currentSelectValue===''||currentSelectValue===null) {
                    check = false;
                    break;
                }
            }
            if (check) {
                const filterData = loadData.speaking.filter((originItem, originIndex) => {
                    if ( originItem.year.toString() === selectFIlterValues[0] &&originItem.semester.toString() === selectFIlterValues[1]) return originItem;
                });
                setData({body:filterData, head:  data.head})
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
        <section className="section-common-layout px-[20px]">
            <div className='section-common-canvas'>
                {/* filter row */}
                <div className='scetion-common-filter-row-div py-[11px] border-b-[1px] border-b-[#111]'>
                    <div className='section-common-filter-columns-div'>
                        {/* filter 1 : Year */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='년도'
                            column={selectFilterYearList}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[0] = value
                                setSelectFilterValues(dumySelectFilterValues)
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
                                setSelectFilterValues(dumySelectFilterValues)
                            }}
                            value={selectFIlterValues[1]}
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
                <div className='flex flex-col w-full h-full overflow-y-auto'>
                    {/* table */}
                    { // conditional render table or information screen
                    isSearch ? ( 
                        <LevelAndTextbookSpeakingTableComponent 
                            table={data}
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
        </section>
    )
}
export default LevelAndTextBookSpeakingHub;