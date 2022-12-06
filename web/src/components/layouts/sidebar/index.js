import { IoHome } from 'react-icons/io5'
import { RiAdminLine } from 'react-icons/ri'
import { useLocation } from 'react-router-dom'
import LinkRoute from './LinkRoute'
import {useContext} from 'react'
import useSideBar from '../../../contexts/useSideBar'

function SideBar(){

    const route = useLocation()

    const [SideBarState, setSideBarState] = useContext(useSideBar)

    const RouteActiveClass = 'bg-gray-600 bg-opacity-25 text-white   border-gray-100 flex items-center px-6 py-2 mt-4 duration-200 border-l-4'

    return(
        <div className="flex"  >
            {/*  Backdrop */}
            <div 
                onClick={() => setSideBarState(false)} 
                className={`${SideBarState ? 'block' : 'hidden'}  fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden` }>
            </div>
            {/* End Backdrop */}
            <div className={` ${SideBarState ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}  fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`} >

                <div className="flex items-center justify-center mt-8" >
                    {/* Logo */}
                    <div className="flex items-center" >
                        <span className="mx-2 text-4xl font-semibold text-white" >
                        P-FTP
                        </span>
                    </div>
                    {/* End Logo */}
                </div>
                <nav className="mt-10" >
                    <LinkRoute  StateClass={ route.pathname === "/" && RouteActiveClass } RouteLink="/" IconLink={IoHome} Title="Inicio"  /> 
                    <LinkRoute  StateClass={ route.pathname === "/usersadmin" && RouteActiveClass }  RouteLink="/usersadmin" IconLink={RiAdminLine} Title="Administradores"  />
                </nav>
                </div>
        </div>
    )
}


export default SideBar