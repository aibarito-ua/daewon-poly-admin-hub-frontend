import React from 'react';
import { Table } from "@tanstack/react-table"
import { TextField } from '@mui/material';
import { BootstrapInput } from '../customComponents/customTextField';
import useActivityWritingHubStore from '../../../store/useActivityWritingHubStore';
import { TActivitySparkWritingBooks } from '../../../store/@type/useActivityWritingHubStore';
import OutlineFormatModalComponent from '../../toggleModalComponents/OutlineFormatModalComponent';
import { TTableDataModel } from '../../../pages/ActivityManagement/ActivityWHSubPages/SparkWriting';
import RubricTypeModalComponent from '../../toggleModalComponents/RubricTypeModalComponent';

const TableHeader = (props: {table:Table<any>, sortEventTargetHeaderKeys?: string[] }) => {
    let tableHeadDatas = props.table.getHeaderGroups()[0].headers;
    return (
        <thead className='table-thead-basic'>
            <tr className='table-thead-tr-basic'>
                {tableHeadDatas.map((header, hIndex)=>{
                    if (hIndex<6 || hIndex>8){
                        const headerText = header.column.columnDef.header?.toString();
                            const checkInputSpan = header.id === 'topic'
                            // console.log('header text =',header.column)
                            if (checkInputSpan) {
                                return (
                                    <th
                                        key={header.id}
                                        className="table-thead-tr-th-basic w-1/2"
                                        colSpan={4}
                                        
                                    >{headerText}</th>
                                )
                            } else {
                                return (
                                    <th
                                        key={header.id}
                                        className="table-thead-tr-th-basic "
                                    >{headerText}</th>
                                )
                            }
                        
                    }
                })}
            </tr>
        </thead>
    )
}
const TableBody = (props:{
    filterValues: string[],
    dataModel: TTableDataModel,
    enableSaveButtonFlag: boolean,
}) => {
    const { loadData, loadDataHeadKor, setLoadDataSparkWritingInput} = useActivityWritingHubStore();
    const {filterValues, enableSaveButtonFlag} = props;
    let tableDatas:TActivitySparkWritingBooks[]=[]
    tableDatas = loadData.spark_writing;
    
    // table row datas
    const rowMergeKey = ['year','semester','level','book','unit']

    let dataModel:{key:string, value:any, rowspan:number, print:boolean, originIndex:number }[][] = [];
    
    const headers = loadDataHeadKor.spark_writing;
    for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
        let pushRowData:{key:string, value:any, rowspan:number, print:boolean, originIndex: number }[] = [];
        const rowD = tableDatas[dataIndex];
        for (let rowDIndex = 0; rowDIndex < headers.length; rowDIndex++) {
            const valueC = rowD[headers[rowDIndex].accessor]
            const keyC = headers[rowDIndex].accessor
            const pushCellData = {
                key: keyC,
                value: valueC,
                rowspan:1,
                print:true,
                originIndex: dataIndex
            }
            pushRowData.push(pushCellData)
        }
        dataModel.push(pushRowData);
    }
    // console.log('dataModal: ',dataModel)
    dataModel = dataModel.filter((v,i) => {
        if (v.length!==0) return v;
    });

    // search filter
    dataModel = dataModel.filter((item, idx) => {
        const search1 = item[0].value === filterValues[0];
        const search2 = item[1].value === filterValues[1];
        const search3 = item[2].value === filterValues[2];
        if (search1 && search2 && search3) {
            return item;
        }
    })
    // console.log('dataModel =',dataModel)

    for (let i = 1; i< dataModel.length; i++) {
        for (let j = 0; j < dataModel[i].length; j++) {
            let flagMerge = false;
            for (let z = 0; z < rowMergeKey.length; z++) {
                if (dataModel[i][j].key === rowMergeKey[z]) {
                    flagMerge=true;
                    break;
                }
            }
            if (flagMerge) {
                if (j>0) {
                    // row cell merge (row span) 
                    for (let k = i-1; k >= 0&&dataModel[i][j].value===dataModel[k][j].value&&dataModel[k+1][j-1].print===false; k--) {
                        dataModel[k][j].rowspan = dataModel[k][j].rowspan+1;
                        dataModel[k+1][j].print = false;
                    } // turn print
                } else {
                    // row cell merge (row span)
                    for (let k = i-1; k >= 0&&dataModel[i][j].value===dataModel[k][j].value; k--) {
                        dataModel[k][j].rowspan = dataModel[k][j].rowspan+1;
                        dataModel[k+1][j].print = false;
                    } // turn print
                }
            }
        }// for cell
    } // for row
    // console.log('after merge =',dataModel)

    let gradeHaveCell:any = {};
    let gradesKey:number[] = [];

    let pIdx = 0;
    for (let rowIdx = 0; rowIdx < dataModel.length; rowIdx ++) {
        const currentRow = dataModel[rowIdx];
        if (rowIdx > 0 ) {
            for (let cellIdx = 0; cellIdx < currentRow.length; cellIdx++) {
                const currentCell = currentRow[cellIdx];
                if (cellIdx === 4) {
                    const checkKey = Object.keys(gradeHaveCell).includes(currentCell.value)
                    if (!checkKey) {
                        pIdx = 0;
                        gradesKey.push(pIdx)
                        gradeHaveCell[currentCell.value] = [];
                        gradeHaveCell[currentCell.value] = [currentRow]
                    } else {
                        pIdx+=1;
                        gradesKey.push(pIdx)
                        gradeHaveCell[currentCell.value].push(currentRow)
                    }
                }
            }
        } else {
            for (let cellIdx = 0; cellIdx < currentRow.length; cellIdx++) {
                const currentCell = currentRow[cellIdx];
                if (cellIdx===4) {
                    gradesKey.push(pIdx);
                    gradeHaveCell[currentCell.value]=[]
                    gradeHaveCell[currentCell.value]=[currentRow]
                }
            }
        }
    }
    // console.log('gradeHaveCell =',gradeHaveCell)
    // console.log('gradesKey =',gradesKey)

    return (
        <tbody className='table-tbody-basic text-[13px] font-sans font-normal text-[#444444] bg-[#fff]'>
            {dataModel&& dataModel.map((row, rIdx)=>{
                const rowKey = 'row-data-'+rIdx;
                // check : unit, outline_form, else -> 3종류
                const hasUnit = row[4].value!=='' ? true:false;
                const hasOutlineForm = row[6].value!==''? true: false;

                
                if (hasUnit) {
                    if (hasOutlineForm) {
                        // else input types
                        // sprite
                        const currentParentValue = row[4].value;
                        const currentParentMaxLength = gradeHaveCell[currentParentValue].length;
                        const currentParentHaveKey = gradesKey[rIdx];

                        const cellBg = currentParentHaveKey>0 && (
                            currentParentHaveKey%2 === 1 ? 'bg-[#f9f9f9]': 'bg-[#fff]'
                        )
                        return (
                            <tr key={rowKey} className={`table-tbody-tr-basic ${cellBg}`}>
                                
                                {(row[6].value==='title') &&<td
                                className='table-tbody-tr-td-basic capitalize bg-[#fff]'
                                rowSpan={row[4].rowspan}
                                >{``}</td>}
                                <td
                                className='table-tbody-tr-td-basic border-t-transparent border-b-transparent pl-[20px]'
                                colSpan={1}
                                >{row[6].value}</td>
                                <td
                                className='table-tbody-tr-td-basic border-t-transparent border-b-transparent w-[30px] text-center'
                                colSpan={1}
                                >{row[7].value}</td>
                                <td
                                className='table-tbody-tr-td-basic border-t-transparent border-b-transparent px-[4.5px]'
                                colSpan={2}
                                >
                                    <BootstrapInput 
                                        multiline
                                        className='w-full'
                                        value={row[8].value}
                                        readOnly={!enableSaveButtonFlag}
                                        disabled={!enableSaveButtonFlag}
                                        onChange={(e)=>{
                                            e.preventDefault();
                                            const text = e.currentTarget.value
                                            const originalIdx = row[8].originIndex;
                                            // console.log('rIdx =',originalIdx,',test==',text)
                                            setLoadDataSparkWritingInput(text, originalIdx)
                                        }}
                                    />
                                </td>
                                <td
                                className='table-tbody-tr-td-basic border-t-transparent border-b-transparent'
                                colSpan={1}
                                >{}</td>
                                <td
                                className='table-tbody-tr-td-basic border-t-transparent border-b-transparent'
                                colSpan={1}
                                >{}</td>
                            </tr>
                        )
                    } else {
                        // topic row
                        return (
                            <tr key={rowKey} className='table-tbody-tr-basic'>
                                {row[4].value==='1' && <td
                                className='table-tbody-tr-td-basic'
                                rowSpan={row[3].rowspan}
                                >{}</td>}
                                <td
                                className='table-tbody-tr-td-basic capitalize px-[20px]'
                                // rowSpan={row[5].rowspan}
                                >{`unit ${row[4].value}`}</td>
                                <td
                                className='table-tbody-tr-td-basic pl-[20px]'
                                colSpan={4}
                                >{row[5].value}</td>
                                <td
                                className='table-tbody-tr-td-basic'
                                colSpan={1}
                                >
                                    <OutlineFormatModalComponent 
                                        keyValue={row[9].key}
                                        outline_format_type={row[9].value}
                                        year={row[0].value}
                                        semester={row[1].value}
                                        level={row[2].value}
                                        book={row[3].value}
                                        unit={row[4].value}
                                        wholeData={tableDatas}
                                    />
                                    {/* {row[9].value} */}
                                </td>
                                <td
                                className='table-tbody-tr-td-basic'
                                colSpan={1}
                                >
                                    <RubricTypeModalComponent 
                                        keyValue={row[10].key}
                                        rubric_type={row[10].value}
                                    />
                                </td>
                            </tr>
                        )
                    }
                    
                } else {
                    // book first row
                    // book 까지, 이후 병합
                    return (
                        <tr key={rowKey} className='table-tbody-tr-basic'>
                            {row.map((cell, cellIdx) => {
                                if (cellIdx < 3) {
                                    if (cell.print) {
                                        const cellValue = typeof(cell.value)==='string' && cell.key!=='semester' ? (
                                            cell.value
                                        ) : cell.value+'학기'
                                        return (
                                            <td key={cell.key}
                                            className='w-fit table-tbody-tr-td-basic text-center px-[20px]'
                                            rowSpan={cell.rowspan}
                                            >
                                                {cellValue}
                                            </td>
                                        )
                                    }
                                }
                            })}
                            <td
                            className='table-tbody-tr-td-basic pl-[20px]'
                            colSpan={8}
                            >{row[3].value}</td>
                        </tr>
                    )
                }
            })}
        </tbody>
    )
}
export default function SparkWritingTableComponent (props:{
    table:Table<any>, 
    filterValues: string[],
    isSearch: boolean,
    dataModel: TTableDataModel,
    enableSaveButtonFlag: boolean,
    options?:{
        sortEventTargetHeaderKeys?: string[],
        mergeRowSpanKeys?: string[]
    }}) {


    if (props.dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-aside'>
                    <TableHeader table={props.table}/>
                    <TableBody dataModel={props.dataModel} 
                        filterValues={props.isSearch ? props.filterValues: []} 
                        enableSaveButtonFlag={props.enableSaveButtonFlag}
                    />
                </table>
            </div>
        )
    } else {
        return <div className={`justify-center items-center w-full h-full flex flex-1`}>
            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{'No Data to display!'}</p>
        </div>;
    }
}