import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'


function LinkRoute({ RouteLink, IconLink, Title, CurrentRoute, StateClass}){


    const inactiveClass = 'border-gray-900 text-gray-400 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100 flex items-center px-6 py-2 mt-4 duration-200 border-l-4'

    return(
        <>
            <Link  to={RouteLink}  className={ StateClass ||  inactiveClass}  >
                <IconLink/>
                <span className="mx-4">{Title}</span>
            </Link> 
        </>
    )
}

export default LinkRoute