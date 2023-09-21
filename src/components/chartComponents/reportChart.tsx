
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Tooltip, Text } from "recharts";
import useControlAlertStore from "../../store/useControlAlertStore";
import useReportStore from "../../store/useReportStore";
// import {ReactComponent as ReportTooltipIMG} from './tooltips/reportTooltip copy.svg'

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
const renderActiveShape = (props: any) => {
    // console.log('props: ',props)
  // const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    // midAngle,
    innerRadius,
    outerRadius,
    // startAngle,
    // endAngle,
    fill,
    payload,
    // percent,
    value
  } = props;
  // const midAngle = 45;
  const startAngle = 90;
  const endAngle = 90-value/100*360;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 10) * cos;
  // const sy = cy + (outerRadius + 10) * sin;
  // const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  // const ey = my;
  // const textAnchor = cos >= 0 ? "start" : "end";
  const radiusMid = outerRadius-innerRadius;
const cornerRadius = radiusMid/2;
const trackRadius = innerRadius + cornerRadius;
// console.log('payload ==',payload)
const textLabelCss:React.CSSProperties = {
    width: '80px',
    height: '80px',
    backgroundColor: '#ffffff',
    fill: payload.fillBorderColor,
    textTransform: 'capitalize'
}
const percentValue = Math.round(payload.value*10)/10;
const percentDotCheck = Math.round(payload.value*10)%10 === 0;

const titleName:string[] = payload.name.split(' ')
  return (
    <g>
        <circle cx={cx} cy={cy}
            r={trackRadius}
            fill="#fff"
            stroke="#f5f5f5"
            strokeWidth={4}
        />
        <text x={cx} y={cy} textAnchor="middle" width={104} height={28} style={textLabelCss}
        className="report-small-chart-inner-doughnut-label">{titleName.map((textTitle, textTitleIdx) => {
            const checkTextLength = titleName.length;
            const d2y = textTitleIdx * 14;
            return <tspan x={cx} y={cy} key={textTitleIdx} textAnchor="middle" dy={checkTextLength>1 ? d2y-18: d2y-5}>{textTitle}</tspan>
        })}</text>
        <text x={cx} y={cy} dy={0} dx={0} textAnchor="middle" style={textmainCss} width={80} height={80} 
        className="rounded-[50%] shadow-[1px_1px_5px_rgba(0,0,0,0.16)]">
            <tspan x={cx} y={cy} dy={15} dx={-5} textAnchor="middle" style={text1Css}>
                {percentValue}
            </tspan>
            <tspan x={percentDotCheck ? cx+20: cx+30} y={cy} dy={15} dx={-5} style={text2Css}>%</tspan>
        </text>
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
const CustomTooltipDIV = (props:any) => {
    const { active, payload, label} = props;
    if (active && payload && payload.length) {
        const classNameStr = `custom-tooltip-${payload[0].name.replace(' ','')}`
        return (
          <div className={`${classNameStr}`}>
            <p className="custom-tooltip-title z-20">{`${payload[0].payload.tooltip.title}`}</p>
            <p className="custom-tooltip-content z-20">{`${payload[0].payload.tooltip.content}`}</p>
            
          </div>
        );
    } else return null
}
export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState<{x:number, y:number}>({x:0,y:0});
  const [allData, setAllData] = useState<TAllDoughnutDatas>([]);
  
  const {report, reportByUnitData, reportByUnitAPIData} = useReportStore();
  
  React.useEffect(()=>{
      const data = report.doughnutChart;
      const dumpData:TAllDoughnutDatas = JSON.parse(JSON.stringify(data));
      setAllData(dumpData);
  },[reportByUnitAPIData])
    
  const mouseOnEvent = (e:any)=>{
      // console.log('click =',e)
      // console.log('active',activeIndex)
      const tooltipContentsFromPayload = e.payload.tooltip;
      // console.log('tooltipContentsFromPayload =',tooltipContentsFromPayload)
        let dumpAllData:TAllDoughnutDatas = JSON.parse(JSON.stringify(allData));
        for (let i = 0; i < dumpAllData.length; i++) {
          const currentPayloadData = dumpAllData[i].data[0]
          if (currentPayloadData.name === e.name) {
              setTooltipPosition({x: e.cx, y:e.cy})
              dumpAllData[i].data[0].selectName=e.name
              setActiveIndex(i+1)
          } else {
              dumpAllData[i].data[0].selectName=''
          }
      }
      setAllData(dumpAllData);
  }
  const mouseOffEvent = (e:any) => {
      let dumpAllData:TAllDoughnutDatas = JSON.parse(JSON.stringify(allData));
      for (let i = 0; i < dumpAllData.length; i++) {
          dumpAllData[i].data[0].selectName=''
      }
      setActiveIndex(0)
      setAllData(dumpAllData)
  }
  const rad = 150
  const radAddX = 75
  const radAddY = 129.9
  const stDotX = 250;
  const stDotY = 250;
  const polygonDotArr = [
      {cx:stDotX, cy:stDotY-rad},
      {cx:stDotX+radAddY, cy:stDotY-radAddX},
      {cx:stDotX+radAddY, cy:stDotY+radAddX},
      {cx:stDotX, cy:stDotY+rad},
      {cx:stDotX-radAddY, cy:stDotY+radAddX},
      {cx:stDotX-radAddY, cy:stDotY-radAddX},
  ]
  return (
    <PieChart width={500} height={500} className="flex flex-1">
        <circle cx={stDotX} cy={stDotY}
            r={150}
            fill="none"
            stroke="#ecf2ff"
            strokeWidth={60}
        />
        {allData.map((dataItem, dataIndex)=>{
            const polygonDot = polygonDotArr[dataIndex]
            return <Pie key={dataItem.target}
                className="pie-button-effect-none"
              activeIndex={0}
              activeShape={renderActiveShape}
              data={dataItem.data}
              cx={polygonDot.cx}
              cy={polygonDot.cy}
              innerRadius={48}
              outerRadius={56}
              fill={dataItem.data[0].fillColor}
              dataKey="value"
              onMouseOver={mouseOnEvent}
              onMouseLeave={mouseOffEvent}
            />
        })}
        <text x={stDotX} y={stDotY}
        textAnchor="middle"
        dy={-25}
        fontFamily="GothamRounded"
        fontWeight={500}
        fontSize={17}
        fill="#222"
        >{`unit ${reportByUnitData.currentUnitInfo.unit_index}`}</text>
        <text x={stDotX} y={stDotY}
        dy={-5}
        fontFamily="GothamRounded"
        fontWeight={500}
        fontSize={17}
        fill="#222"
        textAnchor="middle"
        >{`overall score`}</text>
        <text x={stDotX} y={stDotY} width={190} height={80}
        dx={5} dy={35}
        textAnchor="middle"
        fontFamily="GothamRounded"
        fontWeight={700}
        fontSize={35}
        fill="#333"
        >{report.avrage.data[0].value}
        <tspan 
        fontSize={28}
        >%</tspan>
        </text>
        <Tooltip position={{x:tooltipPosition.x+55, y:tooltipPosition.y-60}} content={<CustomTooltipDIV/>}/>
    </PieChart>
  );
}
