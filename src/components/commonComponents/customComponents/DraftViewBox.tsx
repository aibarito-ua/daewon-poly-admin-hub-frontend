import React from 'react';
import RubricEvaluationRowRadioButton from './RubricEvaluationRowRadioButton';

// status 2 title
const draftTitle = (props:{feedbackDataInStudent:TFeedbackStates}) => {
    const {feedbackDataInStudent} = props;
    // target data set
    let titleData:TFindDraftInfoByDraftIdDraftOutline[] = [];
    for (let orderIdx = 0; orderIdx < feedbackDataInStudent.draft_data.draft_outline.length; orderIdx++) {
        const outlineData = feedbackDataInStudent.draft_data.draft_outline[orderIdx];
        if (outlineData.name === 'Title') {
            titleData.push(outlineData)
        }
    }
    if (titleData.length > 0) {
        const grammarJSONData = titleData[0].grammar_correction_content_teacher;
        const grammarData:TGrammarCorrectionContentData[][][][] = JSON.parse(grammarJSONData);
        // console.log('grammarData =',JSON.parse(feedbackDataInStudent.draft_data.draft_outline[1].grammar_correction_content_teacher))
        return grammarData.map(( paragraghItem, paragraghIndex) => {
            // console.log('paragraghItem = ',paragraghItem)
            return <div className='draft-title-paragragh-wrap' id={'Title'}>{paragraghItem.map((sentenceItem, sentenceIndex) => {
                // console.log('sentenceItem = ',sentenceItem)
                return sentenceItem.map((wordItem, wordIndex) => {
                    let returnValue:JSX.Element;
                    // console.log('wordItem = ',wordItem)
                    const wordItemLength = wordItem.length;
                    if (wordItemLength === 1) {
                        const compareWordFlag = wordItem[0].type;
                        const mainTagKey = 'title-'+wordItem[0].key;
                        const currentWord = wordItem[0].word;
                        const reasons = wordItem[0].correction_reason;
                        if (compareWordFlag === 1) {
                            returnValue = <span key={mainTagKey} className='update-words'><span 
                                className='text-[#00be91]'
                            >{currentWord}</span></span>
                        } else if (compareWordFlag === -1) {
                            returnValue = <span key={mainTagKey} className='update-words'><span 
                                className='text-[#eb3a3a]'
                            >{currentWord}</span></span>
                        } else {
                            // type 0
                            returnValue = <span className='update-words' style={{color:'#222'}} key={mainTagKey}>{currentWord}</span>
                        }
                    } else {
                        // delete and add word set
                        let mainTagKey = 'title-';
                        let addKey = '';
                        let addWord = '';
                        
                        let deleteKey = '';
                        let deleteWord = '';

                        let emptyKey = '';

                        // 0 -> 1, -1 -> 2
                        // 1, -1, 2 view
                        for (let innerWordIndex = 0; innerWordIndex < wordItemLength; innerWordIndex++) {
                            const targetInnerWordItem = wordItem[innerWordIndex];
                            if (targetInnerWordItem.type === 1) {
                                addKey = targetInnerWordItem.key;
                                mainTagKey += addKey
                                addWord = targetInnerWordItem.word;
                            } else if (targetInnerWordItem.type === -1) {
                                deleteKey = targetInnerWordItem.key;
                                mainTagKey += deleteKey
                                deleteWord = targetInnerWordItem.word;
                            } else {
                                // type 0
                                mainTagKey += targetInnerWordItem.key;
                                emptyKey=targetInnerWordItem.key;
                            }
                            if (innerWordIndex === (wordItemLength-1)) break;
                        } // end for word item
                        
                        returnValue = <span key={mainTagKey} className='update-words'>
                            <span className='text-[#eb3a3a] line-through h-fit'>{deleteWord}</span>
                            {' '}
                            <span className='text-[#00be91]'>{addWord}</span>
                        </span>
                    }
                    return returnValue;
                })
            })}</div>
        })
    } else return <></>
}
// status 2 body
const draftBody = (props:{feedbackDataInStudent:TFeedbackStates}) => {
    const {feedbackDataInStudent} = props;
    console.log('props ==',feedbackDataInStudent)
    // target data set
    const originOutlineData = feedbackDataInStudent.draft_data.draft_outline
    // let bodyData:TBodyGrammarCorrectionJSONData[] = []
    // for (let orderIndex = 0; orderIndex < originOutlineData.length; orderIndex++) {
    //     const outlineData = originOutlineData[orderIndex];
    //     if (outlineData.name !== 'Title') {
    //         const targetJSONString:TBodyGrammarCorrectionJSONData = {
    //             data: JSON.parse(outlineData.grammar_correction_content_teacher),
    //             name: outlineData.name,
    //             order_index: outlineData.order_index
    //         };
    //         bodyData.push(targetJSONString)
    //     }
    // }
    // console.log('body Data ==',bodyData)
    return originOutlineData.map((bodyItem) => {
        // Outline Type이 WO인 경우 input_content는 공백, grammar_correction_content_teacher 빈 값으로 전달되며 표시하지 않도록 예외처리
        if (bodyItem.input_content.trim().length === 0 && bodyItem.grammar_correction_content_teacher.length === 0) return <></>;
        
        const data:TGrammarCorrectionContentData[][][][] = JSON.parse(bodyItem.grammar_correction_content_teacher);
        const name = bodyItem.name;
        const order_index = bodyItem.order_index;
        if (name !== 'Title') {
            return data.map((paragraghItem, paragraghIndex) => {
                const paragraghKey = bodyItem.name+bodyItem.order_index+paragraghIndex;
                // console.log('paragraghItem =',bodyItem)
    
                return <div className='flow-root justify-start draft-1-body-paragragh' id={bodyItem.name} key={paragraghKey}>
                {paragraghItem.map((sentenceItem, sentenceIndex) => {
                    const sentenceKey = paragraghKey+'-'+sentenceIndex
                    // console.log('sentence item =',sentenceItem)
                    return sentenceItem.map((wordItem, wordIndex) => {
                        let returnValue:JSX.Element;
                        // console.log('wordItem = ',wordItem)
                        const wordItemLength = wordItem.length;
                        if (wordItemLength === 1) {
                            const compareWordFlag = wordItem[0].type;
                            const mainTagKey = 'body-'+paragraghIndex+wordItem[0].key;
                            const currentWord = wordItem[0].word;
                            // console.log('currentWord =',wordItem[0])
                            const reasons = wordItem[0].correction_reason;
                            if (compareWordFlag === 1) {
                                returnValue = <span key={mainTagKey} 
                                    className='text-[#00be91] draft-body-select-area-check-span'
                                >{currentWord}</span>
                            } else if (compareWordFlag === -1) {
                                returnValue = <span key={mainTagKey}
                                    className='text-[#eb3a3a] line-through draft-body-select-area-check-span'
                                >{currentWord}</span>
                            } else {
                                // type 0
                                if (currentWord === '\n') {
                                    returnValue = <span className='h-fit draft-body-select-area-check-span text-[#222] whitespace-pre-wrap' key={mainTagKey}>{'\n'}</span>
                                } else {
                                    returnValue = <span className='h-fit draft-body-select-area-check-span text-[#222]' key={mainTagKey}>{currentWord}</span>
                                }
                            }
                        } else {
                            // delete and add word set
                            let mainTagKey = 'body-'+paragraghIndex;
                            let addKey = '';
                            let addWord = '';
                            
                            let deleteKey = '';
                            let deleteWord = '';
    
                            let emptyKey = '';
    
                            // 0 -> 1, -1 -> 2
                            // 1, -1, 2 view
                            for (let innerWordIndex = 0; innerWordIndex < wordItemLength; innerWordIndex++) {
                                const targetInnerWordItem = wordItem[innerWordIndex];
                                if (targetInnerWordItem.type === 1) {
                                    addKey = targetInnerWordItem.key;
                                    mainTagKey += addKey
                                    addWord = targetInnerWordItem.word;
                                } else if (targetInnerWordItem.type === -1) {
                                    deleteKey = targetInnerWordItem.key;
                                    mainTagKey += deleteKey
                                    deleteWord = targetInnerWordItem.word;
                                } else {
                                    // type 0
                                    mainTagKey += targetInnerWordItem.key;
                                    emptyKey=targetInnerWordItem.key;
                                }
                                if (innerWordIndex === (wordItemLength-1)) break;
                            } // end for word item
                            // console.log('add word =',addWord)
                            // console.log('delete word =',deleteWord)
                            returnValue = <span key={mainTagKey} >
                                <span className='text-[#eb3a3a] line-through draft-body-select-area-check-span'>{deleteWord}</span>
                                {' '}
                                <span className='text-[#00be91] draft-body-select-area-check-span'>{addWord}</span>
                            </span>
                        }
                        return returnValue;
                    })
                })}</div>
    
            })

        } else {
            return <></>
        }
    })
}

// status 3 title
const loadTemporaryDraftTitle = (
    props: {
        feedbackDataInStudent:TFeedbackStates,
        setCommentFocusId:(value: React.SetStateAction<string>) => void
    }
) => {
    const {feedbackDataInStudent, setCommentFocusId} = props;
    const draftOutline = feedbackDataInStudent.draft_data.draft_outline;
    const comments = feedbackDataInStudent.draft_data.comment;
    console.log('title comments =',comments);
    const findCommentByCommentIndex = (comment_index:number) => {
        for (let i =0; i<comments.length; i++) {
            if (comments[i].comment_index === comment_index) {
                const commentData = comments[i];
                return commentData;
            }
        }
        const emptyReturn:TCommentData = {
            comment: '',
            comment_className: '',
            comment_index: -1,
            end_index:-1,
            start_index:-1,
            paragraph_name:'',
            target_text: ''
        }
        return emptyReturn;
    }
    return draftOutline.map((paragraphItem, paragraphIndex) => {
        const paragraphKey = 'title'+paragraphItem.order_index+paragraphIndex;
        const screenData = paragraphItem.screen_data;
        let commentIdx = -1;
        if (paragraphIndex!==0) {
            return null;
        } else {
            let returnValue:JSX.Element[]=[];
            const jsxElements:JSX.Element[]=[];
            screenData.map((wordItem, wordIndex) => {
                // comment check
                const currentCommentIdx = wordItem.comment_index;
                const currentType = wordItem.type;
                const mainTagKey = `title-`+wordIndex+'-'+currentType;
                // const bf_item = wordIndex>0?screenData[wordIndex-1]:null;
                const af_item = wordIndex<screenData.length?screenData[wordIndex+1]:null;
                // 'update-words'
                if (currentType === -1) {
                    const jsxTag=<span key={mainTagKey} className='update-words'>
                        <span className='text-[#eb3a3a] line-through h-fit'>{wordItem.text}</span></span>
                    returnValue.push(jsxTag);
                    
                } else if (currentType === 1) {
                    const jsxTag = <span key={mainTagKey} className='update-words'>
                        <span className='text-[#00be91]'>{wordItem.text}</span></span>
                    returnValue.push(jsxTag);
                } else {
                    // type 0
                    const jsxTag=<span className='update-words' style={{color:'#222'}} key={mainTagKey}>{wordItem.text}</span>
                    returnValue.push(jsxTag);
                }
                // comment check
                if (af_item?.comment_index !== currentCommentIdx) {
                    if (currentCommentIdx===-1) {
                        jsxElements.push(...returnValue)
                        returnValue=[];
                    } else {
                        const currentCommentItem = findCommentByCommentIndex(currentCommentIdx);
                        const createSpan = <span className={currentCommentItem.comment_className}
                        id={currentCommentItem.comment_className}
                        key={currentCommentItem.comment_className}
                        style={{
                            backgroundColor:'yellow',
                            userSelect:'none',
                            height: 'fit-content',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e)=>{
                            e.currentTarget.style.cursor='pointer';
                            e.currentTarget.style.border = '2px solid #f1b02e';
                            setCommentFocusId(currentCommentItem.comment_className);
                        }}
                        onMouseOut={(e)=>{
                            e.currentTarget.style.border = '';
                            setCommentFocusId('');
                        }}
                        >{returnValue}</span>;
                        jsxElements.push(createSpan);
                        returnValue=[];
                    }
                }
            });

            return <div className='draft-title-paragragh-wrap'
            id={'Title'} key={paragraphKey}
            >
            {jsxElements}
            </div>
        }
    })
}

// status 3 body
const loadTemporaryDraftBody = (
    props: {
        feedbackDataInStudent:TFeedbackStates,
        setCommentFocusId:(value: React.SetStateAction<string>) => void
    }
) => {
    const {feedbackDataInStudent, setCommentFocusId} = props;
    const draftOutline = feedbackDataInStudent.draft_data.draft_outline;
    const comments = feedbackDataInStudent.draft_data.comment;
    console.log('comments =',comments)
    const findCommentByCommentIndex = (comment_index:number) => {
        for (let i =0; i<comments.length; i++) {
            if (comments[i].comment_index === comment_index) {
                const commentData = comments[i];
                return commentData;
            }
        }
        const emptyReturn:TCommentData = {
            comment: '',
            comment_className: '',
            comment_index: -1,
            end_index:-1,
            start_index:-1,
            paragraph_name:'',
            target_text: ''
        }
        return emptyReturn;
    }
    console.log(draftOutline)
    return draftOutline.map((paragraphItem, paragraphIndex) => {
        const paragraphKey = paragraphItem.name+paragraphItem.order_index+paragraphIndex;
        const screenData = paragraphItem.screen_data;
        let commentIdx = -1;
        if (paragraphIndex===0) {
            return null;
        } else {
            let returnValue:JSX.Element[]=[];
            
            const jsxElements:JSX.Element[] = []
            screenData.map((wordItem, wordIndex) => {
                // comment check
                const currentCommentIdx = wordItem.comment_index;
                const currentType = wordItem.type;
                const mainTagKey = 'body-'+paragraphIndex+wordIndex+'-'+wordItem.type;
                // const bf_item = wordIndex>0?screenData[wordIndex-1]: null;
                const af_item = wordIndex<screenData.length? screenData[wordIndex+1]:null;
                // make value => cover span tag
                // make word value
                // check new line 
                // const isHaveNewline = wordItem.text.match(/\n{1,}/gm).length > 0 ? 'whitespace-pre-wrap':'';
                // console.log('isHaveNewline =',isHaveNewline)
                // type check
                if (currentType === -1) {
                    const jsxTag = <span key={mainTagKey} className='text-[#eb3a3a] line-through draft-body-select-area-check-span'>{wordItem.text}</span>;
                    returnValue.push(jsxTag);
                    
                } else if (currentType === 1) {
                    const jsxTag=<span key={mainTagKey} className='text-[#00be91] draft-body-select-area-check-span'>{wordItem.text}</span>;
                    returnValue.push(jsxTag);
                } else {
                    // type 0
                    const jsxTag=<span key={mainTagKey} className='h-fit draft-body-select-area-check-span text-[#222]'>{wordItem.text}</span>;
                    returnValue.push(jsxTag);
                }
                // comment check
                if (af_item?.comment_index!==currentCommentIdx) {
                    if (currentCommentIdx===-1) {
                        jsxElements.push(...returnValue);
                        returnValue=[]
                    } else {
                        const currentCommentItem = findCommentByCommentIndex(currentCommentIdx);
                        const createSpan = <span className={currentCommentItem.comment_className}
                        id={currentCommentItem.comment_className}
                        key={currentCommentItem.comment_className}
                        style={{
                            backgroundColor:'yellow',
                            userSelect:'none',
                            height: 'fit-content',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e)=>{
                            e.currentTarget.style.cursor='pointer';
                            e.currentTarget.style.border = '2px solid #f1b02e';
                            setCommentFocusId(currentCommentItem.comment_className);
                        }}
                        onMouseOut={(e)=>{
                            e.currentTarget.style.border = '';
                            setCommentFocusId('');
                        }}
                        >{returnValue}</span>;
                        jsxElements.push(createSpan);
                        returnValue=[];
                    }
                } else {}// else 경우는 다음 턴에서 푸쉬
            })
            return <div className='flow-root justify-start draft-1-body-paragragh whitespace-pre-wrap'
            id={paragraphItem.name} key={paragraphKey}
            >
            {jsxElements}
            </div>
        }
    })
}

// final draft title
const loadFinalDraftTitle = (
    props: {
        feedbackDataInStudent:TFindDraftInfoByDraftIdDraftOutline[];
        draft:string;
    }
) => {
    const {feedbackDataInStudent,draft} = props;
    // const draftOutline = draft==='1'? feedbackDataInStudent.draft_data.draft_outline: feedbackDataInStudent.draft_2nd_data?.draft_outline;
    const draftKey = draft==='1' ? 'dr1':'dr2'
    
    return feedbackDataInStudent.map((paragraphItem, paragraphIndex) => {
        const paragraphKey = 'final-title-'+draftKey+'-'+paragraphItem.order_index+paragraphIndex;
        const screenData = paragraphItem.screen_data;
        if (paragraphIndex!==0) {
            return null;
        } else {
            const mainTagKey = 'final-body-'+draft+'-'+paragraphIndex+'-normal';
            const makeValue = <span key={mainTagKey} className='h-fit'>{paragraphItem.input_content}</span>;
            const wraper = <div className='flow-root'
            >{makeValue}</div>

            return <div className='draft-title-paragragh-wrap'
            id={'Title'} key={paragraphKey}
            >{wraper}
            </div>
        }
    })
}

// final draft body
const loadFinalDraftBody = (
    props: {
        feedbackDataInStudent:TFindDraftInfoByDraftIdDraftOutline[],
        draft:string
    }
) => {
    const {feedbackDataInStudent, draft} = props;
    if (draft==='1') {
        return feedbackDataInStudent.map((paragraphItem, paragraphIndex) => {
            const paragraphKey = 'final-body-d'+draft+'-'+paragraphItem.name+'-'+paragraphItem.order_index+'-'+paragraphIndex;
            const screenData = paragraphItem.screen_data;
            if (paragraphIndex===0) {
                return null;
            } else {
                const jsxElements:JSX.Element[] = [];
                const inputContents = paragraphItem.input_content.split('\n\n');
                inputContents.map((sentenceItem, sentenceIndex) => {
                    const mainTagKey = 'final-body-'+draft+'-'+paragraphIndex+sentenceIndex+'-normal';
                    const makeValue = <span key={mainTagKey} className='h-fit'>{sentenceItem}</span>;
                    const wraper = <div className='flow-root'
                    ><span className='whitespace-pre-wrap'>{makeValue}</span></div>
                    jsxElements.push(wraper)
                })
                return <div className='flex flex-col max-h-fit whitespace-pre-wrap gap-[13px]' key={paragraphKey}>{jsxElements}</div>
            }
        })
    } else if (draft==='2') {
        return feedbackDataInStudent.map((paragraphItem, paragraphIndex) => {
            const paragraphKey = 'final-body-d'+draft+'-'+paragraphItem.name+'-'+paragraphItem.order_index+'-'+paragraphIndex;
            if (paragraphIndex===0) {
                return null;
            } else {
                const jsxElements:JSX.Element[] = [];
                const inputContents = paragraphItem.input_content.split('\n\n');
                inputContents.map((sentenceItem, sentenceIndex) => {
                    const mainTagKey = 'final-body-'+draft+'-'+paragraphIndex+sentenceIndex+'-normal';
                    const makeValue = <span key={mainTagKey} className='h-fit'>{sentenceItem}</span>;
                    const wraper = <div className='flow-root'
                    ><span className='whitespace-pre-wrap'>{makeValue}</span></div>
                    jsxElements.push(wraper)
                })
                return <div className='flex flex-col gap-[13px] max-h-fit whitespace-pre-wrap' key={paragraphKey}>{jsxElements}</div>
            }
        })
    }
}

// rubric evaluation
const rubricEvaluation = (
    props: {
        rubricData: TActivitySparkWritingBookRubricItem;
        rubricReportValue:TRubricReportAll;
        controlValue: string[];
        controlFn: (idx: number, value: string) => void;
        draftStatus: number;
    }
) => {
    const {rubricData,rubricReportValue, controlFn, controlValue, draftStatus} = props;
    const rubricTitles = ['ideas','organization','voice','word choice', 'sentence fluency','conventions'];
    const rubricColors = [
        { name: 'ideas', main: '#588ee1', inner: '#f5f8fd' },
        { name: 'organization', main: '#f6914d', inner: '#fef8f5' },
        { name: 'voice', main: '#aa6bd4', inner: '#faf6fc' },
        { name: 'word choice', main: '#30c194', inner: '#f3fbf9' },
        { name: 'sentence fluency', main: '#6865cc', inner: '#f6f6fc' },
        { name: 'conventions', main: '#db5757', inner: '#fdf5f5' },
    ]
    const rubricAll = rubricData.rubric_description.sort((a,b) => {
        return rubricTitles.indexOf(a.category) - rubricTitles.indexOf(b.category);
    });
    return rubricAll.map((rubric, rubricIndex) => {
        const rubricKey = 'rubric-'+rubric.category+'-i-'+rubricIndex;
        let rubricColor:{name:string,main:string,inner:string}={inner:'',main:'',name:''};
        for (let colorIdx = 0; colorIdx < rubricColors.length; colorIdx++) {
            const currentColor = rubricColors[colorIdx];
            if (currentColor.name === rubric.category) {
                rubricColor=currentColor;
            }
        }
        const titleCategory = rubric.category.split(' ');
        let defaultValue = '';
        if (rubricReportValue.length > 0) {
            for (let i = 0; i<rubricReportValue.length; i++) {
                if (rubric.category === rubricReportValue[i].category) {
                    defaultValue=rubricReportValue[i].selected_value;
                }
            }
        }
        
        return <div className='flex flex-col' key={rubricKey}
            style={{
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: rubricColor.main
            }}
        >
            {/* description */}
            <div className='flex flex-row min-h-[95px]' style={{
                borderBottomColor: rubricColor.main,
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px'
            }}>
                <div className={`flex flex-col justify-center items-center capitalize w-full max-w-[120px] rubric-evaluation-font-label`}
                    style={{
                        backgroundColor: rubricColor.main,
                    }}
                >{titleCategory.map((categoryStr,categoryStrIdx) => {
                    const titleCategoryKey = 'rubric-evaluation-preview-box-category-'+categoryStrIdx;
                    return <div key={titleCategoryKey}>{categoryStr}</div>
                })}</div>
                <div className='flex flex-col flex-1 p-[15px] rubric-evaluation-font-description' style={{
                            backgroundColor: rubricColor.inner,
                        }}>
                    {rubric.explanation.map((rubricEx, rubricExIndex) => {
                        const rubricExkey = 'rubric-explanation-'+rubricExIndex;
                        return <p key={rubricExkey}>{ '- '+rubricEx}</p>
                    })}
                </div>
            </div>
            {/* score */}
            <div className='flex flex-row h-[70px] items-center'>
                <RubricEvaluationRowRadioButton 
                    data={rubric} defaultSelectValue={defaultValue}
                    controlFn={controlFn}
                    controlValue={controlValue}
                    categoryIdx={rubricIndex}
                    status={draftStatus}
                />
            </div>
        </div>
    })

}

const draftViewBox = {
    draftTitle,
    draftBody,
    loadTemporaryDraftTitle,
    loadTemporaryDraftBody,
    loadFinalDraftTitle,
    loadFinalDraftBody,
    rubricEvaluation
}
export default draftViewBox;