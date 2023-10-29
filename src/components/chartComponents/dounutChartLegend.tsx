import React from 'react';
interface IDoughnutChartLegendPropt {
    data: TCircleLegendItems[]
}
const DoughnutChartLegend = (props:IDoughnutChartLegendPropt) => {
    const {data} = props;
    const legendJsx = data.map((item, labelIndex)=> {
        return <div className='flex flex-row justify-start items-center gap-[4px]'>
            <div style={{
                backgroundColor: item.circleColor,
                width: '14px',
                height:'14px',
                borderRadius: '7px'
            }}></div>
            <div style={{
                fontFamily: 'NotoSansCJKKR',
                fontSize: '13px',
                fontWeight: 'normal',
                fontStretch: 'normal',
                fontStyle: 'normal',
                letterSpacing: 'normal',
                color: '#555',
                textTransform: 'capitalize',
                lineHeight: '20px',
                textAlign: 'left',
            }}>{item.circleLabel}</div>
        </div>
    })
    return (
        <div className='grid grid-cols-3 grid-rows-2 w-fit h-[53px] gap-x-[30px] gap-y-[15px]'>
           {legendJsx}
        </div>
    )
}
export default DoughnutChartLegend;