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
import PromptBlockComponent from '../components/toggleModalComponents/PromptBlockComponent';
import useControlAlertStore from '../store/useControlAlertStore';
import CommonAlertModalComponent from '../components/toggleModalComponents/CommonAlertModalComponent';
;

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
                </Route>
                {/* <Route path='' element={ }></Route> */}

            </Routes>
            <CommonAlertModalComponent />
        </div>

    )
}