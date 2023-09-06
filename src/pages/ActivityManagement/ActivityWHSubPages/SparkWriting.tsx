import React from 'react';
import DebouncedDropdowFilter from '../../../components/commonComponents/BasicTable/stateDebouncedDropdown';
import TableComponent from '../../../components/commonComponents/BasicTable/SparkWritingTable';
import { SvgSearchIcon } from '../../../components/commonComponents/BasicTable/svgs/SearchIcon';
import useNavStore from '../../../store/useNavStore';
import { cf } from '../../../util/common/commonFunctions';
import useActivityWritingHubStore from '../../../store/useActivityWritingHubStore';
// import { PopupModalComponent } from '../../../components/toggleModalComponents/popupModalComponent';
// import PopupCustomModalComponent from '../../../components/toggleModalComponents/PopupCustomModalComponent';
import {createBrowserHistory} from 'history'
import { useCallbackPrompt } from '../../../hooks/useCallbackPrompt';
import PromptBlockComponent from '../../../components/toggleModalComponents/PromptBlockComponent';
import useControlAlertStore from '../../../store/useControlAlertStore';
import { useComponentWillMount, useEffectOnce } from '../../../hooks/useEffectOnce';
import { getActivityManagementSparkWritingDataAPI, setActivityManagementSparkWritingOutlineAPI } from '../../../api/ActivityManagement/ActivityManagementWriting.api';

export type TTableDataModel = {
    key: string,
    value: any,
    rowspan: number,
    print: boolean,
    originIndex: number,
    unitId?:number,
    outlineFormatIndex?:number
}[][]
export const history = createBrowserHistory();
const SparkWriting = () => {
    // page usehook zustand
    const {
        commonAlertOpen, 
    } = useControlAlertStore();
    const {
        selectNavigationTitles, setSelectNavigationTitles,
        navigateBlockFlag,
        setNavigateBlockFlag, setNavigateBlockMessage,
        setNavigateBlockAlertYesFn, setNavigateBlockAlertNoFn,
    } = useNavStore();
    const {
        loadData, loadDataHeadKor, sortRules, 
        loadDataUpdateFlag,loadDataUpdateFlagInit,
        setSparkWritingData, setSparkWritingHeadData,
        setLoadDataSparkWritingInput
    } = useActivityWritingHubStore();

    // page states
    // Table Data 
    const [data, setData] = React.useState<{body:TActivitySparkWritingBooks[], head: TLoadDataHeadTrans[]}>({body:[],head:[]});
    
    // search values
    const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','','']);

    // select search target value list
    const [selectFilterYearList, setSelectFilterYearList] = React.useState<string[]>([]);
    const [selectFilterSemesterList, setSelectFilterSemesterList] = React.useState<string[]>([]);
    const [selectFilterLevelList, setSelectFilterLevelList] = React.useState<string[]>([]);
    
    // merge in table body value's keys
    const [grouping, setGrouping] = React.useState<string[]>([]);
    // isFilter data selected complete flag
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    // is started search check flag
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    // table control
    const [tableDataModel, setTableDataModel] = React.useState<TTableDataModel>([]);
    const setInputChangeTableDataModelState = (text:string, pageStateIndex:{
        rowIndex:number, cellIndex:number
    }, storeIndex: {
        unitId:number, outlineFormatIndex:number
    }) => {
        let dumpPageStateData = JSON.parse(JSON.stringify(tableDataModel));
        dumpPageStateData[pageStateIndex.rowIndex][pageStateIndex.cellIndex].value = text;

        setLoadDataSparkWritingInput(text, storeIndex.unitId, storeIndex.outlineFormatIndex)
        setTableDataModel(dumpPageStateData)
    }

    // page input control
    const [startUpdateInputsFlag, setStartUpdateInputsFlag] = React.useState<boolean>(false); 
    const [enableSaveButtonFlag, setEnableSaveButtonFlag] = React.useState<boolean>(false);
    const [isInputEmpty, setIsInputEmpty] = React.useState<boolean>(false);

    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isInputEmpty);

    // initialize setting before render screen
    const beforRenderedFn = async () => {
        const loadDataFromAPI = await getActivityManagementSparkWritingDataAPI(sortRules);
        console.log('response data =',loadDataFromAPI)
        const yearFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'year')
        const semesterFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'semester')
        const levelFilterValues:string[] = cf.basicTable.setFilterProperty(loadDataFromAPI.body, 'level')
        setSelectFilterYearList(yearFilterValues)
        setSelectFilterSemesterList(semesterFilterValues)
        setSelectFilterLevelList(levelFilterValues)
        setSparkWritingData(loadDataFromAPI.body)
        setSparkWritingHeadData(loadDataFromAPI.head)

        setData({
            body: loadDataFromAPI.body,
            head: loadDataFromAPI.head
        })
    }

    useComponentWillMount(()=>{
        console.log('component will mount')
        beforRenderedFn();
    })
    React.useEffect(()=>{
        console.log('component did mount')
        // if (data.body.length===0) {
        //     beforRenderedFn();
        // }
    },[])
    
    // input check effect
    React.useEffect(()=>{
        if (navigateBlockFlag) {
            let message:string[] = [];
            console.log('flag =',loadDataUpdateFlag)
            if (loadDataUpdateFlag===0) {
                message.push("입력된 내용이 없습니다.","저장하지 않고 화면 이동 하시겠습니까?")
                setNavigateBlockAlertYesFn(()=>{

                })
                setNavigateBlockAlertNoFn(()=>{

                })
            } else if (loadDataUpdateFlag===1){
                message.push("입력한 내용을 저장하시겠습니까?")
                setNavigateBlockAlertYesFn(()=>{

                })
                setNavigateBlockAlertNoFn(()=>{
                    
                })
            }
            setNavigateBlockMessage(message);
        }
    }, [loadData, navigateBlockFlag])

    // // page unload check
    React.useEffect(()=>{
        const beforeUnloadListener = (e:BeforeUnloadEvent) => {
            e.preventDefault();
            // return (e.returnValue = '');
            e.returnValue = "";
            // commonAlertOpen({
            //     head: 'outline format - text input',
            //     messages: ['저장을 완료 후 뒤로가기가 가능합니다.'],
            //     yesButtonLabel: 'OK',
            //     useOneButton: true,
            //     yesEvent: ()=>{
                    
            //     },
            // })
        }
        const popstateListener = (e:PopStateEvent) => {
            // alert('저장을 완료 후 뒤로가기가 가능합니다.')
            commonAlertOpen({
                head: 'outline format - text input',
                messages: ['저장을 완료 후 뒤로가기가 가능합니다.'],
                yesButtonLabel: 'OK',
                useOneButton: true,
                yesEvent: ()=>{
                    
                },
                // closeEvent: () => {
                //     setEnableSaveButtonFlag(false);
                //     setNavigateBlockFlag(false);
                // }
            })
            window.history.pushState(null, "", window.location.href)
            console.log('href ==',window.location.href)
            console.log('popState =',e)
        }
        if (enableSaveButtonFlag) {
            window.addEventListener("beforeunload", beforeUnloadListener, {capture:true})

            window.history.pushState(null, "", window.location.href)
            window.addEventListener("popstate",popstateListener, {capture:true} )
            
        } else {
            // window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true})
        }
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true})
            window.removeEventListener("popstate",popstateListener, {capture:true} )
        }
    },[enableSaveButtonFlag])

    React.useEffect(()=>{
        if (grouping.length === 0) {
            setGrouping(['year','semester','level'])
        }
        return () => {
            setSelectNavigationTitles([])
            setIsAllSelected(false);
            setEnableSaveButtonFlag(false);
            loadDataUpdateFlagInit();
            setStartUpdateInputsFlag(false);
            setNavigateBlockFlag(false);
        }
    }, [grouping])
    React.useEffect(()=>{
        let selectCheck = false;
        for (let checkIndex = 0; checkIndex < selectFIlterValues.length; checkIndex++) {
            const targetSelectValue = selectFIlterValues[checkIndex];
            if (targetSelectValue==='') {
                selectCheck=true;
                break;
            }
        }
        if (selectCheck) {
            setIsAllSelected(false);
        } else {
            setIsAllSelected(true);
        }
        setIsSearch(false)
        setStartUpdateInputsFlag(false)
    }, [selectFIlterValues])

    const makeTableData = ():{
        key: string;
        value: any;
        rowspan: number;
        print: boolean;
        originIndex:number;
    }[][] => {
        
        let tableDatas:TActivitySparkWritingBooks[]=[];
        tableDatas = loadData.spark_writing;
        console.log('originData =',loadData)

        let dataModel:TTableDataModel = [];
        
        const headers = loadDataHeadKor.spark_writing;
        const initRowData = headers.map((headItem)=>{
            const keyC = headItem.accessor
            if (headItem.accessor === 'year'|| headItem.accessor==='semester'||headItem.accessor==='level'||headItem.accessor==='book') {
                return {
                    key:keyC,
                    value: tableDatas[0][headItem.accessor],
                    rowspan:1,
                    print:true,
                    originIndex: 0
                }
            } else {
                return {
                    key:keyC,
                    value: '',
                    rowspan:1,
                    print:true,
                    originIndex: 0
                }
            }
            
        })
        dataModel.push(initRowData)
        // unit row
        for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
            // unit data
            const rowD = tableDatas[dataIndex];
            const addRowOLForm = rowD.outline_format.outline_format;

            for (let rowIndex = 0; rowIndex < addRowOLForm.length; rowIndex++) {
                if (rowIndex===0) {
                    const unitHeadRow = headers.map((headItem)=>{
                        const dataModelIndex = dataModel.length;
                        const keyC = headItem.accessor
                        let pushValue:any = '';
                        if (keyC === 'year'||keyC==='semester'||keyC==='level'||keyC==='book'||keyC==='topic'||keyC==='rubric') {
                            pushValue=tableDatas[dataIndex][keyC];
                        } else if (keyC==='unit') {
                            pushValue=tableDatas[dataIndex]['unit_index']
                        } else {
                            pushValue=''
                        }
                        return {
                            key:keyC,
                            value: pushValue,
                            rowspan:1,
                            print:true,
                            originIndex: dataModelIndex
                        }
                    })
                    dataModel.push(unitHeadRow)
                }
                const unitRow = headers.map((headItem) => {
                    const dataModelIndex = dataModel.length;
                    const pushKey = headItem.accessor;
                    const outlineData = tableDatas[dataIndex].outline_format.outline_format[rowIndex];
                    let pushValue:any = ''
                    let unitId:number|undefined=undefined;
                    let outlineFormatIndex:number|undefined=undefined;
                    if (pushKey==='unit') {
                        pushValue = tableDatas[dataIndex]['unit_index']
                    } else if (pushKey==='outline_form') {
                        pushValue=outlineData.name;
                    } else if (pushKey==='outline_index') {
                        pushValue=outlineData.order_index
                    } else if (pushKey==='outline_text') {
                        pushValue=outlineData.content
                        unitId=rowD.unit_id;
                        outlineFormatIndex=outlineData.order_index-1;
                    } else if (pushKey==='outline_format_type'||pushKey==='rubric_type') {
                        pushValue=''
                    } else {
                        pushValue=tableDatas[dataIndex][pushKey]
                    }

                    return {
                        key:pushKey,
                        value: pushValue,
                        rowspan:1,
                        print:true,
                        originIndex: dataModelIndex,
                        unitId: unitId!==undefined ? unitId:undefined,
                        outlineFormatIndex: outlineFormatIndex!==undefined ? outlineFormatIndex: undefined
                    }
                });
                dataModel.push(unitRow)
            }
        }
        dataModel = dataModel.filter((v,i) => {
            if (v.length!==0) return v;
        });
        
        
        console.log('filter =',selectFIlterValues)
        // search filter
        dataModel = dataModel.filter((item, idx) => {
            const search1 = item[0].value.toString() === selectFIlterValues[0];
            const search2 = item[1].value.toString() === selectFIlterValues[1];
            const search3 = item[2].value.toString() === selectFIlterValues[2];
            if (search1 && search2 && search3) {
                return item;
            }
        })

        const rowMergeKey = ['year','semester','level','book','unit']
        for (let i = 1; i< dataModel.length; i++) {
            for (let j = 0; j < dataModel[i].length; j++) {
                let flagMerge = false;
                for (let z = 0; z < rowMergeKey.length; z++) {
                    if (dataModel[i][j].key === rowMergeKey[z]) {
                        flagMerge=true;
                        break;
                    }
                }
                if (flagMerge) {
                    if (j>0) {
                        // row cell merge (row span) 
                        for (let k = i-1; k >= 0&&dataModel[i][j].value===dataModel[k][j].value&&dataModel[k+1][j-1].print===false; k--) {
                            dataModel[k][j].rowspan = dataModel[k][j].rowspan+1;
                            dataModel[k+1][j].print = false;
                        } // turn print
                    } else {
                        // row cell merge (row span)
                        for (let k = i-1; k >= 0&&dataModel[i][j].value===dataModel[k][j].value; k--) {
                            dataModel[k][j].rowspan = dataModel[k][j].rowspan+1;
                            dataModel[k+1][j].print = false;
                        } // turn print
                    }
                }
            }// for cell
        } // for row
        console.log('dataModal: ',dataModel)
        return dataModel;
    }

    const searchEventFunction = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        // console.log('is test =',isAllSelected)
        if (isAllSelected) {

            let check = true;
            const maxLength = selectFIlterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFIlterValues[selectIndex];
                // console.log('currentSelectValue =',currentSelectValue, ', idx =',selectIndex)
                if (currentSelectValue===''||currentSelectValue===null) {
                    check = false;
                    break;
                }
            }
            if (check) {
                const makeTableDataModel = makeTableData();
                console.log('modal =',makeTableDataModel)
                if (makeTableDataModel.length > 0) {
                    setStartUpdateInputsFlag(true)
                    setTableDataModel(JSON.parse(JSON.stringify(makeTableDataModel)))
                } else {
                    setStartUpdateInputsFlag(false)
                }
                setIsSearch(true)
            } else {
                setIsSearch(false)
                // console.log('search is not all selected')
            }
        } else {
            setIsSearch(false)
        };
    }

    React.useEffect(()=>{
        if (selectNavigationTitles.length === 0) {
            setSelectNavigationTitles(['Activity 관리', 'Writing Hub', 'Spark Writing'])
        }
    }, [selectNavigationTitles])

    return (
        
        <div className='section-common-canvas'>
            {/* filter row */}
            <div className='scetion-common-filter-row-div-spark  border-b-[1px] border-b-[#111] bg-white'>
                <div className='flex flex-row py-[11px] pl-[20px] border-b'>
                    <div className='section-common-filter-columns-div'>
                        {/* filter 1 : Year */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='년도'
                            column={selectFilterYearList}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[0] = value
                                setSelectFilterValues(dumySelectFilterValues)
                            }}
                            value={selectFIlterValues[0]}
                            originData={data}
                            table={data}
                        />
                        {/* filter 2 : Semester */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='학기'
                            column={selectFilterSemesterList}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[1] = value
                                setSelectFilterValues(dumySelectFilterValues)
                                
                            }}
                            value={selectFIlterValues[1]}
                            originData={data}
                            table={data}
                        />
                        {/* filter 3 : Level */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='Level'
                            column={selectFilterLevelList}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[2] = value
                                setSelectFilterValues(dumySelectFilterValues)
                                
                            }}
                            value={selectFIlterValues[2]}
                            originData={data}
                            table={data}
                        />
                    </div>
                        
                    <button className={`Filter-search-button ${
                            isAllSelected ? 'section-common-filter-search-active': 'section-common-filter-search-normal'
                        }`}
                        disabled={!isAllSelected}
                        onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>searchEventFunction(e)}
                    ><span className='flex'><SvgSearchIcon className='w-5 h-5'/></span><span className='text-white'>{'Search'}</span>
                    </button>
                </div>
                {isSearch && <div className='flex flex-row justify-between bg-[#f5f5f5] h-[40px] w-full text-center items-center'>
                    <div ></div>
                    <div>
                        <span className='pr-[10px] text-[13px]'>
                            {`* 진행 학기에 대해서는 Outline Format - Text 수정이 불가합니다.`}
                        </span>
                    </div>
                </div>}
                </div>
                <div className='section-common-table-wrap-div'>
                {/* table */}
                {isSearch ? 
                <TableComponent 
                    enableSaveButtonFlag={enableSaveButtonFlag}
                    dataModel={tableDataModel}
                    table={data}
                    filterValues={ isSearch ? selectFIlterValues: []}
                    isSearch={isSearch}
                    options={{
                        sortEventTargetHeaderKeys:['level'],
                        mergeRowSpanKeys: grouping,
                    }}
                    updateInputText={setInputChangeTableDataModelState}
                />
                : null}


                <div className={`justify-center items-center ${isSearch ? 'w-0 h-0' :'w-full h-full flex flex-1'}`}>
                    <p className='flex flex-row text-[#bfbfbf] text-2xl'>{isSearch ? '':'검색 값을 선택 후 조회하세요.'}</p>
                </div>
            </div>
                <footer className={`${startUpdateInputsFlag ? 'buttons-div':'hidden'}`}>
                    <div className={!enableSaveButtonFlag ? 'buttons-div-button':'buttons-div-button-disabled'}
                        onClick={()=>{
                            if (!enableSaveButtonFlag) {
                                commonAlertOpen({
                                    head: 'outline format - text input',
                                    messages: ['입력한 내용을 수정하시겠습니까?'],
                                    yesEvent: ()=>{
                                        setEnableSaveButtonFlag(true);
                                        setNavigateBlockFlag(true);
                                    },
                                    closeEvent: () => {
                                        setEnableSaveButtonFlag(false);
                                        setNavigateBlockFlag(false);
                                    }
                                })
                            }
                        }}
                    >{'수정'}</div>
                    <div className={enableSaveButtonFlag ? 'buttons-div-button':'buttons-div-button-disabled'} 
                        onClick={()=>{
                            if (enableSaveButtonFlag) {
                                commonAlertOpen({
                                    head: 'outline format - text input',
                                    messages: ['입력한 내용을 저장하시겠습니까?'],
                                    yesEvent: async ()=>{
                                        const unitId = tableDataModel[2][8].unitId;
                                        if (unitId!==undefined) {
                                            let outline_format:TOLContentItem[] = [];
                                            const targetDataDumy = loadData.spark_writing;
                                            for (let i = 0; i < targetDataDumy.length; i++) {
                                                if (targetDataDumy[i].unit_id === unitId) {
                                                    outline_format = targetDataDumy[i].outline_format.outline_format;
                                                }
                                            }
                                            await setActivityManagementSparkWritingOutlineAPI(unitId, outline_format );
                                            
                                            setEnableSaveButtonFlag(false);
                                            setNavigateBlockFlag(false);
                                        }
                                    },
                                    closeEvent: () => {
                                        setEnableSaveButtonFlag(false);
                                        setNavigateBlockFlag(false);
                                    }
                                })
                            }
                        }}
                    >{'저장'}</div>
                </footer>
            <PromptBlockComponent 
                message='leave page?'
                open={showPrompt}
                yesCallFN={()=>{
                    setIsInputEmpty(false)
                    confirmNavigation()
                }}
                noCallFN={()=>{
                    setIsInputEmpty(false)
                    cancelNavigation();
                }}
                setOpen={()=>{}}
            />
        </div>
        
    )
}
export default SparkWriting;