import React from 'react'
import SvgIconWritingHub from '../icons/ic_wr.svg';
import { commonSvgIcons } from '../../../../util/svgs/commonSvgIcons';

export default function LearningManagementWritingHubSideLayout (props:{
    sideNav:TSideNavData
    setSideSelected:Function
    sideSelected: number[]
}){
    // side list select
    const {
        sideNav,
        setSideSelected,
        sideSelected
    } = props;
    const [subListOpen, setSubListOpen] = React.useState<number[]>(Array.from({length:sideNav.titleList.length}, (v,i)=>{
        if (i===0) {return 0} else return -1;
    }));

    const handleSubListToggle = (index: number, subIndex:number) => {
        
        setSubListOpen((prevState: number[]) => {
            let newState = [...prevState];
            const newStateMp = newState.map((val,idx) => {
                if (index === idx) {
                    if (subIndex===-2) {
                        return subIndex;
                    } else if (subIndex===-1) {
                        return -2
                    } else {
                        return subIndex;
                    }
                } else {
                    if (subIndex===-2) {
                        return -1
                    } else {
                        return val
                    }
                }
            })
            return newStateMp;
        });
    }
    const SideListItem = (props:{label:string, selectIndex:number, subTitleList: TLMSparkWritingNavAsideSubTitleList[]}) => {
        const {label, selectIndex, subTitleList} = props;
        return (
            <li className={`flex flex-col w-full text-black hover:cursor-pointer border font-sans font-light`}>
                <div
                    className={`flex items-center w-full h-[45px] border-b-[1px] font-normal border-b-[#ddd] ${subListOpen[selectIndex]===-2 ? 'bg-[#ECFAFC] text-[#0fa9cb] border-r-[3px] border-r-[#0FA9CB]' : ''}`}
                    onClick={() => handleSubListToggle(selectIndex, -2)}
                >
                    <span className="flex flex-row items-center justify-between flex-1 mx-[20px] whitespace-nowrap learning-management-left-side-menu-font text-[#0fa9cb] capitalize">
                        {label}
                        {subListOpen[selectIndex]===-1 ? <commonSvgIcons.SideMenuPlusSVGIcon className='w-[11px] h-[11px]'/>: <commonSvgIcons.SideMenuMinusSVGIcon/>}
                        
                    </span>
                </div>
                {subTitleList.length > 0 && (
                    <ul className={subListOpen[selectIndex]=== -1 ? 'hidden': 'block'}>
                        {subTitleList.map((subTitle, subIndex) => (
                            <li
                                key={`sub-menu-${selectIndex}-${subIndex}`}
                                className={`pl-[30px] text-[#0fa9cb] font-bold learning-management-left-side-menu-font ${subListOpen[selectIndex] === subIndex ? 'bg-[#ECFAFC] border-r-[3px] border-r-[#0FA9CB]' : ''}`}
                                onClick={() => {
                                    handleSubListToggle(selectIndex, subIndex);
                                    // 메뉴로 이동
                                    setSideSelected(selectIndex, subIndex, subTitle.path)
                                }}
                            >
                                <span className='flex flex-row items-center h-[42px] gap-[5px] capitalize'>
                                    {subListOpen[selectIndex] === subIndex 
                                    ? <commonSvgIcons.SideSubMenuOpenActiveSVGIcon className='w-[6px] h-[6px]'/>
                                    :<commonSvgIcons.SideSubMenuOpenSVGIcon className='w-[6px] h-[6px]'/>}
                                    {subTitle.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        )
    }
    
    return (
        <div 
        className={`flex flex-col w-[234px] h-full transition-transform bg-white border-r border-gray-200 translate-x-0`}>
            <div className="flex h-[212px] px-3 pb-4 bg-[#F9F9F9] justify-center items-center">
                <div className='flex flex-col'>
                    {/* <SHSideIcon/> */}
                    <div className='flex flex-1 justify-center pt-[44px]'>
                        <img src={SvgIconWritingHub} />
                        {/* <WHSideIcon /> */}
                    </div>
                    <p className='flex flex-row text-[14px] pt-[12px] justify-center'>{'Writing Hub'}</p>
                </div>
            </div>
            <div className="flex flex-1 justify-start w-[234px] h-full">
                <ul className="w-[234px] border-collapse">
                    {sideNav.titleList.map((sideNavItem, sideNavIndex)=>{
                        console.log('nav ==',sideNavItem)
                        // path title subTitleList: [{title path},...]
                        return (
                            <SideListItem key={'activity-management-sideitem-'+sideNavIndex} 
                            label={sideNavItem.title} 
                            selectIndex={sideNavIndex}
                            subTitleList={sideNavItem.subTitleList}/>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}
