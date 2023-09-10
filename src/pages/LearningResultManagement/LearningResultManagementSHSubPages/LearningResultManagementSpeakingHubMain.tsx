import React from 'react';
import ActivitySpeakHubSideLayout from "../../../components/pageComponents/activityManagement/layout/ActivitySpeakHubSideLayout";
import useActivitySpeakHubStore from "../../../store/useActivitySpeakHubStore";

import useNavStore from '../../../store/useNavStore';
import { useNavigate, useLocation } from 'react-router-dom';
import LearningResultManagementSpeakingHubSideLayout from '../../../components/pageComponents/activityManagement/layout/LearningResultManagementSpeakingHubSideLayout';
import useLearningResultManagementSHStore from '../../../store/useLearningResultManagementSHStore';

type TLearningResultManagementSpeakHubMainProps = {
    children: React.ReactNode;
}
export default function LearningResultManagementSpeakingHubMain (props: TLearningResultManagementSpeakHubMainProps) {

    const navigate = useNavigate();
    const locationHook = useLocation();
    // list in zustand
    // const {sideNav} = useActivitySpeakHubStore();
    const {sideNav} = useLearningResultManagementSHStore();
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();

    // side list select
    const [sideSelected, setSideSelected] = React.useState<number[]>([0,0]);

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
        const last = pathParam.slice(-1)[0];
        console.log(locationHook)
        if (selectNavigationTitles.length===0) {
            if (last==='IdeaExchange') {
                setSideSelected([0,0])
                setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Idea Exchange'])
            } else if (last==='StoryVlog') {
                setSideSelected([1,0])
                setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Story Vlog'])
            } else if (last === 'RolePlay') {
                setSideSelected([2,0])
                setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Role-play'])
            }
        } 
    },[selectNavigationTitles ])

    return (
        <section className="section-common-aside-layout">
            <div className='flex flex-1 flex-row w-full h-full'>
                <LearningResultManagementSpeakingHubSideLayout
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
