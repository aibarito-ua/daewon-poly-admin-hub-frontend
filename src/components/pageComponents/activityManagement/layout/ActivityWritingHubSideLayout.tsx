import React from 'react'
import WHSideIcon from '../WritingHubSideIcon.png';
import SvgIconWritingHub from '../icons/ic_wr.svg';

export default function ActivityWritingHubSideLayout (props:{
    sideNav:{titleList: {title:string}[] }
    setSideSelected:Function
    sideSelected: number
}){
    // side list select
    // const [sideSelected, setSideSelected] = React.useState<number>(0);
    const {
        sideNav,
        setSideSelected,
        sideSelected
    } = props;

    const SideListItem = (props:{label:string, selectIndex:number}) => {
        return (
            <li className={`flex items-center w-full h-[45px] text-black hover:cursor-pointer border ${
                props.selectIndex === sideSelected ? 'bg-[#ECFAFC] text-[#0fa9cb] border-r-[3px] border-r-[#0FA9CB]': 'font-sans font-light'
            }`}
            onClick={()=>{
                setSideSelected(props.selectIndex)
            }}
        >
            <span className="flex-1 ml-3 whitespace-nowrap">{props.label}</span>
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
                    {props.sideNav.titleList.map((sideNavItem, sideNavIndex)=>{
                        return (
                            <SideListItem key={'activity-management-sideitem-'+sideNavIndex} label={sideNavItem.title} selectIndex={sideNavIndex}/>
                        )
                    })}

                </ul>
            </div>
        </div>
    )
}
