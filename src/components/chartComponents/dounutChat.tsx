
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Tooltip } from "recharts";

// const data:TAllDoughnutDatas = [
//     {
//         target: 'conventions',
//         data: [
//             {
//                 name: 'conventions',
//                 value: 10,
//                 selectName: '',
//                 fillColor: '#db5757',
//                 fillBorderColor: '#be1f1f'
//             }
//         ],
//         addWidth: 40,
//         fitText: 40,
//         toolLineColor: '#be1f1f',
//     },
//     {
//         target: 'sentence fluency',
//         data: [
//             {
//                 name: 'sentence fluency',
//                 value: 10,
//                 selectName: '',
//                 fillColor: '#6865cc',
//                 fillBorderColor: '#433fa7'
//             }
//         ],
//         addWidth: 55,
//         fitText: 55,
//         toolLineColor: '#433fa7'
//     },
//     {
//         target: 'word choice',
//         data: [
//             {
//                 name: 'word choice',
//                 value: 10,
//                 selectName: '',
//                 fillColor: '#30c194',
//                 fillBorderColor: '#12986f'
//             }
//         ],
//         addWidth: 40,
//         fitText: 40,
//         toolLineColor: '#12986f'
//     },
//     {
//         target: 'voice',
//         data: [
//             {
//                 name: 'voice',
//                 value: 10,
//                 selectName: '',
//                 fillColor: '#aa6bd4',
//                 fillBorderColor: '#863fb5'
//             }
//         ],
//         addWidth: 10,
//         fitText: 14,
//         toolLineColor: '#863fb5'
//     },
//     {
//         target: 'organization',
//         data: [
//             {
//                 name: 'organization',
//                 value: 10,
//                 selectName: '',
//                 fillColor: '#f6914d',
//                 fillBorderColor: '#ee711e'
//             }
//         ],
//         addWidth: 40,
//         fitText: 40,
//         toolLineColor: '#ee711e'
//     },
//     {
//         target: 'ideas',
//         data: [
//             {
//                 name: 'ideas',
//                 value: 90,
//                 selectName: '',
//                 fillColor: '#588ee1',
//                 fillBorderColor: '#1f61c8'
//             }
//         ],
//         addWidth: 10,
//         fitText: 14,
//         toolLineColor: '#1f61c8'
//     },
// ]
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    fill,
    payload,
    percent,
    value
  } = props;
  const midAngle = 45;
  const startAngle = 90;
  const endAngle = 90-value/100*360;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const radiusMid = outerRadius-innerRadius;
const cornerRadius = radiusMid/2;
const trackRadius = innerRadius + cornerRadius;
  return (
    <g>
        <circle cx={cx} cy={cy}
            r={trackRadius}
            fill="none"
            stroke="#f5f5f5"
            strokeWidth={16}
            strokeLinejoin="round"
        />
        {payload.selectName!=='' && (
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius-2}
                outerRadius={outerRadius+2}
                startAngle={startAngle+0.5}
                endAngle={endAngle-0.5}
                fill={payload.fillBorderColor}
                cornerRadius={cornerRadius}
            />
        )}
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            cornerRadius={cornerRadius}
        />
    </g>
  );
};

export default function App(props: {data: TAllDoughnutDatas}) {
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [clickIndex, setClickIndex] = useState<string>('');
    const [tooltipData, setTooltipData] = useState<{value:number, outerRadius:number}>({
        value: 0, outerRadius: 0
    });

    console.log('props.data =',props.data)
    const [allData, setAllData] = useState<TAllDoughnutDatas>(props.data);
    const [addWidth, setAddWidth] = useState<number>(0);
    const [decText, setDecText] = useState<number>(0);
    const [tooltipLineColor, setTooltipLineColor] = useState<string>('');
    const [average, setAverage] = useState<number>(0);

    React.useEffect(()=>{
        const dumpData:TAllDoughnutDatas = JSON.parse(JSON.stringify(allData));
        const length = dumpData.length
        let sum_val = 0;
        for (let i = 0; i < length; i++) {
            sum_val += dumpData[i].data[0].value;
        }
        const avr = sum_val/length;
        setAverage(avr)
    },[])
    const radiusDatas = [
        { innerRadius: 47, outerRadius: 67 },
        { innerRadius: 77, outerRadius: 97 },
        { innerRadius: 107, outerRadius: 127 },
        { innerRadius: 137, outerRadius: 157 },
        { innerRadius: 167, outerRadius: 187 },
        { innerRadius: 197, outerRadius: 217 }
    ]
    
    // const avr = 90;
    const cx = 250;
    const cy = 250;
    const textmainCss:React.CSSProperties = {
        width: '80px',
        height: '80px',
        backgroundColor: '#ffffff',
        fill: '#222222',
    }
  const text1Css:React.CSSProperties = {
    width: '54px',
    height: '24px',
    textShadow: '2px 2px 0 rgba(0,0,0,0.16)',
    fontFamily: 'GothamRounded',
    fontSize: '20px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 1.2,
    letterSpacing: 'normal',
    
}
const text2Css:React.CSSProperties = {
    width: '54px',
    height: '24px',
    textShadow: '2px 2px 0 rgba(0,0,0,0.16)',
    fontFamily: 'GothamRounded',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 1.2,
    letterSpacing: 'normal',
}

const textTooltip = () => {
    const addDump = addWidth;
    const decDump = decText +12;
    const RADIAN = Math.PI / 180;
    const midAngle = 45;
    const startAngle = 90;
    const endAngle = 90-tooltipData.value/100*360;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (tooltipData.outerRadius + 10) * cos;
    const sy = cy + (tooltipData.outerRadius + 10) * sin;
    const mx = cx + (tooltipData.outerRadius + 30) * cos;
    const my = cy + (tooltipData.outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    const pathX = sx-40;
    const pathY = sy-24;
    const pathX_right = pathX + addDump -10;
    const pathX_left = pathX - addDump;
    const vX = pathX_right+pathX_left
    // 소수점 변경
    const currentScore = tooltipData.value;
    const scoreReplace1 = Math.round(currentScore*10);
    const scoreResult = scoreReplace1/10;


    return (
        
        <g id="Union" filter="url(#filter0_d_620_3639)">
            <defs>
<filter id="filter0_d_620_3639" x={pathX_left} y={pathY} width={vX} height="59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_620_3639"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_620_3639" result="shape"/>
</filter>
</defs>
        <mask id="path-1-inside-1_620_3639" fill="white">
            {/* <path stroke="none" fill="#fff"  */}
        <path fillRule="evenodd" clipRule="evenodd"
            d={
            `M${pathX_left+16} ${pathY+0}
            C${pathX_left+9.37258} ${pathY+0} ${pathX_left+4} ${pathY+5.37258} ${pathX_left+4} ${pathY+12}
            V${pathY+32}
            C${pathX_left+4} ${pathY+38.6274} ${pathX_left+9.37258} ${pathY+44} ${pathX_left+16} ${pathY+44}

            H${pathX+54}
            L${pathX+58.134} ${pathY+50.5}
            C${pathX+58.5189} ${pathY+51.1667} ${pathX+59.4811} ${pathY+51.1667} ${pathX+59.866} ${pathY+50.5}
            L${pathX+63.6188} ${pathY+44}

            H${pathX_right+102}
            C${pathX_right+108.627} ${pathY+44} ${pathX_right+114} ${pathY+38.6274} ${pathX_right+114} ${pathY+32}
            V${pathY+12}
            C${pathX_right+114} ${pathY+5.37258} ${pathX_right+108.627} ${pathY+0} ${pathX_right+102} ${pathY+0}
            H${pathY}
            Z`
            }/>
        </mask>

<path fillRule="evenodd" clipRule="evenodd"
fill="white"
d={
    `M${pathX_left+16} ${pathY+0}
    C${pathX_left+9.37258} ${pathY+0} ${pathX_left+4} ${pathY+5.37258} ${pathX_left+4} ${pathY+12}
    V${pathY+32}
    C${pathX_left+4} ${pathY+38.6274} ${pathX_left+9.37258} ${pathY+44} ${pathX_left+16} ${pathY+44}
    
    H${pathX+54}
    L${pathX+58.134} ${pathY+50.5}
    C${pathX+58.5189} ${pathY+51.1667} ${pathX+59.4811} ${pathY+51.1667} ${pathX+59.866} ${pathY+50.5}
    L${pathX+63.6188} ${pathY+44}
    
    H${pathX_right+102}
    C${pathX_right+108.627} ${pathY+44} ${pathX_right+114} ${pathY+38.6274} ${pathX_right+114} ${pathY+32}
    V${pathY+12}
    C${pathX_right+114} ${pathY+5.37258} ${pathX_right+108.627} ${pathY+0} ${pathX_right+102} ${pathY+0}
    H${pathY}
    Z`
}/>
<path fill={tooltipLineColor}
mask={"url(#path-1-inside-1_620_3639)"}
d={
`
M${pathX+54.3812} ${pathY+44}
L${pathX+56.9793} ${pathY+42.5}
C${pathX+56.4434} ${pathY+41.5718} ${pathX+55.453} ${pathY+41} ${pathX+54.3812} ${pathY+41}
V${pathX+44}

ZM${pathX+58.134} ${pathY+50.5}
L${pathX+60.7321} ${pathY+49}
L${pathX+60.7321} ${pathY+49}
L${pathX+58.134} ${pathY+50.5}

ZM${pathX+59.866} ${pathY+50.5}
L${pathX+57.2679} ${pathY+49}
L${pathX+57.2679} ${pathY+49}
L${pathX+59.866} ${pathY+50.5}

ZM${pathX+63.6188} ${pathY+44}
V${pathY+41}
C${pathX+62.547} ${pathY+41} ${pathX+61.5566} ${pathY+41.5718} ${pathX+61.0207} ${pathY+42.5}
L${pathX+63.6188} ${pathY+44}

ZM${pathX_left+7} ${pathY+12}
C${pathX_left+7} ${pathY+7.02944} ${pathX_left+11.0294} ${pathY+3} ${pathX_left+16} ${pathY+3}
V${pathY-3}
C${pathX_left+7.71573} ${pathY-3} ${pathX_left+1} ${pathY+3.71573} ${pathX_left+1} ${pathY+12}
H${pathX_left+7}

ZM${pathX_left+7} ${pathY+32}
V${pathY+12}
H${pathX_left+1}
V${pathY+32}
H${pathY+7}

ZM${pathX_left+16} ${pathY+41}
C${pathX_left+11.0294} ${pathY+41} ${pathX_left+7} ${pathY+36.9706} ${pathX_left+7} ${pathY+32}
H${pathX_left+1}
C${pathX_left+1} ${pathY+40.2843} ${pathX_left+7.71573} ${pathY+47} ${pathX_left+16} ${pathY+47}
V${pathY+41}

ZM${pathX_left+54.3812} ${pathY+41}
H${pathX_left+16}
V${pathY+47}
H${pathX+54.3812}
V${pathY+41}

ZM${pathX+60.7321} ${pathY+49}
L${pathX+56.9793} ${pathY+42.5}
L${pathX+51.7831} ${pathY+45.5}
L${pathX+55.5359} ${pathY+52}
L${pathX+60.7321} ${pathY+49}

ZM${pathX+57.2679} ${pathY+49}
C${pathX+58.0377} ${pathY+47.6667} ${pathX+59.9623} ${pathY+47.6667} ${pathX+60.7321} ${pathY+49}
L${pathX+55.5359} ${pathY+52}
C${pathX+57.0755} ${pathY+54.6667} ${pathX+60.9245} ${pathY+54.6667} ${pathX+62.4641} ${pathY+52}
L${pathX+57.2679} ${pathY+49}

ZM${pathX+61.0207} ${pathY+42.5}
L${pathX+57.2679} ${pathY+49}
L${pathX+62.4641} ${pathY+52}
L${pathX+66.2169} ${pathY+45.5}
L${pathX+61.0207} ${pathY+42.5}

ZM${pathX+102} ${pathY+41}
H${pathX+63.6188}
V${pathY+47}
H${pathX_right+102}
V${pathY+41}

ZM${pathX_right+111} ${pathY+32}
C${pathX_right+111} ${pathY+36.9706} ${pathX_right+106.971} ${pathY+41} ${pathX_right+102} ${pathY+41}
V${pathY+47}
C${pathX_right+110.284} ${pathY+47} ${pathX_right+117} ${pathY+40.2843} ${pathX_right+117} ${pathY+32}
H${pathX_right+111}

ZM${pathX_right+111} ${pathY+12}
V${pathY+32}
H${pathX_right+117}
V${pathY+12}
H${pathX_right+111}

ZM${pathX_right+102} ${pathY+3}
C${pathX_right+106.971} ${pathY+3} ${pathX_right+111} ${pathY+7.02944} ${pathX_right+111} ${pathY+12}
H${pathX_right+117}
C${pathX_right+117} ${pathY+3.71573} ${pathX_right+110.284} ${pathY-3} ${pathX_right+102} ${pathY-3}
V${pathY+3}

ZM${pathX_right+16} ${pathY+3}
H${pathX_right+102}
V${pathY-3}
H${pathX_left+16}
V${pathY+3}
Z
`
} />
<text 
    x={sx-decDump}
    y={sy+4}
    textAnchor={textAnchor}
    fill="#333"
    
>
    <tspan
    fontFamily="GothamRounded"
    fontSize={14}
    style={{textTransform:'capitalize'}}
    >{`${clickIndex}: ${scoreResult}`}</tspan>
    <tspan
    fontFamily="GothamRounded"
    fontSize={12}
    >{'%'}</tspan>
    </text>
        </g>
    )

}
const mouseOnEvent = (e:any)=>{
    console.log('click =',e)
    console.log('active',activeIndex)
    setClickIndex(e.name)
    let value= e.value;
    //   let outerR = e.outerRadius;
    let outerR = e.innerRadius;
      let dumpAllData:TAllDoughnutDatas = JSON.parse(JSON.stringify(allData));
      for (let i = 0; i < dumpAllData.length; i++) {
        const currentPayloadData = dumpAllData[i].data[0];
        if (currentPayloadData.name === e.name) {
            
            dumpAllData[i].data[0].selectName=e.name
            setTooltipLineColor(dumpAllData[i].toolLineColor)
            setDecText(dumpAllData[i].fitText);
            setAddWidth(dumpAllData[i].addWidth);
        } else {
            dumpAllData[i].data[0].selectName=''
        }
    }
    setTooltipData({outerRadius:outerR, value: value})
    setAllData(dumpAllData);
}
const mouseOffEvent = (e:any) => {
    let dumpAllData:TAllDoughnutDatas = JSON.parse(JSON.stringify(allData));
    for (let i = 0; i < dumpAllData.length; i++) {
        dumpAllData[i].data[0].selectName=''
    }
    setClickIndex('')
    setTooltipLineColor('')
    setDecText(0)
    setAddWidth(0)
    setTooltipData({value: 0, outerRadius: 0})
    setAllData(dumpAllData)
}

const allDataSortValues = [
    'conventions', 'sentence fluency', 'word choice','voice','organization','ideas'
]

  return (
    <PieChart width={500} height={500}>
        
        <text x={cx} y={cy} dy={12} textAnchor="middle" style={textmainCss} width={80} height={80} className="rounded-[50%] bg-black shadow-[1px_1px_5px_rgba(0,0,0,0.16)]">
            <tspan x={cx} y={cy} dy={12} textAnchor="middle" style={text1Css}>
                {Math.round(average*10)/10}
            </tspan>
            <tspan x={cx+30} y={cy} dy={12} style={text2Css}>%</tspan>
        </text>
        
        {allData.sort((a,b)=>{
            return allDataSortValues.indexOf(a.target) - allDataSortValues.indexOf(b.target);
        }).map((dataItem, dataIndex)=>{
            const currentR = radiusDatas[dataIndex]
            return <Pie key={dataItem.target}
                className="pie-button-effect-none"
              activeIndex={0}
              activeShape={renderActiveShape}
              data={dataItem.data}
              cx={cx}
              cy={cy}
              innerRadius={currentR.innerRadius}
              outerRadius={currentR.outerRadius}
              fill={dataItem.data[0].fillColor}
              dataKey="value"
              onMouseEnter={mouseOnEvent}
              onMouseOut={mouseOffEvent}
            //   onClick={}
            />

        })}
        {clickIndex!=='' && textTooltip()}
    </PieChart>
  );
}
