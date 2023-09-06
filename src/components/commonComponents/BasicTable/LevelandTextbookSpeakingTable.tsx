import React from "react";
import { cf } from "../../../util/common/commonFunctions";

const TableHeader = (props: {table:TLoadDataHeadTrans[], sortEventTargetHeaderKeys?: string[] }) => {
    return (
        <thead className='table-thead-basic'>
            <tr className='table-thead-tr-basic'>
                {props.table.map((header, hIndex)=>{
                    const headerText = header.header;
                        return (
                            <th
                                key={header.accessor+hIndex}
                                className={`table-thead-tr-th-basic`}
                            >{headerText}</th>
                        )
                })}
            </tr>
        </thead>
    )
}

const TableBody = (props:{dataModel:{key:string, value:any, rowspan:number, print:boolean}[][], rowMergeKey: string[]}) => {
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
                return (
                    <tr key={'row-data-'+rIdx}>
                        {row.map((cell, cIdx) => {
                            if (cell.print === true) {
                                const cellValue = cIdx!==1 ? cell.value : cell.value+'학기'
                                const rowInGrade = gradesKey[rIdx];
                                const checkRowInGrade = rowInGrade%2;
                                const cellBg = cIdx>2 ? (
                                    checkRowInGrade === 0 ? '#ffffff': '#f9f9f9'
                                ):'#ffffff';
                                
                                return (
                                    <td key={cell.key}
                                    className={`table-tbody-tr-td-basic ${
                                        cell.key!=='book' ? 'text-center': 'pl-[20px]'
                                    } ${cIdx===0 ? 'border-l-transparent': (
                                        cIdx===cellMaxLength-1 ? 'border-r-transparent': ''
                                    )} ${cIdx>2 && borderTransCheck}`}
                                    style={{backgroundColor: cellBg}}
                                    rowSpan={cell.rowspan}
                                    >
                                        {typeof(cellValue)==='string' && cellValue}
                                    </td>
                                )
                            }
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}
export default function LevelAndTextbookSpeakingTableComponent (props:{table:{body: TLoadDataItem[], head: TLoadDataHeadTrans[]}, options?:{sortEventTargetHeaderKeys?: string[],mergeRowSpanKeys?: string[]}}) {
    // table row datas
    let tableDatas = props.table.body.sort((a,b) => b.year-a.year || b.semester - a.semester || a.grade - b.grade || cf.basicTable.levelSort(a.level, b.level))
    const rowMergeKey = props.options ? (props.options.mergeRowSpanKeys ? props.options.mergeRowSpanKeys: []) : [];

    let dataModel:{key:string, value:unknown, rowspan:number, print:boolean}[][] = [];
    for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
        const rowData = tableDatas[dataIndex];
        let pushRowData:{key:string, value:unknown, rowspan:number, print:boolean}[] = [];
        const headerData = props.table.head;
        for (let rowDIndex = 0; rowDIndex < headerData.length; rowDIndex++) {
            const targetValue = rowData[headerData[rowDIndex].accessor];
            const currentValue = targetValue!==null ? rowData[headerData[rowDIndex].accessor].toString():null;
            const pushCellData = {
                key: headerData[rowDIndex].accessor,
                value:currentValue,
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

    if (dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-basic'>
                    <TableHeader table={props.table.head} sortEventTargetHeaderKeys={props.options?props.options.sortEventTargetHeaderKeys:[]}/>
                    <TableBody dataModel={dataModel} rowMergeKey={rowMergeKey}/>
                </table>
            </div>
        )
    } else {
        return <div className={`justify-center items-center w-full h-full flex flex-1`}>
            <p className='flex flex-row text-[#bfbfbf] text-2xl'>{'No Data to display!'}</p>
        </div>;
    }

}