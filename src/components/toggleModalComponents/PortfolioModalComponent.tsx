import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import PortfolioTabComponent from './portfolioLayouts/PortfolioTabComponent';
import useLearningManagementSparkWritingStore from '../../store/useLearningManagementSparkWritingStore';
import useReportStore from '../../store/useReportStore';
interface IPortfolioComponentProps {
    feedbackStates:TFeedbackStates;
    otherModalCloseFn?: Function;
    from?:''|'LM-Report';
    initSettings?:Function;
    studentCode?:string;
}
export default function PortfolioModalComponent ( props: IPortfolioComponentProps ) {
    const {
         otherModalCloseFn, from, initSettings, studentCode
    } = props;
    const [open, setOpen] = React.useState<boolean>(false);
    const {
        isModalOpen, setIsModalOpen
    } = useReportStore();
    const {feedbackDataInStudent} = useLearningManagementSparkWritingStore()
    const student_code=studentCode?studentCode:feedbackDataInStudent.defautInfo.student_code;
    React.useEffect(()=>{
        // if (open) {
        //     if (isModalOpen==='report') {
        //         console.log('portfolio closed')
        //         setOpen(false)
        //     }
        // }
    },[open,isModalOpen])
    const handleClickOpen = async () => {
        if (initSettings) {
            const setInitComplete = await initSettings();
            if (setInitComplete) {
                setOpen(true);
                setIsModalOpen('portfolio')
            }
        } else {
            setOpen(true);
            setIsModalOpen('portfolio')
        }
    }
    const handleClose = () => {
        if (otherModalCloseFn) {
            otherModalCloseFn();
        }
        setOpen(false);
        setIsModalOpen('')
    }

    return (
        <div className='flex'>
            <div className={from==='LM-Report' 
                ? 'bg-no-repeat w-[124.3px] h-[40px] bg-svg-bt-portfolio hover:bg-svg-bt-portfolio-over hover:cursor-pointer select-none'
                : 'bg-no-repeat w-[38px] h-[44px] bg-svg-ic-portfolio hover:cursor-pointer select-none'}
            onClick={async() => await handleClickOpen()}>
            </div>
            <Dialog className=''
            open={open}
            // onClose={handleClose}
            
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '1300px',
                    minWidth: '1300px',
                    padding:0,
                    height: '850px',
                }
            }} >
                {/* Title */}
                <DialogTitle sx={{
                    backgroundColor: '#333',
                    color: '#fff',
                    position: 'relative',
                    fontFamily: 'NotoSansCJKKR',
                    fontSize: '16px',
                    fontWeight: 700,
                    height:'50px',
                    paddingTop: '13px',
                    paddingLeft: '20px'
                }}>    
                    <span>{`Portfolio - ${feedbackDataInStudent.defautInfo.student_name.student_name_kr} (${feedbackDataInStudent.defautInfo.student_name.student_name_en})`}</span>
                    <div className='absolute top-[15px] right-[20px] hover:cursor-pointer bg-svg-btn-close bg-no-repeat w-[20px] h-[20px]' onClick={handleClose}></div>
                </DialogTitle>
                {/* Content */}
                <DialogContent sx={{
                    height: '800px',
                    minHeight: '800px',
                    backgroundColor: '#f2f9ff',
                    paddingX:'20px',
                }}>
                    <PortfolioTabComponent student_code={student_code} from={from} modalClose={handleClose}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}