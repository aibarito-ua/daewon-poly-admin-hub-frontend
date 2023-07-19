import { create } from 'zustand';

const useNavStore = create<INavItem>((set) => ({
    secondGenerationOpen: false,
    selectedMenu: "",
    selectedMenuTitle: "",
    sidebarFlagged: false,
    topNavHiddenFlagged: false,
    subNavTitleString: "",
    subRightNavTitleString: "",
    // unit info
    selectUnitInfo: {
        main: '',
        sub: ''
    },
    setSelectMenu: (selectdMenuStr: string, selectedMenuTitle: string) => {
        console.log("selectNumber :::", selectdMenuStr)
        set(()=>({selectedMenu:selectdMenuStr, selectedMenuTitle}))
    },
    setSidebarFlagged: (sidebarFlagged:boolean) => {
        set(()=>({sidebarFlagged}))
    },
    setTopNavHiddenFlagged: (topNavHiddenFlagged: boolean)=> {
        set(()=>({topNavHiddenFlagged}))
    },
    setSubNavTitleString: (subNavTitleString: string) => {
        set(()=>({subNavTitleString}))
    },
    setSubRightNavTitleString: (subRightNavTitleString: string|JSX.Element)=>{
        set(()=>({subRightNavTitleString}))
    },
    setSelectUnitInfo: (unitMainTitle: string, unitSubTitle: string)=>{
        const unitInfo: TUnitTitleItem = {
            main: unitMainTitle, sub: unitSubTitle
        };
        set(()=>({selectUnitInfo: unitInfo}))
    },

    // admin hub
    selectNavigationIndex: -1,
    selectNavigationTitles: [],
    setSelectNavigationTitles: (selectNavigationTitlesValue:string[]) => {
        const navMenuMainValue = ['레벨 및 교재','Activity 관리','학습 관리','학습 결과 관리']
        let currentMainMenuIndex = -1;
        for (let i =0; i < navMenuMainValue.length;i++) {
            if (selectNavigationTitlesValue[0]===navMenuMainValue[i]) {
                currentMainMenuIndex=i;
                break;
            }
        }
        set(()=>({
            selectNavigationTitles:selectNavigationTitlesValue,
            selectNavigationIndex: currentMainMenuIndex
        }))
    },

    // navigate block control value
    navigateBlockFlag:false,
    navigateBlockMessage: [],
    navigateBlockAlertYesFn: null,
    navigateBlockAlertNoFn: null,
    setNavigateBlockAlertYesFn(yesFn: Function) {
        set(()=>({
            navigateBlockAlertYesFn:yesFn
        }))
    },
    setNavigateBlockAlertNoFn(noFn: Function){
        set(()=>({
            navigateBlockAlertNoFn:noFn
        }))
    },
    setNavigateBlockFlag(flag:boolean) {
        set(()=>({
            navigateBlockFlag: flag
        }))
    },
    setNavigateBlockMessage(messages: string[]) {
        set(()=>({
            navigateBlockMessage: messages
        }))
    }
}))

export default useNavStore;