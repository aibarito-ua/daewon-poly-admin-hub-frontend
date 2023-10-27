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
    employeeSttName:string,
    memberCode:string,
    accessToken:string,
    pageAuth: string
    
    setUserInfo: (userLoginInfomation: IUserLoginInfo)=>void;
}
interface IUserLoginInfo {
    clientCode:string,
    employeeSttName:string,
    memberCode:string,
    accessToken:string,
    pageAuth:string,
}

type TRole = "Head" | "Campus" | "All" |"logout";