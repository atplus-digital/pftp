import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { BiLogOut } from 'react-icons/bi'
import { useAuth } from '../../contexts/auth'
import { useNavigate } from "react-router-dom";
import {HiOutlineMenuAlt2} from "react-icons/hi"
import {useContext} from 'react'
import useSideBar from '../../contexts/useSideBar'



function Header(){

    const  history =  useNavigate()

    const { Logout } = useAuth()

    const [dropDownMenu, setDropDownMenu ] = useState(false)

    const [SideBarState, setSideBarState] = useContext(useSideBar)


    const handleLogout = () => {
        Logout()
        history('/')
    } 

    return (
        <header className="flex items-center justify-between px-6 py-2 bg-white border-b-4 border-gray-300" >
            <div className="flex items-center" >
                <button  onClick={() => setSideBarState(true)} className='text-gray-500 focus:outline-none lg:hidden' >
                 <HiOutlineMenuAlt2 className='w-6 h-6'/>
                </button>
            </div>
            <div className="flex items-center" >
                <div className='relative' >
                    <button onClick={() => setDropDownMenu(true) }  className=' -mr-2 mt-1 ' >
                            <IconContext.Provider value={{  className: "text-gray-400  w-14 h-8" }}>
                                    <FaUserCircle/>  
                            </IconContext.Provider>
                        </button>
                        
                        { dropDownMenu && (
                            <>
                            <div onClick={() => setDropDownMenu(false)} className='fixed inset-0 z-10 w-full h-full' ></div>
                            <div onClick={handleLogout}  className='absolute right-0 z-20 w-48 py-3 mt-2 bg-white rounded-md shadow-2xl' >
                                <div className='flex flex-row   items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-800' >
                                    <BiLogOut/>
                                    <span className='m-1'>Sair</span>   
                                </div>
                            </div>
                            </>
                        ) }
                </div>
            </div>
        </header>
    )
}


export default Header