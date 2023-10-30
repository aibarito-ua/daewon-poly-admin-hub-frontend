import React, { useEffect } from 'react'

import { commonSvgIcons } from '../../../../util/svgs/commonSvgIcons';
const SpeakingHubIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="106" height="106" viewBox="0 0 106 106">
    <defs>
        <clipPath id="clip-path">
        <rect id="사각형_3256" data-name="사각형 3256" width="65" height="61" transform="translate(0 0.389)" fill="none"/>
        </clipPath>
    </defs>
    <g id="그룹_12778" data-name="그룹 12778" transform="translate(-1010 -1770)">
        <g id="ic_sp" transform="translate(447 1344)">
        <circle id="타원_2" data-name="타원 2" cx="53" cy="53" r="53" transform="translate(563 426)" fill="#fff"/>
        <g id="그룹_12151" data-name="그룹 12151" transform="translate(584 448.611)">
            <g id="그룹_12150" data-name="그룹 12150" clipPath="url(#clip-path)">
            <path id="패스_13049" data-name="패스 13049" d="M9.024,31.9a.952.952,0,0,1,.928.952V38.03a.7.7,0,0,0,1.11.561l7.681-5.665A5.153,5.153,0,0,1,21.8,31.92h.839c.161,0,.32-.008.478-.023H36.71a9.024,9.024,0,0,0,8.969-8.033V8.033A9.024,9.024,0,0,0,36.71,0H9.024A9.024,9.024,0,0,0,0,9.024V22.873a9.021,9.021,0,0,0,8.792,9.018Z" transform="translate(0)" fill="#1183c9"/>
            <path id="패스_13050" data-name="패스 13050" d="M55.545,79.446a3.055,3.055,0,1,1-3.055-3.055,3.055,3.055,0,0,1,3.055,3.055Zm10.859,0a3.055,3.055,0,1,1-3.055-3.055A3.055,3.055,0,0,1,66.4,79.446Zm10.859,0a3.055,3.055,0,1,1-3.055-3.055,3.055,3.055,0,0,1,3.055,3.055v0" transform="translate(-40.509 -62.598)" fill="#f2f5f4"/>
            <path id="패스_13051" data-name="패스 13051" d="M135.663,149.418a.952.952,0,0,0-.928.952v5.181a.7.7,0,0,1-1.11.561l-7.681-5.665a5.153,5.153,0,0,0-3.058-1.006h-.839c-.161,0-.32-.008-.478-.023H107.977a9.024,9.024,0,0,1-8.969-8.033V125.554a9.024,9.024,0,0,1,8.969-8.033h27.686a9.024,9.024,0,0,1,9.024,9.024v13.849a9.021,9.021,0,0,1-8.792,9.018Z" transform="translate(-81.132 -96.302)" fill="#d8e4e5"/>
            <path id="패스_13052" data-name="패스 13052" d="M143.663,157.418a.952.952,0,0,0-.928.952v5.181a.7.7,0,0,1-1.11.561l-7.681-5.665a5.154,5.154,0,0,0-3.058-1.006h-.839c-.161,0-.32-.008-.478-.023H115.977a9.024,9.024,0,0,1-8.969-8.033V133.554a9.024,9.024,0,0,1,8.969-8.033h27.686a9.024,9.024,0,0,1,9.024,9.024v13.849a9.021,9.021,0,0,1-8.792,9.018Z" transform="translate(-87.687 -102.857)" fill="#f1b02e"/>
            <path id="패스_13053" data-name="패스 13053" d="M178.162,204.965a3.055,3.055,0,1,1,3.055,3.057,3.054,3.054,0,0,1-3.055-3.057Zm-10.859,0a3.055,3.055,0,1,1,3.055,3.057,3.054,3.054,0,0,1-3.055-3.057Zm-10.859,0a3.055,3.055,0,1,1,3.055,3.057,3.054,3.054,0,0,1-3.055-3.057v0" transform="translate(-128.197 -165.456)" fill="#f2f5f4"/>
            </g>
        </g>
        </g>
    </g>
    </svg>
)
export default function LearningResultManagementSpeakingHubSideLayout (props:{
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
        if (i===sideSelected[0]) {return sideSelected[1]} else return -1;
    }));

    useEffect(() => {
        setSubListOpen(Array.from({length:sideNav.titleList.length}, (v,i)=>{
            if (i===sideSelected[0]) {return sideSelected[1]} else return -1;
        }))
    }, [sideSelected])

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
            <li className={`flex flex-col w-full text-black hover:cursor-pointer font-sans font-light`}>
                <div
                    className={`flex items-center w-full h-[45px] border-b-[1px] border-b-[#ddd] ${subListOpen[selectIndex]===-2 ? 'bg-[#ECFAFC] text-[#0fa9cb] border-r-[3px] border-r-[#0FA9CB]' : ''}`}
                    onClick={() => handleSubListToggle(selectIndex, -2)}
                >
                    <span className="flex flex-row items-center justify-between flex-1 mx-[20px] whitespace-nowrap">
                        {label}
                        {subListOpen[selectIndex]===-1 ? <commonSvgIcons.SideMenuPlusSVGIcon className='w-[11px] h-[11px]'/>: <commonSvgIcons.SideMenuMinusSVGIcon/>}
                        
                    </span>
                </div>
                {subTitleList.length > 0 && (
                    <ul className={subListOpen[selectIndex]=== -1 ? 'hidden': 'block'}>
                        {subTitleList.map((subTitle, subIndex) => (
                            <li
                                key={`sub-menu-${selectIndex}-${subIndex}`}
                                className={`pl-[30px] border-b-[1px] border-b-[#ddd] ${subListOpen[selectIndex] === subIndex ? 'bg-[#ECFAFC] text-[#0fa9cb] border-r-[3px] border-r-[#0FA9CB]' : ''}`}
                                onClick={() => {
                                    handleSubListToggle(selectIndex, subIndex);
                                    // 메뉴로 이동
                                    setSideSelected(selectIndex, subIndex, subTitle.path)
                                }}
                            >
                                <span className='flex flex-row items-center h-[42px] gap-[5px]'>
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
                        {SpeakingHubIcon}
                        {/* <WHSideIcon /> */}
                    </div>
                    <p className='flex flex-row text-[14px] pt-[12px] justify-center'>{'Speaking Hub'}</p>
                </div>
            </div>
            <div className="flex flex-1 justify-start w-[234px] h-full">
                <ul className="w-[234px] border-collapse h-fit">
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
