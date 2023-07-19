import { Table } from "@tanstack/react-table"

const TableHeader = (props: {table:Table<any>, sortEventTargetHeaderKeys?: string[] }) => {
    let tableHeadDatas = props.table.getHeaderGroups()[0].headers;
    return (
        <thead className='table-thead-basic'>
            <tr className='table-thead-tr-basic'>
                {tableHeadDatas.map((header, hIndex)=>{
                    const headerText = header.column.columnDef.header?.toString();
                        return (
                            <th
                                key={header.id}
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
    // console.log('gradeHaveCell =',gradeHaveCell)
    // console.log('gradesKey =',gradesKey)
    
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
export default function LevelAndTextbookSpeakingTableComponent (props:{table:Table<any>, options?:{sortEventTargetHeaderKeys?: string[],mergeRowSpanKeys?: string[]}}) {
    // table row datas
    let tableDatas = props.table.getRowModel().rows;
    const rowMergeKey = props.options ? (props.options.mergeRowSpanKeys ? props.options.mergeRowSpanKeys: []) : [];
    // console.log('merge keys =',rowMergeKey)

    let dataModel:{key:string, value:unknown, rowspan:number, print:boolean}[][] = [];
    for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
        const rowD = tableDatas[dataIndex].getAllCells();
        let pushRowData:{key:string, value:unknown, rowspan:number, print:boolean}[] = [];
        for (let rowDIndex = 0; rowDIndex < rowD.length; rowDIndex++) {
            const check = rowD[rowDIndex].id.match(/^[0-9]/gm);
            if (check) {
                const pushCellData = {
                    key: rowD[rowDIndex].column.id,
                    value:rowD[rowDIndex].getValue(),
                    rowspan:1,
                    print:true
                }
                pushRowData.push(pushCellData)
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

    console.log('test =',dataModel)

    if (dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-basic'>
                    <TableHeader table={props.table} sortEventTargetHeaderKeys={props.options?props.options.sortEventTargetHeaderKeys:[]}/>
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