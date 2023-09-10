import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

import useLoginStore from '../store/useLoginStore';
import {routeValues} from './routeValues';
import PrivateRoute from './PrivateRoute';import LevelAndTextBookSpeakingHub from '../pages/LevelAndTextBook/LevelAndTextBookSpeakingHub';
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

export default function Router() {
    const { role, isOpen } = useLoginStore();
    const publicRoutes = () => {
        const routeValue = routeValues.publicRoutes;
        // 각 권한별 기본 페이지
        const mainPage = role === 'logout' ? <Home /> : (
            role === 'Head' ? <Home /> : (
                role === 'Campus' ? <Home /> : <Home />
            )
        );
        return (
            <Route element={<PrivateRoute authenticated={false} />}>
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
    // const privateRoutes = () => {
    //     const routeValue = routeValues.privateRoutes;
    // }
    return (
        <div className="display-page-screen">
            {isOpen && <Login />}
            <Routes>
                {/* No Login Pages */}
                {publicRoutes()}
                {/* 본사 전용 페이지 */}
                <Route element={<PrivateRoute authenticated={true} pageAuth='Head' />} >
                    
                </Route>
                {/* 캠퍼스 전용 페이지 */}
                <Route element={<PrivateRoute authenticated={true} pageAuth='Campus' />} >

                </Route>
                {/* 본사&캠퍼스 전체 페이지 */}
                <Route element={<PrivateRoute authenticated={true} />} >
                    <Route path={'/LevelandTextbook/SpeakingHub'} element={<LevelAndTextBookSpeakingHub />}/>
                    <Route path={'/LevelandTextbook/WritingHub'} element={<LevelAndTextBookWritingHub />} />
                    <Route path={'/ActivityManagement/SpeakingHub/IdeaExchange'} element={<ActivitySpeakHubMain children={<IdeaExchange />}  />}/>
                    <Route path={'/ActivityManagement/SpeakingHub/StoryVlog'} element={<ActivitySpeakHubMain children={<StoryVlog />} />} />
                    <Route path={'/ActivityManagement/SpeakingHub/RolePlay'} element={<ActivitySpeakHubMain children={<RolePlay />} />} />
                    <Route path={'/ActivityManagement/WritingHub/SparkWriting'} element={<ActivityWritingHubMain children={<SparkWriting />} />} />
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
            <CommonAlertModalComponent />
        </div>

    )
}