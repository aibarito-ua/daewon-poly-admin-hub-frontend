import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import useNavStore from '../../store/useNavStore';
import {Cookies} from 'react-cookie'
import { CONFIG } from '../../config';
import { Alert } from '@mui/material';

export default function SimpleSnackbar(props: {
    toastOpen:boolean,
    setToastOpen: Function,
}) {
const {setToastOpen, toastOpen} = props;
    
React.useEffect(()=>{
    
    if (toastOpen) {
        // setTimeout(() => {
        //     setToastOpen(false)
        // }, (3000));
    }
  }, [toastOpen])

  const handleClick = () => {
    setToastOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };

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

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseButton  lineColor='#222'/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={toastOpen}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        autoHideDuration={6000}
        onClose={handleClose}
        message="메뉴 접근 권한이 없습니다."
        action={action}
        
      >
        <div className='toast-message-wrap'>
            <div className='bg-toast-warning-ic bg-no-repeat bg-cover w-[28px] h-[28px]'/>
        <div className='toast-message-title-wrap'>{"메뉴 접근 권한이 없습니다."}</div>
        <div className='toast-message-close-wrap'>
            <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseButton lineColor='#222'/>
        </IconButton>
        </div>
        </div>
      </Snackbar>
    </div>
  );
}