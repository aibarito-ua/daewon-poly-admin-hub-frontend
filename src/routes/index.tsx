import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';

import useLoginStore from '../store/useLoginStore';
import {routeValues} from './routeValues';
import LevelAndTextBookSpeakingHub from '../pages/LevelAndTextBook/LevelAndTextBookSpeakingHub';
import LevelAndTextBookWritingHub from '../pages/LevelAndTextBook/LevelAndTextBookWritingHub';
import ActivitySpeakHubMain from '../pages/ActivityManagement/ActivitySpeakHubMain';
import IdeaExchange from '../pages/ActivityManagement/ActivitySHSubPages/IdeaExchange';
import StoryVlog from '../pages/ActivityManagement/ActivitySHSubPages/StoryVlog';
import RolePlay from '../pages/ActivityManagement/ActivitySHSubPages/RolePlay';
import ActivityWritingHubMain from '../pages/ActivityManagement/ActivityWritingHubMain';
import SparkWriting from '../pages/ActivityManagement/ActivityWHSubPages/SparkWriting';
import CommonAlertModalComponent from '../components/toggleModalComponents/CommonAlertModalComponent';
import LearningManagementWritingHub from '../pages/LearningManagement/LearningManagementWritingHub';
import LMSparkWriting from '../pages/LearningManagement/LearningManagementWritingSubPages/SparkWriting';
import LearningManagementSparkWritingFeedbackPage from '../pages/LearningManagement/LearningManagementSparkWritingFeedbackPage';
import LearningResultManagementSpeakingHubMain from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/LearningResultManagementSpeakingHubMain';

import LRMIdeaExchangeProgress from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/ideaExchange/Progress'
import LRMIdeaExchangePortfolio from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/ideaExchange/Portfolio'

import LRMStoryVlogProgress from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/storyVlog/Progress'
import LRMStoryVlogPortfolio from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/storyVlog/Portfolio'

import LRMRolePlayProgress from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/roleplay/Progress'
import LRMRolePlayPortfolio from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/roleplay/Portfolio'
import LearningResultManagementWritingHubMain from '../pages/LearningResultManagement/LearningResultManagementWHSubPages/LearningResultManagementWritingHubMain';
import LRMSparkWritingReportAndPortfolio from '../pages/LearningResultManagement/LearningResultManagementWHSubPages/sparkWriting/SparkWriting';
import StandbyScreen from '../components/toggleModalComponents/StandbyScreen';
import {Cookies, } from 'react-cookie'
import { NotAuth } from '../pages/NotAuth';
import { CONFIG } from '../config';
import SimpleSnackbar from '../components/toastMessageComponents/SimpleSnackbar';
import MaintenanceAlertModalComponent from '../components/toggleModalComponents/MaintenanceAlertModalComponent';
import { useInterval } from '../hooks/useInterval';

interface IPrivateRouteProps {
    children?: React.ReactElement;
    authenticated: boolean;
    userData:{
        clientCode:string[], mcYn:string, memberCode:string, accessToken:string, pageAuth:string,
    };
    pageAuth?: TRole
}
export default function Router() {
    const cookies = new Cookies();
    // const routeRef = React.useRef<HTMLDivElement|null>(null);
    const { role, isOpen, setUserInfo, maintenanceData, setMaintenanceData } = useLoginStore();
    const [open, setOpen] = React.useState(false);
    const [isAuth, setIsAuth ] = React.useState<boolean>(false);
    const [userData, setUserData] = React.useState<{
        clientCode:string[], mcYn:string, memberCode:string, accessToken:string, pageAuth:string,
    }>({
        clientCode:[], mcYn:'', memberCode:'', accessToken:'', pageAuth:'',
    });

    React.useEffect(()=>{
        if (CONFIG.IS_DEV===CONFIG.IS_DEV_CHECK) {
            // dev
            setIsAuth(true);
            // "memberCode":"23100091","clientCode":"0508003","mcYn":"N","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtGbDA2aWs2cXdkQ2U5UEtnQitRMlFFbUtBdUhOelFXWnJ4cmMrTndrSHc9IiwiaWF0IjoxNjk4MzkwODE5LCJleHAiOjE2OTg0NzcyMTl9.TJc-VnfvXibsTCE8ZISd9A99CffOEWS0ml_BnAH5cdA"
            const devTestData:{
                accessToken: string;
                clientCode: string[];
                mcYn: string;
                memberCode: string;
                pageAuth: string;
                maintenanceInfo: TMaintenanceInfo
            } = {
                accessToken: '',
                clientCode: ['0508003','1301003'],
                // ,'1301003'
                mcYn: 'Y',
                memberCode: '23100091',
                pageAuth: "Y",
                maintenanceInfo: {
                    start_date: '2023-12-14T05:35:00.000Z',
                    // end_date: '2123-12-11T16:00:00.510Z',
                    end_date: '2023-12-14T05:35:30.000Z',
                    maintenance_description_en:[ 'To improve our services, a system inspection',
                    'will be conducted at the times indicated below,', 
                    'during which our services will be',
                    'temporarily unavailable.',
                    'Thank you for your understanding.'],
                    maintenance_description_kr:[ ],
                    time_description_en:'Monthly on the 14   and 28   00:30-01:00 AM',
                    time_description_kr:'매월 14일, 28일 새벽 00:30~01:00 test'
                }
            }
            const dumpMaintenanceData:TMaintenanceData = {
                alertTitle: 'System Maintenance Notice',
                data: devTestData.maintenanceInfo,
                open: false,
                type: ''
            }
            console.log('dev ==',devTestData)
            // const cookies = new Cookies();
            cookies.set('data', devTestData)
            setUserInfo(devTestData)
            setUserData(devTestData)
            setMaintenanceData(dumpMaintenanceData)
        } else {
            // const cookies = new Cookies();
            const getCheckDatas = cookies.get('data')
            if (getCheckDatas) {
                const dumyMaintenanceInfo= {
                    start_date: '',
                    end_date: '',
                    maintenance_description_en:[ 'To improve our services, a system inspection',
                    'will be conducted at the times indicated below,', 
                    'during which our services will be',
                    'temporarily unavailable.',
                    'Thank you for your understanding.'],
                    maintenance_description_kr:[ ],
                    time_description_en:'Monthly on the 14   and 28   00:30-01:00 AM',
                    time_description_kr:'매월 14일, 28일 새벽 00:30~01:00'
                }
                const checkTargetData:{
                    clientCode:string[], mcYn:string, memberCode:string, accessToken:string, pageAuth:string,maintenanceInfo: TMaintenanceInfo
                } = {
                    accessToken: getCheckDatas.accessToken ? getCheckDatas.accessToken:'',
                    clientCode: getCheckDatas.clientCode ? getCheckDatas.clientCode:[],
                    mcYn: getCheckDatas.mcYn ? getCheckDatas.mcYn:'',
                    memberCode: getCheckDatas.memberCode ? getCheckDatas.memberCode:'',
                    pageAuth: getCheckDatas.mcYn ? getCheckDatas.mcYn:'',
                    maintenanceInfo: getCheckDatas.TMaintenanceInfo ? getCheckDatas.TMaintenanceInfo:dumyMaintenanceInfo
                };
                
                const isMemberCode = checkTargetData.memberCode.length === 8 && checkTargetData.memberCode!=='';
                const isEmp = checkTargetData.mcYn !== '';
                const isClient = checkTargetData.clientCode.length ;
                const dumpMaintenanceData:TMaintenanceData = {
                    alertTitle: 'System Maintenance Notice',
                    data: checkTargetData.maintenanceInfo,
                    open: false,
                    type: ''
                }
                setMaintenanceData(dumpMaintenanceData)
                if (isMemberCode && isEmp && isClient) {
                    setIsAuth(true)
                    console.log('test id =',checkTargetData)
                    setUserData(checkTargetData)
                    // setUserInfo(checkTargetData)
                } else {
                    setIsAuth(false)
                }
            } else {
                setIsAuth(false)
            }
        }
    }, [])
    
    useInterval(()=>{
        const getCheckDatas = cookies.get('data')
        if (getCheckDatas) {
            const stDate = maintenanceData.data.start_date;
            const edDate = maintenanceData.data.end_date;
            if (stDate !== '' && edDate !== '' ) {
                // real time check maintenance start/end
                const currentTime = new Date();
                // console.log('currentTime =',currentTime)
                // start
                const startDate = new Date(stDate);
                // console.log('startDate =',startDate)
                const start_date = startDate.getTime();
                const start_current_gap_timeNumber = start_date - currentTime.getTime()
                const startCurrentGapTime_min = Math.floor(start_current_gap_timeNumber/ ( 60*1000));
                const gap_st = Math.floor(start_current_gap_timeNumber)
                // console.log('gap_st= ',start_current_gap_timeNumber)
                
                if (start_current_gap_timeNumber <= 0) {
                    // 시작
                    let dumpMaintenanceData:TMaintenanceData = JSON.parse(JSON.stringify(maintenanceData));
                    // end time calculate
                    const endDate = new Date(edDate)
                    const end_date = endDate.getTime();
                    const end_current_gap_timeNumber = end_date - currentTime.getTime();
                    const gap_end = Math.floor(end_current_gap_timeNumber);
                    // console.log('gap ed =',gap_end)
                    if (gap_end >= 0) {
                        // maintenance 진행중
                        if (isAuth) {
                            setIsAuth(false)
                        }
                        dumpMaintenanceData.open = true;
                        setMaintenanceData(dumpMaintenanceData)
                    } else {
                        // 종료
                        dumpMaintenanceData.open = false;
                        dumpMaintenanceData.alertTitle = '';
                        dumpMaintenanceData.data.end_date = '';
                        dumpMaintenanceData.data.start_date = '';
                        setMaintenanceData(dumpMaintenanceData)
                        // document.location.reload();
                    }
                } else {
                    if (startCurrentGapTime_min === 30) {
                        // 30 분 전
                    } else if (startCurrentGapTime_min === 10) {
                        // 10분 전
                    }
                }
            }
        }
    },1000);

    const publicRoutes = () => {
        const routeValue = routeValues.publicRoutes;
        // 각 권한별 기본 페이지
        const mainPage = role === 'logout' ? <Home /> : (
            role === 'Y' ? <Home /> : (
                role === 'N' ? <Home /> : <Home />
            )
        );
        return (
            <Route element={<PrivateRoute authenticated={isAuth} userData={userData} />}>
                {routeValue.map((publicRoute, publicIndex) => {
                    if (publicRoute.path === '/') {
                        return <Route key={publicIndex} path={publicRoute.path} element={mainPage}/>
                    } else {
                        return <Route key={publicIndex} path={publicRoute.path} element={publicRoute.element}/>
                    }
                })}
            </Route>
        )
    }
    const PrivateRoute = ({
        authenticated, pageAuth,userData
    }:IPrivateRouteProps) => {
        if (authenticated) {
            if (pageAuth) {
                if (userData.pageAuth === pageAuth) {
                    return <Outlet />    
                } else {
                    // toast message
                    // return <SimpleSnackbar/>
                    setOpen(true);
                    return <Navigate to="/" />
                }
            } else {
                return <Outlet />
            }
        } else {
            // 권한 필요 x, 로그인 체크 x
            setOpen(true);
            return <NotAuth />
        }
    }
    return (
        <div className="display-page-screen">
            {!isAuth && <NotAuth />}
            {isAuth && 
                <Routes>
                    {/* No Login Pages */}
                    {/* {publicRoutes()} */}
                    {/* 본사 전용 페이지 */}
                    <Route element={<PrivateRoute authenticated={isAuth} userData={userData} pageAuth='Y' />} >
                        <Route path={'/LevelandTextbook/SpeakingHub'} element={<LevelAndTextBookSpeakingHub />}/>
                        <Route path={'/LevelandTextbook/WritingHub'} element={<LevelAndTextBookWritingHub />} />
                        <Route path={'/ActivityManagement/SpeakingHub/IdeaExchange'} element={<ActivitySpeakHubMain children={<IdeaExchange />}  />}/>
                        <Route path={'/ActivityManagement/SpeakingHub/StoryVlog'} element={<ActivitySpeakHubMain children={<StoryVlog />} />} />
                        <Route path={'/ActivityManagement/SpeakingHub/RolePlay'} element={<ActivitySpeakHubMain children={<RolePlay />} />} />
                        <Route path={'/ActivityManagement/WritingHub/SparkWriting'} element={<ActivityWritingHubMain children={<SparkWriting />} />} />
                    </Route>
                    {/* 캠퍼스 전용 페이지 */}
                    <Route element={<PrivateRoute authenticated={isAuth} userData={userData} pageAuth='N' />} >

                    </Route>
                    {/* 본사&캠퍼스 전체 페이지 */}
                    <Route element={<PrivateRoute authenticated={isAuth} userData={userData} />} >
                        
                        <Route path={'/LearningManagement/WritingHub/SparkWriting'} element={<LearningManagementWritingHub children={<LMSparkWriting />}/>} />
                        <Route path={'/LearningManagement/WritingHub/SparkWriting/feedback/:studentCode/:DraftId'} element={<LearningManagementSparkWritingFeedbackPage/>} />

                        <Route path={'/LearningResultManagement/SpeakingHub/IdeaExchange/Progress'} element={<LearningResultManagementSpeakingHubMain children={<LRMIdeaExchangeProgress />} />} />
                        <Route path={'/LearningResultManagement/SpeakingHub/IdeaExchange/Portfolio'} element={<LearningResultManagementSpeakingHubMain children={<LRMIdeaExchangePortfolio />} />} />

                        <Route path={'/LearningResultManagement/SpeakingHub/StoryVlog/Progress'} element={<LearningResultManagementSpeakingHubMain children={<LRMStoryVlogProgress />} />} />
                        <Route path={'/LearningResultManagement/SpeakingHub/StoryVlog/Portfolio'} element={<LearningResultManagementSpeakingHubMain children={<LRMStoryVlogPortfolio />} />} />

                        <Route path={'/LearningResultManagement/SpeakingHub/RolePlay/Progress'} element={<LearningResultManagementSpeakingHubMain children={<LRMRolePlayProgress />} />} />
                        <Route path={'/LearningResultManagement/SpeakingHub/RolePlay/Portfolio'} element={<LearningResultManagementSpeakingHubMain children={<LRMRolePlayPortfolio />} />} />

                        <Route path={'/LearningResultManagement/WritingHub/SparkWriting/ReportAndPortfolio'} element={<LearningResultManagementWritingHubMain children={<LRMSparkWritingReportAndPortfolio />} />} />
                        
                    </Route>
                    {/* <Route path='' element={ }></Route> */}

                </Routes>
            }
            <MaintenanceAlertModalComponent />
            <CommonAlertModalComponent />
            <StandbyScreen />
            <SimpleSnackbar toastOpen={open} setToastOpen={setOpen}/>
        </div>

    )
}