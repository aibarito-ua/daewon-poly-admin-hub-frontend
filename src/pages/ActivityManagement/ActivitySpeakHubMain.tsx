import React from 'react';
import ActivitySpeakHubSideLayout from "../../components/pageComponents/activityManagement/layout/ActivitySpeakHubSideLayout";
import useActivitySpeakHubStore from "../../store/useActivitySpeakHubStore";
import IdeaExchange from './ActivitySHSubPages/IdeaExchange';
import useNavStore from '../../store/useNavStore';
import StoryVlog from './ActivitySHSubPages/StoryVlog';
import { useNavigate, useLocation } from 'react-router-dom';

type TActivitySpeakHubMainProps = {
    children: React.ReactNode;
}
export default function ActivitySpeakHubMain (props: TActivitySpeakHubMainProps) {

    const navigate = useNavigate();
    const locationHook = useLocation();

    // list in zustand
    const {sideNav} = useActivitySpeakHubStore();
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();

    // side list select
    const [sideSelected, setSideSelected] = React.useState<number>(0);

    const goLink = async (link: string, role: string) => {
        console.log("link :::", link);
        const rolePath = role!=='' ? (
          role==='Head'? 'Head': (role==='Campus' ? 'Campus': '')
        ) : ''
        const pathString = rolePath === '' ? `/${link}` : `/${rolePath}/${link}`
        console.log(pathString)
        navigate(pathString);
    }

    const sideOnClickEvent = async (selectListNumber:number, ) => {
        let selectPath = ''
        if (selectListNumber===0) {
            setSideSelected(0)
            selectPath = 'ActivityManagement/SpeakingHub/IdeaExchange'
        } else if (selectListNumber===1) {
            setSideSelected(1)
            selectPath = 'ActivityManagement/SpeakingHub/StoryVlog'
        } else if (selectListNumber===2) {
            setSideSelected(2)
            selectPath = 'ActivityManagement/SpeakingHub/RolePlay'
        }
        await goLink(selectPath, '')
    }

    React.useEffect(()=>{
        const pathParam = locationHook.pathname.split('/');
        const last = pathParam.slice(-1)[0];
        console.log(locationHook)
        if (selectNavigationTitles.length===0) {
            if (last==='IdeaExchange') {
                setSideSelected(0)
                setSelectNavigationTitles(['Activity 관리', 'Speaking Hub', 'Idea Exchange'])
            } else if (last==='StoryVlog') {
                setSideSelected(1)
                setSelectNavigationTitles(['Activity 관리', 'Speaking Hub', 'Story Vlog'])
            } else if (last === 'RolePlay') {
                setSideSelected(2)
                setSelectNavigationTitles(['Activity 관리', 'Speaking Hub', 'Role-play'])
            }
        } 
    },[selectNavigationTitles ])

    return (
        <section className="section-common-aside-layout">
            <div className='flex flex-1 flex-row w-full h-full'>
                <ActivitySpeakHubSideLayout 
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
