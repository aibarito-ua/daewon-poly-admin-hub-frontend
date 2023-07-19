import React from 'react';
import ActivityWritingHubSideLayout from "../../components/pageComponents/activityManagement/layout/ActivityWritingHubSideLayout";
import useNavStore from '../../store/useNavStore';
import { useNavigate, useLocation } from 'react-router-dom';
import useActivityWritingHubStore from '../../store/useActivityWritingHubStore';
import { CommonFunctions } from '../../util/common/commonFunctions';

type TActivityWritingHubMainProps = {
    children: React.ReactNode;
}
export default function ActivityWritingHubMain (props: TActivityWritingHubMainProps) {
    const navigate = useNavigate();
    const locationHook = useLocation();

    // list in zustand
    const {sideNav} = useActivityWritingHubStore();
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles,
        navigateBlockFlag, navigateBlockMessage
    } = useNavStore();

    // side list select
    const [sideSelected, setSideSelected] = React.useState<number>(0);
    

    const goLink = async (link: string, role: string) => {
        // console.log("link :::", link);
        const rolePath = role!=='' ? (
          role==='Head'? 'Head': (role==='Campus' ? 'Campus': '')
        ) : ''
        const pathString = rolePath === '' ? `/${link}` : `/${rolePath}/${link}`
        console.log(pathString)
        
        CommonFunctions.customNavigate(pathString, navigate, navigateBlockFlag, navigateBlockMessage );
    }

    const sideOnClickEvent = async (selectListNumber:number, ) => {
        let selectPath = ''
        if (selectListNumber===0) {
            setSideSelected(0)
            selectPath = 'ActivityManagement/WritingHub/SparkWriting'
        } else if (selectListNumber===1) {
            setSideSelected(1)
            selectPath = 'ActivityManagement/WritingHub/FreeWriting'
        }
        await goLink(selectPath, '')
    }

    React.useEffect(()=>{
        const pathParam = locationHook.pathname.split('/');
        const last = pathParam.slice(-1)[0];
        // console.log(locationHook)
        if (selectNavigationTitles.length===0) {
            if (last==='SparkWriting') {
                setSideSelected(0)
                setSelectNavigationTitles(['Activity 관리', 'Writing Hub', 'Spark Writing'])
            } else if (last==='FreeWriting') {
                setSideSelected(1)
                setSelectNavigationTitles(['Activity 관리', 'Writing Hub', 'Free Writing'])
            }
        } 
    },[selectNavigationTitles ])

    // React.useEffect(()=>{
    //     console.log(sideSelected)
    // }, [sideSelected])

    return (
        <section className="section-common-aside-layout">
            <div className='flex flex-1 flex-row w-full h-full'>
                <ActivityWritingHubSideLayout 
                    sideNav={sideNav}
                    setSideSelected={sideOnClickEvent}
                    sideSelected={sideSelected}
                />
                <div className='flex flex-1 -ml-[234px] pl-[234px] w-full h-full'>
                    {props.children}
                </div>
            </div>
        </section>
    )
}
