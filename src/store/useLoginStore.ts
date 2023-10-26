import { create } from 'zustand';

const useLoginStore = create<IUserInfo>((set) => ({
    name: "",
    email: "",
    companyName: "",
    class: '',
    subClass: '',
    role: "logout",
    isOpen: false,
    accessToken: '',
    clientCode: '',
    employeeSttName: '',
    memberCode: '',
    setUserInfo: (userInfo:IUserLoginInfo) => {

        set(()=>({
            // name: userInfo.name,
            // class: userInfo.class,
            // subClass: userInfo.subClass,
            // email: 'test@una.co.kr',
            // role:userInfo.role
            clientCode: userInfo.clientCode,
            accessToken: userInfo.accessToken,
            employeeSttName: userInfo.employeeSttName,
            memberCode: userInfo.memberCode
        }))
    },
    setIsOpen: (boolean:boolean) => {
        set(()=>({isOpen:boolean}))
    }
}))

export default useLoginStore;  