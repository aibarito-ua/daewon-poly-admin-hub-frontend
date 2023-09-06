import React from 'react';
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import LevelAndTextBookSpeakingHub from '../pages/LevelAndTextBook/LevelAndTextBookSpeakingHub';
import LevelAndTextBookWritingHub from '../pages/LevelAndTextBook/LevelAndTextBookWritingHub';
import ActivitySpeakHubMain from '../pages/ActivityManagement/ActivitySpeakHubMain';
import IdeaExchange from '../pages/ActivityManagement/ActivitySHSubPages/IdeaExchange';
import StoryVlog from '../pages/ActivityManagement/ActivitySHSubPages/StoryVlog';
import RolePlay from '../pages/ActivityManagement/ActivitySHSubPages/RolePlay';
import ActivityWritingHubMain from '../pages/ActivityManagement/ActivityWritingHubMain';
import SparkWriting from '../pages/ActivityManagement/ActivityWHSubPages/SparkWriting';
import LearningManagementWritingHub from '../pages/LearningManagement/LearningManagementWritingHub';
import LMSparkWriting from '../pages/LearningManagement/LearningManagementWritingSubPages/SparkWriting';
import LearningManagementSparkWritingFeedbackPage from '../pages/LearningManagement/LearningManagementSparkWritingFeedbackPage';


export const routeValues = {
    // authenticated true
    privateRoutes: {
        logout: [],
        admin: [],
        teacher: [],
        student: [
            // {path: '/student/EssayWriting', element: <EssayWriting />},
            // {path: '/student/SelectEssayWriting', element: <SelectEssayWriting />},
            // {path: '/student/EssayWritingSelectTopic', element: <EssayWritingSelectTopic />},
            // {path: '/student/MyPage', element: <MyPage />},
            // {path: '/student/Portfolio', element: <Portfolio />},
        ]
    },
    // authenticated false
    publicRoutes: [
        {path: '/', element: <Home />},
        {path: '/Login', element: <Login />},
        {path: '/LevelandTextbook/SpeakingHub', element: <LevelAndTextBookSpeakingHub />},
        {path: '/LevelandTextbook/WritingHub', element: <LevelAndTextBookWritingHub />},
        {path: '/ActivityManagement/SpeakingHub/IdeaExchange', element: <ActivitySpeakHubMain children={<IdeaExchange />} />},
        {path: '/ActivityManagement/SpeakingHub/StoryVlog', element: <ActivitySpeakHubMain children={<StoryVlog />} />},
        {path: '/ActivityManagement/SpeakingHub/RolePlay', element: <ActivitySpeakHubMain children={<RolePlay />} />},
        {path: '/ActivityManagement/WritingHub/SparkWriting', element: <ActivityWritingHubMain children={<SparkWriting />} />},
        {path: '/LearningManagement/WritingHub/SparkWriting', element: <LearningManagementWritingHub children={<LMSparkWriting/>}/>},
        {path: '/LearningManagement/WritingHub/SparkWriting/feedback/:studentCode/:DraftId', element: <LearningManagementSparkWritingFeedbackPage />}
    ],
    webViewRoutes: [
        // {path: '/webTest', element: <WebViewWrap />},
    ]
}