import React, { useEffect } from 'react';
import ActivitySpeakHubSideLayout from "../../../components/pageComponents/activityManagement/layout/ActivitySpeakHubSideLayout";
import useActivitySpeakHubStore from "../../../store/useActivitySpeakHubStore";

import useNavStore from '../../../store/useNavStore';
import { useNavigate, useLocation } from 'react-router-dom';
import LearningResultManagementSpeakingHubSideLayout from '../../../components/pageComponents/activityManagement/layout/LearningResultManagementSpeakingHubSideLayout';
import useLearningResultManagementSHStore from '../../../store/useLearningResultManagementSHStore';

import DebouncedDropdowFilter from "../../../components/commonComponents/BasicTable/stateDebouncedDropdown";
import { SvgSearchIcon } from '../../../components/commonComponents/BasicTable/svgs/SearchIcon';
import { getLMRSpeakingHubAllCampusDataAPI, getLMRSpeakingHubLevelsOfCampusDataAPI } from '../../../api/LearningResultManagement/LearningResultManagementSpeakingHub';
import { useComponentWillMount } from '../../../hooks/useEffectOnce';


type TLearningResultManagementSpeakHubMainProps = {
    children: React.ReactComponentElement<any>;
}
export default function LearningResultManagementSpeakingHubMain (props: TLearningResultManagementSpeakHubMainProps) {

    const navigate = useNavigate();
    const locationHook = useLocation();
    // list in zustand
    // const {sideNav} = useActivitySpeakHubStore();
    const {
        sideNav,
        filterData, setFilterData, studentDataInClass, setStudentDataInClass,
        loadDataHead,
        chosenCampus, chosenLevel, chosenClass,
        setChosenCampus, setChosenLevel, setChosenClass,
        dropdown,
        isAllSelected, setIsAllSelected,
        selectFilterValues, setSelectFilterValues,
        searchEventFunction, setSearchFunction
    } = useLearningResultManagementSHStore();
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();

    // side list select
    const [sideSelected, setSideSelected] = React.useState<number[]>([0,0]);

    /** Search bar related */
    const [data, setData] = React.useState<{body: TIdeaExchangeBooks[], head: TLoadDataHeadTrans[]}>({ body: [], head: [] });
    
    // searchValue
    // const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','','']);
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    // const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);

    // search function
    // const [searchEventFunction, setSearchFunction] = React.useState<(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void>(() => () => {})

    const beforRenderedFn = async () => {
        console.log('progress')
        const loadFilterData = await getLMRSpeakingHubAllCampusDataAPI();
        console.log('laod filter data =',loadFilterData)
        if (loadFilterData&&loadFilterData.campus) {
            const campus_list = loadFilterData.campus.map((item) => {
                return item.name;
            })
            setFilterData(loadFilterData);
            dropdown.setSelectFilterCampusList(campus_list)
            console.log('beforeRenderedFn complete')
        }
    }
    
    useComponentWillMount(()=>{
        console.log('component will mount')
        beforRenderedFn();
    })
    React.useEffect(()=>{
        console.log('component did mount')
        console.log('filterStates = ',filterData)
        return () => {
            console.log("clear store on leave")
            setChosenCampus(null)
            setChosenLevel(null)
            setChosenClass(null)
            setSelectFilterValues(['', '', ''])
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
        for (let checkIndex = 0; checkIndex < selectFilterValues.length; checkIndex++) {
            const targetSelectValue = selectFilterValues[checkIndex];
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
    }, [selectFilterValues])
    // React.useEffect(()=>{
    //     if (selectNavigationTitles.length === 0) {
    //         setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Idea Exchange','Progress'])
    //     }
    // }, [selectNavigationTitles])

    const goLink = async (link: string, role: string) => {
        console.log("link :::", link);
        const rolePath = role!=='' ? (
          role==='Head'? 'Head': (role==='Campus' ? 'Campus': '')
        ) : ''
        const pathString = rolePath === '' ? `/${link}` : `/${rolePath}/${link}`
        console.log(pathString)
        navigate(pathString);
    }

    const sideOnClickEvent = async (selectListNumber:number, selectSubListNumber:number, path:string) => {
        let selectPath = ''
        const dumySideSelected:number[] = JSON.parse(JSON.stringify(sideSelected));
        dumySideSelected[selectListNumber] = selectSubListNumber;
        setSideSelected(dumySideSelected);
        if (selectListNumber===0) {
            selectPath = `LearningResultManagement/SpeakingHub/IdeaExchange/${path}`
        } else if (selectListNumber===1) {
            selectPath = `LearningResultManagement/SpeakingHub/StoryVlog/${path}`
        } else if (selectListNumber===2) {
            selectPath = `LearningResultManagement/SpeakingHub/RolePlay/${path}`
        }
        await goLink(selectPath, '')
    }

    React.useEffect(()=>{
        const pathParam = locationHook.pathname.split('/');
        const prelast = pathParam.slice(-2)[0];
        const last = pathParam.slice(-1)[0];
        if (selectNavigationTitles.length===0) {
            if (prelast==='IdeaExchange') {
                setSideSelected([0, last == 'Progress' ? 0 : 1])
                setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Idea Exchange'])
            } else if (prelast==='StoryVlog') {
                setSideSelected([1, last == 'Progress' ? 0 : 1])
                setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Story Vlog'])
            } else if (prelast === 'RolePlay') {
                setSideSelected([2, last == 'Progress' ? 0 : 1])
                setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Role-play'])
            }
        } 
    },[selectNavigationTitles ])

    /** Search bar related */

    const filterButtonEventCampus= async (value:string) => {
        if (filterData) {
            let levelFilterList:string[]=[]
            // const targetCampus=filterData.campus
            let name = '';
            let code = '';
            const serviceLevel = [
                'GT1', 'MGT1', 'S1','MAG1',
                'GT2', 'MGT2', 'S2','MAG2',
                'GT3', 'MGT3', 'S3','R3','MAG3',
                'GT4', 'MGT4', 'S4','R4','MAG4',
            ]
            for (let campusIndex= 0; campusIndex < filterData.campus.length; campusIndex++) {
                if (filterData.campus[campusIndex].name === value) {
                    setChosenCampus({name: value, code: filterData.campus[campusIndex].code})
                    const levelsAtSelectCampus = (await getLMRSpeakingHubLevelsOfCampusDataAPI(filterData.campus[campusIndex].code)).level
                    filterData.campus[campusIndex].level = levelsAtSelectCampus
                    console.log(filterData.campus[campusIndex])
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
            dropdown.setSelectFilterLevelList(sortLevelFilterList);
            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFilterValues));
            dumySelectFilterValues = [value,'','']
            console.log('dumySelectFilterValues= ',dumySelectFilterValues, chosenCampus)
            setSelectFilterValues(dumySelectFilterValues)
        }
    }
    const filterButtonEventLevel=(value:string) => {
        if (filterData) {
            console.log(filterData)
            let classFilterList:any[]=[]
            // const targetCampus=filterData.campus
            for (let campusIndex= 0; campusIndex < filterData.campus.length; campusIndex++) {
                if (filterData.campus[campusIndex].name === selectFilterValues[0]) {
                    console.log(filterData.campus[campusIndex])
                    const targetLevel = filterData.campus[campusIndex].level;
                    for (let levelIndex=0; levelIndex<targetLevel.length; levelIndex++) {
                        if (targetLevel[levelIndex].name === value) {
                            setChosenLevel({name: value, code: targetLevel[levelIndex].code})
                            classFilterList=targetLevel[levelIndex].class.map((classItem) => {
                                return classItem.name
                            })
                        }
                    }
                }
            }
            dropdown.setSelectFilterClassList(classFilterList)
            let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFilterValues));
            dumySelectFilterValues[1] = value
            dumySelectFilterValues[2] = ''
            setSelectFilterValues(dumySelectFilterValues)
        }
    }
    const filterButtonEventClass=(value:string)=>{
        if (filterData) {
            // const targetCampus=filterData.campus
            for (let campusIndex= 0; campusIndex < filterData.campus.length; campusIndex++) {
                if (filterData.campus[campusIndex].name === selectFilterValues[0]) {
                    const targetLevel = filterData.campus[campusIndex].level;
                    for (let levelIndex=0; levelIndex<targetLevel.length; levelIndex++) {
                        if (targetLevel[levelIndex].name === selectFilterValues[1]) {
                            const targetClass=targetLevel[levelIndex].class
                            for(let classIndex=0; classIndex<targetClass.length; classIndex++) {
                                if (targetClass[classIndex].name === value) {
                                    let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFilterValues));
                                    dumySelectFilterValues[2] = value
                                    setSelectFilterValues(dumySelectFilterValues)
                                    setChosenClass({name: value, code: targetClass[classIndex].code})
                                }
                            }
                        }
                    }
                }
            }
        }
    }



    return (
        <section className="section-common-aside-layout">
            <div className='flex flex-1 flex-row w-full h-full'>
                <LearningResultManagementSpeakingHubSideLayout
                    sideNav={sideNav}
                    setSideSelected={sideOnClickEvent}
                    sideSelected={sideSelected}
                />
                <div className='flex flex-1 -ml-[234px] pl-[234px] w-full h-full'>
                    <div className='section-common-canvas'>
                        {/* filter row */}
                        <div className='scetion-common-filter-row-div py-[11px] pl-[20px] bg-white'>
                            <div className='section-common-filter-columns-div'>
                                {/* filter 1 : Campus */}
                                <DebouncedDropdowFilter 
                                    filterTitleLabel='campus'
                                    column={dropdown.campusList}
                                    onChange={value=>filterButtonEventCampus(value)}
                                    value={selectFilterValues[0]}
                                    originData={data}
                                    table={data}
                                />
                                {/* filter 2 : Level */}
                                <DebouncedDropdowFilter 
                                    filterTitleLabel='level'
                                    column={dropdown.levelList}
                                    onChange={value=>filterButtonEventLevel(value)}
                                    value={selectFilterValues[1]}
                                    originData={data}
                                    table={data}
                                />
                                {/* filter 3 : Class */}
                                <DebouncedDropdowFilter 
                                    filterTitleLabel='class'
                                    column={dropdown.classList}
                                    onChange={value=>filterButtonEventClass(value)}
                                    value={selectFilterValues[2]}
                                    originData={data}
                                    table={data}
                                />
                            </div>
                            
                            <button className={`Filter-search-button rounded-[2px] ${
                                isAllSelected ? 'section-common-filter-search-active': 'section-common-filter-search-normal'
                            }`}
                                disabled={!isAllSelected}
                                onClick={async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>await searchEventFunction(e)}
                            ><span className='flex'><SvgSearchIcon className='w-5 h-5'/></span><span className=''>{'Search'}</span>
                            </button>
                        </div>
    {/* border-b-[1px] border-b-[#111] */}
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    )
}
