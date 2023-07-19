import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { SvgTriangleUp } from '../../commonComponents/BasicTable/svgs/TriangleUp';
import { SvgTriangleDown } from '../../commonComponents/BasicTable/svgs/TriangleDown';

export default function FilterDropdown (props: {
    defaultDisplayText: string,
    dropValueList: string[],
    displayButtonValue: string,
    onChangeValue: Function,
    selectName:string,
    setSelectName: Function
}) {
    let {
        defaultDisplayText,
        dropValueList,
        onChangeValue,
        selectName,
    } = props;

    const [selectActive, setSelectActive] = useState<number|undefined>(undefined);
    const [stateDropNameList, setStateDropNameList] = useState<string[]>(dropValueList);
    const [clickButtonFlag, setClickButtonFlag] = useState<boolean>(false);
    
    useEffect(()=>{
        if (stateDropNameList===undefined || stateDropNameList.length !== dropValueList.length) {
          setStateDropNameList(dropValueList)
        }
        
    })
    return (
        <Menu as="div" className="relative inline-block text-left w-full h-full">
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row items-center'>
                    <div className='flex w-16 text-center'>{defaultDisplayText}</div>
                <Menu.Button className="Filter-CSS-dropdown-menu-button"
                    onClick={()=>{
                        if (clickButtonFlag) {
                            setClickButtonFlag(false)
                        } else {
                            setClickButtonFlag(true)
                        }
                    }}
                >
                {selectName==='' ? '-': selectName}
                <span>{clickButtonFlag? <SvgTriangleUp className='w-5 h-5'/> : <SvgTriangleDown className='w-5 h-5'/>}</span>
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
                    {stateDropNameList && stateDropNameList.map((nameItem, i)=>{
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
                                    onChangeValue(nameItem)
                                    setSelectActive(i)
                                    // setSelectName(nameItem)
                                    setClickButtonFlag(false)
                                }}
                                >&nbsp;&nbsp;{`${nameItem}`}</button>
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
// Each sentence's "Output" should produce up to 3 sentences.