interface IUserInfo {
    name: string;
    email: string;
    companyName: string;
    class: string;
    subClass: string;
    role: TRole;
    isOpen: boolean;
    setIsOpen: any;

    clientCode:string,
    mcYn:string,
    memberCode:string,
    accessToken:string,
    pageAuth: string
    
    setUserInfo: (userLoginInfomation: IUserLoginInfo)=>void;
}
interface IUserLoginInfo {
    clientCode:string,
    mcYn:string,
    memberCode:string,
    accessToken:string,
    pageAuth:string,
}

// type TRole = "Head" | "Campus" | "All" |"logout";
type TRole = "Y" | "N" | "All" |"logout";