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
    },
    setMaintenanceData: (data) => {
        set(()=>({maintenanceData:data}))
    },
    maintenanceData: {
        alertTitle: 'System Maintenance Notice',
        data: {
            start_date: '',
            end_date: '',
            maintenance_description_en:[ 'To improve our services, a system inspection',
            'will be conducted at the times indicated below,', 
            'during which our services will be',
            'temporarily unavailable.',
            'Thank you for your understanding.'],
            maintenance_description_kr:[ ],
            time_description_en:'Monthly on the 14   and 28   00:30-01:00 AM',
            time_description_kr:'매월 14일, 28일 새벽 00:30~01:00'
        },
        open: false,
        type: ''
    },
}))

export default useLoginStore;  