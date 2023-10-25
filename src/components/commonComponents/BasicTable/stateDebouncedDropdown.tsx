import { Menu, Transition } from "@headlessui/react"
import { Column, Table } from "@tanstack/react-table"
import React, { Fragment } from "react"
import { SvgTriangleUp } from "./svgs/TriangleUp"
import { SvgTriangleDown } from "./svgs/TriangleDown"

export default function DebouncedDropdowFilter({
    filterTitleLabel,
    value: initialValue,
    onChange,
    column,
    debounce = 100,
    disabled=false,
}: {
    filterTitleLabel: string
    value: string
    onChange: (value:string) => void
    // column: Column<any, unknown>|undefined
    column: string[]
    table: {
        body: TLoadDataItem[]|TIdeaExchangeBooks[]|TRolePlayBooks[]|TActivitySparkWritingBooks[]|TStoryVlogBook[];
        head: TLoadDataHeadTrans[];
    }
    originData:any
    debounce?: number,
    disabled?:boolean,
}) {
    
    // const stateDropNameList = ['', ...Array.from(column.getFacetedUniqueValues().keys()).sort()]

    const [selectActive, setSelectActive] = React.useState<number|undefined>(undefined);
    const [clickButtonFlag, setClickButtonFlag] = React.useState<boolean>(false);
    const [stateDropNameList, setStateDropNameList] = React.useState<any[]>([]);

    // input setting
    const [value, setValue] = React.useState(initialValue);
    React.useEffect(()=>{
        if (column !== undefined) {
            if (filterTitleLabel==='level') {
                const gradersLevel = [
                    'GT1', 'MGT1', 'S1','MAG1',
                    'GT2', 'MGT2', 'S2','MAG2',
                    'GT3', 'MGT3', 'S3','R3','MAG3',
                    'GT4', 'MGT4', 'S4','R4','MAG4',
                ];
                const levels = Array.from(column).sort((a,b) => gradersLevel.indexOf(a) - gradersLevel.indexOf(b))
                setStateDropNameList(['', ...levels]);
            } else {
                setStateDropNameList(['', ...Array.from(column).sort()]);
            }
        }
        
    }, [column])
    React.useEffect(()=>{
        setValue(initialValue)
    },[initialValue])
    React.useEffect(()=>{
        const timeout = setTimeout(()=>{
            onChange(value)
            setClickButtonFlag(false)
        }, debounce)
        return () => clearTimeout(timeout)
    }, [value])
    
    return (
        <Menu as="div" className="relative inline-block text-left min-w-[178px] h-full">
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row items-center w-full'>
                    <div className='inline-block text-left w-fit whitespace-nowrap capitalize font-notoSansCJKKR'>{filterTitleLabel}</div>
                    <Menu.Button className="Filter-CSS-dropdown-menu-button"
                        disabled={column.length>0? false:true}
                        onClick={()=>{
                            if (!clickButtonFlag) {
                                setClickButtonFlag(true)
                            }
                        }}
                    >
                    <span className="flex">{value === '' ? '-': (
                        filterTitleLabel==='학기' ? value+'학기': (
                            filterTitleLabel==='Grade' ? 'Grade'+value : value
                        )
                    )}</span>
                    <span className="flex">{clickButtonFlag? <SvgTriangleUp className='w-[16px] h-[16px]'/> : <SvgTriangleDown className='w-[16px] h-[16px]'/>}</span>
                    </Menu.Button>
                </div>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="Filter-CSS-dropdown-menu-items">
                <div className="py-1 overflow-y-auto" style={{'maxHeight':'55vh'}}>
                    {stateDropNameList!==undefined && stateDropNameList.map((nameItem, i)=>{
                        if(nameItem==='')
                            return
                        const nameLabels = filterTitleLabel==='학기' ? nameItem+'학기': (
                            filterTitleLabel==='Grade' ? 'Grade'+nameItem : nameItem
                        )
                        return (
                            <Menu.Item key={`${nameItem}Index${i}`}>
                            {({ active }) => (
                                <button
                                role={'button'}
                                className={selectActive===i
                                    ? "Filter-CSS-dropdown-munu-item-a-select"
                                    : "Filter-CSS-dropdown-munu-item-a-default" 
                                }
                                onClick={()=>{
                                    onChange(nameItem)
                                    setSelectActive(i)
                                    setClickButtonFlag(false)
                                }}
                                >{`${nameItem===''? '-': nameLabels}`}</button>
                            )}
                            </Menu.Item>
                        )
                    })}
                </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
} 