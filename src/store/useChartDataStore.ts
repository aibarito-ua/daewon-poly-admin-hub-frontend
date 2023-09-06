import {create} from 'zustand'
const useChartDataStore = create<IChartDataStore>((set,get) => ({
    doughnutData: [
        {
            target: 'conventions',
            data: [
                {
                    name: 'conventions',
                    value: 20,
                    selectName: '',
                    fillColor: '#db5757',
                    fillBorderColor: '#be1f1f'
                }
            ],
            addWidth: 40,
            fitText: 40,
            toolLineColor: '#be1f1f',
        },
        {
            target: 'sentence fluency',
            data: [
                {
                    name: 'sentence fluency',
                    value: 20,
                    selectName: '',
                    fillColor: '#6865cc',
                    fillBorderColor: '#433fa7'
                }
            ],
            addWidth: 55,
            fitText: 55,
            toolLineColor: '#433fa7'
        },
        {
            target: 'word choice',
            data: [
                {
                    name: 'word choice',
                    value: 20,
                    selectName: '',
                    fillColor: '#30c194',
                    fillBorderColor: '#12986f'
                }
            ],
            addWidth: 40,
            fitText: 40,
            toolLineColor: '#12986f'
        },
        {
            target: 'voice',
            data: [
                {
                    name: 'voice',
                    value: 20,
                    selectName: '',
                    fillColor: '#aa6bd4',
                    fillBorderColor: '#863fb5'
                }
            ],
            addWidth: 10,
            fitText: 14,
            toolLineColor: '#863fb5'
        },
        {
            target: 'organization',
            data: [
                {
                    name: 'organization',
                    value: 20,
                    selectName: '',
                    fillColor: '#f6914d',
                    fillBorderColor: '#ee711e'
                }
            ],
            addWidth: 40,
            fitText: 40,
            toolLineColor: '#ee711e'
        },
        {
            target: 'ideas',
            data: [
                {
                    name: 'ideas',
                    value: 20,
                    selectName: '',
                    fillColor: '#588ee1',
                    fillBorderColor: '#1f61c8'
                }
            ],
            addWidth: 10,
            fitText: 14,
            toolLineColor: '#1f61c8'
        },
    ],
    barChartData: [
        // {
        //   name: "idea",
        //   unit1: 8,
        //   unit2: 4,
        //   unit3: 4,
        //   unit4: 8,
        //   unit5: 10,
        //   amt: 10
        // },
        // {
        //   name: "organization",
        //   unit1: 6,
        //   unit2: 4,
        //   unit3: 4,
        //   unit4: 8,
        //   unit5: 10,
        //   amt: 10
        // },
        // {
        //   name: "voice",
        //   unit1: 6,
        //   unit2: 4,
        //   unit3: 4,
        //   unit4: 8,
        //   unit5: 10,
        //   amt: 10
        // },
        // {
        //   name: "word choice",
        //   unit1: 6,
        //   unit2: 4,
        //   unit3: 4,
        //   unit4: 8,
        //   unit5: 10,
        //   amt: 10
        // },
        // {
        //   name: "sentence fluency",
        //   unit1: 6,
        //   unit2: 4,
        //   unit3: 4,
        //   unit4: 8,
        //   unit5: 10,
        //   amt: 10
        // },
        // {
        //   name: "conventions",
        //   unit1: 6,
        //   unit2: 4,
        //   unit3: 4,
        //   unit4: 8,
        //   unit5: 10,
        //   amt: 1
        // },
    ],
    dumyData: [
        {
            unit: 1,
            score: [
                {name: 'ideas', score: 2},
                {name: 'organization', score: 8},
                {name: 'voice', score: 6},
                {name: 'word choice', score: 6},
                {name: 'sentence fluency', score: 8},
                {name: 'conventions', score: 10}
            ]
        },
        {
            unit: 2,
            score: [
                {name: 'ideas', score: 8},
                {name: 'organization', score: 6},
                {name: 'voice', score: 8},
                {name: 'word choice', score: 8},
                {name: 'sentence fluency', score: 6},
                {name: 'conventions', score: 10}
            ]
        },
        {
            unit: 3,
            score: [
                {name: 'ideas', score: 4},
                {name: 'organization', score: 8},
                {name: 'voice', score: 8},
                {name: 'word choice', score: 4},
                {name: 'sentence fluency', score: 6},
                {name: 'conventions', score: 10}
            ]
        },
        {
            unit: 4,
            score: [
                {name: 'ideas', score: 6},
                {name: 'organization', score: 6},
                {name: 'voice', score: 6},
                {name: 'word choice', score: 8},
                {name: 'sentence fluency', score: 8},
                {name: 'conventions', score: 10}
            ]
        },
        {
            unit: 5,
            score: [
                {name: 'ideas', score: 8},
                {name: 'organization', score: 10},
                {name: 'voice', score: 8},
                {name: 'word choice', score: 4},
                {name: 'sentence fluency', score: 2},
                {name: 'conventions', score: 2}
            ]
        }
    ],
    setDatas: (data) => {
        const dataCategory:TScoreCategory[] = ['ideas','organization','voice','word choice','sentence fluency','conventions'];
        
        let barData:TBarChartDatas = Array.from({length:5}, (v,i)=>{
            return {name: dataCategory[i], unit1:0, unit2:0, unit3:0, unit4:0, unit5:0, amt:0}
        })
        let dumpDoughnutData = get().doughnutData;
        let categoryEachScore:{
            name: TScoreCategory;
            scores: number;
        }[] = Array.from({length:dataCategory.length}, (v,i) => {
            return {name: dataCategory[i], scores: 0}
        });
        
        // unit for loop
        for (let unitIdx = 0; unitIdx < data.length; unitIdx++) {
            const unitNumber = data[unitIdx].unit;
            const unitScoreInfo = data[unitIdx].score;
            // score for by category for loop
            for (let scoreIdx = 0; scoreIdx < unitScoreInfo.length; scoreIdx++) {
                const categoryName = unitScoreInfo[scoreIdx].name;
                const categoryValue = unitScoreInfo[scoreIdx].score;
                for (let cateIdx = 0; cateIdx < categoryEachScore.length; cateIdx++) {
                    if (categoryEachScore[cateIdx].name === categoryName) {
                        categoryEachScore[cateIdx].scores +=categoryValue
                    }
                }

                for (let dIdx = 0; dIdx< barData.length; dIdx++) {
                    if (barData[dIdx].name === categoryName) {
                        if (unitNumber===1) {
                            barData[dIdx].unit1=categoryValue;
                        } else if (unitNumber===2) {
                            barData[dIdx].unit2=categoryValue;
                        } else if (unitNumber===3) {
                            barData[dIdx].unit3=categoryValue;
                        } else if (unitNumber===4) {
                            barData[dIdx].unit4=categoryValue;
                        } else if (unitNumber===5) {
                            barData[dIdx].unit5=categoryValue;
                        }
                        
                    }
                }
            }
        };
        for (let doughnutIdx = 0; doughnutIdx < dumpDoughnutData.length; doughnutIdx++) {
            const doughnutName = dumpDoughnutData[doughnutIdx].data[0].name;
            for (let cateIndex = 0; cateIndex < categoryEachScore.length; cateIndex++) {
                if (categoryEachScore[cateIndex].name === doughnutName) {
                    const sumScore = categoryEachScore[cateIndex].scores;
                    const aveScore = sumScore/50*100;
                    const valueScore = (Math.round(aveScore*10)/10).toFixed(1);
                    
                    dumpDoughnutData[doughnutIdx].data[0].value = parseFloat(valueScore)
                    console.log(doughnutName, ': ',valueScore)
                }
            }
        }
        console.log('doughnut data =',dumpDoughnutData)
        set({
            doughnutData: dumpDoughnutData,
            barChartData: barData,
        })
    }
}))

export default useChartDataStore;