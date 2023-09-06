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
  const [viewData, setViewData] = React.useState<{
    outline_form:string,
    texts: string[],
    placeHolderText: string[]
  }[]>([]);

  React.useEffect(()=>{
    if (!open) {
      setViewData([]);
    } else {
      console.log('whole =',wholeData)
      const targetWholeData = wholeData[unit-1];
      const targetData = targetWholeData.outline_format.outline_format;
      console.log('year: ',year,', semester: ',semester,', level: ',level,', book: ',book, ', unit: ',unit)
      
      let filterData:{
        outline_form:string,
        texts: string[],
        placeHolderText: string[]
      }[] = []; 
      for (let dataIndex =0; dataIndex < targetData.length; dataIndex++) {
        const dataItem = targetData[dataIndex]
        console.log('data item [',dataIndex,'] =',dataItem)
        // const contentCheck = Array.isArray(dataItem.content)
        const texts = Array.isArray(dataItem.content) ? dataItem.content: [dataItem.content]
        const placeHolderText = [`Start typing in your ${dataItem.name} ...`]
        const pushItem = {
          outline_form: dataItem.name,
          texts,
          placeHolderText
        }
        filterData.push(pushItem)
      }
      console.log('after filter data =',filterData)
      setViewData(filterData);
      
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
      }}}
      open={open} onClose={handleClose}>
        <DialogTitle borderBottom={1}
          sx={{
            backgroundColor: '#333',
            paddingLeft: '20px',
            paddingY: '13px'
          }}
        >
          <div className='flex flex-row text-[16px] text-[#ffffff] font-bold'>
            {wholeData[unit-1].outline_format.name}
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
            className='flex flex-1 flex-col min-w-[600px] h-[500px]'
        >
        <div className='flex flex-1 h-[400px] bg-[#d9d9d9] mt-8'>
        <div className='flex flex-grow flex-col w-full overflow-y-auto px-2'>
          {viewData.map((viewItem, viewIndex)=>{
            return (
              <div key={viewItem.outline_form+'-'+viewIndex}
                className='flex flex-wrap flex-col w-full h-fit relative bg-white mb-4 shadow-[5px_5px_5px_rgba(0,0,0,0.25)]'
              >
                <div className='outline-accordion-button-inner'>
                  {viewItem.outline_form}
                </div>
                <div className=''
                >
                  {viewItem.texts.map((textItem, textIndex)=>{
                    return (
                      <div key={'outline-modal-'+textIndex} className='flex flex-col px-4 pb-2'>
                        <div>{textItem}</div>
                        <div className='flex border text-[#808080] justify-center'>{viewItem.placeHolderText[textIndex]}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
