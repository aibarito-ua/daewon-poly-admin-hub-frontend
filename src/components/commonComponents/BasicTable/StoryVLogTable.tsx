import React from 'react';
import { Table } from "@tanstack/react-table"
import { cf } from '../../../util/common/commonFunctions';

const TableHeader = (props: {table:TLoadDataHeadTrans[], sortEventTargetHeaderKeys?: string[] }) => {
    let tableHeadDatas = props.table;
    return (
        <thead className='table-thead-basic'>
            <tr className='table-thead-tr-basic'>
                {tableHeadDatas.map((header, hIndex)=>{
                    if (hIndex < 6) {
                        return (
                            <th
                                key={header.accessor}
                                className={`table-thead-tr-th-basic max-w-[100px]`}

                            >
                                {header.header}
                            </th>
                        )
                    } else if (hIndex === 6) {
                        return (
                            <th
                                key={header.accessor}
                                className="table-thead-tr-th-basic w-14"
                                colSpan={4}
                            >
                                {header.header}
                            </th>
                        )
                    }
                })}
            </tr>
        </thead>
    )
}
const TableBody = (props:{dataModel:{key:string, value:any, rowspan:number, print:boolean}[][]}) => {
    
    const originModel = props.dataModel;
    let gradeHaveCell:any = {};
    let gradesKey:number[] = [];

    let pIdx = 0;
    for (let rowIdx = 0; rowIdx < originModel.length; rowIdx ++) {
        const currentRow = originModel[rowIdx];
        if (rowIdx > 0 ) {
            for (let cellIdx = 0; cellIdx < currentRow.length; cellIdx++) {
                const currentCell = currentRow[cellIdx];
                if (cellIdx === 2) {
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
                if (cellIdx===2) {
                    gradesKey.push(pIdx);
                    gradeHaveCell[currentCell.value]=[]
                    gradeHaveCell[currentCell.value]=[currentRow]
                }
            }
        }
    }
    console.log('gradeHaveCell =',gradeHaveCell)
    console.log('gradesKey =',gradesKey)
    return (
        <tbody className="table-tbody-basic">
            {originModel&& originModel.map((row, rIdx)=>{
                const cellMaxLength = row.length;
                const currentGrade = row[2].value;
                const currentGradeMaxLength = gradeHaveCell[currentGrade].length-1;
                const currentGradeHaveKey = gradesKey[rIdx];
                const borderTransCheck = currentGradeMaxLength!==0 ? (
                    currentGradeMaxLength!==currentGradeHaveKey ? (
                        currentGradeHaveKey!==0 ? 'border-t-transparent border-b-transparent':'border-b-transparent'
                        ): 'border-t-transparent'
                ) : '';

                const rowKey = 'row-data-'+rIdx;
                // isLesson===true -> enable lesson title 
                // isLesson===false -> set book title
                const isLesson = row[5].value.viewIndex > 0;
                if (!isLesson) {
                    return (
                        <tr key={rowKey} className="table-tbody-tr-basic">
                            {row.map((cell, cellIdx) => {
                                if (cellIdx < 4) {
                                    if (cell.print) {
                                        const cellValue = cell.key!=='grade' ? (
                                            cell.key!=='semester' ? cell.value : cell.value+'학기'
                                        ) :'Grade'+cell.value;

                                        return (
                                            <td key={cell.key}
                                            className={`table-tbody-tr-td-basic max-w-[100px] w-fit text-center ${cellIdx===0&& 'border-l-transparent'}`}
                                            rowSpan={cell.rowspan}
                                            >
                                                {cellValue}
                                            </td>
                                        )
                                    }
                                }
                            })}
                            <td
                            className='table-tbody-tr-td-basic pl-[20px] border-r-transparent'
                            colSpan={6}
                            >{row[4].value}</td>
                        </tr>
                    )
                } else {
                        // lesson
                        const lessonIdx = row[5].value.viewIndex;
                        const checkIdx = lessonIdx%2;
                        console.log('idx =',lessonIdx,', check idx = ',checkIdx)
                        return (
                            <tr key={rowKey} className={`table-tbody-tr-basic ${
                                checkIdx===1 ? 'bg-[#f9f9f9]' :'bg-[#fff]'
                            }`}>
                                {row[5].value.viewIndex===1 && <td
                                className='table-tbody-tr-td-basic bg-[#fff]'
                                rowSpan={row[4].rowspan}
                                ></td>}
                                <td
                                className={`table-tbody-tr-td-basic capitalize pl-[20px] ${borderTransCheck}`}
                                >{`lesson ${row[5].value.viewIndex}`}</td>
                                <td
                                className={`table-tbody-tr-td-basic pl-[20px] border-r-transparent ${borderTransCheck}`}
                                colSpan={4}
                                >{row[5].value.title}</td>
                            </tr>
                        )
                }
            })}
        </tbody>
    )
}
export default function StoryVlogTableComponent (props:{table:{body: TStoryVlogBook[], head: TLoadDataHeadTrans[]}, options?:{sortEventTargetHeaderKeys?: string[],mergeRowSpanKeys?: string[]}}) {
    // table row datas
    let tableDatas = props.table.body.sort((a,b)=>cf.basicTable.sortByLessonInStoryVLogBodyData(a,b));
    const headerData = props.table.head;
    const rowMergeKey = ['year','semester','grade','level','book']

    let dataModel:{key:string, value:any, rowspan:number, print:boolean}[][] = [];
    for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
        const rowD = tableDatas[dataIndex]
        if (dataIndex===0) {
            let pushFirstRowData:{key:string, value:any, rowspan:number, print:boolean}[] = [];
            for (let firstCellIndex=0;firstCellIndex<headerData.length; firstCellIndex++) {
                let pushValue:any = '';
                if (headerData[firstCellIndex].accessor === 'lesson') {
                    pushValue= {
                        title:'', viewIndex: 0
                    }
                } else {
                    pushValue = rowD[headerData[firstCellIndex].accessor];
                }
                const pushFirstCellData = {
                    key: headerData[firstCellIndex].accessor,
                    value: pushValue,
                    rowspan:1,
                    print:true
                }
                pushFirstRowData.push(pushFirstCellData)
            }
            dataModel.push(pushFirstRowData)
        }
        let pushRowData:{key:string, value:any, rowspan:number, print:boolean}[] = [];
        
        for (let cellIndex = 0; cellIndex < headerData.length; cellIndex++) {
            const pushCellData = {
                key: headerData[cellIndex].accessor,
                value: rowD[headerData[cellIndex].accessor],
                rowspan:1,
                print:true
            }
            pushRowData.push(pushCellData)
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
    console.log('story vlog =',dataModel)
    if (dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-basic'>
                    <TableHeader table={headerData} sortEventTargetHeaderKeys={props.options?props.options.sortEventTargetHeaderKeys:[]}/>
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