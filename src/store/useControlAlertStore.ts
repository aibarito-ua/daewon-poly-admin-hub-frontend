import {create} from 'zustand'
interface IUseControlAlertStore {
    commonAlertOpenFlag: boolean;
    commonAlertMessage: string[];
    commonAlertControllerFlag : number;
    commonAlertHeadTitle:string;
    commonAlertYesLabel:string;
    commonAlertNoLabel:string;
    commonAlertYesFunctionEvent: Function|null;
    commonAlertCloseEvent:Function|null;
    commonAlertOneButton: boolean;
    commonAlertType: ''|'warning'|'continue';

    setCommonAlertMessage: (messages: string[]) => void;
    setCommonAlertHeadTitle: (title:string) =>void;
    commonAlertOpen: (option?: TCommonAlertOpenOptions ) => void;
    commonAlertClose: () => void;
}
type TCommonAlertOpenOptions = {
    head?:string,
    yesButtonLabel?:string,
    noButtonLabel?:string,
    messages?:string[],
    yesEvent?:Function,
    closeEvent?:Function,
    useOneButton?:boolean,
    alertType?: ''|'warning'|'continue',
}
const useControlAlertStore = create<IUseControlAlertStore>((set, get) => ({
    commonAlertOpenFlag: false,
    commonAlertMessage: [],
    commonAlertControllerFlag : 0,
    commonAlertHeadTitle: '',
    commonAlertNoLabel:'No',
    commonAlertYesLabel: 'Yes',
    commonAlertYesFunctionEvent: null,
    commonAlertCloseEvent: null,
    commonAlertOneButton: false,
    commonAlertType:'',

    setCommonAlertMessage: (messages: string[]) => {
        set(()=>({
            commonAlertMessage: messages
        }))
    },
    setCommonAlertHeadTitle: (title:string) => {
        set(()=>({
            commonAlertHeadTitle: title
        }))
    },
    commonAlertOpen: (option?:TCommonAlertOpenOptions) => {
        const commonAlertHeadTitle=option?.head ? option.head:'Alert';
        const commonAlertYesLabel=option?.yesButtonLabel ? option.yesButtonLabel:'yes';
        const commonAlertNoLabel=option?.noButtonLabel ? option.noButtonLabel:'no';
        const commonAlertMessage=option?.messages ? option.messages:[];
        const commonAlertYesFunctionEvent=option?.yesEvent ? option.yesEvent:null;
        const commonAlertCloseEvent = option?.closeEvent ? option.closeEvent: null;
        const commonAlertOneButton=option?.useOneButton ? option.useOneButton:false;
        const commonAlertType=option?.alertType ? option.alertType:'';
        
        set(()=>({
            commonAlertHeadTitle,
            commonAlertYesLabel,
            commonAlertNoLabel,
            commonAlertMessage,
            commonAlertCloseEvent,
            commonAlertYesFunctionEvent,
            commonAlertOneButton,
            commonAlertOpenFlag:true,
            commonAlertType,
        }))
    },
    commonAlertClose: () => {
        set(()=>({
            commonAlertOpenFlag:false,
        }))
    }
}))

export default useControlAlertStore;