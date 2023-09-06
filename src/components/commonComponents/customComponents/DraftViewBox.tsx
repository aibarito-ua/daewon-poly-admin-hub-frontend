import React from 'react';

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
                            returnValue = <span className='update-words' key={mainTagKey}>{currentWord}</span>
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
    // console.log('props ==',feedbackDataInStudent)
    // target data set
    let bodyData:TBodyGrammarCorrectionJSONData[] = [];
    const originOutlineData = feedbackDataInStudent.draft_data.draft_outline
    for (let orderIndex = 0; orderIndex < originOutlineData.length; orderIndex++) {
        const outlineData = originOutlineData[orderIndex];
        if (outlineData.name !== 'Title') {
            const targetJSONString:TBodyGrammarCorrectionJSONData = {
                data: JSON.parse(outlineData.grammar_correction_content_teacher),
                name: outlineData.name,
                order_index: outlineData.order_index
            };
            bodyData.push(targetJSONString)
        }
    }
    // console.log('body Data ==',bodyData)
    if (bodyData.length > 0) {
        return bodyData.map((bodyItem, bodyIndex) => {
                return bodyItem.data.map((paragraghItem, paragraghIndex) => {
                    const paragraghKey = bodyItem.name+bodyItem.order_index+paragraghIndex;
                    // console.log('paragraghItem =',bodyItem)

                    return <div className='flow-root justify-start draft-1-body-paragragh' id={bodyItem.name} key={paragraghKey}><span className='pl-[10px]'/>
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
                                        className='text-[#00be91]'
                                    >{currentWord}</span>
                                } else if (compareWordFlag === -1) {
                                    returnValue = <span key={mainTagKey}
                                        className='text-[#eb3a3a]'
                                    >{currentWord}</span>
                                } else {
                                    // type 0
                                    returnValue = <span className='h-fit' key={mainTagKey}>{currentWord}</span>
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
                                    <span className='text-[#eb3a3a] line-through'>{deleteWord}</span>
                                    {' '}
                                    <span className='text-[#00be91]'>{addWord}</span>
                                </span>
                            }
                            return returnValue;
                        })
                    })}</div>
    
                })

            })
            

    } else return <></>
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
                const bf_item = wordIndex>0?screenData[wordIndex-1]:null;
                const af_item = wordIndex<screenData.length?screenData[wordIndex+1]:null;
                // 'update-words'
                if (commentIdx === currentCommentIdx) {

                    if (currentCommentIdx!==-1) {
                        // type check
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
                            const jsxTag=<span className='update-words' key={mainTagKey}>{wordItem.text}</span>
                            returnValue.push(jsxTag);
                        }
                        if (af_item?.comment_index !== currentCommentIdx) {
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
                    } else {
                        // type check
                        if (currentType === -1) {
                            const jsxTag=<span key={mainTagKey} className='update-words'>
                                <span className='text-[#eb3a3a] line-through h-fit'>{wordItem.text}</span></span>
                            jsxElements.push(jsxTag);
                        } else if (currentType === 1) {
                            const jsxTag = <span key={mainTagKey} className='update-words'>
                                <span className='text-[#00be91]'>{wordItem.text}</span></span>
                            jsxElements.push(jsxTag);
                        } else {
                            // type 0
                            const jsxTag=<span className='update-words' key={mainTagKey}>{wordItem.text}</span>
                            jsxElements.push(jsxTag);
                        }
                    }
                } else {
                    commentIdx = currentCommentIdx;
                    // type check
                    if (currentType === -1) {
                        const jsxTag=<span key={mainTagKey} className='update-words'>
                            <span className='text-[#eb3a3a] line-through h-fit'>{wordItem.text}</span></span>
                        jsxElements.push(jsxTag);
                    } else if (currentType === 1) {
                        const jsxTag = <span key={mainTagKey} className='update-words'>
                            <span className='text-[#00be91]'>{wordItem.text}</span></span>
                        jsxElements.push(jsxTag);
                    } else {
                        // type 0
                        const jsxTag=<span className='update-words' key={mainTagKey}>{wordItem.text}</span>
                        jsxElements.push(jsxTag);
                    }
                }
            });

            return <div className='draft-title-paragragh-wrap'
            id={'Title'} key={paragraphKey}
            ><span className='pl-[10px]'/>
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
                const bf_item = wordIndex>0?screenData[wordIndex-1]: null;
                const af_item = wordIndex<screenData.length? screenData[wordIndex+1]:null;

                if (commentIdx === currentCommentIdx) {
                    
                    if (currentCommentIdx!==-1) {
                        // type check
                        if (currentType === -1) {
                            const jsxTag = <span key={mainTagKey} className='text-[#eb3a3a]'>{wordItem.text}</span>;
                            returnValue.push(jsxTag);
                            
                        } else if (currentType === 1) {
                            const jsxTag=<span key={mainTagKey} className='text-[#00be91]'>{wordItem.text}</span>;
                            returnValue.push(jsxTag);
                        } else {
                            // type 0
                            const jsxTag=<span key={mainTagKey} className='h-fit'>{wordItem.text}</span>;
                            returnValue.push(jsxTag);
                        }
                        if (af_item?.comment_index !== currentCommentIdx) {
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
                    } else {
                        // type check
                        if (currentType === -1) {
                            const jsxTag = <span key={mainTagKey} className='text-[#eb3a3a]'>{wordItem.text}</span>;
                            jsxElements.push(jsxTag);
                        } else if (currentType === 1) {
                            const jsxTag=<span key={mainTagKey} className='text-[#00be91]'>{wordItem.text}</span>;
                            jsxElements.push(jsxTag);
                        } else {
                            // type 0
                            const jsxTag=<span key={mainTagKey} className='h-fit'>{wordItem.text}</span>;
                            jsxElements.push(jsxTag);
                        }

                    }
                } else {
                    commentIdx = currentCommentIdx;
                    // type check
                    if (currentType === -1) {
                        const jsxTag = <span key={mainTagKey} className='text-[#eb3a3a]'>{wordItem.text}</span>;
                        jsxElements.push(jsxTag);
                        
                    } else if (currentType === 1) {
                        const jsxTag=<span key={mainTagKey} className='text-[#00be91]'>{wordItem.text}</span>;
                        jsxElements.push(jsxTag);
                    } else {
                        // type 0
                        const jsxTag=<span key={mainTagKey} className='h-fit'>{wordItem.text}</span>;
                        jsxElements.push(jsxTag);
                    }

                }
                // jsxElements.push(returnValue);
            })
            return <div className='flow-root justify-start draft-1-body-paragragh'
            id={paragraphItem.name} key={paragraphKey}
            ><span className='pl-[10px]'/>
            {jsxElements}
            </div>
        }
    })
}

const draftViewBox = {
    draftTitle,
    draftBody,
    loadTemporaryDraftTitle,
    loadTemporaryDraftBody,
}
export default draftViewBox;