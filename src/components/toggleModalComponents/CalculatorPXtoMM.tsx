import React from 'react';
const CalculatorPXtoMM = () =>{

    const [valueA, setValueA] = React.useState<number>(850);
    const [valueB, setValueB] = React.useState<number>(210);
    const [valueC, setValueC] = React.useState<number>(0);
    const [value, setValue] = React.useState<string>('');

    const [valueA1, setValueA1] = React.useState<number>(1228);
    const [valueB1, setValueB1] = React.useState<number>(297);
    const [valueC1, setValueC1] = React.useState<number>(0);
    const [value1, setValue1] = React.useState<string>('');

    return <div className='flex flex-col'>
        <div className='flex flex-row'>
        <input type='number' className='w-[200px]' readOnly value={valueA}/>
        <input type='number' className='w-[200px]' readOnly value={valueB}/>
        :
        <input type='number' className='w-[200px]' onChange={(e) =>setValueC(parseFloat(e.currentTarget.value))} value={valueC}/>
        <input type='text' className='w-[200px]' onChange={(e) =>setValue(e.currentTarget.value)} value={value}/>
        <div onClick={()=>{
            const result = ((valueC*valueB) / valueA).toFixed(3);
            // const resultUp = 
            setValue(result)
        }}>Enter</div>
        </div>
        <div className='flex flex-row'>
        <input type='number' className='w-[200px]' readOnly value={valueA1}/>
        <input type='number' className='w-[200px]' readOnly value={valueB1}/>
        :
        <input type='number' className='w-[200px]' onChange={(e) =>setValueC1(parseFloat(e.currentTarget.value))} value={valueC1}/>
        <input type='text' className='w-[200px]' onChange={(e) =>setValue1(e.currentTarget.value)} value={value1}/>
        <div onClick={()=>{
            const result = ((valueC1*valueB1) / valueA1).toFixed(3);
            // const resultUp = 
            setValue1(result)
        }}>Enter</div>
        </div>
    </div>
}
export default CalculatorPXtoMM;