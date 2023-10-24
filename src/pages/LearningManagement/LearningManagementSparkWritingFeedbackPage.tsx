import PDFExportButton from '../../components/commonComponents/customComponents/exportButtons/PDFExportButton';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavStore from '../../store/useNavStore';
import useLearningManagementSparkWritingStore from '../../store/useLearningManagementSparkWritingStore';
import { SizeDragButtonSVG, CommentPlusIconSVG } from '../../util/svgs/heroIcons/SizeDragButtonSVG';
import draftViewBox from '../../components/commonComponents/customComponents/DraftViewBox';
import useControlAlertStore from '../../store/useControlAlertStore';
import { commonSvgIcons } from '../../util/svgs/commonSvgIcons';
import { draftFeedbackSend, draftFeedbackTemporarySave, getSparkWritingAdvisor } from '../../api/LearningManagement/LearningManagementSparkWriting.api';
import ReturnFeedbackModalComponent from '../../components/toggleModalComponents/ReturnFeedbackModalComponent';
import RubricTypeModalComponent from '../../components/toggleModalComponents/RubricTypeModalComponent';
import useActivityWritingHubStore from '../../store/useActivityWritingHubStore';
import PrintExportButton from '../../components/commonComponents/customComponents/exportButtons/PrintExportButton';
import ReportModalComponent from '../../components/toggleModalComponents/ReportModalComponent';

type TDivsControlConfig = {
    advisor: {
        x: number;
        w: number;
    };
    draft: {
        x: number;
        w: number;
    };
    comment: {
        x: number;
        w: number;
    };
    divideAD: {
        x: number;
    };
    divideDC: {
        x: number;
    };
}

const LearningManagementSparkWritingFeedbackPage = () => {
    const navigate = useNavigate();
    const locationHook = useLocation();

    const {
        selectNavigationTitles, setSelectNavigationTitles,
        navigateBlockFlag, navigateBlockMessage
    } = useNavStore();
    const {
        feedbackDataInStudent,
        rubricReportValue,
        setRubricInit,
        setRubricReportAllValue
    } = useLearningManagementSparkWritingStore();
    const {
        rubricDataHead
    } = useActivityWritingHubStore();
    const { 
        commonAlertOpen, commonAlertClose
    } = useControlAlertStore();

    // Save -> go back flag
    const [saveComplete, setSaveComplete] = React.useState<boolean>(false);

    // change previewer

    // draft status
    const [draftStatus, setDraftStatus] = React.useState<number>(0);
    // draft id
    const [draftId, setDraftId] = React.useState<string>('');

    // title comment div ref
    const containerTitleCommentRef = React.useRef<HTMLDivElement|null>(null);
    // body comment div ref
    const containerBodyCommentRef = React.useRef<HTMLDivElement|null>(null);
    // title ref
    const containerTitleRef = React.useRef<HTMLDivElement|null>(null);
    // body ref
    const containerBodyRef = React.useRef<HTMLDivElement|null>(null);
    // title select text state
    const [titleSelectedText, setTitleSelectedText] = React.useState<string>('');
    const [titleCommentBoxVisible, setTitleCommentBoxVisible] = React.useState(false);
    const [commentBoxPosition, setCommentBoxPosition] = React.useState({top:0, left: 0});
    // title mouse right click open menu
    const [afterHighlightBoxPosition, setAfterHighlightBoxPosition] = React.useState({top:0, left: 0});
    const [afterHighlightBoxVisible, setAfterHighlightBoxVisible] = React.useState(false);
    // title all selected text 
    const [allTitleSelectedText, setAllTitleSelectedText] = React.useState<TComment[]>([])
    // body all selected text 
    const [allBodySelectedText, setAllBodySelectedText] = React.useState<TComment[]>([])

    // body select text state
    const [bodySelectedText, setBodySelectedText] = React.useState<string>('');
    const [bodyCommentBoxVisible, setBodyCommentBoxVisible] = React.useState(false);
    const [commentBodyBoxPosition, setCommentBodyBoxPosition] = React.useState({top:0, left:0});

    // comment focus flag -> target border
    const [commentFocusId, setCommentFocusId] = React.useState<string>('');

    // overall comment textarea value
    const [overallComment, setOverallComment] = React.useState<string>('');

    // final overall comment textarea value
    const [finalOverallComment, setFinalOverallComment] = React.useState<string>('');

    // return feedback data form -> "feedback_return"
    const [returnFeedback, setReturnFeedback] = React.useState<TReturnFeedback>({
        reason:'',
        teacher_comment: '',
        is_return: false
    });
    // 1st draft default data -> temporary save & send data form
    const [draftResultSendData, setDraftResultSendData] = React.useState<TAdminDraft1stCommentData>();

    // final 2nd draft save flag
    const [finalTemporarySaveFlag, setFinalTemporarySaveFlag] = React.useState<boolean>(false);
    // final 2nd draft submit flag
    const [finalCreateReportFlag, setFinalCreateReportFlag] = React.useState<boolean>(false);

    // rubric score state controlers
    const [rubricSelected, setRubricSelected] = React.useState<string[]>(Array.from({length: 6}, ()=>''));
    const setRubricSelectedItem = (idx:number, value:string) => {
        console.log('rubricSelected bf update  =',rubricSelected)
        let dump = rubricSelected;
        dump[idx] = value;
        setRubricSelected(dump);
    }

    // advisor div control
    const [advisorControlDiv, setAdvisorControlDiv] = React.useState<{
        original_sentence: boolean;
        revised_sentence:boolean;
        similar_sentence:boolean;
    }>({original_sentence:false,revised_sentence:false,similar_sentence:false})

    // advisor data
    const [advisor, setAdvisor] = React.useState<TWritingAdvisor>({
        draft_index:-1,
        draft_outline:[]
    });

    // printRef
    const contentPrintRef = React.useRef(null);
    const container1stDraftBody = React.useRef<HTMLDivElement|null>(null);
    const [printBodyText, setPrintBodyText] = React.useState<string>('');

    // flag === undefined --> make data form for temporary save
    // flag === "send" ---> make data form for submit save
    const makeData = async (flag?:string) => {
        const draft_id = parseInt(draftId);
        const overall_comment = overallComment;
        const feedback_return = returnFeedback;
        const comment:TCommentDataList = allBodySelectedText.map((commentItem) => {
            // console.log('all text =',document.getElementById(commentItem.paraghragh_name)?.textContent?.length)
            return {
                comment: commentItem.comment,
                comment_className: commentItem.comment_className,
                comment_index: commentItem.comment_index,
                start_index: commentItem.start_index,
                end_index: commentItem.end_index-1,
                paragraph_name: commentItem.paraghragh_name,
                target_text: commentItem.target_text
            }
        });
        const outlines = feedbackDataInStudent.draft_data.draft_outline;
        
        // paragraph name for mapping
        let paragraphNames:string[] = []
        // screen data all full text
        let fullTextByScreenData:string[] = [];
        
        // all screen datas
        let allCharScreenDataFirstStep:TParagraphScreenData[][] = outlines.map((outline) => {
            // for mapping
            paragraphNames.push(outline.name);

            let currentFullTextInScreenData = '';
            let returnScreenDataByCharSplit:TParagraphScreenData[]=[];
            for (let screen_data_index =0; screen_data_index < outline.screen_data.length; screen_data_index++) {
                const screenData = outline.screen_data[screen_data_index];
                if (screen_data_index > 0) {
                    // type -1 + 1인 경우 사이에 빈값 추가
                    const before_screenData = outline.screen_data[screen_data_index-1];
                    if (screenData.type === 1 && before_screenData.type === -1) {
                        const textMatchStartEmptySpaceBeforeData = before_screenData.text.match(/^\s/gmi);
                        const textMatchEndEmptySpaceBeforeData = before_screenData.text.match(/\s$/gmi);
                        const textMatchStartEmptySpaceCurrentData = screenData.text.match(/^\s/gmi);
                        const textMatchEndEmptySpaceCurrentData = screenData.text.match(/\s$/gmi);
                        if ( !textMatchStartEmptySpaceBeforeData && !textMatchEndEmptySpaceBeforeData 
                            && !textMatchStartEmptySpaceCurrentData && !textMatchEndEmptySpaceCurrentData
                        ) {
                            currentFullTextInScreenData+=' ';
                            const emptyScreenDataChar = { text: ' ', comment_index: -1, type: 1}
                            returnScreenDataByCharSplit.push(emptyScreenDataChar);
                        }
                    };    
                };
                // text 추가
                currentFullTextInScreenData+= screenData.text;
                // text data split to char
                const splitText = screenData.text.split('');
                const splitCharByText: TParagraphScreenData[] = splitText.map((charText) => {
                    return { text: charText, comment_index: -1, type: screenData.type }
                });
                returnScreenDataByCharSplit.push(...splitCharByText);
            }; // for loop end
            fullTextByScreenData.push(currentFullTextInScreenData);
            return returnScreenDataByCharSplit;
        });

        console.log('all char =',allCharScreenDataFirstStep,fullTextByScreenData);
        // console.log('fullTextByScreenData =\n1 > ',fullTextByScreenData[0].length,
        //     '2 >',fullTextByScreenData[1].length, '3 >', fullTextByScreenData[2].length, '4 >',fullTextByScreenData[3].length,'5 >',fullTextByScreenData[4].length)

        let allCharScreenData:TParagraphScreenData[][] = []
        // screen char data replace comment index
        // outline index for loop
        for (let outline_index = 0; outline_index < outlines.length; outline_index++) {
            const allCharDataInOutline = allCharScreenDataFirstStep[outline_index];
            const currentOutlineName = outlines[outline_index].name;
            const currentParentText = fullTextByScreenData[outline_index];
            allCharScreenData.push([]);

            // char data for loop start
            for (let char_index = 0; char_index < allCharDataInOutline.length; char_index ++) {
                let charItem = allCharDataInOutline[char_index];

                // comment for loop start
                for (let comment_idx = 0; comment_idx < comment.length; comment_idx++) {
                    const currentCommentOutlineName = comment[comment_idx].paragraph_name;
                    // is there comment check
                    if (currentOutlineName === currentCommentOutlineName) {
                        const currentCommentData = comment[comment_idx];
                        const currentCommentStartIndex = currentCommentData.start_index;
                        const currentCommentEndIndex = currentCommentData.end_index;
                        const findTargetText = currentParentText.substring(currentCommentStartIndex, currentCommentEndIndex);
                        // console.log('')
                        // console.log('findTargetText =',findTargetText)
                        if (char_index >= currentCommentStartIndex && char_index < currentCommentEndIndex+2) {
                            charItem.comment_index = currentCommentData.comment_index;
                            break;
                        }
                    }
                };
                allCharScreenData[outline_index].push(charItem);
            };
        };
        console.log('allCharScreenData==',allCharScreenData);
        // 정리된 char 데이터를 전체 순회하면서 merge하기
        let replaceAllScreenDataChartoString:TCommentAllParagraphData=[];
        for (let pIdx = 0; pIdx < allCharScreenData.length; pIdx++) {
            const pItem = allCharScreenData[pIdx];
            let currentOutlineScreenData:TParagraphScreenData[] = [];
            // init values
            let text = '';
            let commentIdx:number=-1;
            let type:number=2;
            for (let cIdx = 0; cIdx < pItem.length; cIdx++) {
                const pItemText = pItem[cIdx].text;
                const pItemCommentIndex = pItem[cIdx].comment_index;
                const pItemType = pItem[cIdx].type;
                if (cIdx === 0) {
                    // start char
                    text+=pItemText;
                    commentIdx = pItemCommentIndex;
                    type=pItemType;
                } else if (cIdx === pItem.length-1) {
                    // end char
                    text+= pItemText;
                    const pushData: TParagraphScreenData = {
                        text,
                        comment_index:commentIdx,
                        type
                    };
                    currentOutlineScreenData.push(pushData)
                } else {
                    // type check
                    const typeCheck = type === pItemType;
                    // comment index check
                    const commentIndexCheck = commentIdx === pItemCommentIndex;

                    if (typeCheck && commentIndexCheck) {
                        text+=pItemText;
                    } else {
                        // 누적된 데이터 우선 푸쉬
                        const pushData:TParagraphScreenData = {
                            text, comment_index:commentIdx, type
                        };
                        currentOutlineScreenData.push(pushData);

                        // 누적 데이터 초기화
                        text = pItemText;
                        commentIdx = pItemCommentIndex;
                        type=pItemType;
                    };
                };
            };// for loop ended
            const replaceOLData = {
                name: outlines[pIdx].name,
                screen_data: currentOutlineScreenData
            }
            replaceAllScreenDataChartoString.push(replaceOLData);
        }//for loop ended
        console.log('ended===',replaceAllScreenDataChartoString)
        const responseData:TAdminDraft1stCommentData = {
            comment,
            data:replaceAllScreenDataChartoString,
            draft_id,
            overall_comment,
            feedback_return,
            rubric_report:[]
        };
        if (flag==='send') {
            console.log('send!')
            return await draftFeedbackSend(responseData);
        } else {
            // temporary save data 
            return await draftFeedbackTemporarySave(responseData);
        }
    };

    // return
    const returnFeed = async (feedback_return:TReturnFeedback) => {
        const comment:TCommentDataList=[];
        const data:TCommentAllParagraphData=[];
        const overall_comment = '';
        const draft_id = parseInt(draftId);
        // const feedback_return:TReturnFeedback = {
        //     reason: returnFeedback.reason,
        //     teacher_comment: returnFeedback.teacher_comment,
        //     is_return: true,
        // }
        const responseData:TAdminDraft1stCommentData = {
            comment,
            data,
            draft_id,
            overall_comment,
            feedback_return,
            rubric_report:[]
        };
        console.log('return =',responseData)
        const rsp = await draftFeedbackSend(responseData);
        return rsp;
    }

    const makeFinalDraftData = async (flag?:string) => {
        const draft_id = parseInt(draftId); ;
        const feedback_return:TReturnFeedback = {
            reason:'',
            teacher_comment:'',
            is_return: false,
        }
        const rubric_report = rubricReportValue;
        console.log(' rubricReportValue in send =',rubricReportValue)
        if (flag==='send') {
            console.log('send!')
            const overall_comment=finalOverallComment;
        const responseData:TAdminDraft1stCommentData = {
            draft_id,
            data:[],
            comment:[],
            feedback_return,
            overall_comment,
            rubric_report,
        }
            return await draftFeedbackSend(responseData);
        } else {
            // temporary save data 
            const overall_comment="";
            // const overall_comment = finalOverallComment;
            const responseData:TAdminDraft1stCommentData = {
                draft_id,
                data:[],
                comment:[],
                feedback_return,
                overall_comment,
                rubric_report,
            }
            return await draftFeedbackTemporarySave(responseData);
        }
    }
    
    // title select text
    const titleDragHandlerSelection = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (containerTitleRef.current) {
            const selection = window.getSelection();
            const text = selection?.toString();
            if (text && text.trim()!=='') {
                const range = selection?.getRangeAt(0);
                if (range) {
                    const containerNode = containerTitleRef.current; // Assuming this is the container div element
                    let startIndex = 0;
                    let endIndex = 0;
            
                    // Calculate start index
                    const startRange = document.createRange();
                    startRange.selectNodeContents(containerNode);
                    startRange.setEnd(range.startContainer, range.startOffset);
                    startIndex = startRange.toString().length;
            
                    // Calculate end index
                    endIndex = startIndex + text.length;
            
                    console.log('Start Index:', startIndex);
                    console.log('End Index:', endIndex);
                    console.log('Full text :',containerNode.textContent)
                    // 추가: 다른 div에 있을 경우 처리
                    let isDragOverOtherDiv = false;
                    // 드래그 된 범위의 id 비교   
                    const checkParent = (target:HTMLElement) => {
                        let targetElement:HTMLElement|null = target;
                        while(targetElement && targetElement.id==='') {
                            targetElement = targetElement.parentElement;
                        }
                        if (targetElement) return targetElement.id;
                    }
                    if (range.startContainer.parentElement) {
                        const startId = checkParent(range.startContainer.parentElement);
                        console.log(' startId = ',startId)
                        if (range.endContainer.parentElement) {
                            const endId = checkParent(range.endContainer.parentElement);
                            console.log(' end id = ',endId)
                            if (startId !== endId) {
                                isDragOverOtherDiv=true;        
                            }
                        }
                    }
                    if (isDragOverOtherDiv) {
                        selection?.removeAllRanges();
                        setTitleSelectedText('');
                        setTitleCommentBoxVisible(false);
                        return;
                    } else {
                        setTitleSelectedText(text);
                        setTitleCommentBoxVisible(true);        
                    }
                }
                
                const rect = selection?.getRangeAt(0).getBoundingClientRect();
                if (rect) {
                    const top = rect.top + window.scrollY - 25;
                    const left = rect.left + window.scrollX + rect.width / 2;
                    setCommentBoxPosition({top,left})
                };
            } else {
                setTitleCommentBoxVisible(false);
            }
        }
    };

    // body select text
    const bodyDragHandlerSelection = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        if (containerBodyRef.current) {
            const selection = window.getSelection();
            const text = selection?.toString();
            if (text && text.trim()!=='') {
                const range = selection?.getRangeAt(0);
                if (range) {
                    const containerNode = containerBodyRef.current; // Assuming this is the container div element
                    let startIndex = 0;
                    let endIndex = 0;
            
                    // Calculate start index
                    const startRange = document.createRange();
                    startRange.selectNodeContents(containerNode);
                    startRange.setEnd(range.startContainer, range.startOffset);
                    startIndex = startRange.toString().length;
            
                    // Calculate end index
                    endIndex = startIndex + text.length;
                    
                    console.log('Start Index:', startIndex);
                    console.log('End Index:', endIndex);
                    console.log('Full text :',containerNode.textContent?.toString().substring(startIndex, endIndex),':')
                    // 추가: 다른 div에 있을 경우 처리
                    let isDragOverOtherDiv = false;
                    // 드래그 된 범위의 id 비교   
                    const checkParent = (target:HTMLElement) => {
                        let targetElement:HTMLElement|null = target;
                        while(targetElement && targetElement.id==='') {
                            targetElement = targetElement.parentElement;
                        }
                        if (targetElement) return targetElement.id;
                    }
                    if (range.startContainer.parentElement) {
                        const startId = checkParent(range.startContainer.parentElement);
                        console.log(' startId = ',startId)
                        if (range.endContainer.parentElement) {
                            const endId = checkParent(range.endContainer.parentElement);
                            console.log(' end id = ',endId)
                            if (startId !== endId) {
                                isDragOverOtherDiv=true;        
                            }
                        }
                    }

                    if (isDragOverOtherDiv) {
                        selection?.removeAllRanges(); // 드래그 취소
                        setBodySelectedText('');
                        setBodyCommentBoxVisible(false);
                        return;
                    } else {
                        setBodySelectedText(text);
                        setBodyCommentBoxVisible(true);
                    }
                }
                
                const rect = selection?.getRangeAt(0).getBoundingClientRect();
                if (rect) {
                    const top = rect.top + window.scrollY - 25;
                    const left = rect.left + window.scrollX + rect.width / 2;
                    setCommentBodyBoxPosition({top,left})
                };
            } else {
                setBodyCommentBoxVisible(false);
            }
        }
    };

    // custom styles
    const commentBoxStyle: React.CSSProperties = {
        display: titleCommentBoxVisible ? 'block' : 'none',
        position: 'absolute',
        top: commentBoxPosition.top,
        left: commentBoxPosition.left,
        width: '106px',
        height: '36px',
        zIndex: 9999,
    };
    const commentBodyBoxStyle: React.CSSProperties = {
        display: bodyCommentBoxVisible ? 'block' : 'none',
        position: 'absolute',
        top: commentBodyBoxPosition.top,
        left: commentBodyBoxPosition.left,
        width: '106px',
        height: '36px',
        zIndex: 9999,
    };
    const afterHighlightBoxStyle: React.CSSProperties = {
        display: afterHighlightBoxVisible ? 'block': 'none',
        position: 'absolute',
        top: afterHighlightBoxPosition.top,
        left: afterHighlightBoxPosition.left,
        backgroundColor: 'white',
        borderRadius: '2px',
        boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.16)',
        zIndex: 9999,
    };

    // title highlight event
    const handleHighlightClick = () => {
        const selection = window.getSelection();
        if (selection) {
            const containerNode = containerBodyRef.current; // Assuming this is the container div element
            let dumyAllComment:TComment[] = JSON.parse(JSON.stringify(allBodySelectedText));
            
            // comment indexing event
            const indexingComment = (comment:TComment[]) => {
                let returnIndex = 0;
                if (comment.length > 0) {
                    for (let i = 0; i < comment.length;i++) {
                        const isNext = comment[i+1];
                        if (!isNext) {
                            returnIndex = i+1;
                            break;
                        } else {
                            returnIndex +=1;
                            continue;
                        }
                    }
                    return returnIndex;
                } else {
                    return returnIndex;
                }
            };
            const currentCommentIndex = indexingComment(dumyAllComment)
            console.log('drag index = ',currentCommentIndex)
            const range = selection.getRangeAt(0),
                span = document.createElement('span'),
                text = selection.toString(),
                classNameValue = 'highlight-title-'+currentCommentIndex;
            
            console.log('range =',range)
            
            span.className=classNameValue;
            span.id=classNameValue;
            span.onmouseover = () => {
                span.style.cursor = 'pointer'; // Change cursor style on mouseover
                span.style.border = '2px solid #f1b02e'
                setCommentFocusId(classNameValue);
            };
              
            span.onmouseout = () => {
                // span.style.cursor = 'pointer'; // Restore cursor style on mouseout
                span.style.border = ''
                setCommentFocusId('');
            };
            const checkElement = (target:HTMLElement|null) => {
                let targetElement:HTMLElement|null = target;
                while(targetElement && targetElement.id==='') {
                    targetElement = targetElement.parentElement;
                }
                if (targetElement) return targetElement.id;
            }
            const reCheckElement = (target:HTMLElement|null) => {
                let targetElement:HTMLElement|null = target;
                while(targetElement && targetElement.id==='') {
                    targetElement = targetElement.parentElement;
                }
                if (targetElement) return targetElement;
            }
            const selectElement = range.startContainer.parentElement;
            
            const divName = checkElement(selectElement)
            const newTarget = reCheckElement(selectElement);

            if (containerNode && divName && newTarget) {
                
                const newText = newTarget.textContent;
                console.log('test ===',newText)
                let startIndex = 0;
                let endIndex = 0;
                // Calculate start index
                const startRange = document.createRange();
                startRange.selectNodeContents(newTarget);
                startRange.setEnd(range.startContainer, range.startOffset);
                startIndex = startRange.toString().length;
        
                // Calculate end index
                endIndex = startIndex + text.length;
    
                let dumyComment:TComment[] = allBodySelectedText;
                const currentCommentIndex = dumyComment.length;
                const styles:React.CSSProperties = {
                    backgroundColor: 'yellow',
                    userSelect:'none',
                    height:'fit-content',
                    cursor:'pointer'
                }
                const commentData:TComment = {
                    comment: "",
                    comment_className: classNameValue,
                    comment_index: currentCommentIndex,
                    delete_evnet: ()=>{},
                    paraghragh_name: divName,
                    target_text: text,
                    end_index: endIndex,
                    start_index: startIndex,
                    parent_text: containerNode.textContent ? containerNode.textContent : '',
                    targetStyles: styles
                }
                console.log('create comment =',commentData)
                dumyComment.push(commentData)
                // span.=styles;
                setAllBodySelectedText(dumyComment);
            }
            span.style.backgroundColor = 'yellow';
            span.style.userSelect='none';
            span.style.height = 'fit-content'
            span.style.cursor = 'pointer'
            

            span.appendChild(range.extractContents());
            range.insertNode(span);


            console.log('all body comment =',allBodySelectedText)
            setTitleCommentBoxVisible(false);
            setBodySelectedText('')
        }
    }

    // body highlight event
    const handleBodyHighlightClick = () => {
        const selection = window.getSelection();
        if (selection) {
            const containerNode = containerBodyRef.current; // Assuming this is the container div element
            let dumyAllComment:TComment[] = JSON.parse(JSON.stringify(allBodySelectedText));
            
            // comment indexing event
            const indexingComment = (comment:TComment[]) => {
                let returnIndex = 0;
                if (comment.length > 0) {
                    for (let i = 0; i < comment.length;i++) {
                        const isNext = comment[i+1];
                        if (!isNext) {
                            returnIndex = i+1;
                            break;
                        } else {
                            returnIndex +=1;
                            continue;
                        }
                    }
                    return returnIndex;
                } else {
                    return returnIndex;
                }
            };
            const currentCommentIndex = indexingComment(dumyAllComment)
            console.log('drag index = ',currentCommentIndex)
            const range = selection.getRangeAt(0),
                span = document.createElement('span'),
                text = selection.toString(),
                classNameValue = 'highlight-body-'+currentCommentIndex;
            
            console.log('range =',range)
            
            span.className=classNameValue;
            span.id=classNameValue;
            span.onmouseover = () => {
                span.style.cursor = 'pointer'; // Change cursor style on mouseover
                span.style.border = '2px solid #f1b02e'
                setCommentFocusId(classNameValue);
            };
              
            span.onmouseout = () => {
                // span.style.cursor = 'pointer'; // Restore cursor style on mouseout
                span.style.border = ''
                setCommentFocusId('');
            };
            const checkElement = (target:HTMLElement|null) => {
                let targetElement:HTMLElement|null = target;
                while(targetElement && targetElement.id==='') {
                    targetElement = targetElement.parentElement;
                }
                if (targetElement) return targetElement.id;
            }
            const reCheckElement = (target:HTMLElement|null) => {
                let targetElement:HTMLElement|null = target;
                while(targetElement && targetElement.id==='') {
                    targetElement = targetElement.parentElement;
                }
                if (targetElement) return targetElement;
            }
            const selectElement = range.startContainer.parentElement;
            
            const divName = checkElement(selectElement)
            const newTarget = reCheckElement(selectElement);

            if (containerNode && divName && newTarget) {
                
                const newText = newTarget.textContent;
                console.log('test ===',newText)
                let startIndex = 0;
                let endIndex = 0;
                // Calculate start index
                const startRange = document.createRange();
                startRange.selectNodeContents(newTarget);
                startRange.setEnd(range.startContainer, range.startOffset);
                startIndex = startRange.toString().length;
        
                // Calculate end index
                endIndex = startIndex + text.length;
    
                let dumyComment:TComment[] = allBodySelectedText;
                const currentCommentIndex = dumyComment.length;
                const styles:React.CSSProperties = {
                    backgroundColor: 'yellow',
                    userSelect:'none',
                    height:'fit-content',
                    cursor:'pointer'
                }
                const commentData:TComment = {
                    comment: "",
                    comment_className: classNameValue,
                    comment_index: currentCommentIndex,
                    delete_evnet: ()=>{},
                    paraghragh_name: divName,
                    target_text: text,
                    end_index: endIndex,
                    start_index: startIndex,
                    parent_text: containerNode.textContent ? containerNode.textContent : '',
                    targetStyles: styles
                }
                console.log('create comment =',commentData)
                dumyComment.push(commentData)
                // span.=styles;
                setAllBodySelectedText(dumyComment);
            }
            span.style.backgroundColor = 'yellow';
            span.style.userSelect='none';
            span.style.height = 'fit-content'
            span.style.cursor = 'pointer'
            

            span.appendChild(range.extractContents());
            range.insertNode(span);


            console.log('all body comment =',allBodySelectedText)
            setBodyCommentBoxVisible(false);
            setBodySelectedText('')
        }
    }
    // send button event
    const sendButtonEvent = ()=>{
        commonAlertOpen({
            head: 'Review 1st Draft',
            messages: [
                'Do you want to send your feedback to the student?'
            ],
            yesButtonLabel: 'Yes',
            noButtonLabel: 'No',
            alertType: 'continue',
            yesEvent: async ()=>{
                const save = await makeData('send');
                if (save) {
                    commonAlertOpen({
                        head: 'Review 1st Draft',
                        messages: ['Sent.','Return to the main menu.'],
                        useOneButton: true,
                        yesButtonLabel: 'OK',
                        yesEvent: async () => {
                            navigate(`/LearningManagement/WritingHub/SparkWriting`);
                            window.location.reload();
                            commonAlertClose();
                        }
                    })
                }
            }
        })
    }
    // save button event
    const saveButtonEvent = ()=>{
        commonAlertOpen({
            head: 'Review 1st Draft',
            messages: [
                'Do you want to save your current progress and return to the main menu?'
            ],
            yesButtonLabel: 'Yes',
            noButtonLabel: 'No',
            yesEvent: async ()=>{
                const save = await makeData();
                if (save) {
                    navigate(`/LearningManagement/WritingHub/SparkWriting`);
                    window.location.reload();
                }
            }
        })
    }
    const [advisorOpen, setAdvisorOpen] = React.useState<boolean>(false);
    // div width
    // divide state
    const [divAResize, setDivAResize] = React.useState<TDivsControlConfig>({
        advisor: {x: 0, w: 0},
        draft: {x:0, w: 400},
        comment: {x:0, w:400},
        divideAD: {x: 0},
        divideDC: {x: 0}
    });
    const boundaryRef = React.useRef<HTMLDivElement>(null);

    const inrange = (v: number, min: number, max:number) => {
        const boundary = boundaryRef.current?.getBoundingClientRect();
        if (boundary) {
            const bourdaryMax = boundary.width;
            // console.log('boundary width =',bourdaryMax)
            if(v < min) return min;
            if (v > bourdaryMax) return bourdaryMax;
            return v;
        } else return v;
    }

    // 2nd draft save
    const draft2ndSave = async () => {
        commonAlertOpen({
            head: 'Evaluate 2nd Draft',
            messages: [
                'Do you want to save your current progress and return to the main menu?'
            ],
            yesButtonLabel: 'Yes',
            noButtonLabel: 'No',
            yesEvent: async ()=>{
                const save = await makeFinalDraftData();
                if (save) {
                    navigate(`/LearningManagement/WritingHub/SparkWriting`);
                    window.location.reload();
                }
            }
        })
    }
    // 2nd draft create report
    const draft2ndCreateReport = async () => {
        console.log('finalCreateReportFlag =',finalCreateReportFlag)
        if (finalCreateReportFlag) {
            commonAlertOpen({
                head: 'Evaluate 2nd Draft',
                messages: [
                    'Do you want to create a report and send to the student?'
                ],
                yesButtonLabel: 'Yes',
                noButtonLabel: 'No',
                alertType: 'continue',
                yesEvent: async ()=>{
                    const save = await makeFinalDraftData('send');
                    if (save) {
                        commonAlertOpen({
                            head: 'Evaluate 2nd Draft',
                            messages: ['Completed.','Return to the main menu.'],
                            useOneButton: true,
                            yesButtonLabel: 'OK',
                            yesEvent: async () => {
                                commonAlertClose();
                                navigate(`/LearningManagement/WritingHub/SparkWriting`);
                                window.location.reload();
                            }
                        })
                    }
                }
            })
        }
    }

    React.useEffect(()=>{
        const pathParam = locationHook.pathname.split('/');
        const last = pathParam.slice(-1)[0];
        console.log(selectNavigationTitles)
        console.log('feedbackDataInStudent =',feedbackDataInStudent)
        
        if (selectNavigationTitles.length===0) {
            setSelectNavigationTitles(['학습 관리', 'Writing Hub', 'Spark Writing','Spark Writing 첨삭'])
        } 
    },[selectNavigationTitles ])
    React.useEffect(()=>{
        if (advisorOpen) {
            let dumyControler = JSON.parse(JSON.stringify(advisorControlDiv));
            dumyControler.original_sentence=true;
            dumyControler.revised_sentence=true;
            dumyControler.similar_sentence=true;
            setAdvisorControlDiv(dumyControler)
        } else {
            let dumyControler = JSON.parse(JSON.stringify(advisorControlDiv));
            dumyControler.original_sentence=false;
            dumyControler.revised_sentence=false;
            dumyControler.similar_sentence=false;
            setAdvisorControlDiv(dumyControler)
        }
    },[advisorOpen])
    React.useEffect(()=>{
        if (feedbackDataInStudent.draft_data.draft_index === 0) {
            commonAlertOpen({
                messages:['학생 데이터를 선택해주세요.'],
                useOneButton:true,
                yesButtonLabel: 'OK',
                yesEvent: () => {
                    navigate(`/LearningManagement/WritingHub/SparkWriting`);
                }
            })
        }
        if (feedbackDataInStudent.status?.status) {
            setDraftStatus(feedbackDataInStudent.status.status);
            if (feedbackDataInStudent.status.status >2) {
                const commentInit:TComment[] = feedbackDataInStudent.draft_data.comment.map((initItem) => {
                    const comment = initItem.comment;
                    const comment_className = initItem.comment_className;
                    const comment_index = initItem.comment_index;
                    const end_index = initItem.end_index;
                    const start_index = initItem.start_index;
                    const paragraph_name = initItem.paragraph_name;
                    const target_text = initItem.target_text;
                    const targetStyles:React.CSSProperties = {
                        backgroundColor: 'yellow',
                        userSelect:'none',
                        height:'fit-content',
                        cursor:'pointer'
                    }
                    return {
                        comment,
                        comment_className,
                        comment_index,
                        delete_evnet:()=>{},
                        end_index,
                        paraghragh_name:paragraph_name,
                        parent_text: '',
                        start_index,
                        target_text,
                        targetStyles,
                    }
                })
                const overAllCommentInit = feedbackDataInStudent.overall_comment;
                console.log('overAllCommentInit =',overAllCommentInit)
                setAllBodySelectedText(commentInit)
                setOverallComment(overAllCommentInit)
            }
        } else {
            commonAlertOpen({
                messages:['정상적인 데이터 상태가 아닙니다.'],
                useOneButton:true,
                yesButtonLabel: 'OK',
                yesEvent: () => {
                    navigate(`/LearningManagement/WritingHub/SparkWriting`);
                }
            })
        }
        if (feedbackDataInStudent.draft_2nd_data) {
            console.log('DATA:=', feedbackDataInStudent)
            console.log('feedbackDataInStudent.draft_2nd_data =995=',feedbackDataInStudent.draft_2nd_data)
            const draft2ndData = feedbackDataInStudent.draft_2nd_data;
            if (feedbackDataInStudent.status?.status === 4 || feedbackDataInStudent.status?.status === 5) {
                console.log(' status ===',draft2ndData.overall_comment)
                setFinalOverallComment(draft2ndData.overall_comment)
            }
            if (draft2ndData.rubric_report && draft2ndData.rubric_report.length > 0) {
                setRubricReportAllValue(draft2ndData.rubric_report)
            }
            const rubricDT = feedbackDataInStudent.rubric.rubric_description
            const rubricReportDatas = draft2ndData.rubric_report ? draft2ndData.rubric_report: [];
            if (rubricReportDatas.length > 0) {
                let rubricSelectsValue = rubricSelected;
                for (let i = 0; i<rubricDT.length;i++) {
                    const rubricCategoryName = rubricDT[i].category;
                    for (let j = 0; j < rubricReportDatas.length; j++) {
                        const rubricReportCategoryName = rubricReportDatas[j].category;
                        if (rubricCategoryName === rubricReportCategoryName) {
                            rubricSelectsValue[i] = rubricReportDatas[j].selected_value;
                            break;
                        }
                    }
                }
                setRubricSelected(rubricSelectsValue);
            }
        }
        const handleBodyCommentClick = (event: MouseEvent) => {
            if (
                containerBodyCommentRef.current &&
                !containerBodyCommentRef.current.contains(event.target as Node)
            ) {
                const tagString = document.getElementById('draft-body-wrap-div')?.innerHTML
                console.log(tagString)
                setBodyCommentBoxVisible(false);
                setBodySelectedText('')
            }
        };
        const handleTitleCommentClick = (event:MouseEvent) => {
            if (
                containerTitleCommentRef.current && !containerTitleCommentRef.current.contains(event.target as Node)
            ) {
                const tagString = document.getElementById('draft-title-wrap-div')?.innerHTML;
                console.log(tagString);
                setTitleCommentBoxVisible(false);
                setTitleSelectedText('');
            }
        }
        window.addEventListener('click', handleBodyCommentClick);
        window.addEventListener('click', handleTitleCommentClick);
        
        if (container1stDraftBody.current) {
            const draft1stBody = container1stDraftBody.current.textContent? container1stDraftBody.current.textContent:'';
            setPrintBodyText(draft1stBody)

        }
        // draft find
        // console.log('feedbackDataInStudent did =',feedbackDataInStudent)
        setDraftId(feedbackDataInStudent.defautInfo.select_draft_id);

        return () => {
            setDraftId('');
            setRubricInit()
            setAdvisor({draft_index:-1,draft_outline:[]})
            window.removeEventListener('click', handleBodyCommentClick)
            window.removeEventListener('click', handleTitleCommentClick)
        }
    },[])
    React.useEffect(()=>{
        console.log('rubricReportValue ==',rubricReportValue)
        const status2ndDraft = feedbackDataInStudent.status?.status;
        if (status2ndDraft === 2 ||status2ndDraft === 3) {
            if (finalOverallComment!=='') {
                if (rubricReportValue.length === 6) {
                    // save & submit open
                    setFinalCreateReportFlag(true);
                    setFinalTemporarySaveFlag(true);
                } else if (rubricReportValue.length < 6) {
                    // save open, submit close
                    setFinalCreateReportFlag(false);
                    setFinalTemporarySaveFlag(true);
                }
            } else {
                if (rubricReportValue.length > 0) {
                    // save open, submit close
                    setFinalCreateReportFlag(false);
                    setFinalTemporarySaveFlag(false);
                } else {
                    // save&submit close
                    setFinalCreateReportFlag(false);
                    setFinalTemporarySaveFlag(false);
                }
            }
        } else if (status2ndDraft === 4 ||status2ndDraft === 5) {
            setFinalCreateReportFlag(false);
            setFinalTemporarySaveFlag(false);
        }

        return () => {
            setFinalCreateReportFlag(false);
            setFinalTemporarySaveFlag(false);
        }
    }, [rubricReportValue, finalOverallComment, finalCreateReportFlag, finalTemporarySaveFlag])

    const divideH10 = <div className='w-[1px] h-[10px] bg-[#aaa]'/>
    const divideH29 = <div className='w-[1px] h-[29px] bg-[#ccc]'/>
    const TopInfomationBar = () => {
        return (
            <div className='learning-management-feedback-info-box'>
                <div className='flex flex-row w-fit min-w-fit items-center gap-[12px] ml-[20px] mr-[35px] my-[20px]'>
                    <div className='w-fit'>{`${feedbackDataInStudent.defautInfo.level.name}`}</div>{divideH10}
                    <div className='w-fit'>{feedbackDataInStudent.defautInfo.class.name}</div>{divideH10}
                    <div className='w-fit'>{feedbackDataInStudent.defautInfo.student_code}</div>{divideH10}
                    <div className='w-fit'>{`${feedbackDataInStudent.defautInfo.student_name.student_name_kr}(${feedbackDataInStudent.defautInfo.student_name.student_name_en})`}</div>
                </div>
                <div className='flex flex-row w-fit min-w-fit items-center'>{divideH29}</div>
                <div className='flex flex-row w-fit min-w-fit items-center gap-[12px] mr-[20px] ml-[35px] my-[20px]'>
                    <div className='w-fit'>{`Spark Writing`}</div>{divideH10}
                    <div className='w-fit'>{feedbackDataInStudent.defautInfo.book_name}</div>{divideH10}
                    <div className='w-fit'>{`Unit ${feedbackDataInStudent.defautInfo.unit_index}`}</div>{divideH10}
                    <div className='w-fit'>{feedbackDataInStudent.defautInfo.unit_topic}</div>{divideH10}
                    <div className='w-fit'>{feedbackDataInStudent.defautInfo.step_label}</div>{divideH10}
                    <div className='w-fit'>{feedbackDataInStudent.defautInfo.submit_date}</div>
                </div>
            </div>
        )
    }
    // advisor close button
    const CloseButton = () => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
      
          <g id="p_btn_close" transform="translate(0.206)">
            <rect id="guide" className="cls-1" fill="none" opacity="0.2" width="20" height="20" transform="translate(-0.206)"/>
            <g id="사각형_347" data-name="사각형 347" className="cls-2" fill="#222" stroke="#222" transform="translate(17.356 15.973) rotate(135)">
              <rect className="cls-3" stroke="none" width="1.717" height="18.888"/>
              <rect className="cls-4" fill="none" x="0.5" y="0.5" width="0.717" height="17.888"/>
            </g>
            <g id="사각형_348" data-name="사각형 348" className="cls-2" fill="#222" stroke="#222" transform="translate(3.999 17.187) rotate(-135)">
              <rect className="cls-3" stroke="none" width="1.717" height="18.888"/>
              <rect className="cls-4" fill="none" x="0.5" y="0.5" width="0.717" height="17.888"/>
            </g>
          </g>
        </svg>
        )
    }
    const UnderArrow = () => {
        return (
            <svg id="ic_arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
            <rect id="guide" fill="none" opacity="0.2" width="14" height="14"/>
            <path id="패스_12990" data-name="패스 12990"
            fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"
            d="M0,5.165,4.816,0,9.358,5.165" transform="translate(11.876 10.212) rotate(180)"/>
            </svg>
        )
    }
    const UpArrow =()=>{
        return (
            <svg id="ic_arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" transform="rotate(180)">
            <rect id="guide" fill="none" opacity="0.2" width="14" height="14"/>
            <path id="패스_12990" data-name="패스 12990"
            fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"
            d="M0,5.165,4.816,0,9.358,5.165" transform="translate(11.876 10.212) rotate(180)"/>
            </svg>
        )
    }
    return (
        <section className="section-feedback-canvas">
            <div className='flex flex-1 flex-col bg-white relative w-full min-w-[1120px] max-h-[185px] border-b-[1px] border-b-[#111] pt-[10px] px-[20px] pb-[20px]'>
                <TopInfomationBar />
                <div className='flex flex-row items-center h-[24px] gap-[8px] mt-[20px]'>
                    <div className='flex w-[3px] h-[12px] bg-[#0fa9cb]'></div>
                    <div className='flex font-notoSansCJKKR leading-[1.13] text-left text-[16px] text-[#222] font-medium'>{`Review ${feedbackDataInStudent.defautInfo.step_label}`}</div>
                </div>
                <div className='flex flex-col font-notoSansCJKKR leading-[1.77] text-left text-[13px] font-normal text-[#222] pl-[11px] mt-[10px]'>
                    {feedbackDataInStudent.defautInfo.step_label === '2nd Draft' ? 
                        <span>{`Review the student\’s 2nd draft and prepare a final evaluation.`}</span>
                        :
                        <>
                            <span>{`Highlight the selected parts you want to correct, then right-click to leave a correction comment.`}</span>
                            <span>{`Writing Advisor will also provide correction advice for you to refer to when writing correction comments.`}</span>
                        </>
                    }
                    
                </div>
                {/* returns */}
                {draftStatus>3 && <div className='learning-management-feedback-return-button-disabled'/>}
                {draftStatus < 4 && 
                    <ReturnFeedbackModalComponent 
                        returnFeedbackValue={returnFeedback}
                        setReturnFeedbackValue={setReturnFeedback}
                        returnFeedFunction={returnFeed}
                    />
                }
            </div>

            {feedbackDataInStudent.defautInfo.step_label==='1st Draft' && (
                <div className='comment-review-contents'
                    ref={boundaryRef}
                    >
                            {!advisorOpen && draftStatus!==5 && (
                                <div className='absolute left-[14px] top-[60%]'>
                                    <div className='learning-management-advisor-open-button'
                                        onClick={async () => {
                                            console.log(draftId)
                                            const checkAlreadyAdvisorUsed = advisor.draft_index > 0;
                                            
                                            if (checkAlreadyAdvisorUsed) {
                                                let dumyStates:TDivsControlConfig = JSON.parse(JSON.stringify(divAResize));
                                                dumyStates.advisor.w = 400;
                                                setDivAResize(dumyStates);
                                                setAdvisorOpen(true);
                                                
                                            } else {
                                                const advisorResponse = await getSparkWritingAdvisor(draftId);
                                                if (advisorResponse.draft_index > 0) {
                                                    console.log('advisor response =',advisorResponse)
                                                    setAdvisor(advisorResponse);
                                                    let dumyStates:TDivsControlConfig = JSON.parse(JSON.stringify(divAResize));
                                                    dumyStates.advisor.w = 400;
                                                    setDivAResize(dumyStates);
                                                    setAdvisorOpen(true)
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            )}
                            {advisorOpen && (
                                <div className='comment-advisor-div'
                                    // onClick={() => setAdvisorOpen(false)}
                                style={{width: `${divAResize.advisor.w}px`}}>
                                    {/* advisor header */}
                                    <div className='flex flex-col w-full h-fit relative'>
                                        <div className='absolute top-[2px] right-[0px] hover:cursor-pointer' onClick={() => setAdvisorOpen(false)} ><CloseButton /></div>
                                        <div className='comment-div-title-label-wrap'>
                                            <div className='comment-div-title-label-before-bar'></div>
                                            <div className='comment-div-title-label-text'>{`writing advisor`}</div>
                                        </div>
                                    </div>
                                    {/* advisor */}
                                    <div className='comment-advisor-contents'>
                                        {/* original sentence */}
                                        <div className='flex flex-col bg-white'>
                                            <div className='comment-advisor-label-wrap bg-[#588ee1] relative'
                                            onClick={() => {
                                                let dumyControler = JSON.parse(JSON.stringify(advisorControlDiv));
                                                dumyControler.original_sentence=!dumyControler.original_sentence;
                                                setAdvisorControlDiv(dumyControler)
                                            }}>
                                                <div className='flex select-none'>original sentence</div>
                                                <div className='flex absolute right-[19px] items-center select-none w-[14px] h-[14px]'>
                                                    {advisorControlDiv.original_sentence ? <UnderArrow />:<UpArrow/>}
                                                </div>
                                            </div>
                                            <div className={advisorControlDiv.original_sentence ? 'comment-advisor-wrap-text border-[#588ee1]':'hidden'}>
                                                {advisor.draft_outline.map((advisorParagraphItem) => {
                                                    const originalSentence = advisorParagraphItem.original_text;
                                                    const originalSentenceName = advisorParagraphItem.name;
                                                    const key = `advisor-${originalSentenceName}-${advisorParagraphItem.order_index}`
                                                    if (originalSentenceName==='Title') {
                                                        return (
                                                            <div key={key} className='flex h-fit'>{`Title: ${originalSentence}`}</div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div key={key} className='h-fit flow-root'><span className='pl-[10px]'/>{originalSentence}</div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        {/* revised sentence */}
                                        <div className='flex flex-col bg-white'>
                                            <div className='comment-advisor-label-wrap bg-[#f6914d] relative'
                                            onClick={() => {
                                                let dumyControler = JSON.parse(JSON.stringify(advisorControlDiv));
                                                dumyControler.revised_sentence=!dumyControler.revised_sentence;
                                                setAdvisorControlDiv(dumyControler)
                                            }}>
                                                <div className='flex select-none'>revised sentence</div>
                                                <div className='flex absolute right-[19px] items-center select-none w-[14px] h-[14px]'>
                                                    {advisorControlDiv.revised_sentence ? <UnderArrow />:<UpArrow/>}
                                                </div>
                                            </div>
                                            <div className={advisorControlDiv.revised_sentence ? 'comment-advisor-wrap-text border-[#f6914d]':'hidden'}>
                                                {advisor.draft_outline.map((advisorParagraphItem) => {
                                                    const revisedSentence = advisorParagraphItem.revised_text;
                                                    const revisedSentenceName = advisorParagraphItem.name;
                                                    if (revisedSentenceName==='Title') {
                                                        return (
                                                            <div className='flex h-fit'>{`Title: ${revisedSentence}`}</div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className='flow-root h-fit'><span className='pl-[10px]'/>{revisedSentence}</div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        {/* similar sentence */}
                                        <div className='flex flex-col bg-white'>
                                            <div className='comment-advisor-label-wrap bg-[#30c194] relative'
                                            onClick={() => {
                                                let dumyControler = JSON.parse(JSON.stringify(advisorControlDiv));
                                                dumyControler.similar_sentence=!dumyControler.similar_sentence;
                                                setAdvisorControlDiv(dumyControler)
                                            }}>
                                                <div className='flex select-none'>similar sentence</div>
                                                <div className='flex absolute right-[19px] items-center select-none w-[14px] h-[14px]'>
                                                    {advisorControlDiv.similar_sentence ? <UnderArrow />:<UpArrow/>}
                                                </div>
                                            </div>
                                            <div className={advisorControlDiv.similar_sentence ? 'comment-advisor-wrap-text border-[#30c194]':'hidden'}>
                                                {advisor.draft_outline.map((advisorParagraphItem) => {
                                                    const similarSentence = advisorParagraphItem.similar_text;
                                                    const similarSentenceName = advisorParagraphItem.name;
                                                    if (similarSentenceName==='Title') {
                                                        return (
                                                            <div className='flex h-fit'>{`Title: ${similarSentence}`}</div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className='flow-root h-fit'><span className='pl-[10px]'/>{similarSentence}</div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    {/* advisor & draft divider */}
                    {advisorOpen && (
                        <div className='bg-white w-fit h-full flex flex-col items-center justify-center'
                        style={{ left: `${divAResize.divideAD.x}px` }}
                        ><div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/><SizeDragButtonSVG
                            className='h-[55px] hover:cursor-grab'
                            onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
                                const mouseMoveHandler = (moveEvent: MouseEvent) => {
                                    const boundary = boundaryRef.current?.getBoundingClientRect();
                                    
                                    if (boundary) {
                                        // 2️⃣
                                        const deltaX = moveEvent.screenX - clickEvent.screenX;
                                        
                                        const resizeX = inrange(
                                            divAResize.divideAD.x + deltaX,
                                            // Math.floor(-boundary.width / 2 + 5 + 10),
                                            400,
                                            Math.floor(boundary.width- 5 - 10),
                                        )
                                        let dumyStates:TDivsControlConfig = JSON.parse(JSON.stringify(divAResize));
                                        dumyStates.advisor.w = resizeX
                                        dumyStates.divideAD.x = resizeX
                                        // 3️⃣
                                        setDivAResize(dumyStates);
                                    }
                                };

                                const mouseUpHandler = () => {
                                document.removeEventListener('mousemove', mouseMoveHandler);
                                };

                                document.addEventListener('mousemove', mouseMoveHandler);
                                document.addEventListener('mouseup', mouseUpHandler, { once: true });
                            }}
                        
                        /><div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/></div>
                    )}
                    {/* draft view div */}
                    <div className='min-w-[400px] bg-white'
                        style={{
                            width: advisorOpen ?
                                `${divAResize.draft.w}px`:
                                `${divAResize.draft.w-divAResize.divideAD.x}px`
                        }}
                    >
                        <div className='flex flex-col w-full h-full pl-[20px] py-[20px]'>
                            <div className='flex flex-row font-notoSansCJKKR text-[16px] text-[#222] leading-[1.13]'>1st Draft</div>
                            <div id='draft-title-wrap-div'
                            className='flex flex-row mt-[10px] h-[42px] gap-[15px] font-notoSansCJKKR text-[13px] text-[#222] leading-[1.38] items-center'>
                                <div className='flex'>Title: </div>
                                <div className='draft-viewer-container-title'
                                    ref={containerTitleRef}
                                    onContextMenu={(e)=>draftStatus>3 ? ()=>{}:titleDragHandlerSelection(e)}
                                >
                                    {feedbackDataInStudent && (draftStatus===2||draftStatus===5) && draftViewBox.draftTitle({feedbackDataInStudent})}
                                    { feedbackDataInStudent && (draftStatus>2&&draftStatus!==5) && draftViewBox.loadTemporaryDraftTitle({feedbackDataInStudent, setCommentFocusId})}

                                    {titleCommentBoxVisible && (
                                        <div style={commentBoxStyle}
                                            ref={containerTitleCommentRef}
                                        >
                                            <button onClick={handleHighlightClick} className='comment-button-add'></button>
                                        </div>
                                    )}
                                    {afterHighlightBoxVisible && (
                                        <div style={afterHighlightBoxStyle}>
                                            <p>{'test'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div id='draft-body-wrap-div'>
                                <div className='flex flex-col gap-[13px] mt-[10px] p-[35px] w-full h-full bg-[#f9f9f9] justify-start'
                                // flex flex-col justify-start
                                    ref={containerBodyRef}
                                    onContextMenu={(e)=>draftStatus>3 ? ()=>{}: bodyDragHandlerSelection(e)}
                                >
                                    {/* 화면 처음 초기화면 사용 */}
                                    {feedbackDataInStudent && (draftStatus===2||draftStatus===5) && draftViewBox.draftBody({feedbackDataInStudent})}
                                    {/* 임시 저장 후 사용 */}
                                    { feedbackDataInStudent && (draftStatus>2&&draftStatus!==5) && draftViewBox.loadTemporaryDraftBody({feedbackDataInStudent,setCommentFocusId})}
                                    {/* feedback 완료 후 사용 */}

                                    {bodyCommentBoxVisible && (
                                        <div style={commentBodyBoxStyle}
                                            ref={containerBodyCommentRef}
                                        >
                                            <button onClick={handleBodyHighlightClick} className='comment-button-add'></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* draft & comment divider */}
                    <div className='bg-white w-fit h-full flex flex-col items-center justify-center'
                        style={{ left: `${divAResize.divideDC.x}px` }}
                    >
                        <div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/>
                        <SizeDragButtonSVG
                            className='h-[55px] hover:cursor-grab'
                            onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
                                const mouseMoveHandler = (moveEvent: MouseEvent) => {
                                    const boundary = boundaryRef.current?.getBoundingClientRect();
                                    if (boundary) {
                                        // 2️⃣
                                        const deltaX = moveEvent.screenX - clickEvent.screenX;
                                        const resizeX = inrange(
                                            divAResize.divideDC.x + deltaX,
                                            // Math.floor(-boundary.width / 2 + 5 + 10),
                                            400,
                                            Math.floor(boundary.width - 5 - 10),
                                        )
                                        let dumyStates:TDivsControlConfig = JSON.parse(JSON.stringify(divAResize));
                                        dumyStates.draft.w = resizeX
                                        dumyStates.divideDC.x = resizeX
                                        // 3️⃣
                                        setDivAResize(dumyStates);
                                    }
                                };

                                const mouseUpHandler = () => {
                                document.removeEventListener('mousemove', mouseMoveHandler);
                                };

                                document.addEventListener('mousemove', mouseMoveHandler);
                                document.addEventListener('mouseup', mouseUpHandler, { once: true });
                            }}
                        
                        />
                        <div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/>
                    </div>
                    {/* comment div */}
                    <div className='flex flex-1 flex-col gap-[20px] bg-white h-full w-full min-w-[300px]'>
                        
                        <div className='flex flex-col w-full h-full pr-[20px] pl-[13px] pt-[20px]'>
                            <div className='flex flex-row capitalize'>{'correction comments'}</div>
                            {/* all comment */}
                            <div className='flex flex-col gap-[5px] overflow-y-auto'>
                                {allBodySelectedText.map((commentItem, commentIndex) => {
                                    // console.log('claa =',commentItem.comment_className)
                                    const commentKey = 'comment-'+commentItem.comment_className+commentItem.comment_index
                                    return (
                                        <div className='comment-wrapper'
                                        key={commentKey}
                                        style={{
                                            border: commentFocusId === commentItem.comment_className ? '2px solid #f1b02e':''
                                        }}
                                        onMouseOver={()=>{
                                            const target = document.getElementById(commentItem.comment_className);
                                            target?.setAttribute(
                                                'style',
                                                'background-color:yellow; height:fit-content; cursor:pointer; border:2px solid #f1b02e;'
                                            )
                                            setCommentFocusId(commentItem.comment_className);
                                        }} onMouseOut={()=>{
                                            const target = document.getElementById(commentItem.comment_className);
                                            target?.setAttribute(
                                                'style',
                                                'background-color:yellow; height:fit-content; cursor:pointer; border:none;'
                                            )
                                            setCommentFocusId('');
                                        }}>
                                            <input className='comment-input disabled:bg-white'
                                                disabled={draftStatus < 4 ? false:true}
                                                onChange={(e)=>{
                                                    const value = e.currentTarget.value;
                                                    let dumyAllValues:TComment[] = JSON.parse(JSON.stringify(allBodySelectedText));
                                                    for (let i = 0; i < dumyAllValues.length; i++) {
                                                        if (dumyAllValues[i].comment_index === commentItem.comment_index) {
                                                            dumyAllValues[i].comment = value;
                                                            break;
                                                        }
                                                    };
                                                    setAllBodySelectedText(dumyAllValues);
                                                }}
                                                value={commentItem.comment}
                                            />
                                            
                                            {draftStatus<4 && 
                                            <commonSvgIcons.CloseImageSVGIcon className='comment-close' onClick={(e)=>{
                                                // comment 삭제
                                                // background color redo before
                                                e.preventDefault();
                                                const targetElement = document.getElementById(commentItem.comment_className) as HTMLElement;
                                                // const clickedElement = e.target as HTMLElement;
                                                console.log('click =',targetElement.parentElement)
                                                // find parent element className by target
                                                const checkParent = (target:HTMLElement) => {
                                                    let targetElement:HTMLElement|null = target;
                                                    while(targetElement && !targetElement.className.includes(commentItem.comment_className)) {
                                                        targetElement = targetElement.parentElement;
                                                    }
                                                    if (targetElement) return targetElement;
                                                }
                                                const parent = checkParent(targetElement);
                                                console.log('parent ==',parent)
                                                const checkElement = (target:HTMLElement|null) => {
                                                    let targetElement:HTMLElement|null = target;
                                                    while(targetElement && targetElement.id==='') {
                                                        targetElement = targetElement.parentElement;
                                                    }
                                                    if (targetElement) return targetElement.id;
                                                }
                                                
                                                if (parent) {
                                                    const divName = checkElement(parent.parentElement)
                                                    console.log('div name =',divName)
                                                    const parentContent = Array.from(parent.childNodes);
                                                    const newParent = document.createElement('span');
                                                    parentContent.forEach(content => {
                                                        if (content === targetElement) {
                                                        const originalContent = Array.from(content.childNodes);
                                                        originalContent.forEach(original => {
                                                            newParent.appendChild(original.cloneNode(true));
                                                        });
                                                        } else {
                                                        newParent.appendChild(content.cloneNode(true));
                                                        }
                                                    });
                                                    parent.replaceWith(newParent);

                                                    let dumyComment:TComment[] = allBodySelectedText;
                                                    console.log('before ==',dumyComment)
                                                    let flag = false;
                                                    // classNameValue currentCommentIndex divName
                                                    for (let i =0; i< dumyComment.length; i++) {
                                                        const checkName = dumyComment[i].paraghragh_name===divName;
                                                        const checkClassName = dumyComment[i].comment_className === commentItem.comment_className;
                                                        const checkIndex = dumyComment[i].comment_index === commentItem.comment_index;
                                                        if (checkName && checkClassName && checkIndex) {
                                                            console.log('delete', dumyComment[i])
                                                            flag=true;
                                                            dumyComment.splice(i, 1);
                                                        }
                                                    }
                                                    setAllBodySelectedText(dumyComment);
                                                    setCommentFocusId('');
                                                } else {
                                                    console.log('parent is not.')
                                                }
                                            }}/>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* overall comments */}
                        <div className='comment-overall-wrap-div'>
                            <div className='comment-overall-label'>{'overall comments'}</div>
                            <textarea className='comment-overall-textarea resize-none disabled:bg-white'
                                disabled={(draftStatus===2||draftStatus===3) ? false:true}
                                onChange={(e)=>setOverallComment(e.currentTarget.value)}
                                value={overallComment}
                            ></textarea>
                        </div>
                        {/* buttons */}
                        <div className='comment-button-wrap-div'>
                            <div className='comment-button-close'
                                onClick={()=>{
                                    commonAlertOpen({
                                        head: 'Review 1st Draft',
                                        messages: [
                                            'Do you want to return to the main menu?'
                                        ],
                                        yesButtonLabel: 'Yes',
                                        noButtonLabel: 'No',
                                        yesEvent: async ()=>{
                                            navigate(`/LearningManagement/WritingHub/SparkWriting`);
                                            window.location.reload();
                                        }
                                    })
                                }}
                            />
                            <div className={(allBodySelectedText.length > 0 || overallComment.length > 0) ? (
                                draftStatus < 4 ? 'comment-button-save': 'comment-button-save-disabled'
                            ):'comment-button-save-disabled'} 
                                onClick={(allBodySelectedText.length > 0 || overallComment.length > 0) ? (
                                    draftStatus < 4 ? saveButtonEvent:()=>{}
                                ):()=>{}}
                            />
                            <div className={(allBodySelectedText.length > 0 && overallComment.length>0)? (
                                draftStatus < 4 ? 'comment-button-send': 'comment-button-send-disabled'
                            ):'comment-button-send-disabled'}
                                onClick={(allBodySelectedText.length > 0 || overallComment.length > 0) ? (
                                    draftStatus < 4 ? sendButtonEvent: ()=>{}
                                ):()=>{}}
                            />
                        </div>
                    </div>
                </div>
            )}
            {feedbackDataInStudent.defautInfo.step_label==='2nd Draft' && (
                <div className='comment-review-contents'
                    ref={boundaryRef}
                >
                    {/* 1st draft preview */}
                    <div className='final-draft-viewer-2nd-preview'
                        style={{width: `${divAResize.advisor.w===0? 400: divAResize.advisor.w}px`}}
                    >
                        <div className='flex flex-col w-full h-full pl-[20px] py-[20px]'>
                            <div className='flex flex-row relative min-h-[36px] h-[36px] items-center font-notoSansCJKKR text-[16px] text-[#222] leading-[1.13]'>
                                <span>1st Draft</span>
                                <span className='absolute top-0 right-0 flex gap-[5px]'>
                                    <PDFExportButton 
                                        userInfo={feedbackDataInStudent}
                                        title={feedbackDataInStudent.draft_data.draft_outline[0].input_content} body={printBodyText}
                                        draft={1}
                                    />
                                    <PrintExportButton 
                                        userInfo={feedbackDataInStudent}
                                        title={feedbackDataInStudent.draft_data.draft_outline[0].input_content} body={printBodyText}
                                        draft={1}
                                    />


                                </span>
                            </div>
                            <div id='draft-title-wrap-div'
                            className='flex flex-row mt-[10px] h-[42px] gap-[15px] font-notoSansCJKKR text-[13px] text-[#222] leading-[1.38] items-center'>
                                <div className='flex'>Title: </div>
                                <div className='draft-viewer-container-title'>
                                    {feedbackDataInStudent.draft_data && draftViewBox.loadFinalDraftTitle({feedbackDataInStudent: feedbackDataInStudent.draft_data.draft_outline, draft:'1'})}
                                </div>
                            </div>
                            <div id='draft-body-wrap-div' ref={container1stDraftBody}>
                                <div className='draft-viewer-container-body gap-[13px]'>
                                    {feedbackDataInStudent.draft_data && draftViewBox.loadFinalDraftBody({feedbackDataInStudent:feedbackDataInStudent.draft_data.draft_outline, draft: '1' })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 1st draft & 2nd draft divider */}
                    <div className='bg-white w-fit h-full flex flex-col items-center justify-center'
                    style={{ left: `${divAResize.divideAD.x}px` }}
                    ><div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/><SizeDragButtonSVG
                        className='h-[55px] hover:cursor-grab'
                        onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
                            const mouseMoveHandler = (moveEvent: MouseEvent) => {
                                const boundary = boundaryRef.current?.getBoundingClientRect();
                                
                                if (boundary) {
                                    // 2️⃣
                                    const deltaX = moveEvent.screenX - clickEvent.screenX;
                                    
                                    const resizeX = inrange(
                                        divAResize.divideAD.x + deltaX,
                                        // Math.floor(-boundary.width / 2 + 5 + 10),
                                        400,
                                        Math.floor(boundary.width- 5 - 10),
                                    )
                                    let dumyStates:TDivsControlConfig = JSON.parse(JSON.stringify(divAResize));
                                    dumyStates.advisor.w = resizeX
                                    dumyStates.divideAD.x = resizeX
                                    // 3️⃣
                                    setDivAResize(dumyStates);
                                }
                            };

                            const mouseUpHandler = () => {
                            document.removeEventListener('mousemove', mouseMoveHandler);
                            };

                            document.addEventListener('mousemove', mouseMoveHandler);
                            document.addEventListener('mouseup', mouseUpHandler, { once: true });
                        }}
                    
                    /><div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/></div>
                    
                    {/* 2nd draft student preview */}
                    <div className='final-draft-viewer-2nd-preview'
                        style={{
                            width: `${divAResize.draft.w}px`
                    }}>
                        <div className='flex flex-col w-full h-full pl-[20px] py-[20px]'>
                            <div className='flex flex-row final-component-title-label-font relative min-h-[36px] h-[36px]'>
                                <span>2nd Draft</span>
                                {feedbackDataInStudent.draft_2nd_data && (
                                    <span className='absolute top-0 right-0 flex gap-[5px]'>
                                        <PDFExportButton 
                                            userInfo={feedbackDataInStudent}
                                            title={feedbackDataInStudent.draft_2nd_data?.draft_outline[0].input_content} body={printBodyText}
                                            draft={2}
                                        />
                                        <PrintExportButton 
                                            userInfo={feedbackDataInStudent}
                                            title={feedbackDataInStudent.draft_2nd_data?.draft_outline[0].input_content} body={printBodyText}
                                            draft={2}
                                        />
                                    </span>
                                )}
                            </div>
                            {/* title */}
                            <div id='draft-title-wrap-div'
                            className='flex flex-row mt-[10px] h-[42px] gap-[15px] font-notoSansCJKKR text-[13px] text-[#222] leading-[1.38] items-center'>
                                <div className='flex'>Title: </div>
                                <div className='draft-viewer-container-title'>
                                    {feedbackDataInStudent.draft_2nd_data && draftViewBox.loadFinalDraftTitle({feedbackDataInStudent: feedbackDataInStudent.draft_2nd_data.draft_outline, draft:'2'})}
                                </div>
                            </div>
                            {/* body */}
                            <div id='draft-body-wrap-div'>
                                <div className='draft-viewer-container-body'>
                                    {feedbackDataInStudent.draft_2nd_data && draftViewBox.loadFinalDraftBody({feedbackDataInStudent:feedbackDataInStudent.draft_2nd_data.draft_outline, draft: '2' })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2nd draft & overall comments divider */}
                    <div className='bg-white w-fit h-full flex flex-col items-center justify-center'
                        style={{ left: `${divAResize.divideDC.x}px` }}
                    >
                        <div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/>
                        <SizeDragButtonSVG
                            className='h-[55px] hover:cursor-grab'
                            onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
                                const mouseMoveHandler = (moveEvent: MouseEvent) => {
                                    const boundary = boundaryRef.current?.getBoundingClientRect();
                                    if (boundary) {
                                        // 2️⃣
                                        const deltaX = moveEvent.screenX - clickEvent.screenX;
                                        const resizeX = inrange(
                                            divAResize.divideDC.x + deltaX,
                                            // Math.floor(-boundary.width / 2 + 5 + 10),
                                            400,
                                            Math.floor(boundary.width - 5 - 10),
                                        )
                                        let dumyStates:TDivsControlConfig = JSON.parse(JSON.stringify(divAResize));
                                        dumyStates.draft.w = resizeX
                                        dumyStates.divideDC.x = resizeX
                                        // 3️⃣
                                        setDivAResize(dumyStates);
                                    }
                                };

                                const mouseUpHandler = () => {
                                document.removeEventListener('mousemove', mouseMoveHandler);
                                };

                                document.addEventListener('mousemove', mouseMoveHandler);
                                document.addEventListener('mouseup', mouseUpHandler, { once: true });
                            }}
                        
                        />
                        <div className='flex h-[calc(50%-27.5px)] w-[1px] bg-[#d1d1d1]'/>
                    </div>

                    {/* overall comments & rubric evaluation */}
                    <div className='flex flex-1 flex-col bg-white h-full w-full min-w-[300px]'>
                        {/* final overall comment */}
                        <div className='flex flex-col flex-1 overflow-auto'>
                            <div className='flex flex-col w-full h-[214px] pr-[20px] pl-[13px] pt-[20px]'>
                                <div className='flex flex-row capitalize final-component-title-label-font'>{'overall comments'}</div>
                                <textarea className='comment-final-overall-textarea mt-[10px]'
                                    disabled={(draftStatus===2||draftStatus===3) ? false:true}
                                    placeholder='Input your overall comments for the 2nd draft.'
                                    onChange={(e)=>setFinalOverallComment(e.currentTarget.value)}
                                    value={finalOverallComment}
                                ></textarea>
                            </div>
                            {/* rubric evaluation */}
                            <div className='flex flex-col w-full pr-[20px] pl-[13px] mt-[28px] gap-[4px] bg-white'>
                                <div className='flex flex-row pt-[6px] h-[36px] capitalize final-component-title-label-font relative'>
                                    <div className='flex h-[36px]'>{'rubric evaluation'}</div>
                                    {/* <div className='rubric-magnifying-glass-button' /> */}
                                    <RubricTypeModalComponent 
                                        keyValue={'final-draft-rubric-modal'}
                                        rubric_type={`Unit ${feedbackDataInStudent.defautInfo.unit_index}. ${feedbackDataInStudent.defautInfo.unit_topic}`}
                                        rubric_type_datas={{
                                            data: feedbackDataInStudent.rubric.rubric_description,
                                            dataHead: rubricDataHead
                                        }}
                                        isFinalDraft={true}
                                    />
                                </div>
                                {/* rubric categories score select */}
                                <div className='flex flex-col gap-[5px] overflow-auto'>
                                    {draftViewBox.rubricEvaluation({rubricData: feedbackDataInStudent.rubric, rubricReportValue: rubricReportValue, draftStatus: feedbackDataInStudent.status? feedbackDataInStudent.status.status: 0, controlValue: rubricSelected, controlFn: setRubricSelectedItem})}
                                </div>
                            </div>
                        </div>

                        {/* buttons */}
                        <div className='flex w-full relative min-h-[81px] h-[81px] items-center border-t-[1px] border-t-[#e2e3e6] bg-white'>
                            <div className='absolute flex right-[20px] gap-[10px]'>
                                <div className='comment-button-close hover:cursor-pointer'
                                    onClick={()=>{
                                        commonAlertOpen({
                                            head: 'Evaluate 2nd Draft',
                                            messages: [
                                                'Do you want to return to the main menu?'
                                            ],
                                            yesButtonLabel: 'Yes',
                                            noButtonLabel: 'No',
                                            yesEvent: async ()=>{
                                                navigate(`/LearningManagement/WritingHub/SparkWriting`);
                                                window.location.reload();
                                            }
                                        })
                                    }}
                                />
                                <div className={finalTemporarySaveFlag? 'comment-button-save hover:cursor-pointer':'comment-button-save-disabled'}
                                    onClick={()=>draft2ndSave()}
                                />
                                <div className={finalCreateReportFlag? 'comment-button-create-report hover:cursor-pointer':'comment-button-create-report-disabled'}
                                    onClick={async ()=>draft2ndCreateReport()}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            )}
            
        </section>
    )
}

export default LearningManagementSparkWritingFeedbackPage;