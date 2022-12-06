import {BsInfoCircle} from 'react-icons/bs'
import { useState, useEffect } from 'react'



function MessageLogin({ msg, closeMessage }){

    const [ Visible, setVisible ] = useState(false)

    useEffect(() => {

        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
            closeMessage()
        }, 3000)

        return () => clearTimeout(timer)

    }, [msg] )

    return(
        <>
        { Visible && (
            <div className="flex w-full max-w-sm mb-4 py-2 bg-red-50 text-sm text-red-700 rounded-md" >
                <BsInfoCircle className="flex-shrink-0 ml-2  inline w-4 h-5 mr-3" />
                <span className="sr-only" >Info</span>
                <span>{msg}</span>       
            </div>
        ) }
        </>
    )}


export default MessageLogin