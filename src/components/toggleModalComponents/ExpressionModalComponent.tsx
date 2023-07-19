import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useLoginStore from '../../store/useLoginStore';
import buttonImage from './img/buttonEllaImg.png'
import { SvgDocumentSearchIcon } from '../commonComponents/BasicTable/svgs/DocumentSearch';
import { IconButton } from '@mui/material';
import btnPreview from '../../util/png/btn_preview.png'

interface IExpressionModalComponentProps {
  keyValue: string|number;
  btnLabel: string;
  lesson: string;
  question: string;
  image?: string;
}

export default function ExpressionModalComponent(props:IExpressionModalComponentProps) {

  const {
    keyValue, lesson, question, btnLabel
  } = props;
    
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    if (!open) {
    }
  }, [open])

  // Close Custom Button
  const CloseButton = () => {
    return (
      <span className=" text-gray-600 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
        <svg aria-hidden="true" className="w-4 h-4" fill="#6499ff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Close modal</span>
      </span>
    )
}

  const handleClickOpen = () => {
    if (btnLabel!=='') {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (btnLabel!=='') {
      setOpen(false);
    }
  };

  return (
    <div className='flex' key={keyValue}>
      <span className="flex flex-row hover:cursor-pointer text-center items-center"
          onClick={handleClickOpen}
      >
        {btnLabel!=='' && <img src={btnPreview} className='w-[24px] h-[24px] mr-[6px]'/>}
        <span >{btnLabel!=='' ? btnLabel : ' '}</span>
        {/* <SvgDocumentPreviewIcon className="w-[24px] h-[24px] pr-[6px]"/> */}
      </span>
      <Dialog className=''
      PaperProps={{sx:{borderRadius: '1.2rem'}}}
      open={open} onClose={handleClose}>
        <DialogTitle>
          <div className='flex flex-row'>
            Expression
          <IconButton
            size='small'
            sx={{position: 'absolute', right: 8, top: 8, height: '1.3rem', width: '1.3rem', backgroundColor: '#003296', ":hover": {backgroundColor:'#003296'}}}
            onClick={handleClose}
          >
            <CloseButton />
          </IconButton>
          </div>
          <div className='flex flex-row capitalize text-base'>
            <span>{lesson}</span>
            <span className='px-2'>{'|'}</span>
            <span>{question}</span>
          </div>
        </DialogTitle>
        <DialogContent 
            className='flex flex-1 flex-col min-w-[500px] h-[500px]'
        >
        <div className='flex flex-1 h-[400px] bg-[#f3f3f3]'>
        <div className='flex flex-grow flex-col w-full overflow-y-auto'>
          img
        </div>
        
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
