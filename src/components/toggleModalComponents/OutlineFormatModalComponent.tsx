import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import btnPreview from '../../util/png/btn_preview.png';

interface IOutlineFormatModalComponentProps {
  keyValue: string|number;
  outline_format_type:string;
  wholeData:TActivitySparkWritingBooks[]
  year:number;
  semester:number;
  level:string;
  book:string;
  unit:number;
  unitId:number;
  image?: string;
}

export default function OutlineFormatModalComponent(props:IOutlineFormatModalComponentProps) {

  const {
    keyValue, outline_format_type,
    wholeData, unitId,
    year, semester, level, book, unit,
  } = props;
    
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(()=>{
    if (open) {
      console.log('unit id =',unitId)
      console.log('key value =',keyValue)
      console.log('outline_format_type =',outline_format_type)
      setTitle(outline_format_type)
    } else {
      setTitle('')
    }
  }, [open])

  // Close Custom Button
  const CloseButton = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
  
      <g id="p_btn_close" transform="translate(0.206)">
        <rect id="guide" className="cls-1" fill="none" opacity="0.2" width="20" height="20" transform="translate(-0.206)"/>
        <g id="사각형_347" data-name="사각형 347" className="cls-2" fill="#ffffff" stroke="#ffffff" transform="translate(17.356 15.973) rotate(135)">
          <rect className="cls-3" stroke="none" width="1.717" height="18.888"/>
          <rect className="cls-4" fill="none" x="0.5" y="0.5" width="0.717" height="17.888"/>
        </g>
        <g id="사각형_348" data-name="사각형 348" className="cls-2" fill="#ffffff" stroke="#ffffff" transform="translate(3.999 17.187) rotate(-135)">
          <rect className="cls-3" stroke="none" width="1.717" height="18.888"/>
          <rect className="cls-4" fill="none" x="0.5" y="0.5" width="0.717" height="17.888"/>
        </g>
      </g>
    </svg>
    )
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='flex justify-center' key={keyValue}>
      <span className="flex flex-row hover:cursor-pointer text-center items-center"
          onClick={handleClickOpen}
      ><img src={btnPreview} className='w-[24px] h-[24px] mr-[6px]'/>{outline_format_type}</span>
      <Dialog className=''
      PaperProps={{sx:{
        borderRadius: '0.2rem',
        width: '850px',
        minWidth: '850px',
        maxWidth:'850px',
      }}}
      open={open} onClose={handleClose}>
        <DialogTitle borderBottom={1}
          sx={{
            backgroundColor: '#333',
            paddingLeft: '20px',
            height:'50px',
            paddingY:'13px'
          }}
        >
          <div className='flex flex-row text-[16px] text-[#ffffff] font-bold h-[24px]'>
            {outline_format_type}
            <IconButton
              size='small'
              sx={{position: 'absolute', padding:0, right: '20px', top: '15px', height: '20px', width: '20px', backgroundColor: '', ":hover": {backgroundColor:''}}}
              onClick={handleClose}
            >
              <CloseButton />
          </IconButton>
          </div>
        </DialogTitle>
        <DialogContent 
            className='flex flex-1 flex-col w-[850px] h-[800px] overflow-y-auto overflow-x-hidden'
            sx={{
              padding: 0,
              '& .MuiDialogContent-root': {
                width: '850px',
                height: '800px',
              }

            }}
        >
          <div className='w-[850px] h-[800px] px-[20px] pt-[10px] '>
            {title==='OL01' && 
              <div className='bg-outline-format-image-ol-01 bg-no-repeat bg-contain w-[810px] h-[1100px] pb-[20px]'></div>
            }
            {title==='OL02' && 
              <div className='bg-outline-format-image-ol-02 bg-no-repeat bg-contain w-[810px] h-[1220px] pb-[20px]'></div>
            }
            {title==='OL03' && 
              <div className='bg-outline-format-image-ol-03 bg-no-repeat bg-contain w-[810px] h-[1340px] pb-[20px]'></div>
            }
            {title==='OL04' && 
              <div className='bg-outline-format-image-ol-04 bg-no-repeat bg-contain w-[810px] h-[1220px] pb-[20px]'></div>
            }
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
