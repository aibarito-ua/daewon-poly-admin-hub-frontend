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
    chosenCampus: null,
    setChosenCampus: (campus) => {
        set(() => ({
            chosenCampus: campus
        }))
    },
    chosenLevel: null,
    setChosenLevel: (level) => {
        set(() => ({
            chosenLevel: level
        }))
    },
    chosenClass: null,
    setChosenClass: (classname) => {
        set(() => ({
            chosenClass: classname
        }))
    },

    dropdown: {
        campusList: [],
        setSelectFilterCampusList: (campusList) => set((state) => ({dropdown: {...state.dropdown, campusList: campusList}})),
        levelList: [],
        setSelectFilterLevelList: (levelList) => set((state) => ({dropdown: {...state.dropdown, levelList: levelList}})),
        classList: [],
        setSelectFilterClassList: (classList) => set((state) => ({dropdown: {...state.dropdown, classList: classList}})),
    },

    isAllSelected: false,
    setIsAllSelected: (isAllSelected) => set({isAllSelected: isAllSelected}),
    selectFilterValues: ['', '', ''],
    setSelectFilterValues: (filterValues) => set({selectFilterValues: filterValues}),

    searchEventFunction: () => {},
    setSearchFunction(f) {
        set({searchEventFunction: f})
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