import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import useReportStore from "../../store/useReportStore";
export default function App(props: {
  data: TOverallBarChartData[];
}) {
  const {overallBarChartData, report} = useReportStore();
  const [data, setData] = React.useState<TOverallBarChartData[]>([]);
  React.useEffect(()=>{
    setData(overallBarChartData)
  },[report])

  let check = {
    unit1:false, unit2:false, unit3:false, unit4:false, unit5:false
  }
  for (let i = 0; i < data.length; i++) {
    const target = data[i];
    if (target.unit1>0) check.unit1=true;
    if (target.unit2>0) check.unit2=true;
    if (target.unit3>0) check.unit3=true;
    if (target.unit4>0) check.unit4=true;
    if (target.unit5>0) check.unit5=true;
  }

  return (
    <BarChart
      width={720}
      height={514}
      data={data}
      margin={{
        top: -50,
        right: 0,
        left: 0,
        bottom: 0
      }}
      barCategoryGap={'12px'}
      barGap={6}
      className="font-[NotoSansCJKKR] capitalize"
      
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
      <XAxis dataKey="name" tick={true} minTickGap={0} ticks={['ideas','organization','voice','word choice', 'sentence fluency','conventions']} 
        tickLine={false} tickMargin={10} axisLine={false} interval={0}
         fontSize={13} fontFamily="NotoSansCJKKR" className="capitalize"
      />
      <YAxis tickCount={5} ticks={[0,1,2,3,4,5,6,7,8,9,10,11]} tickLine={false} axisLine={false} tickFormatter={()=>''} />
      {/* <Tooltip /> */}
      <Legend iconType="circle" align="center" 
        formatter={(value, entry, index) => <span className="capitalize pr-[40px]" style={{color: '#555', fontSize: '13px',lineHeight:'20px',fontFamily:'Noto Sans CJK KR'}}>{value}</span>} 
        height={50} verticalAlign="bottom" wrapperStyle={{paddingTop: 40, paddingLeft:140}} />

      <Bar dataKey="unit1" fill="#3dbcbf" label={check.unit1?{position:'top',fontFamily: 'GothamRounded',fontWeight:500,color:'#222',fontSize:14}:''} barSize={10} radius={[5,5,0,0]} />
      <Bar dataKey="unit2" fill="#f77488" label={check.unit2?{position:'top',fontFamily: 'GothamRounded',fontWeight:500,color:'#222',fontSize:14}:''} barSize={10} radius={[5,5,0,0]}/>
      <Bar dataKey="unit3" fill="#f9a77c" label={check.unit3?{position:'top',fontFamily: 'GothamRounded',fontWeight:500,color:'#222',fontSize:14}:''} barSize={10} radius={[5,5,0,0]}/>
      <Bar dataKey="unit4" fill="#43d39a" label={check.unit4?{position:'top',fontFamily: 'GothamRounded',fontWeight:500,color:'#222',fontSize:14}:''} barSize={10} radius={[5,5,0,0]}/>
      <Bar dataKey="unit5" fill="#5a91c8" label={check.unit5?{position:'top',fontFamily: 'GothamRounded',fontWeight:500,color:'#222',fontSize:14}:''} barSize={10} radius={[5,5,0,0]}/>
    </BarChart>
  );
}
