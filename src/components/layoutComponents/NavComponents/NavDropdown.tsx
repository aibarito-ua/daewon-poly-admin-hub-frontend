import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import useNavStore from '../../../store/useNavStore';
import { useNavigate } from 'react-router-dom';
import useControlAlertStore from '../../../store/useControlAlertStore';
type navItemValues = {
  name:string,
  path:string,
  role: string
}

export default function TextareaDropdown (props: {
    dropValueList: navItemValues[],
    displayButtonValue: string,
    onChangeValue: Function,
    currentIndex:number,
}) {

    let {
        dropValueList,
        displayButtonValue,
        onChangeValue,
        currentIndex
    } = props;
    const [selectName, setSelectName] = useState(displayButtonValue)
    const [selectActive, setSelectActive] = useState<number|undefined>(undefined);
    const [stateDropNameList, setStateDropNameList] = useState<navItemValues[]>(dropValueList);
    const navigate = useNavigate();
    const { 
        selectNavigationTitles,
        setSelectNavigationTitles,
        selectNavigationIndex,
        navigateBlockFlag,
        navigateBlockMessage
    } = useNavStore();
    const {
        commonAlertOpen
    } = useControlAlertStore();

    const goLink = async (link: string, role: string) => {
      console.log("link :::", link);
      const rolePath = role!=='' ? (
        role==='Head'? 'Head': (role==='Campus' ? 'Campus': '')
      ) : ''
      const pathString = rolePath === '' ? `/${link}` : `/${rolePath}/${link}`
      console.log(pathString)
      if (!navigateBlockFlag) {
        navigate(pathString);
      } else {
        commonAlertOpen({
            head: 'outline format - text input',
            messages: navigateBlockMessage,

        })
      }
    }
    useEffect(()=>{
        // if (currentIndex!==selectNavigationIndex) {
        //     setSelectActive(undefined)
        // }
        return () => {
            // if (selectNavigationIndex !== currentIndex) {
            //     setSelectActive(undefined)
            // }
        }
    },[selectNavigationIndex])
    useEffect(()=>{
        setSelectName(displayButtonValue)
        return ()=>{
            
        }
    },[displayButtonValue, selectNavigationTitles])
    useEffect(()=>{
        if (stateDropNameList===undefined || stateDropNameList.length !== dropValueList.length) {
          setStateDropNameList(dropValueList)
        }
    })
    return (
        <Menu as="div" className="relative inline-block text-left w-fit h-full">
            <div className='flex flex-col max-w-[230px] w-fit h-full'>
                <Menu.Button className={currentIndex===selectNavigationIndex? 'CSS-dropdown-menu-button-active':'CSS-dropdown-menu-button'}>
                {selectName}
                </Menu.Button>
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
                <Menu.Items className="CSS-dropdown-menu-items">
                <div className="overflow-y-auto" style={{'maxHeight':'55vh'}}>
                    {stateDropNameList && stateDropNameList.map((nameItem, i)=>{
                        return (
                            <Menu.Item key={`${nameItem}Index${i}`}>
                            {({ active }) => (
                                <button
                                role={'button'}
                                className={(selectNavigationIndex===currentIndex) ? (selectActive===i
                                    ? "CSS-dropdown-munu-item-a-select"
                                    : "CSS-dropdown-munu-item-a-default" ):"CSS-dropdown-munu-item-a-default" 
                                }
                                onClick={()=>{
                                    onChangeValue(nameItem)
                                    setSelectActive(i)
                                    const navigationValues = [selectName, nameItem.name]
                                    setSelectNavigationTitles(navigationValues)
                                    if (nameItem.role !== '') {
                                      console.log('have role')
                                      const troleValue = nameItem.role==='Head' ? 'Head' : (nameItem.role === 'Campus'? 'Campus': '');
                                      goLink(nameItem.path, troleValue);
                                    } else {
                                      console.log('no role')
                                      goLink(nameItem.path, '');
                                    }
                                }}
                                >&nbsp;&nbsp;{`${nameItem.name}`}</button>
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