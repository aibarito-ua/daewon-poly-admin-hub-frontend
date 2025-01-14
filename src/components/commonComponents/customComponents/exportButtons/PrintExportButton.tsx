import React, { createElement } from 'react';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './PrintComponent';

const PrintExportButton = (props: {
    userInfo:TFeedbackStates;
    title: string;
    body:string;
    draft:number;
}) => {
    const {
        body, title,
        draft, userInfo
    } = props;

    const componentRef = React.useRef(null);

    const divRef = React.useRef<HTMLDivElement>(null);
    const [replaceBody, setReplaceBody] = React.useState<JSX.Element[][]>([]);
    const [isReplace, setIsReplace] = React.useState<boolean>(false);
    const [isMulti, setisMulti] = React.useState<boolean>(false);
    const userFile = `${userInfo.defautInfo.student_code}-${userInfo.defautInfo.student_name.student_name_kr}-${userInfo.defautInfo.student_name.student_name_kr}.pdf`
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        // documentTitle: userFile
    });
    React.useEffect(()=>{

    if (!isReplace) {

        if (divRef.current) {
        const checkRef = divRef.current;
        checkRef.style.display='block';
        // const targetElement = document.getElementById('check-print-body-div');
        const clientHeight = checkRef.clientHeight
        const offsetHeight = checkRef.offsetHeight;
        const scrollHeight = checkRef.scrollHeight;
        // console.log('clientHeight =',clientHeight)
        // console.log('offsetHeight =',offsetHeight)
        // console.log('scrollHeight =',scrollHeight)
        let newHeight = 0;
        let newTags:JSX.Element[][] = [];
        const childRef = checkRef.children
        for(let i =0; i < childRef.length; i++) {
            const childSpanRef = childRef[i].children;
            for (let j = 0; j < childSpanRef.length; j++) {
            const childSpanText = childSpanRef[j].textContent;
            // console.log('texts [',i,',',j,'] =',childSpanText)
            const spanHeight = childSpanRef[j].clientHeight;
            newHeight += spanHeight;
            const newTagsLength = newTags.length;
            const jsxChildSpan = <span className='flow-root'>{childSpanText}<br /><br /></span>;
            // indent-[2.64583mm] delete
            
            if (newTagsLength === 0) {
                if (clientHeight >= newHeight) {
                // console.log('1new tags length =',newTagsLength)
                // console.log('spanHeight =',spanHeight)
                // console.log('newH =',newHeight)
                newTags.push([])
                newTags[0].push(jsxChildSpan);
                }
            } else if (newTagsLength===1) {
                const lastIdx = newTagsLength-1;
    
                if (clientHeight >= newHeight) {
                // console.log('2new tags length =',newTagsLength)
                // console.log('spanHeight =',spanHeight)
                // console.log('newH =',newHeight)
                newTags[lastIdx].push(jsxChildSpan);
                } else if (clientHeight < newHeight) {
                // console.log('3new tags length =',newTagsLength)
                // console.log('spanHeight =',spanHeight)
                // console.log('newH =',newHeight)
                newHeight=0;
                newTags.push([])
                newTags[lastIdx+1].push(jsxChildSpan)
                }
            } else {
                const lastIdx = newTagsLength-1;
    
                if (clientHeight >= newHeight) {
                // console.log('4new tags length =',newTagsLength)
                // console.log('spanHeight =',spanHeight)
                // console.log('newH =',newHeight)
                newTags[lastIdx].push(jsxChildSpan);
                } else if (clientHeight < newHeight) {
                // console.log('5new tags length =',newTagsLength)
                // console.log('spanHeight =',spanHeight)
                // console.log('newH =',newHeight)
                newHeight=0;
                newTags.push([])
                newTags[lastIdx+1].push(jsxChildSpan)
                }
            }
            
            }//j for end
            if (newTags.length ===1) {
                setisMulti(false)
            } else if (newTags.length > 1) {
                setisMulti(true)
            }
        }// i for end
        checkRef.style.display='none';
        
        setIsReplace(true)
        setReplaceBody(newTags);
        }
    }
    })

    // body 27줄 -> 1 row = 7.222mm 
    // w-[160.588mm]
    // h-[195.662mm]
    const makeContentFn = () => {
        const dateCompleted_ori = userInfo.status_1st?.review_complete_date;
        const dateCompleted = dateCompleted_ori?.substring(2,10)
        // console.log('dateCompleted =',dateCompleted)
        const draft_str = draft===1 ? '1st': '2st';
        let title = '';
        let body:JSX.Element[] = [];
        const outlines:TFindDraftInfoByDraftIdDraftOutline[] = draft===1 ? userInfo.draft_data.draft_outline:userInfo.draft_2nd_data? userInfo.draft_2nd_data.draft_outline:[];
        for (let i = 0; i < outlines.length; i++) {
            if (outlines[i].name === 'Title') {
                title = outlines[i].input_content
            } else {
                if (draft === 1) {
                    let jsxBody = <span className='flow-root'>{outlines[i].input_content}<br /><br /></span>;
                    // indent-[2.64583mm] delte
                    // jsxBody
                    // console.log('jsxBody =',jsxBody.props)
                    body.push(jsxBody);
                } else {
                    const bodyText = outlines[i].input_content.split('\n\n');
                    
                    body=bodyText.map((item,itemIdx ) => {
                        return <span key={'print-component-'+draft+'-'+itemIdx}>{item}<br /><br /></span>
                        // <span className='pl-[1.05833mm]'></span> delete
                    })
                }
            }
        }
        let allBody = <div className='export-lm-wh-content-pre-body'>{body}</div>;
        

        return {
            title, body:allBody
        }
    }
  return (
    <div>
        <div style={{display:'none'}}>
            <div ref={componentRef} className='block w-full h-full'>
            {replaceBody.length > 0 && 
                replaceBody.map((bodyItem, bodyIndex) => {
                    const currentBody = <div className='export-lm-wh-content-body'>{bodyItem}</div>;
                    const maxCount = replaceBody.length;
                    const currentCount = bodyIndex+1;
                    return <ComponentToPrint key={'print::-'+bodyIndex+'-draft::-'+draft+'-unit::-'+userInfo.defautInfo.unit_index}
                        draft={draft} userInfo={userInfo}
                        title={makeContentFn().title} body={currentBody}
                        multi={{maxPageNum:maxCount, currentPageNum: currentCount}}
                    />  
                })
            }
            </div>
        </div>
        <button onClick={handlePrint} className='export-bt-print'></button>
        <div style={{display:'none'}} ref={divRef}>
            {makeContentFn().body}
            </div>
    </div>
  )
};

export default PrintExportButton;
