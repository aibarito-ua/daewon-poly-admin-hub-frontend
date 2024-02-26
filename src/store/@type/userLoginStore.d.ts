interface IUserInfo {
    name: string;
    email: string;
    companyName: string;
    class: string;
    subClass: string;
    role: TRole;
    isOpen: boolean;
    setIsOpen: any;

    clientCode:string[],
    mcYn:string,
    memberCode:string,
    accessToken:string,
    pageAuth: string
    
    setUserInfo: (userLoginInfomation: IUserLoginInfo)=>void;

    // MAINTENANCE(점검 )
    maintenanceData: TMaintenanceData;
    setMaintenanceData: (data:TMaintenanceData) => void;
}
interface IUserLoginInfo {
    clientCode:string[],
    mcYn:string,
    memberCode:string,
    accessToken:string,
    pageAuth:string,
}

// type TRole = "Head" | "Campus" | "All" |"logout";
type TRole = "Y" | "N" | "All" |"logout";

type TMaintenanceData = {
    alertTitle: string;
    type: string;
    open:boolean;
    data: TMaintenanceInfo
}
type TMaintenanceInfo = {
    start_date: string;
    end_date: string;
    maintenance_description_en: string[];
    maintenance_description_kr: string[];
    time_description_en: string;
    time_description_kr: string;
    
}