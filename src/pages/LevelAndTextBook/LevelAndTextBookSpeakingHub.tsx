import React from 'react'
import useLevelAndTextbookSpeakingStore from '../../store/useLevelAndTextbookSpeakingStore';

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

import useNavStore from '../../store/useNavStore';
import { SvgSearchIcon } from '../../components/commonComponents/BasicTable/svgs/SearchIcon';
import DebouncedDropdowFilter from '../../components/commonComponents/BasicTable/debouncedDropdown';

import { cf } from '../../util/common/commonFunctions';
import LevelAndTextbookSpeakingTableComponent from '../../components/commonComponents/BasicTable/LevelandTextbookSpeakingTable';

declare module '@tanstack/table-core' {
    interface FilterFns {
        yearCustomFilter: FilterFn<unknown>,
    }
}
const customFilter: FilterFn<any> = (row, columnId, value, addMeta) => cf.basicTable.customFilter(row, columnId, value, addMeta);

const LevelAndTextBookSpeakingHub = () => {

    // page usehook zustand
    const {
        selectNavigationTitles, setSelectNavigationTitles
    } = useNavStore();
    const {loadData, loadDataHeadKor, sortRules} = useLevelAndTextbookSpeakingStore();

    const newLoadData = loadData.speaking.map((bArr)=>{ return cf.basicTable.sortByKeyBodyData(bArr, cf.basicTable.customSort, sortRules.body.speaking); })
    const newDataHeadData = loadDataHeadKor.sort((a,b) =>cf.basicTable.sortByKeyHeadData(a,b, sortRules.head.speaking));

    // page states
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [selectFIlterValues, setSelectFilterValues] = React.useState<any[]>(['','']);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const [grouping, setGrouping] = React.useState<GroupingState>([]);
    const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
    const [isSearch, setIsSearch] = React.useState<boolean>(false);
    React.useEffect(()=>{
        if (grouping.length === 0) {
            setGrouping(['year','semester','grade'])
        }
        return () => {
            setSelectNavigationTitles([])
            setIsAllSelected(false)
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
            setIsSearch(false)
        } else {
            setIsAllSelected(true);
        }
    }, [selectFIlterValues])
    
    // Table Data 
    const [data, setData] = React.useState([...JSON.parse(JSON.stringify(newLoadData))]);
    
    // columns
    const levelSort = (a:string, b:string) => cf.basicTable.levelSort(a,b);
    const columnHelper = createColumnHelper<any>();
    const columns:ColumnDef<any,any>[] = newDataHeadData.map((value) => {
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

    const searchEventFunction = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log('is test =',isAllSelected)
        if (isAllSelected) {

            let check = true;
            const maxLength = selectFIlterValues.length;
            for (let selectIndex=0; selectIndex < maxLength; selectIndex++) {
                const currentSelectValue = selectFIlterValues[selectIndex];
                console.log('currentSelectValue =',currentSelectValue, ', idx =',selectIndex)
                if (currentSelectValue===''||currentSelectValue===null) {
                    check = false;
                    break;
                }
            }
            if (check) {
                selectFIlterValues.forEach((v, i)=>{
                    table.getHeaderGroups()[0].headers[i].column.setFilterValue(selectFIlterValues[i])
                })
                setIsSearch(true)
            } else {
                setIsSearch(false)
                console.log('search is not all selected')
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
            setSelectNavigationTitles(['레벨 및 교재', 'Speaking Hub'])
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
        <section className="section-common-layout px-[20px]">
            <div className='section-common-canvas'>
                {/* filter row */}
                <div className='scetion-common-filter-row-div py-[11px] border-b-[1px] border-b-[#111]'>
                    <div className='section-common-filter-columns-div'>
                        {/* filter 1 : Year */}
                        <DebouncedDropdowFilter 
                            filterTitleLabel='년도'
                            column={table.getHeaderGroups()[0].headers[0].column}
                            onChange={value=>{
                                let dumySelectFilterValues = JSON.parse(JSON.stringify(selectFIlterValues));
                                dumySelectFilterValues[0] = value
                                setSelectFilterValues(dumySelectFilterValues)
                                table.toggleAllRowsExpanded(true)
                            }}
                            value={selectFIlterValues[0]}
                            originData={newLoadData}
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
                            originData={newLoadData}
                            table={table}
                        />
                    </div>
                    <button className={`Filter-search-button ${
                            isAllSelected ? 'section-common-filter-search-active': 'section-common-filter-search-normal'
                        }`}
                        disabled={!isAllSelected}
                        onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>searchEventFunction(e)}
                    ><span className='flex'><SvgSearchIcon className='w-5 h-5'/></span><span className=''>{'Search'}</span>
                    </button>
                </div>
                <div className='flex flex-col w-full h-full overflow-y-auto'>
                    {/* table */}
                    {isSearch ? (
                        <LevelAndTextbookSpeakingTableComponent 
                            table={table}
                            options={{
                                sortEventTargetHeaderKeys:['level'],
                                mergeRowSpanKeys: grouping
                            }}
                        />
                    ): null}
                    <div className={`justify-center items-center ${isSearch ? 'w-0 h-0' :'w-full h-full flex flex-1'}`}>
                        <p className='flex flex-row text-[#bfbfbf] text-2xl'>{isSearch ? '':'검색 값을 선택 후 조회하세요.'}</p>
                    </div>
                </div>
                
            </div> 
                
        </section>
    )
}
export default LevelAndTextBookSpeakingHub;