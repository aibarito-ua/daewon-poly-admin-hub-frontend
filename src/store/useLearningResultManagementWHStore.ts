import React from 'react';
import {create} from 'zustand'

const useLearningResultManagementWHStore = create<IuseLearningResultManagementWHStore>((set,get) =>({
    sideNav: {
        titleList: [
            {
                title: 'Spark Writing',
                path: '',
                subTitleList: [
                    {
                        title: 'Report&Portfolio',
                        path: 'ReportAndPortfolio'
                    },
                ]
            },
            // {
            //     title: 'Free Writing',
            //     path: '',
            //     subTitleList: [
            //         {
            //             title: 'Report&Portfolio',
            //             path: 'ReportAndPortfolio'
            //         },
            //     ]
            // },
        ]
    },
    getAllReportData: {
        book_name: '',
        students: []
    },
    setAllReportData: (data) => {
        set(()=>({getAllReportData: data}));
    }
}))

export default useLearningResultManagementWHStore;