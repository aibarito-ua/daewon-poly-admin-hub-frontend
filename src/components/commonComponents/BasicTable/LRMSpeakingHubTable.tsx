import React, { FC, useState } from 'react';
import useLearningManagementSparkWritingStore from '../../../store/useLearningManagementSparkWritingStore';
import { CommonFunctions } from '../../../util/common/commonFunctions';
import { useLocation, useNavigate } from 'react-router-dom';
import LMModalComponent from '../../toggleModalComponents/LMModalComponent';
import useLearningResultManagementSHStore from '../../../store/useLearningResultManagementSHStore';

/**
 * This table component is reusable among LRM Speaking Hub pages [IdeaExchange:(Portfolio, Progress), ...]
 * 
 * Arguments: {
 *  tableHeader: list of strings of type [no, username, {mainHeading}_{mainHeadingIndex}_{subHeadingWithIndex}] ex. lesson_12_Q1
 *  tableBody [or data]: list of strings [{studentNumber}, {studentUsernameSet}, {data: {info: any, jsxElem}}]
 *  modalContent: JSX element, it will be shown when the modal is opened
 * }
 * 
 * maybe we also need to add number of subheadings
 * 
 */
const TableHeader = (props: {head:string[], subHeadingsCount: number}) => {
    const locationHook = useLocation();
    const isStoryVlog = locationHook.pathname.split('/').slice(-2)[0] === 'StoryVlog';

    let tableHeadDatas = props.head;
    let headModel:{accessor:string, header:string, width: number}[][] = [[],[]];
    for (let iRow = 0; iRow < 2; iRow++) {
        for (let jCol = 0; jCol < tableHeadDatas.length; jCol++) {
            const cellData = tableHeadDatas[jCol]; // lesson_i_Qx
            const defaultKeyIdx = `_${iRow}_${jCol}`
            if (iRow===0) {
                if (jCol<2) {
                    const accessor = cellData==='no'? `idx${defaultKeyIdx}`: `username${defaultKeyIdx}`
                    const width = cellData==='no'? 70: 140;
                    const data = {accessor, header: cellData, width }
                    headModel[iRow].push(data)
                } else if ( (jCol-2)%2===0 ) {
                    const splitCellData = cellData.split('_');
                    const replaceCellData = `${splitCellData[0]} ${splitCellData[1]}` // lesson i
                    const accessor = `${splitCellData[0]}_${splitCellData[1]}${defaultKeyIdx}`;
                    const data = {accessor, header: replaceCellData, width: 120}; // 118
                    headModel[iRow].push(data)
                }
            } else {
                // lesson columns
                if (jCol>1) {
                    const splitCellData = cellData.split('_');
                    const replaceCellData = `${splitCellData[2]}` // Qi
                    const accessor = `${cellData}${defaultKeyIdx}`;
                    const data = {accessor, header: replaceCellData, width: 60};
                    headModel[iRow].push(data)
                }
            }
        }
    }
    return (
        <thead className='table-thead-basic top-0 sticky h-[68px]'>
            {headModel.map((headerRowItem, headerRowIndex)=>{
                return <tr className='table-thead-tr-basic' key={headerRowIndex}>{headerRowItem.map((headerCell, headerCellIndex) => {
                    if (headerRowIndex===0) {
                        if (headerCellIndex< 2) {
                            return <th
                                rowSpan={2}
                                key={headerCell.accessor}
                                className='table-thead-tr-th-basic'
                                style={{borderLeft: 0, minWidth: headerCell.width+'px', fontFamily: 'NotoSansCJKKR'}}
                            >{headerCell.header}</th>
                        } else {
                            return <th
                                colSpan={2}
                                key={headerCell.accessor}
                                className='table-thead-tr-th-basic border-r-[1px] border-r-[#aaa]'
                                style={{borderLeft: 0, minWidth: headerCell.width+'px', fontFamily: 'NotoSansCJKKR'}}
                            >{headerCell.header}</th>
                        }
                    } else {
                        return <th
                                key={headerCell.accessor}
                                className={`table-thead-tr-th-basic ${headerCellIndex % props.subHeadingsCount === (props.subHeadingsCount - 1) && 'border-r-[1px] border-r-[#aaa]'}`} // check the last subheading index
                                style={{borderLeft: 0, borderTop: 0, minWidth: headerCell.width+'px', fontFamily: 'NotoSansCJKKR', fontSize: isStoryVlog ? '12px' : '14px'}}
                            >{headerCell.header}</th>
                    }
                })
                }</tr>
                })
            }
        </thead>
    )
}

// modal content


const ModalButton: FC<{cellData: TLRMSpeakingHubTableCellData}> = ({ cellData }) => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <LMModalComponent open={open} setOpen={setOpen} title={cellData.title} description={cellData.value.description ?? ''} student={cellData.student} content={cellData.value.modalContent ?? (<></>)}/>
            <div 
                className='learning-management-class-table-complete-question-wrapper' 
                onClick={() => {
                    if(cellData?.clickable === false)
                        return
                    setOpen(!open)
                }
            }>
                {cellData.value.jsxElem}
            </div>
        </>
    )
}

const TableBody = (props:{
    dataModel: TLRMSpeakingHubTableCellData[][],
    subHeadingsCount: number
}) => {
    const {
        dataModel
    } = props;
    const navigate = useNavigate();
    const {
        studentDataInClass
    } = useLearningResultManagementSHStore();
    
    console.log('studentDataInClass ::',studentDataInClass)
    console.log('dataModel:: ',dataModel)
    return (
        <tbody className='table-tbody-basic text-[13px] font-sans font-normal text-[#444444] bg-[#fff] border-b-[1px]'>
            {dataModel && dataModel.map((rowData, rowIdx)=>{
                return <tr key={rowIdx}
                    className={`table-tbody-tr-basic max-h-[76px] ${rowIdx % 2 === 1 && 'bg-[#F9F9F9]'}`}
                >{
                    rowData.map((cellData, cellIdx) => {
                        if (cellIdx===0) {
                            // category "NO"
                            return <td
                                key={cellData.key}
                                className={`inline-flex items-center justify-center h-full border-r-[1px] border-r-[#e2e3e6] ${rowIdx === dataModel.length - 1 && 'border-b-[1px] border-b-[#e2e3e6]'}`}
                                style={{borderLeft: 0, width: cellData.width}}
                            ><span className='learning-management-class-table-no'>{cellData.value.num}</span></td>
                        } else if (cellIdx===1) {
                            // category "Student"
                            return <td
                                key={cellData.key}
                                className={`border-l-[1px] border-l-[#e2e3e6] border-r-[1px] border-r-[#e2e3e6] ${rowIdx === dataModel.length - 1 && 'border-b-[1px] border-b-[#e2e3e6]'}`}
                                style={{borderLeft: 0, width: cellData.width}}
                            ><span className='w-full inline-flex flex-col justify-center items-center'>
                                <span className='learning-management-class-table-text'>{cellData.value.nameset?.student_name_kr}</span>
                                <span className='learning-management-class-table-text'>{`(${cellData.value.nameset?.student_name_en})`}</span>
                            </span></td>
                        } else {
                            const rightBorderClassName = (cellIdx-2) % props.subHeadingsCount === (props.subHeadingsCount - 1) ? 'border-r-[1px] border-r-[#aaa]' : 'border-r-[1px] border-r-[#e2e3e6]'
                            if (cellData.value.show) {
                                return <td
                                    key={cellData.key}
                                    className={`text-center border-l-[1px] border-l-[#e2e3e6] ${rightBorderClassName} ${rowIdx === dataModel.length - 1 && 'border-b-[1px] border-b-[#e2e3e6]'}`}
                                    style={{borderLeft: 0, width: cellData.width}}
                                    onClick={async ()=>{
                                        console.log('cellData =',cellData)
                                    }}
                                >
                                    <ModalButton cellData={cellData} />
                                </td>
                            } else {
                                return <td
                                    key={cellData.key}
                                    className={`text-center border-l-[1px] border-l-[#e2e3e6] ${rightBorderClassName} ${rowIdx === dataModel.length - 1 && 'border-b-[1px] border-b-[#e2e3e6]'}`}
                                    style={{borderLeft: 0, width: cellData.width}}
                                >{'-'}</td>
                            }
                        } 
                    })
                }</tr>
            })}
        </tbody>
    )
}
export default function LRMSpeakingHubTable (props:{
    dataHead: string[],
    dataModel: TLRMSpeakingHubTableCellData[][],
    subHeadingsCount: number
}) {
    

    if (props.dataModel.length > 0) {
        return (
            <div className='relative h-full'>                
                <table className='table-aside' style={{borderCollapse: 'separate', borderSpacing: '0'}}>
                    <TableHeader head={props.dataHead} subHeadingsCount={props.subHeadingsCount}/>
                    <TableBody dataModel={props.dataModel} subHeadingsCount={props.subHeadingsCount}/>
                </table>
            </div>
        )
    } else {
        return <div className={`justify-center items-center w-full h-full flex flex-1`}>
            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{'No Data to display!'}</p>
        </div>;
    }
}