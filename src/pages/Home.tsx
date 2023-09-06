import React from 'react';

// import DoughnutChart from '../components/commonComponents/ChartTest/chartComponents/dounutChat'
// import BarChart from '../components/commonComponents/ChartTest/chartComponents/barChart';
// import useChartDataStore from '../store/useChartDataStore';

export const Home = () => {
    // const {doughnutData, barChartData, dumyData, setDatas} = useChartDataStore();
    // React.useEffect(()=>{
    //     setDatas(dumyData)
    // },[])
    return (
        <section className="section-common-layout ">
            <div className='flex flex-1 w-full h-full justify-center items-center'>
                <p className='flex text-[#bfbfbf] text-2xl'>{'원하는 메뉴를 선택하세요.'}</p>
                {/* <div className='w-full flex flex-row'>
                    <DoughnutChart data={doughnutData}/>
                    <BarChart data={barChartData}/>
                </div> */}
            </div> 
                
        </section>
    )
}
