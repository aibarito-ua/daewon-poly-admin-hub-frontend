import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import buttonImage from './img/report_image.png'
import { DialogActions, FormControlLabel, Input, Radio, RadioGroup, RadioProps } from '@mui/material';
import useControlAlertStore from '../../store/useControlAlertStore';
import { useNavigate } from 'react-router-dom';
interface IReturnFeedbackProps {
    returnFeedbackValue: TReturnFeedback;
    setReturnFeedbackValue: Function;
    returnFeedFunction: (feedback_return: TReturnFeedback) => Promise<boolean>;
}

export default function ReturnFeedbackModalComponent (props: IReturnFeedbackProps) {
    const {
        returnFeedFunction, returnFeedbackValue, setReturnFeedbackValue,
    } = props;
  const [open, setOpen] = React.useState(false);
  const [reasonStr, setReasonStr] = React.useState<string>('');
  const [otherReason, setOtherReason] = React.useState<string>('');
  const navigate = useNavigate();
  const {
    commonAlertOpen
  } = useControlAlertStore();
  const modalTitle = 'Please choose the reason for returning the work to the student.';
  
  React.useEffect(()=>{
    if (!open) {
        setReasonStr('')
        setOtherReason('')
    } else {
        setReasonStr(radioLabelandString[0])
    }
  }, [open])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const send = async () => {
    const reason = reasonStr==='Other'? otherReason: reasonStr;
    const teacher_comment = returnFeedbackValue.teacher_comment;
    const rsp = await returnFeedFunction({ is_return: true, reason, teacher_comment });
    if (rsp) {
        setOpen(false);
        commonAlertOpen({
            head: 'RETURN',
            messages: ['Sent.','Return to the main menu.'],
            useOneButton: true,
            yesButtonLabel: 'OK',
            yesEvent: () => {
                navigate(`/LearningManagement/WritingHub/SparkWriting`);
                window.location.reload();
            }
        })
    } else {
        commonAlertOpen({
            head: 'Error',
            messages: ['잠시 후 다시 시도해주세요.'],
            useOneButton: true,
            yesButtonLabel: 'OK'
        })
    }
    
  }
  const cancel = () => {
    setOpen(false);
  }

  const radioLabelandString = ['Incomplete Writing', 'Irrelevant Content', 'Other']
  const otherRadio = () => {
    return (
        <span className='flex flex-row items-center gap-[9px]'>
            <span>{radioLabelandString[2]}</span>
            <input className={`w-[225px] h-[36px] border-[1px] border-[#ddd] rounded-[2px] p-[10px] ${reasonStr === 'Other' ? '':''}`} 
                disabled={reasonStr==='Other'? false:true}
                value={otherReason} onChange={(e)=>setOtherReason(e.currentTarget.value)}></input>
        </span>
    )
  }
  const RadioButtonsGroup = () => {
    return (
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            defaultValue={radioLabelandString[0]}
            value={reasonStr}
            onChange={(e)=>{
                console.log(e.currentTarget.value)
                const value = e.currentTarget.value;
                if (value!=='Other') {
                    setOtherReason('')
                }
                setReasonStr(e.currentTarget.value)
                // let dumyReturn:TReturnFeedback = JSON.parse(JSON.stringify(returnFeedbackValue));
                // dumyReturn.reason=e.currentTarget.value;
                // setReturnFeedbackValue(dumyReturn);
            }}
        >
            <FormControlLabel 
                sx={{'.MuiFormControlLabel-label': {
                    fontFamily: "NotoSansCJKKR",
                    fontSize: '13px',
                    lineHeight: 1.54,
                    color: '#222',
                    textAlign:'left'
                }}}
                value={radioLabelandString[0]} control={<Radio />} label={radioLabelandString[0]}/>
            <FormControlLabel 
                sx={{'.MuiFormControlLabel-label': {
                    fontFamily: "NotoSansCJKKR",
                    fontSize: '13px',
                    lineHeight: 1.54,
                    color: '#222',
                    textAlign:'left'
                }}}
                value={radioLabelandString[1]} control={<Radio />} label={radioLabelandString[1]}/>
            <FormControlLabel
            sx={{marginRight:0,'.MuiFormControlLabel-label': {
                fontFamily: "NotoSansCJKKR",
                fontSize: '13px',
                lineHeight: 1.54,
                color: '#222',
                textAlign:'left'
            }}}
            value={radioLabelandString[2]} control={<Radio />} label={otherRadio()} />
        </RadioGroup>
    )
  }

  return (
    <div className='flex'>
        <div className='learning-management-feedback-return-button' 
        onClick={handleClickOpen}/>
      <Dialog className=''
      PaperProps={{sx:{
        paddingX: '20px',
        paddingY: '30px',
        width: '340px'
      }}}
      open={open} onClose={handleClose}>
        <DialogTitle sx={{
            padding:0,
            fontFamily: "NotoSansCJKKR",
            width: '300px',
            height: '55px',
            minHeight: '55px',
            fontSize: '16px',
            fontWeight: 700,
            fontStretch: 'normal',
            lineHeight: 1.81,
            textAlign: 'center',
            color: '#222',
            marginBottom: '19.5px'
        }}>{modalTitle}</DialogTitle>
        <DialogContent 
            sx={{padding:0}}
            className='flex flex-1 flex-col w-[300px] h-[500px] border-t-[1px] border-t-[#ddd]'
        >
        <div className='flex flex-col flex-1 w-[300px] pt-[29.5px]'>
            {RadioButtonsGroup()}
            <div className='flex flex-row font-notoSansCJKKR leading-[1.43] text-[#222] text-[14px] mt-[30px] mb-[10px]'>{`Teacher's Comment:`}</div>
            <textarea 
                className='w-[300px] h-[100px] resize-none border-[#ddd] outline-none ring-0 focus:border-[#ddd] focus:outline-none focus:ring-0'
                value={returnFeedbackValue.teacher_comment}
                placeholder=''
                onChange={(e)=>{
                    const textareaValue = e.currentTarget.value;
                    let dumyReturn:TReturnFeedback = JSON.parse(JSON.stringify(returnFeedbackValue));
                    dumyReturn.teacher_comment=textareaValue;
                    setReturnFeedbackValue(dumyReturn);
                }}
            />
            <div className='flex flex-col justify-center items-center mt-[30px] w-[300] h-[83px] font-notoSansCJKKR leading-[1.81] text-[#ee4e4e] font-bold text-[16px]'>
                <span className='text-center'>{'Do you wish to send your feedback?'}</span>
                <span className='text-center'>{'Once you select ‘Send,’ your feedback will be delivered to the student.'}</span>
            </div>
        </div>
          
        </DialogContent>
        <DialogActions sx={{
          display:'flex',
          padding:0,
          margin:0,
        }}>
            <div className='flex flex-1 flex-row justify-center w-full items-center gap-[10px]'>
                <div className='return-feedback-modal-buttons bg-[#0fa9cb] text-[#ffffff]'
                onClick={send}
                >{'send'}</div>
                <div className='return-feedback-modal-buttons bg-[#e5e5e5] text-[#222222]'
                onClick={cancel}
                >{'cancel'}</div>
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}