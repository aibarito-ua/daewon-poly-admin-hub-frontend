import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import PortfolioTabComponent from './portfolioLayouts/PortfolioTabComponent';
import useLearningManagementSparkWritingStore from '../../store/useLearningManagementSparkWritingStore';
import useReportStore from '../../store/useReportStore';
interface IPortfolioComponentProps {
    // feedbackStates:TFeedbackStates;
    // initSettings?:Function;
    // studentCode?:string;
    // from?:''|'LM-Report';
    // otherModalCloseFn?: Function;
}
export default function PortfolioModalComponent (  ) {
    // const {
    //      otherModalCloseFn, from, initSettings, studentCode
    // } = props;
    // const [open, setOpen] = React.useState<boolean>(false);
    const [studentCode, setStudentCode] = React.useState<string>('');
    const {
        isModalOpen, setIsModalOpen
    } = useReportStore();
    const {
        feedbackDataInStudent
    } = useLearningManagementSparkWritingStore()
    // const student_code=isModalOpen.studend_code;
    React.useEffect(()=>{
       
    },[isModalOpen])
    const handleClickOpen = async () => {
        // if (isModalOpen.initSettingData) {
        //     const setInitComplete = await isModalOpen.initSettingData();
        //     if (setInitComplete) {
        //         setIsModalOpen({
        //             isOpen: {
        //                 portfolio:true,
        //                 report:false
        //             }
        //         })
        //     }
        // } else {
        //     setIsModalOpen({
        //         isOpen: {
        //             portfolio:true,
        //             report:false
        //         }
        //     })
        // }
    }
    const handleClose = () => {
        setIsModalOpen({
            isPortfolioOpen:false,
            isReportOpen:false,
        })
    }

    return (
        <div className='flex'>
            <Dialog className=''
            open={isModalOpen.isPortfolioOpen}
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
                    <PortfolioTabComponent/>
                </DialogContent>
            </Dialog>
        </div>
    )
}