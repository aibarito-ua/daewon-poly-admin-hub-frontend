import React from 'react';
import { Table } from "@tanstack/react-table"
import ExpressionModalComponent from "../../toggleModalComponents/ExpressionModalComponent";

const TableHeader = (props: {table:Table<any>, sortEventTargetHeaderKeys?: string[] }) => {
    let tableHeadDatas = props.table.getHeaderGroups()[0].headers;
    return (
        <thead className='table-thead-basic'>
            <tr className='table-thead-tr-basic'>
                {tableHeadDatas.map((header, hIndex)=>{
                    if (hIndex < 6) {
                        return (
                            <th
                                key={header.id}
                                className={`table-thead-tr-th-basic max-w-[100px]`}

                            >
                                {header.column.columnDef.header?.toString()}
                            </th>
                        )
                    } else if (hIndex === 6) {
                        return (
                            <th
                                key={header.id}
                                className="table-thead-tr-th-basic w-14"
                                colSpan={4}
                            >
                                {header.column.columnDef.header?.toString()}
                            </th>
                        )
                    }
                })}
            </tr>
        </thead>
    )
}
const TableBody = (props:{dataModel:{key:string, value:any, rowspan:number, print:boolean}[][]}) => {
    const {dataModel} = props;
    return (
        <tbody className='table-tbody-basic text-[13px] font-sans font-normal text-[#444444]'>
            {dataModel&& dataModel.map((row, rIdx)=>{
                const rowKey = 'row-data-'+rIdx;
                const rowMaxIndex = row.length-1;
                
                // isLesson===true -> enable lesson title 
                // isLesson===false -> set book title
                const isLesson = row[5].value.viewIndex > 0;
                // isQuestion===true -> enable questions
                // isQuestion===false -> book or lesson
                const isQuestion = row[6].value.viewIndex > 0;

                if (!isLesson) {
                    
                    return (
                        <tr key={rowKey} className='table-tbody-tr-basic bg-white'>
                            {row.map((cell, cellIdx) => {
                                const cellValue = cell.key!=='grade'? (cell.key!=='semester' ? cell.value : cell.value+'학기') : 'grade '+cell.value
                                if (cellIdx < 4) {
                                    const reRowSpan = cell.rowspan+1;
                                    return (
                                        <td key={cell.key}
                                        className={`max-w-[100px] h-fit table-tbody-tr-td-basic text-center ${
                                            cellIdx===0 ? 'border-l-transparent': (
                                                cellIdx===rowMaxIndex ? 'border-r-transparent':''
                                            )
                                        }`}
                                        rowSpan={reRowSpan}
                                        >
                                            {cellValue}
                                        </td>
                                    )
                                }
                            })}
                            <td
                            className='h-full table-tbody-tr-td-basic pl-[20px] border-r-transparent'
                            colSpan={6}
                            >{row[4].value}</td>
                        </tr>
                    )
                } else {
                    if (!isQuestion) {
                        // lesson

                        return (
                            <tr key={rowKey} className='table-tbody-tr-basic bg-white'>
                                {row[5].value.viewIndex===1 && <td
                                className='h-fit table-tbody-tr-td-basic'
                                rowSpan={row[4].rowspan}
                                ></td>}
                                <td
                                className='table-tbody-tr-td-basic h-fit capitalize text-center'
                                >{`lesson ${row[5].value.viewIndex}`}</td>
                                <td
                                className='table-tbody-tr-td-basic h-full pl-[20px] border-r-transparent'
                                colSpan={4}
                                >{row[5].value.title}</td>
                                
                            </tr>
                        )
                    } else {
                        // questions
                        const questionViewIndex = row[6].value.viewIndex===1;
                        const rowBgSprite = questionViewIndex ? 'bg-[#f9f9f9]':'bg-[#ffffff]';
                        const borderTrans = questionViewIndex ? 'border-b-transparent':'border-t-transparent'
                        return (
                            <tr key={rowKey} className={`table-tbody-tr-basic ${rowBgSprite}`}>
                                
                                {questionViewIndex && <td
                                    className={`h-fit table-tbody-tr-td-basic bg-white`}
                                    rowSpan={2}
                                ></td>}
                                <td
                                    className={`h-fit table-tbody-tr-td-basic capitalize max-w-[60px] text-center ${borderTrans}`}
                                >{`q ${row[6].value.viewIndex}`}</td>
                                <td
                                    className={`h-fit table-tbody-tr-td-basic pl-[20px] ${borderTrans}`}
                                    colSpan={1}
                                >{row[5].value.title}</td>
                                <td
                                    className={`h-fit table-tbody-tr-td-basic capitalize pl-[20px] w-[107px] ${borderTrans}`}
                                    colSpan={1}
                                >{'expression'}</td>
                                <td
                                    className={`h-fit table-tbody-tr-td-basic pl-[20px] border-r-transparent ${borderTrans}`}
                                    colSpan={1}
                                ><ExpressionModalComponent keyValue={row[5].key} 
                                    btnLabel={row[7].value.fileName}
                                    lesson={`lesson ${row[5].value.viewIndex}`}
                                    question={`question ${row[6].value.viewIndex}`}
                                /></td>
                            </tr>
                        )
                    }
                }
            })}
        </tbody>
    )
}
export default function IdeaExchangeTableComponent (props:{table:Table<any>, options?:{sortEventTargetHeaderKeys?: string[],mergeRowSpanKeys?: string[]}}) {
    // table row datas
    let tableDatas = props.table.getRowModel().rows;
    // const rowMergeKey = props.rowMergeKeyList? props.rowMergeKeyList : [];
    const rowMergeKey = ['year','semester','grade','level','book']

    let dataModel:{key:string, value:any, rowspan:number, print:boolean}[][] = [];
    for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
        const rowD = tableDatas[dataIndex].getAllCells();
        let pushRowData:{key:string, value:any, rowspan:number, print:boolean}[] = [];
        
        for (let rowDIndex = 0; rowDIndex < rowD.length; rowDIndex++) {
            const check = rowD[rowDIndex].id.match(/^[0-9]/gm);
            if (check) {
                if (rowD[rowDIndex].column.id === 'lesson') {
                    const pushCellData = {
                        key: rowD[rowDIndex].column.id,
                        value:rowD[rowDIndex].getValue(),
                        rowspan:1,
                        print:true
                    }
                    pushRowData.push(pushCellData)
                } else {
                    const pushCellData = {
                        key: rowD[rowDIndex].column.id,
                        value:rowD[rowDIndex].getValue(),
                        rowspan:1,
                        print:true
                    }
                    pushRowData.push(pushCellData)

                }
                
            }
        }
        dataModel.push(pushRowData);
    }
    dataModel = dataModel.filter((v,i) => {
        if (v.length!==0) return v;
    });

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
                        // console.log(`k test == k: [ ${k} ], i: [ ${i} ], j: [ ${j} ]`)
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

    if (dataModel.length > 0 ) {
        return (
            <div className='table-wrap-div'>
                <table className='table-aside'>
                    <TableHeader table={props.table} sortEventTargetHeaderKeys={props.options?props.options.sortEventTargetHeaderKeys:[]}/>
                    <TableBody dataModel={dataModel}/>
                </table>
            </div>
        )
    } else {
        return <div className={`justify-center items-center w-full h-full flex flex-1`}>
            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{'No Data to display!'}</p>
        </div>;
    }
    
}