import React from 'react';

const ReportWordCountSummaryComponent = (props:{item: TStudentUnitReportRes}) => {
    const {item } = props;
    return (
        <div className='report-chart-righ-word-count-div'>
            <div className='report-chart-righ-word-count-title'>
                <span className='report-chart-righ-word-count-title-span select-none'>{'word count summary'}</span>
            </div>
            <div className='report-chart-righ-word-count-content'>
                {item.word_counts.map((wordCoundItem, wordCountIdx) => {
                    const word_count = wordCoundItem.word_count;
                    const sentence_count = wordCoundItem.sentence_count;
                    const wordPerSentenceStr = (word_count / sentence_count).toFixed(1);
                    
                    return (
                        <div className='report-chart-righ-word-count-content-wrap' key={wordCoundItem.draft_index}>
                            <div className='report-chart-righ-word-count-content-title select-none'>{`${wordCoundItem.draft_index===1 ? '1st draft': '2nd draft'}`}</div>
                            <div className='report-chart-righ-word-count-content-items'>
                                <div className='report-chart-righ-word-count-content-item select-none'>
                                    <span className='report-chart-righ-word-count-content-item-title'>{`- words`}</span>
                                    <span className='report-chart-righ-word-count-content-item-value'>{word_count}</span>
                                </div>
                                <div className='report-chart-righ-word-count-content-item select-none'>
                                    <span className='report-chart-righ-word-count-content-item-title'>{`- sentences`}</span>
                                    <span className='report-chart-righ-word-count-content-item-value'>{sentence_count}</span>
                                </div>
                                <div className='report-chart-righ-word-count-content-item select-none'>
                                    <span className='report-chart-righ-word-count-content-item-title'>{`- words per sentence`}</span>
                                    <span className='report-chart-righ-word-count-content-item-value'>{wordPerSentenceStr}</span>
                                </div>
                            </div>        
                        </div>        
                    )
                })}
            </div>
        </div>
    )
}
const ReportCorrectionSummaryComponent = (
    props: {item: TStudentUnitReportRes}
) => {
    const {item } = props;
    
    const [selectReason, setSelectReason]= React.useState<"grammar" | "spelling" | "punctuation">('grammar'); 
    const SelectUpArrow = (props:React.SVGAttributes<SVGElement>) => {
        return <svg {...props} id="bt_minus" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <rect id="guide" className="cls-1" width="18" height="18" fill='none'/>
        <path id="패스_13442" data-name="패스 13442" className="cls-2" fill="none" 
        stroke='#333' strokeLinecap='round' strokeLinejoin='round'
        d="M0,0,3.088,3.312,6,0" transform="translate(12 10.5) rotate(180)"/>
        </svg>

    }
    const SelectDownArrow = (props:React.SVGAttributes<SVGElement>) => {
        return <svg {...props} id="bt_plus" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <rect id="guide" className="cls-1" width="18" height="18" fill="none"/>
        <path id="패스_13441" className="cls-2" fill="none"
        stroke="#333" strokeLinecap='round' strokeLinejoin='round'
        d="M0,3.312,3.088,0,6,3.312" transform="translate(12 10.812) rotate(180)"/>
        </svg>
    }
    const GrammarSentence = (grammar:TStudentUnitReportResGrammarCorrectionItems) => {
        let correctionDiv:JSX.Element[]=[];
        if ( selectReason === 'grammar') {
            correctionDiv = grammar.sentences.map((sentenceItem, sentenceIndex) => {
                return <div className='flow-root indent-[1rem]'>{sentenceItem.map((wordItem , wordIndex) => {
                    console.log('word ==',wordItem)
                    const key = 'grammar-'+sentenceIndex+'-'+wordIndex+'-'+wordItem.type;
                    if (wordItem.type === 1) {
                        return <span key={key} className='report-chart-correction-content-add-text'>{wordItem.word}</span>
                    } else if (wordItem.type === -1 ) {
                        return <span key={key} className='report-chart-correction-content-delete-text'>{wordItem.word}</span>
                    } else {
                        return <span key={key} className='grammar-tooltip-custom-content-normal-text'>{wordItem.word}</span>
                    }
                })}</div>
            })
        } else {correctionDiv=[]};
        return (
            <div className='report-chart-righ-correction-content-item'
            onClick={()=>{
                setSelectReason('grammar')
            }}
            >
                <div className='flex flex-row select-none'>
                    <span className='report-chart-righ-correction-content-item-title'>{`- grammar`}</span>
                    <span className='report-chart-righ-correction-content-item-arrow'>{ selectReason === 'grammar' ? <SelectUpArrow/>: <SelectDownArrow/>}</span>
                    <span className='report-chart-righ-correction-content-item-value'>{grammar.sentences_count}</span>
                </div>
                <div className={ selectReason === 'grammar' ? 'report-chart-righ-correction-content-wrap-2':'hidden'}>
                    {correctionDiv}
                </div>
            </div>
        )   
    }
    const PuctuationSentence = (punctuation:TStudentUnitReportResGrammarCorrectionItems) => {
        let correctionDiv:JSX.Element[]=[];
        if ( selectReason === 'punctuation') {
            correctionDiv = punctuation.sentences.map((sentenceItem, sentenceIndex) => {
                return <div className='flow-root indent-[1rem]'>{sentenceItem.map((wordItem , wordIndex) => {
                    console.log('word ==',wordItem)
                    const key = 'punctuation-'+sentenceIndex+'-'+wordIndex+'-'+wordItem.type;
                    if (wordItem.type === 1) {
                        return <span key={key} className='report-chart-correction-content-add-text'>{wordItem.word}</span>
                    } else if (wordItem.type === -1 ) {
                        return <span key={key} className='report-chart-correction-content-delete-text'>{wordItem.word}</span>
                    } else {
                        return <span key={key} className='grammar-tooltip-custom-content-normal-text'>{wordItem.word}</span>
                    }
                })}</div>
            })
        } else {correctionDiv=[]};
        return (
            <div className='report-chart-righ-correction-content-item'
            onClick={()=>{
                setSelectReason('punctuation')
            }}
            >
                <div className='flex flex-row select-none'>
                    <span className='report-chart-righ-correction-content-item-title'>{`- punctuation`}</span>
                    <span className='report-chart-righ-correction-content-item-arrow'>{ selectReason === 'punctuation' ? <SelectUpArrow/>: <SelectDownArrow/>}</span>
                    <span className='report-chart-righ-correction-content-item-value'>{punctuation.sentences_count}</span>
                </div>
                <div className={ selectReason === 'punctuation' ? 'report-chart-righ-correction-content-wrap-2':'hidden'}>
                    {correctionDiv}
                </div>
            </div>
        )   
    }
    const SpellingSentence = (punctuation:TStudentUnitReportResGrammarCorrectionItems) => {
        let correctionDiv:JSX.Element[]=[];
        if ( selectReason === 'spelling') {
            correctionDiv = punctuation.sentences.map((sentenceItem, sentenceIndex) => {
                return <div className='flow-root indent-[1rem]'>{sentenceItem.map((wordItem , wordIndex) => {
                    console.log('word ==',wordItem)
                    const key = 'spelling-'+sentenceIndex+'-'+wordIndex+'-'+wordItem.type;
                    if (wordItem.type === 1) {
                        return <span key={key} className='report-chart-correction-content-add-text'>{wordItem.word}</span>
                    } else if (wordItem.type === -1 ) {
                        return <span key={key} className='report-chart-correction-content-delete-text'>{wordItem.word}</span>
                    } else {
                        return <span key={key} className='grammar-tooltip-custom-content-normal-text'>{wordItem.word}</span>
                    }
                })}</div>
            })
        } else {correctionDiv=[]};
        return (
            <div className='report-chart-righ-correction-content-item'
            onClick={()=>{
                setSelectReason('spelling')
            }}
            >
                <div className='flex flex-row select-none'>
                    <span className='report-chart-righ-correction-content-item-title'>{`- spelling`}</span>
                    <span className='report-chart-righ-correction-content-item-arrow'>{ selectReason === 'spelling' ? <SelectUpArrow/>: <SelectDownArrow/>}</span>
                    <span className='report-chart-righ-correction-content-item-value'>{punctuation.sentences_count}</span>
                </div>
                <div className={ selectReason === 'spelling' ? 'report-chart-righ-correction-content-wrap-2':'hidden'}>
                    {correctionDiv}
                </div>
            </div>
        )   
    }

    return (
        <div className='report-chart-righ-word-count-div'>
            <div className='report-chart-righ-word-count-title'>
                <span className='report-chart-righ-word-count-title-span select-none'>{'correction summary'}</span>
            </div>
            <div className='report-chart-righ-correction-content'>

                <div className='report-chart-righ-correction-content-wrap-1'>
                    <div className='report-chart-righ-word-count-content-title select-none'>1st drafts</div>
                    <div className='report-chart-righ-correction-content-items'>
                        {item.grammar_correction.grammar && GrammarSentence(item.grammar_correction.grammar)}
                        {item.grammar_correction.spelling && SpellingSentence(item.grammar_correction.spelling)}
                        {item.grammar_correction.punctuation && PuctuationSentence(item.grammar_correction.punctuation)}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const ReportTeachersComments = (
    props: {
        teacherComments:TStudentUnitReportResTeacherComment[]
    }
) => {
    const {teacherComments}=props;
    return (
        <div className='flex flex-col w-[640px]'>
            <div className='flex flex-row justify-center'>
                <span>{`Teacher's Comments`}</span>
            </div>
            <div className='report-chart-teacher-comment-content-box'>
                {/* <span>{`1st Draft: ${teacherComments[0].draft_index===1? teacherComments[0].comment : teacherComments[1].comment}`}</span> */}
                <span>{`${teacherComments[0].draft_index===2? teacherComments[0].comment : teacherComments[1].comment}`}</span>
            </div>
        </div>
    )
}

const ReportItemComponents = {
    ReportWordCountSummaryComponent,
    ReportCorrectionSummaryComponent,
    ReportTeachersComments
}

export default ReportItemComponents;