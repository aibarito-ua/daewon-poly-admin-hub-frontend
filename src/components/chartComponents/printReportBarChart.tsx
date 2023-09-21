import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from "recharts";
import useReportStore from "../../store/useReportStore";

type TBarChartData = {
    name: string;
    unit1: number;
    unit2: number;
    unit3: number;
    unit4: number;
    unit5: number;
    amt: number;
}
// 1차 데이터 가공
const changeDataForm = (unitRubricScoresData:TUnitScoreData) => {
    const targetData = unitRubricScoresData.unitsData;
    let barChartData:TBarChartData[] = []
    const rubricDataLabels = [
        'ideas',
        'organization',
        'voice',
        'word choice',
        'sentence fluency',
        'conventions',
    ]
    for (let i = 0; i < rubricDataLabels.length; i++) {
        const rubricName = rubricDataLabels[i];
        const rubricScore:TBarChartData = {
            name: rubricName,
            unit1: 0, unit2: 0, unit3:0, unit4:0, unit5:0, amt:10
        };
        // unit datas for loop
        for (let j = 0; j < targetData.length; j++) {
            const unitTargetData = targetData[j];
            if (unitTargetData.unit_index===1) {
                const rubricTarget = unitTargetData.rubric_scores;
                for (let z = 0; z < rubricTarget.length; z++) {
                    const rubricTargetName = rubricTarget[z].name;
                    if (rubricTargetName === rubricName) {
                        rubricScore.unit1 = rubricTarget[z].score;
                        break;
                    }
                }
            } else if (unitTargetData.unit_index===2) {
                const rubricTarget = unitTargetData.rubric_scores;
                for (let z = 0; z < rubricTarget.length; z++) {
                    const rubricTargetName = rubricTarget[z].name;
                    if (rubricTargetName === rubricName) {
                        rubricScore.unit2 = rubricTarget[z].score;
                        break;
                    }
                }
            } else if (unitTargetData.unit_index===3) {
                const rubricTarget = unitTargetData.rubric_scores;
                for (let z = 0; z < rubricTarget.length; z++) {
                    const rubricTargetName = rubricTarget[z].name;
                    if (rubricTargetName === rubricName) {
                        rubricScore.unit3 = rubricTarget[z].score;
                        break;
                    }
                }
            } else if (unitTargetData.unit_index===4) {
                const rubricTarget = unitTargetData.rubric_scores;
                for (let z = 0; z < rubricTarget.length; z++) {
                    const rubricTargetName = rubricTarget[z].name;
                    if (rubricTargetName === rubricName) {
                        rubricScore.unit4 = rubricTarget[z].score;
                        break;
                    }
                }
            } else if (unitTargetData.unit_index===5) {
                const rubricTarget = unitTargetData.rubric_scores;
                for (let z = 0; z < rubricTarget.length; z++) {
                    const rubricTargetName = rubricTarget[z].name;
                    if (rubricTargetName === rubricName) {
                        rubricScore.unit5 = rubricTarget[z].score;
                        break;
                    }
                }
            };
        }; //unit datas for loop End
        barChartData.push(rubricScore)
    };
    console.log('barChartData =',barChartData)
    return barChartData;
}
// 2차 데이터 가공
const processChangeDataForm = (data: TBarChartData[]) => {
    const rubricDataLabels = [
        'ideas',
        'organization',
        'voice',
        'word choice',
        'sentence fluency',
        'conventions',
    ];
    const rubricDataLength = rubricDataLabels.length;
    let processData: TBarChartData[] = [];
    for (let i = 0; i < data.length; i++) {
        const targetRubricData = data[i];
    }
}

// custom bar
    const getPath = (x: number, y: number, width: number, height: number) => {
        return `M ${x} ${y} L ${x+width} ${y} C ${x+width+height} ${y} ${x+width+height} ${y+height} ${x+width} ${y+height} L ${x} ${y+height} L ${x} ${x+height} Z`;
    };
  
  const RemakeBar: React.FunctionComponent<any> = (props: any) => {
        // console.log("triangle =",props)
        const { fill, x, y, width, height, payload } = props;
        const pathD = getPath(x+0.5, payload.customY, width-8, 10);
        const startColor = payload.colors.start;
        const endColor = payload.colors.end;
        return <g>
            <defs>
            <linearGradient id="printReportScoreBarGradientColor" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="50%" stopColor={startColor} stopOpacity={0.6} />
                <stop offset="95%" stopColor={endColor} stopOpacity={0.6} />
            </linearGradient>
            </defs>
            <path d={pathD} stroke="none" fill={fill} />;
            </g>
    };
  
// custom tick titles
    const customizedGroupTick = (props: any) => {
        const { index, x, y, payload } = props;
        const customBarY = [10, 32, 54, 76, 98, 120]
        return (
        <g>
            <text 
            textAnchor="end"
            fontFamily="NotoSansCJKKR"
            fontSize={'2.902mm'}
            fontWeight={400}
            fill="#222"
            height={'18px'}
            dy={9}
            x={x} y={customBarY[payload.index]}>{payload.value}</text>
        </g>
        );
    };



export default function App() {
    const {report} = useReportStore();
    const [dataGet, setDataGet] = React.useState<TAllDoughnutDatas>([]);
    // data form process 1
    // const dataGet = report.doughnutChart;
    const ideaColor = { start:'#c9defc', end: '#588ee1'}
    const organizationColor ={ start:'#ffd1b2', end: '#f6914d'}
    const voiceColor = { start:'#efd6ff', end: '#aa6bd4'}
    const wordChoiceColor = { start:'#c2f3e4', end: '#30c194'}
    const sentenceFluencyColor = { start:'#e0dfff', end: '#6865cc'}
    const conventionsColor = { start:'#ffdcdc', end: '#db5757'}
    React.useEffect(()=>{
        setDataGet(report.doughnutChart)
    },[])
    React.useEffect(()=>{
        setDataGet(report.doughnutChart)
        
    },[report])

    const dataArr = dataGet.map((dataItem) => {
        const dataName = dataItem.target;
        console.log('dataName =',dataName)
        if (dataName==='ideas') {
            return {
                name: dataName,
                score: dataItem.data[0].value,
                colors: ideaColor,
                customY: 10
            }
        } else if (dataName==='organization') {
            return {
                name: dataName,
                score: dataItem.data[0].value,
                colors: organizationColor,
                customY: 32
            }
        } else if (dataName === 'voice') {
            return {
                name: dataName,
                score: dataItem.data[0].value,
                colors: voiceColor,
                customY: 54
            }
        } else if (dataName==='word choice') {
            return {
                name: dataName,
                score: dataItem.data[0].value,
                colors: wordChoiceColor,
                customY: 76
            }
        } else if (dataName==='sentence fluency') {
            return {
                name: dataName,
                score: dataItem.data[0].value,
                colors: sentenceFluencyColor,
                customY: 98
            }
        } else if (dataName==='conventions') {
            return {
                name: dataName,
                score: dataItem.data[0].value,
                colors: conventionsColor,
                customY: 120
            }
        } else {
            return {
                name: '',
                score: 0,
                colors: {start: '', end:''},
                customY: 0
            }
        }
    })
    const sortLabels = [
        'ideas',
        'organization',
        'voice',
        'word choice',
        'sentence fluency',
        'conventions',
    ];
    const data = dataArr.sort((a, b)=> {
        return sortLabels.indexOf(a.name)-sortLabels.indexOf(b.name);
    })
    // custom bar labels
    const CustomizedBarLabel = (props:any) => {
        console.log('label props =',props)
        const customBarY = [10, 32, 54, 76, 98, 120]
        const {
            x, y, fill, value, index,
            viewBox
        } = props;
        const reDy = viewBox.height/2
        return <text
            x={viewBox.width+viewBox.x+10}
            y={customBarY[index]}
            dy={10}
        >{value}%</text>
    }
  return (
    <BarChart
    layout={'vertical'}
    width={595}
    height={140}
    data={data}
    margin={{
      top: 0,
      right: 50,
      left: 50,
      bottom: 0
    }}
      className="export-report-wr-bar-titles"
    >
      <CartesianGrid strokeDasharray="3 3" 
        height={140}
        horizontal={false}
      />
      <XAxis type="number" axisLine={false} tick={true}
      ticks={['0','10','20','30','40','50','60','70','80','90','100']}
      tickSize={0}
      tickFormatter={()=>''}
      />
      <YAxis dataKey="name" type="category"
      axisLine={true}
      stroke="#cccccc"
      tickLine={false}
      scale="band"
      tick={customizedGroupTick}
      interval={0}
      />
      <defs>
        {data.map((item, linearIndex) => {
            // console.log('linear item =',item)
            return<linearGradient key={linearIndex}
            id={`printReportScoreBarGradientColor${linearIndex}`}
            x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor={item.colors.start} stopOpacity={1} />
                <stop offset="70%" stopColor={item.colors.end} stopOpacity={1} />
            </linearGradient>
        })}
      </defs>
      
      <Bar
        dataKey="score"
        fill="#8884d8"
        shape={<RemakeBar />}
        label={<CustomizedBarLabel/>}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={`url(#printReportScoreBarGradientColor${index})`} />
        ))}
      </Bar>
    
    </BarChart>
  );
}
