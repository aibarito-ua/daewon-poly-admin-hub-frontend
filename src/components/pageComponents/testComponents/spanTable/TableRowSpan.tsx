import React from 'react'
import useLevelAndTextbookSpeakingStore from '../../../../store/useLevelAndTextbookSpeakingStore';

export default function TableRowSpan () {

    const { loadData, loadDataHeadKor } = useLevelAndTextbookSpeakingStore();
    const [tData, setTdata] = React.useState<any[]>([]);
    const rowMergeKey = ['year', 'semester', 'grade']

    React.useEffect(()=>{
        if (tData.length === 0) {
            const dumpTData = Object.assign([], loadData);
            
            const dataModel = getDataModelled(dumpTData);
            const propsToPass = getDataWithSpanCount(dataModel);
            // console.log('data replaced ==',propsToPass)
            setTdata(propsToPass);
        }
    }, [tData])

    const getDataModelled = (tData:any) => {
        let data = tData;
        let newRowData = [];
        for (let i = 0; i < data.length; i++) {
            let obj = data[i];
            let newColData = [];
            for (let key in obj) {
                newColData.push(new Object({
                    key: key,
                    value:obj[key],
                    rowspan: 1,
                    print:true
                }))
            };
            newRowData.push(newColData);
        }
        return newRowData;
    }
    const getDataWithSpanCount = (dataModel:any) => {
        for (let i = 1; i< dataModel.length; i++) {
            for (let j = 0; j < dataModel[i].length; j++) {
                // if (dataModel[i][j])
                
                // console.log(`dataModel[${i}][${j}] == `,dataModel[i][j])
                let flagMerge = false;
                for (let z = 0; z < rowMergeKey.length; z++) {
                    if (dataModel[i][j].key === rowMergeKey[z]) {
                        flagMerge=true;
                        break;
                    }
                }
                // console.log('before Print ==',beforePrint)

                if (flagMerge === true) {
                    for (let k = i-1; k >= 0&&dataModel[i][j].value===dataModel[k][j].value; k--) {
                        dataModel[k][j].rowspan = dataModel[k][j].rowspan+1;
                        dataModel[k+1][j].print = false;
                    }
                }
                console.log('dataModel =',dataModel)
            }
        }
        return dataModel;
    }
    const Row = (props:{rData:any[]}) => {
        return (
            <tr>
                {props.rData.map((colData) => {
                    if (colData.print === true) {
                        return <td key={colData.key+colData.value}
                        className='px-6 py-2 font-medium whitespace-nowrap border'
                        rowSpan={colData.rowspan}>{colData.value}</td>
                    }
                })}
            </tr>
        )
    }

    return (
        <table className='table-auto border'>
            <thead className='text-xs uppercase'>
                <tr className='bg-[#dae3f4]'>
                    {
                        loadDataHeadKor.map((tHead, thIdex)=>{
                            return <th key={'thead-'+thIdex} className='px-6 py-2'>{tHead.header}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {tData && tData.map((rData, rIdex)=>{
                    return <Row key={'row'+rIdex} rData={rData}/>
                })}
            </tbody>
        </table>
    )
}  