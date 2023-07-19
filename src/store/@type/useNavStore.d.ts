interface INavItem {
    secondGenerationOpen:boolean;
    selectedMenu: TStudentNavItem | string;
    setSelectMenu:any;
    sidebarFlagged: boolean;
    setSidebarFlagged: any;
    topNavHiddenFlagged: boolean;
    setTopNavHiddenFlagged: any;
    subNavTitleString: string;
    setSubNavTitleString: any;
    subRightNavTitleString: string|JSX.Element;
    setSubRightNavTitleString: any;
    selectUnitInfo: TUnitTitleItem;
    setSelectUnitInfo: (unitMainTitle:string, unitSubTitle:string) =>void;

    selectNavigationIndex: number;
    selectNavigationTitles: string[];
    setSelectNavigationTitles: (selectNavigationTitlesValue:string[]) => void;

    navigateBlockFlag: boolean;
    navigateBlockMessage: string[];
    setNavigateBlockFlag: (flag:boolean) => void;
    setNavigateBlockMessage: (messages:string[] ) =>void;

    navigateBlockAlertYesFn: Function|null,
    navigateBlockAlertNoFn: Function|null,
    setNavigateBlockAlertYesFn: (yesFn: Function) =>void;
    setNavigateBlockAlertNoFn: (noFn: Function) => void;
}
type TStudentNavItem = "MyPage" | "EssayWriting" | "Portfolio";
// type TTeacherNavItem = ""
