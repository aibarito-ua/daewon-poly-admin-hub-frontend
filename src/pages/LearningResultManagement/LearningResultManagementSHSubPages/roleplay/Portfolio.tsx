import React, { FC, SVGAttributes } from "react";
import useActivitySpeakHubStore from "../../../../store/useActivitySpeakHubStore";
import useNavStore from "../../../../store/useNavStore";
import { cf } from "../../../../util/common/commonFunctions";
import { useComponentWillMount } from "../../../../hooks/useEffectOnce";
import DebouncedDropdowFilter from "../../../../components/commonComponents/BasicTable/stateDebouncedDropdown";
import { SvgSearchIcon } from "../../../../components/commonComponents/BasicTable/svgs/SearchIcon";
import LRMSpeakingHubTable from "../../../../components/commonComponents/BasicTable/LRMSpeakingHubTable";
import { getLMRSpeakingHubAllCampusDataAPI, getLMRSpeakingHubFilterDataAPI, getLMRSpeakingHubLevelsOfCampusDataAPI, getLMRSpeakingHubStudents } from "../../../../api/LearningResultManagement/LearningResultManagementSpeakingHub";
import useLearningResultManagementSHStore from "../../../../store/useLearningResultManagementSHStore";
import { QuestionReportIcon } from "../LearningResultManagementIcons";
import useControlAlertStore from "../../../../store/useControlAlertStore";

const Portfolio = () => {
    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {
        sideNav,
        filterData, setFilterData, studentDataInClass, setStudentDataInClass,
        loadDataHead,
        chosenCampus, chosenLevel, chosenClass,
        setChosenCampus, setChosenLevel, setChosenClass,
        dropdown,
        isAllSelected, selectFilterValues,
        setSearchFunction
    } = useLearningResultManagementSHStore();
    const {
        commonStandbyScreen, setCommonStandbyScreen
    } = useControlAlertStore();
    
    // page states
    const [emptyPageMessage, setEmptyPageMessage] = React.useState<string>('검색 값을 선택 후 조회하세요.');
    // const [filterStates, setFilterStates]=React.useState<TFilterLRMSpeaking>();
    
    // searchValue
    const [selectCampusCode, setSelectCampusCode] = React.useState<{name:string, code:string}>(chosenCampus ?? {name:'',code:''});
    const [selectLevelCode, setSelectLevelCode] = React.useState<{name: string, code: string}>(chosenLevel ?? {name:'',code:''});
    const [selectClassCode, setSelectClassCode] = React.useState<{name: string, code: string}>(chosenClass ?? {name:'',code:''});

    // select search target value list
    // const [selectFilterCampusList, setSelectFilterCampusList] = React.useState<string[]>([]);
    // const [selectFilterLevelList, setSelectFilterLevelList] = React.useState<string[]>([]);
    // const [selectFilterClassList, setSelectFilterClassList] = React.useState<string[]>([]);

    // original filter values
    const [filterAllList, setFilterAllList] = React.useState<TFilterLRMSpeaking>(filterData ?? {campus:[],semester: 0,year:0});
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    // const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    // studen table data
    const [classCurrentData,setClassCurrentData] = React.useState<TLRMSpeakingHubTableCellData[][]>();
    const [classTableHead, setClassTableHead] = React.useState<string[]>([]);

    const TopicReport: FC<{topic: TLRMSpeakingHubRolePlayTopic}> = ({topic}) => {
        try {
            const conversation: string[][] = JSON.parse(topic.summary)

            return (
                <div>
                    <div style={{display: 'none'}}>
                        <audio controls className="mt-[14px] mb-[14px] h-[29px]">
                            <source src="horse.ogg" type="audio/ogg"/>
                            <source src="horse.mp3" type="audio/mpeg"/>
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                    <div className="learning-result-management-portfolio-text-box">
                        <table>
                            {conversation.map((turn) => (
                                <tr>
                                    <td className="learning-result-management-portfolio-text-span" style={{fontWeight: 500, textAlign: 'right', verticalAlign: 'top' }}>{turn[0]}:</td>
                                    <td style={{paddingLeft: '1rem'}}>
                                        {turn[1].split('\n').map((speech) => (
                                            <p className="learning-result-management-portfolio-text-span ">{speech}</p>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    
                </div>
            )
        } catch {
            return (
                <div>
                    <div style={{display: 'none'}}>
                        <audio controls className="mt-[14px] mb-[14px] h-[29px]">
                            <source src="horse.ogg" type="audio/ogg"/>
                            <source src="horse.mp3" type="audio/mpeg"/>
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                    <div className="learning-result-management-portfolio-text-box">
                    </div>
                </div>
            )
        }
    }
    React.useEffect(()=>{
        console.log('component did mount')
        handleSearch()
        setSearchFunction(searchEventFunction)
    },[])

    React.useEffect(()=>{
        setSearchFunction(searchEventFunction)
    }, [chosenCampus, chosenLevel, chosenClass])
    React.useEffect(()=>{
        if (grouping.length === 0) {
            setGrouping(['year','semester','grade','level'])
        }
        
        return () => {
            setSelectNavigationTitles([])
            // setIsAllSelected(false)
        }
    }, [grouping])
    React.useEffect(()=>{
        if (selectNavigationTitles.length === 0) {
            setSelectNavigationTitles(['학습 결과 관리', 'Speaking Hub', 'Idea Exchange','Progress'])
        }
    }, [selectNavigationTitles])
    
    const handleSearch = async () => {
        if (isAllSelected) {
            let check = true;
            const maxLength = selectFilterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFilterValues[selectIndex];
                if (currentSelectValue===''||currentSelectValue===null) {
                    check = false;
                    break;
                }
            }
            if (check && chosenCampus && chosenLevel && chosenClass) {
                setCommonStandbyScreen({openFlag: true})
                if(chosenCampus)
                    setSelectCampusCode(chosenCampus)
                if(chosenLevel)
                    setSelectLevelCode(chosenLevel)
                if(chosenClass)
                    setSelectClassCode(chosenClass)
                console.log('props.selectFIlterValues =', selectFilterValues)
                console.log('filter items ==',chosenCampus,chosenLevel,chosenClass)
                const reqData:TFindStudentsReq = {
                    campusCode:chosenCampus.code,
                    levelCode:chosenLevel.code,
                    classCode:chosenClass.code
                }
                // TODO change the response here
                const rsp = await getLMRSpeakingHubStudents(reqData);
                setCommonStandbyScreen({openFlag: false})
                console.log('stu rsp ==',rsp)

                if(!rsp.role_play) {
                    console.log('role-play is null')
                    setStudentDataInClass({idea_exchange: null, story_vlog: rsp.story_vlog, role_play: {students: []}})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                    return
                }

                if (rsp.role_play.students.length > 0) {
                    // table data setting
                    makeTableData(rsp.role_play)
                    setStudentDataInClass(rsp)
                    setIsSearch(true)
                } else {
                    setStudentDataInClass({idea_exchange: rsp.idea_exchange, story_vlog: rsp.story_vlog, role_play: {students: []}})
                    setEmptyPageMessage('No data to display!')
                    setIsSearch(false)
                }
            } else {
                setIsSearch(false)
                setStudentDataInClass({idea_exchange: null, story_vlog: null, role_play: {students: []}})
                setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
                console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
            setStudentDataInClass({idea_exchange: null, story_vlog: null, role_play: {students: []}})
            setEmptyPageMessage('검색 값을 선택 후 조회하세요.')
        };
    }

    const searchEventFunction = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log('allSelected =',isAllSelected)
        handleSearch()
    }
    const makeTableData = (rsp: TLRMSpeakingHubRolePlay) =>{
        // we assume that month.length > 0 and quessions.length > 0
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
        const monthIdxs = rsp.students[0].months.map((month) => month.month_index)
        const topicIdxs = Array.from({length: rsp.students[0].months[0].topics.length}, (_,valueKIdx) => {return valueKIdx+1});
        let rowKeys:string[] =['no','student'];
        for (let monthIdx=0; monthIdx<monthIdxs.length; monthIdx++) {
            for (let tIdx=0; tIdx<topicIdxs.length; tIdx++) {
                const textMonthTopic = `month_${monthIdxs[monthIdx]}_${tIdx + 1}`; // month_x_i
                rowKeys.push(textMonthTopic)
            }
        }
        console.log('rowKeys ==',rowKeys)
        
        setClassTableHead(rowKeys);
        const bodyData: TLRMSpeakingHubTableCellData[][] = [];
        // // 학생 수 -> row
        for (let row = 0; row < rsp.students.length; row++) {
            const targetStudent = rsp.students[row];
            const student_name_kr = targetStudent.student_name_kr
            const student_name_en = targetStudent.student_name_en
            const studentNameSet:TNamesetData = {student_name_kr,student_name_en};
            const number_of_topics: number = targetStudent.months[0].topics.length; // we assume that the number of months is bigger than 0
            let rowData = []
            for (let col = 0; col < rowKeys.length; col++) {
                const monthIndex = parseInt(rowKeys[col].split('_')[1])
                const monthNumber = targetStudent.months.findIndex((month) => month.month_index == monthIndex) + 1
                if (col===0) {
                    // NO
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 70,
                        value:{
                            num:row+1,
                            data:null,
                            nameset:null,
                            show: false,
                            jsxElem:null,
                            modalContent:null
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                } else if (col===1) {
                    // username
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 140,
                        value:{
                            num:0,
                            nameset:studentNameSet,
                            data:null,
                            show: false,
                            jsxElem:null,
                            modalContent:null
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                } else {
                    // Topic data
                    const makeCellData:TLRMSpeakingHubTableCellData = {
                        key: rowKeys[col],
                        width: 60,
                        title: 'Role-play Portfolio',
                        student: {...studentNameSet, class: selectClassCode.name},
                        value:{
                            num:0,
                            nameset: null,
                            description: `${monthNames[monthIndex - 1]} - Topic ${targetStudent.months[monthNumber - 1].topics[(col - 2) % number_of_topics].topic_index}`,
                            data: {
                                month: targetStudent.months[monthNumber - 1]
                            },
                            show: targetStudent.months[monthNumber - 1].topics[(col - 2) % number_of_topics].is_completed,
                            jsxElem: <QuestionReportIcon className='learning-management-class-table-complete-question-icon'/>,
                            modalContent: <TopicReport topic={targetStudent.months[monthNumber - 1].topics[(col - 2) % number_of_topics]} />
                        },
                        rowspan: 1,
                        print:true,
                        dataIndex: [row,col]
                    }
                    rowData.push(makeCellData)
                }
            }
            bodyData.push(rowData)
        }

        console.log('bodyData =',bodyData)
        if (bodyData.length>0) {
            setClassCurrentData(bodyData)
        }
    }

    return (
        <div className='section-common-table-wrap-div bg-white'>
            {/* table */}
            {isSearch ? (
                <div className="flex flex-col">
                    <div className="flex flex-row h-[41px] py-[11px] pl-[21px] pr-[10px] bg-[#f5f5f5] border-t-[1px] border-t-[#ddd] border-b-[1px] border-b-[#ddd]">
                        <div className="learning-management-class-info-text justify-start">{`${filterAllList.year}년 ${filterAllList.semester}학기 / ${selectCampusCode.name} / ${selectLevelCode.name} / ${selectClassCode.name}`}</div>
                        {/* <div className="learning-management-class-info-text justify-end">{`* 현재 학기에 대해서만 Spark Writing 첨삭이 가능합니다.`}</div> */}
                    </div>
                    {/* <div className="flex flex-row h-[50px] items-center pl-[21px]">
                        <div className="flex flex-row items-center h-[24px] gap-[8px]">
                            <div className="flex border-l-[3px] h-[12px] border-l-[#0fa9cb]"/>
                            <div className="flex learning-management-book-info-text">{`Book: ${studentDataInClass?.idea_exchange?.book_name}`}</div>
                        </div>
                    </div> */}
                    <div className="flex flex-row">
                        <LRMSpeakingHubTable
                            dataHead={classTableHead}
                            dataModel={classCurrentData?classCurrentData:[]}
                            subHeadingsCount={studentDataInClass?.role_play?.students?.[0]?.months?.[0]?.topics?.length ?? 2}
                        />
                    </div>
                </div>

            ): null}
            <div className={`justify-center items-center ${isSearch ? 'w-0 h-0' :'w-full h-full flex flex-1'}`}>
                <p className='flex flex-row text-[#bfbfbf] text-2xl'>{isSearch ? '':emptyPageMessage}</p>
            </div>
        </div>
    )

}
export default Portfolio;