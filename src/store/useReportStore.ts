import { create } from 'zustand';

const useReportStore = create<IUseReportStore>((set, get) => ({
    report: {
        barChar: [
            {
              name: "idea",
              unit1: 6,
              unit2: 4,
              unit3: 4,
              unit4: 8,
              unit5: 10,
              amt: 10
            },
            {
              name: "organization",
              unit1: 6,
              unit2: 4,
              unit3: 4,
              unit4: 8,
              unit5: 10,
              amt: 10
            },
            {
              name: "voice",
              unit1: 6,
              unit2: 4,
              unit3: 4,
              unit4: 8,
              unit5: 10,
              amt: 10
            },
            {
              name: "word choice",
              unit1: 6,
              unit2: 4,
              unit3: 4,
              unit4: 8,
              unit5: 10,
              amt: 10
            },
            {
              name: "sentence fluency",
              unit1: 6,
              unit2: 4,
              unit3: 4,
              unit4: 8,
              unit5: 10,
              amt: 10
            },
            {
              name: "conventions",
              unit1: 6,
              unit2: 4,
              unit3: 4,
              unit4: 8,
              unit5: 10,
              amt: 1
            },
        ],
        doughnutChart: [
            {
                target: 'organization',
                data: [
                    {
                        name: 'organization',
                        value: 0,
                        selectName: '',
                        fillColor: '#f6914d',
                        fillBorderColor: '#ee711e',
                        innerLineColor: '#fcddc8',
                        tooltip: {
                            title: 'organization',
                            content: 'The narrative has a clear topic and purpose that is well- focused. All the details are well-developed, interesting, and important to the narrative.'
                        }
                    }
                ],
                addWidth: 40,
                fitText: 40,
                toolLineColor: '#ee711e'
            },
            {
                target: 'voice',
                data: [
                    {
                        name: 'voice',
                        value: 0,
                        selectName: '',
                        fillColor: '#aa6bd4',
                        fillBorderColor: '#863fb5',
                        innerLineColor: '#E5D1F1',
                        tooltip: {
                            title: 'voice',
                            content: 'The narrative has a clear topic and purpose that is well- focused. All the details are well-developed, interesting, and important to the narrative.'
                        }
                    }
                ],
                addWidth: 10,
                fitText: 14,
                toolLineColor: '#863fb5'
            },
            {
                target: 'conventions',
                data: [
                    {
                        name: 'conventions',
                        value: 0,
                        selectName: '',
                        fillColor: '#db5757',
                        fillBorderColor: '#be1f1f',
                        innerLineColor: '#F4CBCB',
                        tooltip: {
                            title: 'conventions',
                            content: 'The narrative has a clear topic and purpose that is well- focused. All the details are well-developed, interesting, and important to the narrative.'
                        }
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
                        value: 0,
                        selectName: '',
                        fillColor: '#6865cc',
                        fillBorderColor: '#433fa7',
                        innerLineColor: '#E2E1FD',
                        tooltip: {
                            title: 'sentence fluency',
                            content: 'The narrative has a clear topic and purpose that is well- focused. All the details are well-developed, interesting, and important to the narrative.'
                        }
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
                        value: 0,
                        selectName: '',
                        fillColor: '#30c194',
                        fillBorderColor: '#12986f',
                        innerLineColor: '#DCF4EC',
                        tooltip: {
                            title: 'word choice',
                            content: 'The narrative has a clear topic and purpose that is well- focused. All the details are well-developed, interesting, and important to the narrative.'
                        }
                    }
                ],
                addWidth: 40,
                fitText: 40,
                toolLineColor: '#12986f'
            },
            {
                target: 'ideas',
                data: [
                    {
                        name: 'ideas',
                        value: 0,
                        selectName: '',
                        fillColor: '#588ee1',
                        fillBorderColor: '#1f61c8',
                        innerLineColor: '#C5DBFC',
                        tooltip: {
                            title: 'ideas',
                            content: 'The narrative has a clear topic and purpose that is well- focused. All the details are well-developed, interesting, and important to the narrative.'
                        }
                    }
                ],
                addWidth: 10,
                fitText: 14,
                toolLineColor: '#1f61c8'
            },
        ],
        avrage: {
            target: 'average',
            data: [
                {
                    name: 'average',
                    value: 0,
                }
            ],
            addWidth: 40,
            fitText: 40,
        },
    },
    set: {
        doughnutChart: (data) =>{
            let report = get().report;
            let doughnutData:TAllDoughnutDatas = report.doughnutChart;
            for (let i = 0; i < doughnutData.length; i++) {
                const targetName = doughnutData[i].target;
                for (let j = 0; j < data.length; j++) {
                    const currentName = data[j].name;
                    if (targetName === currentName) {
                        doughnutData[i].data[0].value = data[j].score;
                    }
                }
            };
            report.doughnutChart = doughnutData;
            set(()=>({ report }));
        },
        barChart: () => {

        },
        // unit and title setter - report by unit data > currentUnitInfo
        initCurrentDisplay: (idx, topic) => {
            let dumpReportUnitData = get().reportByUnitData;
            dumpReportUnitData.currentUnitInfo.unit_index=idx;
            dumpReportUnitData.currentUnitInfo.unit_topic=topic;
            set(()=>({reportByUnitData:dumpReportUnitData}))
        },
        // wordCoundSummary setter
        setWordCoundSummary: (data, draft) => {
            const originalData = get().reportByUnitData;
            let dumyReportByUnitData:TUnitReportModalData = JSON.parse(JSON.stringify(originalData));

            if (draft===1) {
                let targetDumy = dumyReportByUnitData.wordCountSummary.draft_1st;
                for (let i = 0; i < data.length; i++) {
                    const currentTarget = data[i];
                    for (let j = 0; j < targetDumy.length; j++) {
                        if (targetDumy[j].label === currentTarget.label) {
                            targetDumy[j].value = currentTarget.value;
                        }
                    }
                }
                dumyReportByUnitData.wordCountSummary.draft_1st = targetDumy;
                set(()=>({reportByUnitData: dumyReportByUnitData}));
            } else {
                let targetDumy = dumyReportByUnitData.wordCountSummary.draft_2nd;
                for (let i = 0; i < data.length; i++) {
                    const currentTarget = data[i];
                    for (let j = 0; j < targetDumy.length; j++) {
                        if (targetDumy[j].label === currentTarget.label) {
                            targetDumy[j].value = currentTarget.value;
                        }
                    }
                }
                dumyReportByUnitData.wordCountSummary.draft_2nd = targetDumy;
                set(()=>({reportByUnitData: dumyReportByUnitData}));
            }
        },
        // set teache's comments
        setTeachersComments: (data) => {
            const originalData = get().reportByUnitData;
            let dumyReportByUnitData:TUnitReportModalData = JSON.parse(JSON.stringify(originalData));
            dumyReportByUnitData.teacherComment.draft1st=data.draft1st;
            dumyReportByUnitData.teacherComment.draft2nd=data.draft2nd;
            set(()=>({reportByUnitData:dumyReportByUnitData}))
        },
        // set completion dates
        setCompletionDates: (dates) => {
            const originalData = get().reportByUnitData;
            let dumyReportByUnitData:TUnitReportModalData = JSON.parse(JSON.stringify(originalData));
            dumyReportByUnitData.completionDate.draft1st=dates.draft1st;
            dumyReportByUnitData.completionDate.draft2nd=dates.draft2nd;
            set(()=>({reportByUnitData:dumyReportByUnitData}))
        },
        // set rubric tooltips
        setRubricTooltips: (data) => {
            let dumyReport:{
                barChar: TBarchartDatas;
                doughnutChart: TAllDoughnutDatas;
                avrage: TPrintReportDoughnutData;
            } = JSON.parse(JSON.stringify(get().report));
            const dumyDoughnutChartData = dumyReport.doughnutChart;
            for (let i = 0; i < dumyDoughnutChartData.length; i++) {
                const currentTarget = dumyDoughnutChartData[i];
                for (let j =0; j < data.length; j++) {
                    const getCurrentData = data[j];
                    if (getCurrentData.category === currentTarget.target) {

                    }
                }

            }
        },
        // set report by unit API data
        setReportAPIData: (data, rubric)=>{
            let dumyReport:{
                barChar: TBarchartDatas;
                doughnutChart: TAllDoughnutDatas;
                avrage: TPrintReportDoughnutData;
            } = JSON.parse(JSON.stringify(get().report))
            console.log(' === setReportAPIData ===')
            console.log(' data=',rubric)
            const dumyDoughnutChart = dumyReport.doughnutChart;
            const rubrics = data.rubric.categories;
            const findRubric = (score:number, category:string) => {
                for (let i = 0; i < rubric.rubric_description.length; i++) {
                    if (rubric.rubric_description[i].category === category) {
                        if (score === 10) {
                            return {
                                title: 'Excellent',
                                content: rubric.rubric_description[i].excellent
                            }
                        } else if (score === 8) {
                            return {
                                title: 'Very Good',
                                content: rubric.rubric_description[i].very_good
                            }
                        } else if (score === 6) {
                            return {
                                title: 'Good',
                                content: rubric.rubric_description[i].good
                            }
                        } else if (score === 4) {
                            return {
                                title: 'Fair',
                                content: rubric.rubric_description[i].fair
                            }
                        } else if (score === 2) {
                            return {
                                title: 'Poor',
                                content: rubric.rubric_description[i].poor
                            }
                        } else {
                            return {
                                title: '',
                                content: ''
                            }
                        }
                    }
                }
            }
            for (let i =0; i < dumyDoughnutChart.length; i++) {
                const targetName = dumyDoughnutChart[i].target;
                for (let j = 0; j < rubrics.length; j++) {
                    const currentRubric = rubrics[j];
                    console.log('currentRubric =',currentRubric)
                    if (currentRubric.category === targetName) {
                        const score = currentRubric.score*10;
                        dumyReport.doughnutChart[i].data[0].value = score;
                        const findCategory = findRubric(currentRubric.score, targetName);
                        if (findCategory) {
                            dumyReport.doughnutChart[i].data[0].tooltip.title = findCategory.title;
                            dumyReport.doughnutChart[i].data[0].tooltip.content = findCategory.content;
                        }
                        break;
                    }
                }
            }
            console.log('after data =',dumyReport)
            const average = ((data.rubric.overall_score*10)/6).toFixed(1)
            dumyReport.avrage.data[0].value = parseFloat(average);

            set(()=>({reportByUnitAPIData:data, report: dumyReport}))
        }
    },

    reportByUnitData : {
        currentUnitInfo: {
            unit_index: 0,
            unit_topic: ''
        },
        wordCountSummary: {
            title:'word count summary',
            draft_1st:[
                {label: 'word', value: 0},
                {label: 'sentences', value: 0},
                {label: 'words per sentence', value: 0},
            ],
            draft_2nd:[
                {label: 'word', value: 0},
                {label: 'sentences', value: 0},
                {label: 'words per sentence', value: 0},
            ],
        },
        correctionSummary: {
            title: 'correction summary',
            correction: [
                {
                    reason: 'grammar',
                    sentence_count: 0,
                    list: [],
                },
                {
                    reason: 'spelling',
                    sentence_count: 0,
                    list: []
                },
                {
                    reason: 'punctuation',
                    sentence_count: 0,
                    list: []
                }
            ]
        },
        // teacherComments div
        teacherComment: {
            draft1st: '',
            draft2nd: ''
        },
        // completion dates
        completionDate: {
            draft1st: '',
            draft2nd:'',
        }
    },

    reportByUnitAPIData: {
        is_completed: false,
        word_counts: [],
        grammar_correction: {
            grammar:{sentences:[],sentences_count:0, corrections_count:0},
            punctuation: {sentences:[],sentences_count:0, corrections_count:0},
            spelling: {sentences:[],sentences_count:0, corrections_count:0},
        },
        teacher_comments: [],
        rubric: { overall_score:0, categories:[]},
        completion_date: [],
        portfolio: []
    },
    currentSelectCodes: {
        campus: { name:'', code: ''},
        class: { name:'', code: ''},
        level: { name:'', code: ''},
    },
    setCurrentSelectCodes: (data) => {
        let getData:TCurrentSelectCodes = JSON.parse(JSON.stringify(get().currentSelectCodes));
        if (data.target==='campus') {
            getData.campus.code=data.code;
            getData.campus.name=data.name;
        } else if (data.target==='class') {
            getData.class.code=data.code;
            getData.class.name=data.name;
        } else if (data.target==='level') {
            getData.level.code=data.code;
            getData.level.name=data.name;
        }
        set(()=>({
            currentSelectCodes: getData
        }))
    },
    overallReportByStu: {
        units: []
    },
    setOverallReportByStu: (data) => {
        const allDataSortByUnit = data.units;
        const categoriesString = [ 'ideas', 'organization', 'voice', 'word choice', 'sentence fluency', 'conventions' ]
        let dumyData:TOverallBarChartData[] = Array.from({length:6}, (v,i)=>{
            return {
                name: categoriesString[i], unit1:0, unit2:0, unit3:0, unit4:0, unit5:0, amt: 10
            }
        });
        let dumyOverallDoughnutChartData:TAllDoughnutDatas= JSON.parse(JSON.stringify(get().overallDoughnutChartData));
        dumyOverallDoughnutChartData = dumyOverallDoughnutChartData.sort((a,b) => {
            return categoriesString.indexOf(a.target) - categoriesString.indexOf(b.target)
        })
        dumyOverallDoughnutChartData = dumyOverallDoughnutChartData.map((item) => {
            item.data[0].value = 0;
            return item;
        });
        
        // for loop by categories
        for (let i = 0; i < dumyData.length; i++) {
            const currentDumy = dumyData[i];
            const currentCategoryName = currentDumy.name;
            // find category items by unit
            for (let j = 0; j < allDataSortByUnit.length; j++) {
                const findUnitData = allDataSortByUnit[j];
                const unitIdx = findUnitData.unit_index;
                // find category
                for (let z =0; z < findUnitData.categories.length; z++) {
                    const findCategory = findUnitData.categories[z];
                    if (findCategory.category === currentCategoryName) {
                        if (findCategory.category === dumyOverallDoughnutChartData[i].target) {
                            dumyOverallDoughnutChartData[i].data[0].value+= findCategory.score;
                        };

                        if (unitIdx===1) {
                            dumyData[i].unit1 = findCategory.score;
                            break;
                        } else if (unitIdx === 2) {
                            dumyData[i].unit2 = findCategory.score;
                            break;
                        } else if (unitIdx === 3) {
                            dumyData[i].unit3 = findCategory.score;
                            break;
                        } else if (unitIdx === 4) {
                            dumyData[i].unit4 = findCategory.score;
                            break;
                        } else if (unitIdx === 5) {
                            dumyData[i].unit5 = findCategory.score;
                            break;
                        }
                    }
                };
            }
        }
        const finishUnitCount = data.units.length;
        // average calc
        for (let acIdx = 0; acIdx < dumyOverallDoughnutChartData.length; acIdx++ ) {
            const currentTargetScoreAll = dumyOverallDoughnutChartData[acIdx].data[0].value;
            const maxScore = finishUnitCount*10;
            const sumAvrFix = (currentTargetScoreAll / maxScore * 100).toFixed(0);
            dumyOverallDoughnutChartData[acIdx].data[0].value = parseFloat(sumAvrFix);
        }
        // console.log('dumyDatas ==',dumyData)
        // console.log('overall pie data ===',dumyOverallDoughnutChartData)
        set(()=>({overallReportByStu:data, overallBarChartData:dumyData, overallDoughnutChartData: dumyOverallDoughnutChartData}))
    },
    overallBarChartData: [],
    overallDoughnutChartData: [
        {
            target: 'conventions',
            data: [
                {
                    name: 'conventions',
                    value: 0,
                    selectName: '',
                    fillColor: '#db5757',
                    fillBorderColor: '#be1f1f',
                    innerLineColor: '',
                    tooltip: {
                        title: 'conventions',
                        content: ''
                    }
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
                    value: 0,
                    selectName: '',
                    fillColor: '#6865cc',
                    fillBorderColor: '#433fa7',
                    innerLineColor: '',
                    tooltip: {
                        title: 'sentence fluency',
                        content: ''
                    }
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
                    value: 0,
                    selectName: '',
                    fillColor: '#30c194',
                    fillBorderColor: '#12986f',
                    innerLineColor: '',
                    tooltip: {
                        title: 'word choice',
                        content: ''
                    }
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
                    value: 0,
                    selectName: '',
                    fillColor: '#aa6bd4',
                    fillBorderColor: '#863fb5',
                    innerLineColor: '',
                    tooltip: {
                        title: 'voice',
                        content: ''
                    }
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
                    value: 0,
                    selectName: '',
                    fillColor: '#f6914d',
                    fillBorderColor: '#ee711e',
                    innerLineColor: '',
                    tooltip: {
                        title: 'organization',
                        content: ''
                    }
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
                    value: 0,
                    selectName: '',
                    fillColor: '#588ee1',
                    fillBorderColor: '#1f61c8',
                    innerLineColor: '#f5f8fd',
                    tooltip: {
                        title: 'ideas',
                        content: ''
                    }
                }
            ],
            addWidth: 10,
            fitText: 14,
            toolLineColor: '#1f61c8'
        },
    ],
    isModalOpen: '',
    setIsModalOpen: (target) => {
        set(()=>({isModalOpen: target}))
    }
}))

export default useReportStore;