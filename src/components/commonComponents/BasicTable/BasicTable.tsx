import { Table, flexRender } from "@tanstack/react-table"

const TableHeader = (props: {table:Table<any>, sortEventTargetHeaderKeys?: string[] }) => {
    return (
        <thead className='table-thead-basic'>
            {props.table.getHeaderGroups().map((headerGroup) => {
                return (
                    <tr key={headerGroup.id} className='table-thead-tr-basic'>
                        {headerGroup.headers.map((header) => {
                            
                            return (
                                <th
                                    key={header.id}
                                    className='table-thead-tr-th-basic'
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </th>
                            )
                        })}
                    </tr>
                )
            })}
        </thead>
    )
}
const TableBody = (props:{dataModel:{key:string, value:any, rowspan:number, print:boolean}[][]}) => {
    const {dataModel} = props;
    
    return (
        <tbody className="table-tbody-basic">
            {dataModel&& dataModel.map((row, rIdx)=>{
                const cellMaxLength = row.length;
                return (
                    <tr key={'row-data-'+rIdx}>
                        {row.map((cell, cIdx) => {

                            if (cell.print === true) {
                                
                                return (
                                    <td key={cell.key}
                                    className={`table-tbody-tr-td-basic ${
                                        cell.key!=='book' ? 'text-center': 'px-2'
                                    }`}
                                    rowSpan={cell.rowspan}
                                    >
                                        {typeof(cell.value)==='string' && cell.value}
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
export default function TableComponent (props:{table:Table<any>, options?:{sortEventTargetHeaderKeys?: string[],mergeRowSpanKeys?: string[]}}) {
    // table row datas
    let tableDatas = props.table.getRowModel().rows;
    const rowMergeKey = props.options ? (props.options.mergeRowSpanKeys ? props.options.mergeRowSpanKeys: []) : [];
    console.log('merge keys =',rowMergeKey)

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
    console.log('test =',dataModel)
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

    if (dataModel.length > 0) {
        return (
            <div className='table-wrap-div'>
                <table className='table-basic'>
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