import React from 'react';
import {create} from 'zustand'

const useLearningResultManagementSHStore = create<IuseLearningResultManagementSHStore>((set,get) =>({
    sideNav: {
        titleList: [
            {
                title: 'Idea exchange',
                path: '',
                subTitleList: [
                    {
                        title: 'Progress',
                        path: 'Progress'
                    },
                    {
                        title: 'Portfolio',
                        path: 'Portfolio'
                    }
                ]
            },
            {
                title: 'Story Vlog',
                path: '',
                subTitleList: [
                    {
                        title: 'Progress',
                        path: 'Progress'
                    },
                    {
                        title: 'Portfolio',
                        path: 'Portfolio'
                    }
                ]
            },
            {
                title: 'Role-Play',
                path: '',
                subTitleList: [
                    {
                        title: 'Progress',
                        path: 'Progress'
                    },
                    {
                        title: 'Portfolio',
                        path: 'Portfolio'
                    }
                ]
            },
        ]
    }
}))

export default useLearningResultManagementSHStore;