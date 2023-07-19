import React from 'react';
import DebouncedDropdowFilter from '../../../components/commonComponents/BasicTable/debouncedDropdown';
import TableComponent from '../../../components/commonComponents/BasicTable/SparkWritingTable';
import { SvgSearchIcon } from '../../../components/commonComponents/BasicTable/svgs/SearchIcon';
import useNavStore from '../../../store/useNavStore';
import { 
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    GroupingState,
    createColumnHelper,
    getCoreRowModel,
    getExpandedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getGroupedRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { cf } from '../../../util/common/commonFunctions';
import useActivityWritingHubStore from '../../../store/useActivityWritingHubStore';
import { PopupModalComponent } from '../../../components/toggleModalComponents/popupModalComponent';
import { TActivitySparkWritingBooks } from '../../../store/@type/useActivityWritingHubStore';
import PopupCustomModalComponent from '../../../components/toggleModalComponents/PopupCustomModalComponent';
import {createBrowserHistory} from 'history'
import { useCallbackPrompt } from '../../../hooks/useCallbackPrompt';
import PromptBlockComponent from '../../../components/toggleModalComponents/PromptBlockComponent';
import useControlAlertStore from '../../../store/useControlAlertStore';
import { useEffectOnce } from '../../../hooks/useEffectOnce';

declare module '@tanstack/table-core' {
    interface FilterFns {
        yearCustomFilter: FilterFn<unknown>,
    }
}
const customFilter: FilterFn<any> = (row, columnId, value, addMeta) => cf.basicTable.customFilter(row, columnId, value, addMeta);
export type TTableDataModel = {
    key: string,
    value: any,
    rowspan: number,
    print: boolean,
    originIndex: number
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
    const {loadData, loadDataHeadKor, openControlBox, loadDataUpdateFlag,loadDataUpdateFlagInit} = useActivityWritingHubStore();

    // page states
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','','']);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [grouping, setGrouping] = React.useState<GroupingState>([]);
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    const [isSearch, setIsSearch] = React.useState<boolean>(false);

    const [tableDataModel, setTableDataModel] = React.useState<TTableDataModel>([])

    // page input control
    const [startUpdateInputsFlag, setStartUpdateInputsFlag] = React.useState<boolean>(false); 
    const [enableSaveButtonFlag, setEnableSaveButtonFlag] = React.useState<boolean>(false);
    const [isInputEmpty, setIsInputEmpty] = React.useState<boolean>(false);

    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isInputEmpty);

    // useEffectOnce( () => {
    //     // did mount
    //     console.log('did mount !')

    //     return ()=>{
    //         // did unmount
    //         if (!navigateBlockFlag) {
    //             window.stop();
    //             alert('nooop')
    //             console.log('did unmount test!')
                
    //         }
    //     }
    // })
    
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

    // Table Data 
    const [data, setData] = React.useState([...JSON.parse(JSON.stringify(loadData.spark_writing))]);

    // columns
    const levelSort = (a:string, b:string) => cf.basicTable.levelSort(a,b);
    const columnHelper = createColumnHelper<any>();
    const columns:ColumnDef<any,any>[] = loadDataHeadKor.spark_writing.map((value) => {
        const keyStr:string = value.accessor;
        if (keyStr === 'level') {
            return columnHelper.accessor( keyStr , { 
                header: value.header,
                enableColumnFilter: false,
                filterFn: customFilter,
                enableSorting:true,
                sortingFn:  (rowA, rowB, columnID) => {
                    const a:string = rowA.getValue(columnID);
                    const b:string = rowB.getValue(columnID);
                    return levelSort(a, b);
                },
                enableMultiSort:true,
                
            });

        } else {
            return columnHelper.accessor( keyStr , { 
                header: value.header,
                enableColumnFilter: keyStr==='year' ? true : (keyStr==='semester' ? true : false),
                filterFn: customFilter,
                enableSorting:true,
                
                enableMultiSort:true,
            });
        }
    })

    const makeTableData = ():{
        key: string;
        value: any;
        rowspan: number;
        print: boolean;
        originIndex:number;
    }[][] => {
        
        let tableDatas:TActivitySparkWritingBooks[]=[];
        tableDatas = loadData.spark_writing;

        let dataModel:{key:string, value:any, rowspan:number, print:boolean, originIndex:number }[][] = [];
    
        const headers = loadDataHeadKor.spark_writing;
        for (let dataIndex = 0; dataIndex < tableDatas.length; dataIndex++) {
            let pushRowData:{key:string, value:any, rowspan:number, print:boolean, originIndex: number }[] = [];
            const rowD = tableDatas[dataIndex];
            for (let rowDIndex = 0; rowDIndex < headers.length; rowDIndex++) {
                const valueC = rowD[headers[rowDIndex].accessor]
                const keyC = headers[rowDIndex].accessor
                const pushCellData = {
                    key: keyC,
                    value: valueC,
                    rowspan:1,
                    print:true,
                    originIndex: dataIndex
                }
                pushRowData.push(pushCellData)
            }
            dataModel.push(pushRowData);
        }
        // console.log('dataModal: ',dataModel)
        dataModel = dataModel.filter((v,i) => {
            if (v.length!==0) return v;
        });

        // search filter
        dataModel = dataModel.filter((item, idx) => {
            const search1 = item[0].value === selectFIlterValues[0];
            const search2 = item[1].value === selectFIlterValues[1];
            const search3 = item[2].value === selectFIlterValues[2];
            if (search1 && search2 && search3) {
                return item;
            }
        })
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
                selectFIlterValues.forEach((v, i)=>{
                    table.getHeaderGroups()[0].headers[i].column.setFilterValue(selectFIlterValues[i])
                })
                const makeTableDataModel = makeTableData();
                if (makeTableDataModel.length > 0) {
                    setStartUpdateInputsFlag(true)
                    setTableDataModel(makeTableDataModel)
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

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            yearCustomFilter: customFilter
        },
        state: {
            grouping,
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: customFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onGroupingChange: setGrouping,
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getIsRowExpanded: (row) => {return true},
        autoResetExpanded: false
    })

    React.useEffect(()=>{
        table.getHeaderGroups()[0].headers[3].column.toggleSorting();
        table.toggleAllRowsExpanded(true)
    },[data])
    React.useEffect(()=>{
        if (selectNavigationTitles.length === 0) {
            setSelectNavigationTitles(['Activity 관리', 'Writing Hub', 'Spark Writing'])
        }
    }, [selectNavigationTitles])

    // table effects
    React.useEffect(()=>{
        if (table.getState().columnFilters[0]?.id === 'year') {
            if (table.getState().sorting[0]?.id !== 'year') {
                table.setSorting([
                    { id: 'year', desc: false},
                    {id:'semester', desc:false},
                    { id: 'level', desc: false}
                ])
            }
        }
    }, [table.getState().columnFilters[0]?.id])

    return (
        
        <div className='section-common-canvas'>
            {/* filter row */}
            <div className='scetion-common-filter-row-div-spark  border-b-[1px] border-b-[#111] bg-white'>
                <div className='flex flex-row py-[11px] pl-[20px] border-b'>
                    <div className='section-common-filter-columns-div'>
                        {/* filter 1 : Year */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='년도'
                            column={table.getHeaderGroups()[0].headers[0].column}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[0] = value
                                setSelectFilterValues(dumySelectFilterValues)
                                // table.toggleAllRowsExpanded(true)
                            }}
                            value={selectFIlterValues[0]}
                            originData={loadData}
                            table={table}
                        />
                        {/* filter 2 : Semester */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='학기'
                            column={table.getHeaderGroups()[0].headers[1].column}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[1] = value
                                setSelectFilterValues(dumySelectFilterValues)
                                
                            }}
                            value={selectFIlterValues[1]}
                            originData={loadData}
                            table={table}
                        />
                        {/* filter 3 : Level */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='Level'
                            column={table.getHeaderGroups()[0].headers[2].column}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[2] = value
                                setSelectFilterValues(dumySelectFilterValues)
                                
                            }}
                            value={selectFIlterValues[2]}
                            originData={loadData}
                            table={table}
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
                {isSearch ? <TableComponent 
                    enableSaveButtonFlag={enableSaveButtonFlag}
                    dataModel={tableDataModel}
                    table={table}
                    filterValues={ isSearch ? selectFIlterValues: []}
                    isSearch={isSearch}
                    options={{
                        sortEventTargetHeaderKeys:['level'],
                        mergeRowSpanKeys: grouping,
                    }}
                />: null}


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
                    {/* <div className='buttons-div-button'>{'수정'}</div> */}
                    <div className={enableSaveButtonFlag ? 'buttons-div-button':'buttons-div-button-disabled'} 
                        onClick={()=>{
                            if (enableSaveButtonFlag) {
                                commonAlertOpen({
                                    head: 'outline format - text input',
                                    messages: ['입력한 내용을 저장하시겠습니까?'],
                                    yesEvent: ()=>{
                                        setEnableSaveButtonFlag(false);
                                        setNavigateBlockFlag(false);
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