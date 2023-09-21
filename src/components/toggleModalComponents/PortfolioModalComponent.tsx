import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import PortfolioTabComponent from './portfolioLayouts/PortfolioTabComponent';
interface IPortfolioComponentProps {
    feedbackStates:TFeedbackStates;
    otherModalCloseFn?: Function;
    from?:''|'LM-Report'
}
export default function PortfolioModalComponent ( props: IPortfolioComponentProps ) {
    const {
        feedbackStates, otherModalCloseFn, from
    } = props;
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(()=>{
        
    },[open])
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className='flex'>
            <div className='bg-no-repeat w-[124.3px] h-[40px] bg-svg-bt-portfolio hover:bg-svg-bt-portfolio-over hover:cursor-pointer select-none'
            onClick={() => handleClickOpen()}>
            </div>
            <Dialog className=''
            open={open}
            onClose={handleClose}
            
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '1300px',
                    minWidth: '1300px',
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
                    <span>{`Portfolio - ${feedbackStates.defautInfo.student_name.student_name_kr} (${feedbackStates.defautInfo.student_name.student_name_en})`}</span>
                    <div className='absolute top-[15px] right-[20px] hover:cursor-pointer bg-svg-btn-close bg-no-repeat w-[20px] h-[20px]' onClick={handleClose}></div>
                </DialogTitle>
                {/* Content */}
                <DialogContent sx={{
                    height: '800px',
                    backgroundColor: '#f2f9ff'
                }}>
                    <PortfolioTabComponent student_code={feedbackStates.defautInfo.student_code} from={from} modalClose={handleClose}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}