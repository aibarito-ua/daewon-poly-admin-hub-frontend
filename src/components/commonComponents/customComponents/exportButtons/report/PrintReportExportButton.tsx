import React from 'react';
import { useReactToPrint } from 'react-to-print';
import ReportComponentToPrint from './PrintReportComponent';


const PrintReportExportButton = (props: {
    feedbackDataInStudent: TFeedbackStates;
    reportByUnitAPIData:TStudentUnitReportRes;
}) => {
    const {
        feedbackDataInStudent, reportByUnitAPIData
    } = props;
    const componentRef = React.useRef(null);

    const divRef = React.useRef<HTMLDivElement>(null);
    const [replaceBody, setReplaceBody] = React.useState<JSX.Element[][]>([]);
    const [isReplace, setIsReplace] = React.useState<boolean>(false);
    const [isMulti, setisMulti] = React.useState<boolean>(false);


    React.useEffect(() => {
        if (!isReplace) {
            if (divRef.current) {
                const checkRef = divRef.current;
                checkRef.style.display='block';
                const oneRowHeight = checkRef.children[0].children[0].clientHeight; 
                const clientHeight = checkRef.clientHeight
                const offsetHeight = checkRef.offsetHeight;
                
                const scrollHeight = checkRef.scrollHeight;
                console.log('clientHeight =',clientHeight)
                console.log('offsetHeight =',offsetHeight)
                console.log('scrollHeight =',scrollHeight)
                
                let newHeight = oneRowHeight;
                let newTags:JSX.Element[][]=[];
                const childRef = checkRef.children;
                for (let i = 0; i < childRef.length; i++) {
                    const childRow = childRef[i].children;
                    for (let j = 0; j< childRow.length; j++) {
                        const childSpanText = childRow[j].textContent;
                        const spanHeight = childRow[j].clientHeight;
                        console.log('span height =',spanHeight)
                        newHeight += spanHeight;
                        const newtagsLength = newTags.length;
                        const jsxChildSpan = <span className='export-report-wr-oc-input'>{childSpanText}</span>;
                        if (newtagsLength === 0) {
                            if (clientHeight > newHeight) {
                                newTags.push([])
                                newTags[0].push(jsxChildSpan);
                            }
                        } else if (newtagsLength===1) {
                            const lastIdx = newtagsLength-1;

                            if (clientHeight > newHeight) {
                                newTags[lastIdx].push(jsxChildSpan);
                            } else if (clientHeight <= newHeight) {
                                newHeight = 0;
                                newTags.push([]);
                                newTags[lastIdx+1].push(jsxChildSpan);
                            }
                        } else {
                            const lastIdx = newtagsLength-1;
                            if (clientHeight > newHeight) {
                                newTags[lastIdx].push(jsxChildSpan);
                            } else if (clientHeight <= newHeight) {
                                newHeight=0;
                                newTags.push([]);
                                newTags[lastIdx+1].push(jsxChildSpan)
                            }
                        }
                    };// for j end
                }// for i end
                checkRef.style.display='none';
                if (newTags.length>1) {
                    setisMulti(true);
                } else {
                    setisMulti(false);
                }
                setIsReplace(true);
                setReplaceBody(newTags);
            }


        }
    })

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })
    
    const ov_comments = reportByUnitAPIData.teacher_comments[0].draft_index===2? reportByUnitAPIData.teacher_comments[0].comment : reportByUnitAPIData.teacher_comments[1].comment;
    const ov_comments_split = ov_comments.split('\n');
    return (
        <div>
            {/* print area */}
            <div style={{display:'none'}}>
                <div ref={componentRef} className='block w-full h-full'>
                    {replaceBody.length > 0 && replaceBody.map((bodyItem, bodyIndex) => {
                        const maxCount = replaceBody.length;
                        const currentCount = bodyIndex+1;
                        return <ReportComponentToPrint key={'print::-'+bodyIndex+'-report'} 
                        feedbackDataInStudent={feedbackDataInStudent} reportByUnitAPIData={reportByUnitAPIData} 
                        currentOverall={bodyItem}
                        multi={{maxPageNum:maxCount, currentPageNum: currentCount}}
                        isMulti={isMulti}
                        />
                    })}
                </div>
            </div>
            {/* print button */}
            <button onClick={handlePrint} className='report-export-print-button'></button>
            <div style={{display:'none'}} ref={divRef}>
                
                <div className='flex flex-col justify-start items-start w-[200.118mm] h-[20.558mm] border-[0.24mm] rounded-[4.88mm] px-[3.706mm] py-[3.628mm]'>
                    {ov_comments_split.map((ovItem, ovIdx) => {
                        return <span key={ovIdx} className='export-report-wr-oc-input'>{ovItem}</span>
                    })}
                </div> 
            </div>
        </div>
    )
}

export default PrintReportExportButton;