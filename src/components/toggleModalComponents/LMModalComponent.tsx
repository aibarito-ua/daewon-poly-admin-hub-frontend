import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';

export default function LMModalComponent(props:{
    open: boolean,
    setOpen: Function,
    title: string | undefined,
    description: string,
    student: ILRMStudentDataForModal | undefined,
    content: JSX.Element
}) {
//   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleDone = () => {
    props.setOpen(false)
  }

  const CloseButton = () => {
    return (
        <button type="button" 
            className="top-[20px] right-[20px] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center" 
            onClick={handleClose}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path style={{opacity: '.2', fill: 'none'}} d="M0 0h20v20H0z"/>
                <g data-name="사각형 347" style={{fill:'#fff', stroke: '#222'}}>
                    <path style={{stroke: 'none'}} d="M0 0h1.717v18.888H0z" transform="rotate(135 5.278 11.543)"/>
                    <path style={{fill: 'none'}} d="M.5.5h.717v17.888H.5z" transform="rotate(135 5.278 11.543)"/>
                </g>
                <g data-name="사각형 348" style={{fill: '#fff', stroke: '#222'}}>
                    <path style={{stroke: 'none'}} d="M0 0h1.717v18.888H0z" transform="rotate(-135 5.467 7.803)"/>
                    <path style={{fill: 'none'}} d="M.5.5h.717v17.888H.5z" transform="rotate(-135 5.467 7.803)"/>
                </g>
            </svg>
            <span className="sr-only">Close modal</span>
        </button>
    )
}

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={false}
      >
        <DialogContent style={{padding: '20px'}}>
          <div className='flex flex-row w-full items-center h-[27px] text-[18px] leading-[20px] text-[#222222] font-bold capitalize font-notoSansCJKKR' style={{justifyContent: 'space-between'}}>
              {props.title}
              <CloseButton />
          </div>
          <div style={{width: '660px', height: '1px', margin: '10.5px 0 24.5px', backgroundColor: '#ddd'}}></div>
          <div className='font-notoSansCJKKR flex flex-row justify-between items-end'>
              <div className='flex flex-row h-[24px] p-0'>
                  <div className='w-[3px] h-[12px] mt-[4px] bg-[#0fa9cb]' />
                  <div className='learning-management-analysis-lesson-question'>
                    {props.description}
                  </div>
              </div>
              <div className='flex flex-col items-end'>
                  <span>
                      <span className='learning-management-analysis-info-name'>Class:</span> 
                      <span className='mr-0 font-medium'>{props.student?.class}</span>
                  </span>
                  <span>
                      <span className='learning-management-analysis-info-name'>Name:</span> 
                      <span className='mr-0 font-medium'>{props.student?.student_name_kr} ({props.student?.student_name_en})</span>
                  </span>
              </div>
          </div>
          {props.content}
        </DialogContent>
      </Dialog>
    </div>
  );
}
