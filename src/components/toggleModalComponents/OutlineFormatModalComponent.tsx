import * as React from 'react';
import {} from 'react-router-dom';
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
import { TActivitySparkWritingBooks } from '../../store/@type/useActivityWritingHubStore';
import btnPreview from '../../util/png/btn_preview.png'

interface IOutlineFormatModalComponentProps {
  keyValue: string|number;
  outline_format_type:string;
  wholeData:TActivitySparkWritingBooks[]
  year:string;
  semester:string;
  level:string;
  book:string;
  unit:string;
  image?: string;
}

export default function OutlineFormatModalComponent(props:IOutlineFormatModalComponentProps) {

  const {
    keyValue, outline_format_type,
    wholeData,
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
      // console.log('whole =',wholeData)
      // console.log('year: ',year,', semester: ',semester,', level: ',level,', book: ',book, ', unit: ',unit)
      
      let filterData:{
        outline_form:string,
        texts: string[],
        placeHolderText: string[]
      }[] = []; 
      // = wholeData.filter((dataItem, dataIndex)=>{
      
      for (let dataIndex = 0; dataIndex < wholeData.length; dataIndex++) {
        let dataItem = wholeData[dataIndex];
        const targetCheck1 = dataItem.year === year;
        const targetCheck2 = dataItem.semester === semester;
        const targetCheck3 = dataItem.level === level;
        const targetCheck4 = dataItem.book === book;
        const targetCheck5 = dataItem.unit === unit;
        const targetCheck6 = dataItem.outline_form !=='';
        if (targetCheck1&&targetCheck2&&targetCheck3&&targetCheck4&&targetCheck5&&targetCheck6) {
          if (dataIndex === 0) {
            const texts = [dataItem.outline_text]
            const placeHolderText = [`Start typing in your ${dataItem.outline_form} ...`]
            const pushItem = {
              outline_form: dataItem.outline_form,
              texts,
              placeHolderText
            }
            filterData.push(pushItem)
          } else {
            const beforeIndex = dataIndex-1;
            const beforeCheckTarget = wholeData[beforeIndex];
            const beforeOutlineCheck = beforeCheckTarget.outline_form === dataItem.outline_form;

            const beforeFilterIndex = filterData.length - 1;
            const beforeFilterData = filterData[beforeFilterIndex];

            if (beforeOutlineCheck) {
              const texts = [
                ...beforeFilterData.texts,
                dataItem.outline_text
              ]
              const placeHolderText = [
                ...beforeFilterData.placeHolderText,
                `Start typing in your ${dataItem.outline_form} ...`
              ]
              const pushItem = {
                outline_form: dataItem.outline_form,
                texts,
                placeHolderText
              }
              filterData.splice(beforeFilterIndex, 1, pushItem)
            } else {
              const texts = [dataItem.outline_text]
              const placeHolderText = [`Start typing in your ${dataItem.outline_form} ...`]
              const pushItem = {
                outline_form: dataItem.outline_form,
                texts,
                placeHolderText
              }
              filterData.push(pushItem)
            }
          }
        }
      }
      // });
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
            className='flex flex-1 flex-col min-w-[600px] h-[500px]'
        >
        <div className='flex flex-1 h-[400px] bg-[#d9d9d9] mt-8'>
        <div className='flex flex-grow flex-col w-full overflow-y-auto px-2'>
          {viewData.map((viewItem, viewIndex)=>{
            // const keyString = `${viewItem.year}-${viewItem.semester}-${viewItem.level}-${viewItem.unit}-${viewItem.outline_form}-${viewIndex}`
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
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
