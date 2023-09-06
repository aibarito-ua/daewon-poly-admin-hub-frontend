import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useNavStore from '../../store/useNavStore';
import useLearningManagementSparkWritingStore from '../../store/useLearningManagementSparkWritingStore';
import { SizeDragButtonSVG, CommentPlusIconSVG } from '../../util/svgs/heroIcons/SizeDragButtonSVG';
import draftViewBox from '../../components/commonComponents/customComponents/DraftViewBox';
import useControlAlertStore from '../../store/useControlAlertStore';
import { commonSvgIcons } from '../../util/svgs/commonSvgIcons';
import { draftFeedbackSend, draftFeedbackTemporarySave, getSparkWritingAdvisor } from '../../api/LearningManagement/LearningManagementSparkWriting.api';

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
        feedbackDataInStudent
    } = useLearningManagementSparkWritingStore();
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

    // return feedback data form -> "feedback_return"
    const [returnFeedback, setReturnFeedback] = React.useState<TReturnFeedback>({
        reason:'',
        teacher_comment: '',
        is_return: false
    });
    // 1st draft default data -> temporary save & send data form
    const [draftResultSendData, setDraftResultSendData] = React.useState<TAdminDraft1stCommentData>();

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

    // make data form for temporary save
    const makeData = async (flag?:string) => {
        const draft_id = parseInt(draftId);
        const overall_comment = overallComment;
        const feedback_return = returnFeedback;
        const comment:TCommentDataList = allBodySelectedText.map((commentItem) => {
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
        // screen data update
        const outlines = feedbackDataInStudent.draft_data.draft_outline;
        console.log('outline =',feedbackDataInStudent)
        
        // all screen datas
        let allCharScreenData:TParagraphScreenData[][] = [];
        // paragraph name for mapping
        let paragraphNames:string[] = []

        // screen data all full text
        let fullTextByScreenData:any[] = [];
        const remakeScreenData = outlines.map((outline, outlineIndex) => {
            paragraphNames.push(outline.name);
            let currentFullTextInScreenData = ''
            let returnScreenDataByCharSplit:TParagraphScreenData[] = [];
            const currentScreenData = outline.screen_data.map((screenData,screenDataIndex) => {
                let originalText = '';
                if (screenDataIndex > 0) {
                    const bf_data = outline.screen_data[screenDataIndex-1];
                    if (!bf_data.text.match(/(^\s)|(\s$)/gmi) && !screenData.text.match(/(^\s)|(\s$)/gmi)) {
                        // replace text기능에 띄어쓰기 없을때
                        if (bf_data.type===-1 && screenData.type===1) {
                            currentFullTextInScreenData += ' ';
                            const emptyScreenDataChar = {
                                text: ' ',
                                comment_index: -1,
                                type: 1
                            }
                            returnScreenDataByCharSplit.push(emptyScreenDataChar)
                        }
                    }
                }
                currentFullTextInScreenData += screenData.text;
                
                const spliteCharByText:TParagraphScreenData[] = screenData.text.split('').map((charData) => {
                    return {
                        text:charData,
                        comment_index:-1,
                        type: screenData.type
                    }
                })
                returnScreenDataByCharSplit.push(...spliteCharByText)
                return screenData;
            });
            if (currentScreenData) {
                fullTextByScreenData.push(currentFullTextInScreenData);
            }
            allCharScreenData.push(returnScreenDataByCharSplit);
        });
        // screen data split char replace comment index
        allCharScreenData=allCharScreenData.map((paragraphCharItem,paragraphCharIndex) => {
            // console.log('paragraph_index =',paragraphCharIndex)
            return paragraphCharItem.map((charItem,charIndex) => {
                // 모든 char를 순회하면서 comment start,end index와 맞는 데이터는 comment_index변경
                for (let i = 0; i < comment.length; i++) {
                    const currentName = comment[i].paragraph_name;
                    let findNameIndex = -1;
                    paragraphNames.map((v,i) => {
                        if (v===currentName) {findNameIndex=i};
                    });
                    if (findNameIndex === paragraphCharIndex) {
                        const st_index = comment[i].start_index;
                        const ed_index = comment[i].end_index;
                        if (charIndex >= st_index && charIndex <= ed_index) {
                            console.log('title =',findNameIndex)
                            console.log('st =',st_index,' , ed =',ed_index)
                            charItem.comment_index=comment[i].comment_index;
                        } else {
                            charItem.comment_index=-1;
                        }
                    }
                }
                return charItem;
            })
        })

        // 정리된 데이터를 전체 순회하면서 재정렬
        let replceAllScreenDataChartoString:TParagraphScreenData[][] = [];
        
        for (let pIdx = 0; pIdx < allCharScreenData.length; pIdx++) {
            // paragraph arr
            const pItem = allCharScreenData[pIdx];
            let currentParagraphScreenData:TParagraphScreenData[] = [];

            let text = '';
            let commentIdx:number=-1;
            let type:number=2;
            
            for (let cIdx = 0; cIdx < pItem.length; cIdx++) {
                const pItemText = pItem[cIdx].text;
                const pItemCommentIndex = pItem[cIdx].comment_index;
                const pItemType = pItem[cIdx].type;
                // char arr
                if (cIdx===0) {
                    text+=pItemText;
                    commentIdx = pItemCommentIndex;
                    type=pItemType;
                } else if (cIdx === pItem.length-1) {
                    // 이전 누적 데이터 푸쉬
                    text+=pItemText;
                    const pushData:TParagraphScreenData = {
                        text,
                        comment_index:commentIdx,
                        type
                    }
                    currentParagraphScreenData.push(pushData)
                } else {
                    if (type === pItemType) {
                        if (commentIdx === pItemCommentIndex) {
                            text += pItemText;
                        } else {
                            // 이전 누적 데이터 푸쉬
                            const pushData:TParagraphScreenData = {
                                text,
                                comment_index:commentIdx,
                                type
                            }
                            currentParagraphScreenData.push(pushData)

                            // push 후 누적값 초기화
                            // 새로운 데이터 누적 시작
                            text = pItemText;
                            commentIdx=pItemCommentIndex;
                            type=pItemType;
                        }
                    } else {
                        // 이전 누적 데이터 푸쉬
                        const pushData:TParagraphScreenData = {
                            text,
                            comment_index:commentIdx,
                            type
                        }
                        currentParagraphScreenData.push(pushData)

                        // push 후 누적값 초기화
                        // 새로운 데이터 누적 시작
                        text = pItemText;
                        commentIdx=pItemCommentIndex;
                        type=pItemType;
                    };
                };
            }; // for loop ended..
            replceAllScreenDataChartoString.push(currentParagraphScreenData);
        }
        // complete all data
        // console.log('replceAllScreenDataChartoString = ',replceAllScreenDataChartoString)
        // console.log('paragraphNames =',paragraphNames )
        const data:TCommentAllParagraphData = paragraphNames.map((paragraph, paragraphIdx) => {
            return {
                name: paragraph,
                screen_data: replceAllScreenDataChartoString[paragraphIdx]
            }
        });
        
        const responseData:TAdminDraft1stCommentData = {
            comment,
            data,
            draft_id,
            feedback_return,
            overall_comment
        };
        console.log('data ==',responseData)
        if (flag==='send') {
            console.log('send!')
            return await draftFeedbackSend(responseData);
        } else {
            // temporary save data 
            return await draftFeedbackTemporarySave(responseData);
        }
        // return false;
    };
    
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
        
        // draft find
        // console.log('feedbackDataInStudent did =',feedbackDataInStudent)
        setDraftId(feedbackDataInStudent.defautInfo.select_draft_id);
        return () => {
            setDraftId('');
            setAdvisor({draft_index:-1,draft_outline:[]})
            window.removeEventListener('click', handleBodyCommentClick)
            window.removeEventListener('click', handleTitleCommentClick)
        }
    },[])
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
                    <span>{`Highlight the selected parts you want to correct, then right-click to leave a correction comment.`}</span>
                    <span>{`Writing Advisor will also provide correction advice for you to refer to when writing correction comments.`}</span>
                </div>
                <div className='learning-management-feedback-return-button' />
            </div>

            <div className='comment-review-contents'
                ref={boundaryRef}
                >
                {!advisorOpen && (
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
                                        const originalSentence = advisorParagraphItem.original_text;
                                        const originalSentenceName = advisorParagraphItem.name;
                                        if (originalSentenceName==='Title') {
                                            return (
                                                <div className='flex h-fit'>{`Title: ${originalSentence}`}</div>
                                            )
                                        } else {
                                            return (
                                                <div className='flow-root h-fit'><span className='pl-[10px]'/>{originalSentence}</div>
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
                                        const originalSentence = advisorParagraphItem.original_text;
                                        const originalSentenceName = advisorParagraphItem.name;
                                        if (originalSentenceName==='Title') {
                                            return (
                                                <div className='flex h-fit'>{`Title: ${originalSentence}`}</div>
                                            )
                                        } else {
                                            return (
                                                <div className='flow-root h-fit'><span className='pl-[10px]'/>{originalSentence}</div>
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
                                onContextMenu={(e)=>titleDragHandlerSelection(e)}
                            >
                                { feedbackDataInStudent && draftStatus===2 && draftViewBox.draftTitle({feedbackDataInStudent})}
                                { feedbackDataInStudent && draftStatus>2 && draftViewBox.loadTemporaryDraftTitle({feedbackDataInStudent, setCommentFocusId})}

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
                                onContextMenu={(e) => bodyDragHandlerSelection(e)}
                            >
                                {/* 화면 처음 초기화면 사용 */}
                                {feedbackDataInStudent && draftStatus===2 && draftViewBox.draftBody({feedbackDataInStudent})}
                                {/* 임시 저장 후 사용 */}
                                {feedbackDataInStudent && draftStatus>2 && draftViewBox.loadTemporaryDraftBody({feedbackDataInStudent,setCommentFocusId})}
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
                                return (
                                    <div className='comment-wrapper'
                                    key={commentItem.comment_className}
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
                                        <input className='comment-input'
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
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* overall comments */}
                    <div className='comment-overall-wrap-div'>
                        <div className='comment-overall-label'>{'overall comments'}</div>
                        <textarea className='comment-overall-textarea'
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
                        <div className={(allBodySelectedText.length > 0 || overallComment.length > 0) ? 'comment-button-save':'comment-button-save-disabled'} 
                            onClick={(allBodySelectedText.length > 0 || overallComment.length > 0) ? ()=>{
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
                            }:()=>{}}
                        />
                        <div className={(allBodySelectedText.length > 0 && overallComment.length>0)? 'comment-button-send':'comment-button-send-disabled'} 
                            onClick={(allBodySelectedText.length > 0 || overallComment.length > 0) ? ()=>{
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
                            }:()=>{}}
                        />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default LearningManagementSparkWritingFeedbackPage;