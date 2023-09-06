import React from 'react';
import useNavStore from '../../store/useNavStore';
import { useNavigate, useLocation } from 'react-router-dom';
import useActivityWritingHubStore from '../../store/useActivityWritingHubStore';
import { CommonFunctions } from '../../util/common/commonFunctions';
import LearningManagementWritingHubSideLayout from '../../components/pageComponents/activityManagement/layout/LearningManagementWritingHubSideLayout';
import useLearningManagementSparkWritingStore from '../../store/useLearningManagementSparkWritingStore';

type TLearningManagementWritingHubMainProps = {
    children: React.ReactNode;
}
export default function LearningManagementWritingHub (props: TLearningManagementWritingHubMainProps) {
    const navigate = useNavigate();
    const locationHook = useLocation();

    // list in zustand
    // const {sideNav} = useActivityWritingHubStore();
    const {sideNav} = useLearningManagementSparkWritingStore();
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles,
        navigateBlockFlag, navigateBlockMessage
    } = useNavStore();

    // side list select
    const [sideSelected, setSideSelected] = React.useState<number[]>([0,0]);
    
    const goLink = async (link: string, role: string) => {
        const rolePath = role!=='' ? (
          role==='Head'? 'Head': (role==='Campus' ? 'Campus': '')
        ) : ''
        const pathString = rolePath === '' ? `/${link}` : `/${rolePath}/${link}`
        console.log(pathString)
        
        CommonFunctions.customNavigate(pathString, navigate, navigateBlockFlag, navigateBlockMessage );
    }

    const sideOnClickEvent = async (selectListNumber:number, selectSubListNumber:number, path:string) => {
        let selectPath = ''
        if (selectListNumber===0) {
            if (selectSubListNumber===0) {
                const dumySideSelected:number[] = JSON.parse(JSON.stringify(sideSelected));
                dumySideSelected[selectListNumber] = selectSubListNumber;
                setSideSelected(dumySideSelected);
                selectPath = `LearningManagement/WritingHub/${path}`
            }
        } 
        // else if (selectListNumber===1) {
        //     setSideSelected(1)
        //     selectPath = 'LearningManagement/WritingHub/FreeWriting'
        // }
        await goLink(selectPath, '')
    }

    React.useEffect(()=>{
        const pathParam = locationHook.pathname.split('/');
        const last = pathParam.slice(-1)[0];
        // console.log(locationHook)
        if (selectNavigationTitles.length===0) {
            if (last==='SparkWriting') {
                setSideSelected([0,0])
                setSelectNavigationTitles(['학습 관리', 'Writing Hub', 'Spark Writing','Spark Writing 첨삭'])
            } 
            // else if (last==='FreeWriting') {
            //     setSideSelected(1)
            //     setSelectNavigationTitles(['학습 관리', 'Writing Hub', 'Free Writing'])
            // }
        } 
    },[selectNavigationTitles ])

    return (
        <section className="section-common-aside-layout">
            <div className='flex flex-1 flex-row w-full h-full'>
                <LearningManagementWritingHubSideLayout 
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
