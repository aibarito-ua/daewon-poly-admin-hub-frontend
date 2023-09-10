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

import LearningResultManagementSpeakingHubMain from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/LearningResultManagementSpeakingHubMain';
import LRMIdeaExchangeProgress from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/ideaExchange/Progress'
import LRMIdeaExchangePortfolio from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/ideaExchange/Portfolio'

import LRMStoryVlogProgress from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/storyVlog/Progress'
import LRMStoryVlogPortfolio from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/storyVlog/Portfolio'

import LRMRolePlayProgress from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/roleplay/Progress'
import LRMRolePlayPortfolio from '../pages/LearningResultManagement/LearningResultManagementSHSubPages/roleplay/Portfolio'
import LearningResultManagementWritingHubMain from '../pages/LearningResultManagement/LearningResultManagementWHSubPages/LearningResultManagementWritingHubMain';
import LRMSparkWritingReportAndPortfolio from '../pages/LearningResultManagement/LearningResultManagementWHSubPages/sparkWriting/SparkWriting';

export const routeValues = {
    // authenticated true
    privateRoutes: {
        logout: [],
        admin: [],
        teacher: [],
        student: [
            
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
        {path: '/LearningManagement/WritingHub/SparkWriting/feedback/:studentCode/:DraftId', element: <LearningManagementSparkWritingFeedbackPage />},
        {path: '/LearningResultManagement/SpeakingHub/IdeaExchange/Progress', element: <LearningResultManagementSpeakingHubMain children={<LRMIdeaExchangeProgress />} />},
        {path: '/LearningResultManagement/SpeakingHub/IdeaExchange/Portfolio', element: <LearningResultManagementSpeakingHubMain children={<LRMIdeaExchangePortfolio />} />},

        {path: '/LearningResultManagement/SpeakingHub/StoryVlog/Progress', element: <LearningResultManagementSpeakingHubMain children={<LRMStoryVlogProgress />} />},
        {path: '/LearningResultManagement/SpeakingHub/StoryVlog/Portfolio', element: <LearningResultManagementSpeakingHubMain children={<LRMStoryVlogPortfolio />} />},
        
        {path: '/LearningResultManagement/SpeakingHub/RolePlay/Progress', element: <LearningResultManagementSpeakingHubMain children={<LRMRolePlayProgress />} />},
        {path: '/LearningResultManagement/SpeakingHub/RolePlay/Portfolio', element: <LearningResultManagementSpeakingHubMain children={<LRMRolePlayPortfolio />} />},
        
        {path: '/LearningResultManagement/WritingHub/SparkWriting/ReportAndPortfolio', element: <LearningResultManagementWritingHubMain children={<LRMSparkWritingReportAndPortfolio />} />},
    ],
    webViewRoutes: [
        // {path: '/webTest', element: <WebViewWrap />},
    ]
}