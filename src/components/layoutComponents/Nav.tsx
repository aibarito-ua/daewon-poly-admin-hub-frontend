import React from 'react'
import useNavStore from "../../store/useNavStore";
import useLoginStore from '../../store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import { CommonFunctions } from '../../util/common/commonFunctions';

import Dropdown from './NavComponents/NavDropdown'

type INavItems = {
    [key in TRole]: {
        selectedMenu: {path:string, label: string}[]
    };
};
export const navItems:INavItems = {
    Y: {
        selectedMenu: [
            {path: "WritingClinic", label: 'Writing Clinic'},
            {path: "StudentProgress", label: 'My Progress'},
            {path: "StudentReport", label: 'My Report'},
            {path: "StudentPortfolio", label: 'My Portfolio'},
            // {path: "StudentHome", label: ''}
        ]
    },
    logout: {
        selectedMenu: []
    },
    N: {
        selectedMenu: [
            {path: "WritingClinic", label: 'Writing Clinic'},
            {path: "StudentProgress", label: 'My Progress'},
            {path: "StudentReport", label: 'My Report'},
            {path: "StudentPortfolio", label: 'My Portfolio'},
            // {path: "StudentHome", label: ''}
        ]
    },
    All: {
        selectedMenu: [
            {path: '', label: ''}
        ]
    }
}
export const Nav = () => {
    const {role } = useLoginStore()
    const {
        selectNavigationTitles, selectNavigationIndex,
        setSelectNavigationTitles
      } = useNavStore();
    const navigate = useNavigate();
    const {sidebarFlagged, setSidebarFlagged, topNavHiddenFlagged, subNavTitleString, subRightNavTitleString} = useNavStore();
    const onClickFlaggedSidebar = (e:React.MouseEvent) => {
        e.preventDefault();
        setSidebarFlagged(!sidebarFlagged)
    }
    
    React.useEffect(()=>{
        console.log('title :',selectNavigationTitles,selectNavigationIndex)
    },[selectNavigationTitles])
    const navMenuValue = [
        {
            title: '레벨 및 교재',
            subTitles: [
                {
                    name: 'Speaking Hub',
                    path: 'LevelandTextbook/SpeakingHub',
                    role: ''
                },
                {
                    name: 'Writing Hub',
                    path: 'LevelandTextbook/WritingHub',
                    role: ''
                }
            ]
        },
        {
            title: 'Activity 관리',
            subTitles: [
                {
                    name: 'Speaking Hub',
                    path: 'ActivityManagement/SpeakingHub/IdeaExchange',
                    role: ''
                },
                {
                    name: 'Writing Hub',
                    path: 'ActivityManagement/WritingHub/SparkWriting',
                    role: ''
                }
            ]
        },
        {
            title: '학습 관리',
            subTitles: [
                
                {
                    name: 'Writing Hub',
                    path: 'LearningManagement/WritingHub/SparkWriting',
                    role: ''
                }
            ]
        },
        {
            title: '학습 결과 관리',
            subTitles: [
                {
                    name: 'Speaking Hub',
                    path: 'LearningResultManagement/SpeakingHub/IdeaExchange/Progress',
                    role: ''
                },
                {
                    name: 'Writing Hub',
                    path: 'LearningResultManagement/WritingHub/SparkWriting/ReportAndPortfolio',
                    role: ''
                }
            ]
        },

    ]
    const svgHome = (
        <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
            <path d="M6.5 20V11H3L12 5L21 11H17.5V20H14.5V16.5C14.5 15.6716 13.8284 15 13 15H11C10.1716 15 9.5 15.6716 9.5 16.5V20H6.5Z" fill="#999999" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> 
            </g></svg>
    )
    const svgNextArrow = (
        <svg className='inline-block' xmlns="http://www.w3.org/2000/svg" width="3" height="5.29" viewBox="0 0 3 5.29">
            <path id="Icon_awesome-caret-right" data-name="Icon awesome-caret-right" d="M0,12.478V7.9a.356.356,0,0,1,.607-.252L2.9,9.938a.356.356,0,0,1,0,.5L.607,12.729A.356.356,0,0,1,0,12.478Z" 
            transform="translate(0 -7.544)" 
            fill="#999"/>
        </svg>
    )
    return (
        
        <nav className="block bg-[#0fa9cb] h-[120px] min-w-[1920px] w-full">
            {/* menu nav main area */}
            <div className="max-w-screen w-full h-[80px] flex flex-row items-center mx-auto px-[40px] font-bold text-[18px]">
                <div className="flex flex-row justify-start items-center w-[430px] h-full pl-[20px] cursor-default">
                    <div className="flex flex-col"
                    >
                        <span className="flex self-start whitespace-nowrap text-white">Speaking &</span>
                        <span className="flex self-start whitespace-nowrap text-white">Writing Hub</span>
                    </div>
                </div>

                <div className='flex flex-1 w-full h-full justify-center'>
                    <ul className='flex flex-row max-w-[1320px] h-full p-0 border-none justify-start gap-[100px]'>
                        {navMenuValue.map((navItem, navIndex)=>{
                            return (
                                <Dropdown 
                                    key={navIndex}
                                    displayButtonValue={navItem.title}
                                    dropValueList={navItem.subTitles}
                                    onChangeValue={()=>{}}
                                    currentIndex={navIndex}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
            {/* menu navigate text */}
            <div className='max-w-screen flex flex-wrap bg-white w-full h-[40px] items-center pl-4'>
                <div
                    className='flex w-fit h-fit pl-2 items-center'
                >{svgHome}<span className='pl-2'>{svgNextArrow}</span></div>
                <div className='flex flex-row text-white text-[16px] pl-2 h-[24px] cursor-default'>
                    {selectNavigationTitles.map((navigateLocationValue, navigateLocationIndex)=>{
                        const maxIndex = selectNavigationTitles.length - 1;
                        
                        return (
                            <div key={navigateLocationIndex} 
                            className={navigateLocationIndex===maxIndex ? 'text-[#222222] font-bold':'text-[#999999]'}>
                                {navigateLocationValue}
                                {navigateLocationIndex !== maxIndex && <span className='px-2'>{svgNextArrow}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </nav>

    )
}

