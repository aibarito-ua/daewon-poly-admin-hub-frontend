import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReportTabComponent from './reportLayouts/TabCompoent';
import { commonSvgIcons } from '../../util/svgs/commonSvgIcons';
import useReportStore from '../../store/useReportStore';

export default function ReportModalComponent(
  props: {
    feedbackStates:TFeedbackStates;
    studend_code:string;
    initSettingData: Function;
    from?: ''|'portfolioModal'|'portfolioModalLRM'
  }
) {
  const { 
    feedbackStates,
    studend_code,
    initSettingData, from
} = props;
  const [open, setOpen] = React.useState(false);

  const {
    report, set
  } = useReportStore();
  
  React.useEffect(()=>{
    
  }, [open])

  const handleClickOpen = async () => {
    if (from==='portfolioModal') {
      
      console.log('close')
      handleClose();
    } else if (from==='portfolioModalLRM') {
      const init = await initSettingData();
      console.log('portfolioModalLRM',init)
      console.log('report =40=',report)
      if (init) {
        // set.doughnutChart(dumyData);
        console.log('open')
        setOpen(true);
      }
    } else {
      const init = await initSettingData();
      if (init) {
        // set.doughnutChart(dumyData);
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dumyData:TRubricScoreData[] = [
    {name: 'convention', score: 0},
    {name: 'organization', score: 0},
    {name: 'ideas', score: 0},
    {name: 'voice', score: 0},
    {name: 'word choice', score: 0},
    {name: 'sentence fluency', score: 0},
  ]



  return (
    <div className='flex'>
    <button 
        className={`chatbot-modal-button justify-center`}
        onClick={async()=>await handleClickOpen()}
    ><div className={from ? 'bt-go-report-in-modal':'lm-bt-report-in-table'}/></button>
      <Dialog className=''
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '1300px',
            minWidth: '1300px',
            
          }
        }}
      open={open} onClose={handleClose}
      
      >
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
          
          <span>{`Report - ${feedbackStates.defautInfo.student_name.student_name_kr} (${feedbackStates.defautInfo.student_name.student_name_en})`}</span>
          <div className='absolute top-[15px] right-[20px] hover:cursor-pointer bg-svg-btn-close bg-no-repeat w-[20px] h-[20px]' onClick={handleClose}></div>
          
        </DialogTitle>
        <DialogContent 
          sx={{
            height: 'fit-content',
            paddingX: '20px',
          }}
            className='flex flex-1 min-w-[1260px] w-full h-full bg-[#f2f9ff]'
        >
          <ReportTabComponent doughnutValues={report.doughnutChart}
            student_code={studend_code} otherModalCloseFn={handleClose}
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
