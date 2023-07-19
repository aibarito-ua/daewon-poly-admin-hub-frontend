import React from 'react';
import { Table } from "@tanstack/react-table";

const TableHeader = (props: {table:Table<any>, sortEventTargetHeaderKeys?: string[] }) => {
    let tableHeadDatas = props.table.getHeaderGroups()[0].headers;
    return (
        <thead className='table-thead-basic'>
            <tr className='table-thead-tr-basic'>
                {tableHeadDatas.map((header, hIndex)=>{
                    const headerText = header.column.columnDef.header?.toString();
                    const maxWidthCheck = (header.id==='year'||header.id==='semester'||header.id==='grade'||header.id==='level'||header.id==='month') ? true:false;

                    return (
                        <th
                            key={header.id}
                            className={`table-thead-tr-th-basic 
                                ${hIndex>8 && 'hidden'}
                                ${maxWidthCheck ? 'max-w-[80px]':'max-w-[100px]'}
                            `}
                        >{headerText}</th>
                    )
                })}
            </tr>
        </thead>
    )
}
const TableBody = (props:{dataModel:{key:string, value:any, rowspan:number, print:boolean}[][]}) => {
    const {dataModel} = props;
    return (
        <tbody className='table-tbody-basic'>
            {dataModel&& dataModel.map((row, rIdx)=>{
                const checkLastRowIndex = dataModel.length-1;
                return (
                    <tr key={'row-data-'+rIdx} className='table-tbody-basic'>
                        {row.map((cell, cIdx) => {
                            
                            if (cell.print === true) {
                                console.log('key =',cell.key, ', idx =',cIdx)
                                const textValue:string = typeof(cell.value)==='string' ? cell.value:'';
                                const textLength = textValue.length;
                                const tdValue = (cell.key==='topic_title_1st'||cell.key==='topic_title_2nd') ? (
                                    textLength >= 45 ? textValue.substring(0,45)+'...' : textValue
                                ): (
                                    cell.key!=='grade' ? (
                                        cell.key!=='semester' ? cell.value:cell.value+'학기'
                                    ) : 'Grade'+textValue
                                )
                                const cellBg = rIdx%2===0 ? '#fff': '#f9f9f9'
                                
                                return (
                                    <td key={cell.key}
                                        className={`${(cell.key==='topic_title_1st'||cell.key==='topic_title_2nd') ? 'role-play-table-td-elipsis':'role-play-table-td-basic'} ${
                                            cIdx>8 && 'hidden'
                                        } ${cIdx===8 && 'border-r-transparent'} ${cIdx===0 && 'border-l-transparent'}
                                        ${checkLastRowIndex!==rIdx ? (
                                            cIdx < 4 ? 'border-t-transparent': 'border-t-transparent border-b-transparent'
                                        ): 'border-t-transparent'}`}
                                        style={{backgroundColor: cellBg}}
                                        rowSpan={cell.rowspan}
                                    >{tdValue}</td>
                                )
                                
                            }
                        })//end row loop
                        }
                    </tr>
                )
            })//end body data loop
            }
        </tbody>
    )
}

export default function RolePlayTableComponent (props:{
    table:Table<any>,
    options?:{sortEventTargetHeaderKeys?: string[],mergeRowSpanKeys?: string[]}
}) {
    // table row datas
    let tableDatas = props.table.getRowModel().rows;
    const rowMergeKey = ['year','semester','grade','level']

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
    // font-size: 1rem/* 16px */;
    // line-height: 1.5rem/* 24px */;

    if (dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-basic'>
                    <TableHeader table={props.table} sortEventTargetHeaderKeys={props.options?props.options.sortEventTargetHeaderKeys:[]}/>
                    <TableBody dataModel={dataModel} />
                </table>
            </div>)
    } else {
        return <div className={`justify-center items-center w-full h-full flex flex-1`}>
            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{'No Data to display!'}</p>
        </div>;
    }
}