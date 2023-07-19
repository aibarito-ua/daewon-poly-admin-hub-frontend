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
import { TRubricTypeData, TRubricTypeDataItem, TRubricTypeHeader, rubric_type_datas } from '../../utils/EssayWriting/rubricTypeData';
import btnPreview from '../../util/png/btn_preview.png';
import CloseButtonIcon from './img/p_btn_close.svg'

interface IRubricTypeModalComponentProps {
  keyValue: string|number;
  rubric_type:string;
}
interface IRubricTableDataItem {
  key:string;
  value:string|string[];
  rowspan: number;
  print: boolean;
}

export default function RubricTypeModalComponent(props:IRubricTypeModalComponentProps) {

  const {
    keyValue, rubric_type
  } = props;
    
  const [open, setOpen] = React.useState(false);
  const [viewRubric, setViewRubric] = React.useState<IRubricTableDataItem[][]>([]);
  const [viewRubricHead, setViewRubricHead] = React.useState<TRubricTypeHeader[]>([]);
  

  React.useEffect(()=>{
    if (!open) {
      setViewRubric([])
      setViewRubricHead([])
    } else {
      
      const splitRubricTypeTextArr = rubric_type.toLowerCase().split(' ');
      const targetText = `${splitRubricTypeTextArr[0]}_${splitRubricTypeTextArr[1]}_${splitRubricTypeTextArr[2]}`;
      // rubric_type_datas
      const targetData = rubric_type_datas[targetText];
      console.log('target =',targetData)
      // table type으로 변환!! 
      processTableData(targetData);

    }
  }, [open])

  // process table data 
  const processTableData = (allDatas:TRubricTypeData ) => {
    const tableDatas = allDatas.data;
    const tableHeadDatas = allDatas.dataHead;
    let dataModel:IRubricTableDataItem[][] = [];
    for (let dataIndex =0; dataIndex < tableDatas.length; dataIndex++) {
      const rowData = tableDatas[dataIndex];
      let pushRow:IRubricTableDataItem[] =[]
      for (let colIndex = 0;colIndex < tableHeadDatas.length; colIndex++) {
        const keyValue = tableHeadDatas[colIndex].accessor;
        const cellData = rowData[keyValue];
        const pushCellData:IRubricTableDataItem = {
          key: keyValue,
          value: cellData,
          rowspan: 1,
          print: true
        };
        pushRow.push(pushCellData);
      } // make cell
      dataModel.push(pushRow)
    } // make row
    console.log('make all data =',dataModel)
    setViewRubric(dataModel);
    setViewRubricHead(tableHeadDatas);
  }

  const RubricTableHeader = (props: {tableHeader: TRubricTypeHeader[]}) => {
    
    return (
      <thead className='text-xs capitalize h-[68px] text-[13px] text-[#222222] leading-[20px] font-medium'>
        <tr className='bg-[#f6fdff]'>
          {props.tableHeader.map((tableHead, headIndex)=>{
            const checkSpan = tableHead.accessor==='explanation'||tableHead.accessor==='category'
            return (
              <th key={tableHead.accessor+headIndex}
              className={`px-2 py-2 text-center border border-[#ddd] ${
                tableHead.accessor==='category' ? 'w-32':'w-52'
              } border-t-[#111]`}
              rowSpan={checkSpan ? 2:1}
              >
                {checkSpan ? tableHead.header:(
                  tableHead.accessor==='1' ? '1~2' : (
                    tableHead.accessor==='2' ? '3~4' : (
                      tableHead.accessor==='3' ? '5~6' : (
                        tableHead.accessor==='4' ? '7~8': '9~10'
                      )
                    )
                  )
                )}
              </th>
            )
          })}
        </tr>
        <tr className='bg-[#f6fdff]'>
          {props.tableHeader.map((tableHead, headIndex)=>{
            const checkSpan = tableHead.accessor==='explanation'||tableHead.accessor==='category'
            if (!checkSpan) {
              return (
                <th key={tableHead.accessor+headIndex}
                className='px-2 py-2 w-fit text-center border border-[#ddd]'
                >
                  {tableHead.header}
                </th>
              )
            } else return null;
          })}
        </tr>
      </thead>
    )
  }

  const RubricTableBody = (props: {dataModel: IRubricTableDataItem[][]}) => {
    const {dataModel} = props;
    return (
      <tbody >
        {dataModel && dataModel.map((rowItem, rowIndex)=>{
          return (
            <tr key={'row-data-'+rowIndex}>
              {rowItem.map((cellItem, cellIndex)=>{
                return (
                  <td key={cellItem.key}
                  className={`w-32 py-1 px-2 whitespace-normal border border-[#ddd] text-[13px] text-[#222222] leading-[20px] ${
                    cellItem.key==='category' ? 'font-bold capitalize text-center bg-[#fff9ec]'
                    :cellItem.key==='explanation' ? 'bg-[#fffdf7] text-left align-top' : 'bg-white text-left align-top'
                  }`}>
                    {typeof(cellItem.value)==='string' ? cellItem.value 
                    : cellItem.value.map((textItem, textIndex)=>{
                      return (
                        <div key={'explanation-'+textIndex}>{`- ${textItem}`}</div>
                      )
                    })}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }

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
      <span className="flex flex-row hover:cursor-pointer text-center items-center min-w-max px-[20px]"
          onClick={handleClickOpen}
      ><img src={btnPreview} className='w-[24px] h-[24px] mr-[6px]'/>{rubric_type}</span>
      <Dialog className=''
      fullWidth={true}
      maxWidth={'xl'}
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
            {rubric_type}
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
            className='flex flex-1 flex-col w-full h-full'
        >
        <div className='flex flex-1 h-full w-full bg-[#d9d9d9] mt-8'>
        <div className='flex flex-grow flex-col w-full overflow-y-auto'>
          <table className='text-sm text-left w-full border border-[#808080] table-fixed'>
            <RubricTableHeader 
              tableHeader={viewRubricHead}
            />
            <RubricTableBody 
              dataModel={viewRubric}
            />
          </table>
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
