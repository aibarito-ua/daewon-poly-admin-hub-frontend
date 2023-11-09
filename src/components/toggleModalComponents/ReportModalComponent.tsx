import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReportTabComponent from './reportLayouts/TabCompoent';
import useReportStore from '../../store/useReportStore';
import useLearningManagementSparkWritingStore from '../../store/useLearningManagementSparkWritingStore';

export default function ReportModalComponent() {
  
  const {
    report,
    isModalOpen, setIsModalOpen,
  } = useReportStore();
  const {
    feedbackDataInStudent
  } = useLearningManagementSparkWritingStore();
  
  const handleClose = () => {
    setIsModalOpen({isReportOpen:false, isPortfolioOpen:false})
  };

  return (
    <div className='flex'>
      <Dialog className=''
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '1300px',
            minWidth: '1300px',
            
          }
        }}
      open={isModalOpen.isReportOpen}
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
          
          <span>{`Report - ${feedbackDataInStudent.defautInfo.student_name.student_name_kr} (${feedbackDataInStudent.defautInfo.student_name.student_name_en})`}</span>
          <div className='absolute top-[15px] right-[20px] hover:cursor-pointer bg-svg-btn-close bg-no-repeat w-[20px] h-[20px]' 
          onClick={ () => handleClose() } />
          
        </DialogTitle>
        <DialogContent 
          sx={{
            height: 'fit-content',
            paddingX: '20px',
          }}
            className='flex flex-1 min-w-[1260px] w-full h-full bg-[#f2f9ff]'
        >
          <ReportTabComponent doughnutValues={report.doughnutChart}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
