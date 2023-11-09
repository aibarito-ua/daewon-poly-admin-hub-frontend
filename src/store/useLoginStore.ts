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
    clientCode: [],
    mcYn: '',
    memberCode: '',
    pageAuth:'',
    setUserInfo: (userInfo:IUserLoginInfo) => {

        set(()=>({
            clientCode: userInfo.clientCode,
            accessToken: userInfo.accessToken,
            mcYn: userInfo.mcYn,
            memberCode: userInfo.memberCode,
            pageAuth: userInfo.pageAuth
        }))
    },
    setIsOpen: (boolean:boolean) => {
        set(()=>({isOpen:boolean}))
    }
}))

export default useLoginStore;  