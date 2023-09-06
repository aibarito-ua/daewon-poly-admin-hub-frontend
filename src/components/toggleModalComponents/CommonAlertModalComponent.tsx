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
import useControlAlertStore from '../../store/useControlAlertStore';
import { IconButton } from '@mui/material';

export default function CommonAlertModalComponent(
  
) {
  const {
    commonAlertControllerFlag,
    commonAlertMessage,
    commonAlertOpenFlag,
    commonAlertHeadTitle,
    commonAlertNoLabel,
    commonAlertYesLabel,
    commonAlertOneButton,
    commonAlertType,

    setCommonAlertHeadTitle,
    commonAlertClose,
    setCommonAlertMessage,
    commonAlertOpen,
    commonAlertCloseEvent,
    commonAlertYesFunctionEvent,
  } = useControlAlertStore();  
  
  React.useEffect(()=>{
    
  }, [commonAlertOpenFlag])

  // Close Custom Button
  const CloseButton = (props:{lineColor: string,} ) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
      <g id="p_btn_close" transform="translate(0.206)">
        <rect id="guide" className="cls-1" fill="none" opacity="0.2" width="20" height="20" transform="translate(-0.206)"/>
        <g id="사각형_347" data-name="사각형 347" className="cls-2" fill={props.lineColor} stroke={props.lineColor} transform="translate(17.356 15.973) rotate(135)">
          <rect className="cls-3" stroke="none" width="1.717" height="18.888"/>
          <rect className="cls-4" fill="none" x="0.5" y="0.5" width="0.717" height="17.888"/>
        </g>
        <g id="사각형_348" data-name="사각형 348" className="cls-2" fill={props.lineColor} stroke={props.lineColor} transform="translate(3.999 17.187) rotate(-135)">
          <rect className="cls-3" stroke="none" width="1.717" height="18.888"/>
          <rect className="cls-4" fill="none" x="0.5" y="0.5" width="0.717" height="17.888"/>
        </g>
      </g>
    </svg>
    )
  }

  const handleClickYes = () => {
    if (commonAlertYesFunctionEvent!==null) {
      commonAlertYesFunctionEvent();
    }
    if (commonAlertType!=='continue') {
      commonAlertClose();
    }
  };

  const handleClose = () => {
    commonAlertClose();
  };

  return (
    <div className='flex'>
      <Dialog className=''
      PaperProps={{sx:{
        borderRadius: '5px',
      }}}
      open={commonAlertOpenFlag} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: '#ffffff',
            paddingLeft: '20px',
            paddingTop: '20px',
          }}
        >
          <div className='flex flex-row w-full text-[18px] leading-[29px] text-[#222222] font-bold capitalize'>
            {commonAlertHeadTitle}
            <IconButton
              size='small'
              sx={{position: 'absolute', padding:0, right: '20px', top: '23px', height: '20px', width: '20px', backgroundColor: '', ":hover": {backgroundColor:''}}}
              onClick={handleClose}
            >
              <CloseButton lineColor='#222'/>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent 
          className='flex flex-1 flex-col min-w-[400px] h-fit'
          sx={{
            paddingY:0
          }}
        >
        <div className='flex flex-1 flex-col h-[400px] py-[34px] justify-center border-t border-t-[#dddddd]'>
          {commonAlertMessage.map((msg, msgIdx)=>{
            const keyValue = 'msg-'+msgIdx;
            return (
              <div key={keyValue}
                className='text-center text-[#222222] text-[16px] font-bold'
              >{msg}</div>
            )
          })}
        </div>
        </DialogContent>
        <DialogActions sx={{
          display:'flex',
          padding:0,
          margin:0,
        }}>
            {commonAlertOneButton ? (
                <div className='flex flex-1 flex-row justify-center w-full h-[55px] items-center'>
                  <div className='flex flex-1 h-full justify-center text-[18px] bg-[#0fa9cb] text-[#ffffff] hover:cursor-pointer items-center'
                    onClick={handleClickYes}
                  >{commonAlertYesLabel}</div>
                </div>
              ):(
                <div className='flex flex-1 flex-row justify-center w-full h-[55px] items-center'>
                  <div className='flex flex-1 h-full justify-center text-[18px] bg-[#0fa9cb] text-[#ffffff] hover:cursor-pointer items-center'
                    onClick={handleClickYes}
                  >{commonAlertYesLabel}</div>
                  <div className='flex flex-1 h-full justify-center text-[18px] bg-[#e5e5e5] text-[#222222] hover:cursor-pointer items-center'
                    onClick={commonAlertCloseEvent!==null? ()=>commonAlertCloseEvent(): handleClose}
                  >{commonAlertNoLabel}</div>
                </div>
            )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
