import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

import useLoginStore from '../store/useLoginStore';
import {routeValues} from './routeValues';
// import PrivateRoute from './PrivateRoute';
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
import {Cookies} from 'react-cookie'
import { NotAuth } from '../pages/NotAuth';
import { CONFIG } from '../config';
import SimpleSnackbar from '../components/toastMessageComponents/SimpleSnackbar';
import useNavStore from '../store/useNavStore';
interface IPrivateRouteProps {
    children?: React.ReactElement;
    authenticated: boolean;
    userData:{
        clientCode:string, mcYn:string, memberCode:string, accessToken:string, pageAuth:string,
    };
    pageAuth?: TRole
}
export default function Router() {
    const { role, isOpen, setUserInfo } = useLoginStore();
    const [open, setOpen] = React.useState(false);
    const [isAuth, setIsAuth ] = React.useState<boolean>(false);
    const [userData, setUserData] = React.useState<{
        clientCode:string, mcYn:string, memberCode:string, accessToken:string, pageAuth:string,
    }>({
        clientCode:'', mcYn:'', memberCode:'', accessToken:'', pageAuth:'',
    });

    React.useEffect(()=>{
        if (CONFIG.IS_DEV===CONFIG.IS_DEV_CHECK) {
            // dev
            setIsAuth(true);
            // "memberCode":"23100091","clientCode":"0508003","mcYn":"N","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtGbDA2aWs2cXdkQ2U5UEtnQitRMlFFbUtBdUhOelFXWnJ4cmMrTndrSHc9IiwiaWF0IjoxNjk4MzkwODE5LCJleHAiOjE2OTg0NzcyMTl9.TJc-VnfvXibsTCE8ZISd9A99CffOEWS0ml_BnAH5cdA"
            const devTestData = {
                accessToken: '',
                clientCode: '0508003',
                mcYn: 'N',
                memberCode: '23100091',
                pageAuth: "N"
            }
            const cookies = new Cookies();
            cookies.set('data', devTestData)
            setUserInfo(devTestData)
            setUserData(devTestData)
        } else {
            const cookies = new Cookies();
            const getCheckDatas = cookies.get('data')
            if (getCheckDatas) {
                const checkTargetData:{
                    clientCode:string, mcYn:string, memberCode:string, accessToken:string, pageAuth:string,
                } = {
                    accessToken: getCheckDatas.accessToken ? getCheckDatas.accessToken:'',
                    clientCode: getCheckDatas.clientCode ? getCheckDatas.clientCode:'',
                    mcYn: getCheckDatas.mcYn ? getCheckDatas.mcYn:'',
                    memberCode: getCheckDatas.memberCode ? getCheckDatas.memberCode:'',
                    pageAuth: getCheckDatas.mcYn ? getCheckDatas.mcYn:'',
                };
                
                const isMemberCode = checkTargetData.memberCode.length === 8 && checkTargetData.memberCode!=='';
                const isEmp = checkTargetData.mcYn !== '';
                const isClient = checkTargetData.clientCode!=='';
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
            <CommonAlertModalComponent />
            <StandbyScreen />
            <SimpleSnackbar toastOpen={open} setToastOpen={setOpen}/>
        </div>

    )
}