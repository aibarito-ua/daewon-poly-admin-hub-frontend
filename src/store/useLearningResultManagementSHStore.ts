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
    },
    loadDataHead: {

    },
    loadData: {

    },
    filterData: null,
    setFilterData: (apiFilterData) => {
        set(() => ({
            filterData: apiFilterData
        }))
    },
    studentDataInClass: null,
    setStudentDataInClass: (data) => {
        set(() => ({
            studentDataInClass: data
        }))
    },
}))

export default useLearningResultManagementSHStore;