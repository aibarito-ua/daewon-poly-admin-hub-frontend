import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useLoginStore from '../../store/useLoginStore';
import buttonImage from './img/report_image.png'
import ComponentToPrint from '../commonComponents/customComponents/exportButtons/PrintComponent';

export default function ReportModalComponent(
  props: {
    userInfo:TFeedbackStates;
    title: string;
    body:string;
    draft:number;
  }
) {
    const {body,title,userInfo,draft} = props;
  const [open, setOpen] = React.useState(false);
  
  React.useEffect(()=>{
    
  }, [open])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeValue = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // // console.log('current value =',e.currentTarget.value)
    // e.currentTarget.style.height = 'auto';
    // e.currentTarget.style.height = e.currentTarget.scrollHeight+'px';
    // const value = e.currentTarget.value;
    // const inputValue = value.replace(/\n{2,}/gm, '\n')
    // setInputText(inputValue)
  }

  const onKeyUpEvent = async (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if (e.key==='Enter') {
    //     if (!e.shiftKey) {
    //         console.log('enter')
    //         console.log('inputText =',inputText)
            
    //         e.currentTarget.value = '';
    //         e.currentTarget.style.height = 'auto';
    //         e.currentTarget.style.height = e.currentTarget.scrollHeight+'px';
    //         const inputTextValue = inputText.replace(/\n$/gmi,'');
    //         await callDialogAPIFN(inputTextValue);
    //     } 
    // }
  }

  return (
    <div className='flex'>
    <button 
        className={`chatbot-modal-button justify-center bg-black rounded-lg`}
        onClick={handleClickOpen}
    ><img className='flex w-12 h-12' src={buttonImage}/></button>
      <Dialog className=''
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '100%'
          }
        }}
      open={open} onClose={handleClose}>
        <DialogTitle>Report</DialogTitle>
        <DialogContent 
            className='flex flex-1 w-full h-full flex-col bg-[#f3f3f3]'
        >
          <div className='p-[10px]'>
        <ComponentToPrint userInfo={userInfo} draft={draft}/>

          </div>
          
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
