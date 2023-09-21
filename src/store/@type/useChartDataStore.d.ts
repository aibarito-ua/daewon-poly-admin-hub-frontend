interface IChartDataStore {
    dumyData: TSetChartDatas[];
    doughnutData: TAllDoughnutDatasCDS;
    barChartData: TBarChartDatas;
    setDatas: (data:TSetChartDatas[])=>void;
}
type TSetChartDatas = {
    unit: 1|2|3|4|5;
    score: TScoreByUnit[]
}
type TUnitScore = 2|4|6|8|10;
type TScoreByUnit = {
    name: TScoreCategory,
    score: TUnitScore;
}
type TScoreCategory = 'ideas'|'organization'|'voice'|'word choice'|'sentence fluency'|'conventions';
type TAllDoughnutDatasCDS = {
    target: string;
    data: {
        name: string;
        value: number;
        selectName: string;
        fillColor: string;
        fillBorderColor: string;
    }[];
    addWidth: number;
    fitText: number;
    toolLineColor: string;
}[]

type TBarChartDatas = TBarChartData[]
type TBarChartData = {
    name: string;
    unit1: TUnitScore|0;
    unit2: TUnitScore|0;
    unit3: TUnitScore|0;
    unit4: TUnitScore|0;
    unit5: TUnitScore|0;
    amt: number;
}
