import {CgSpinner} from "react-icons/cg"

export const LoadingSpinner = ({Color}) => {
    return(
        <CgSpinner className={`inline mr-10 w-9 h-9 ${ Color || 'text-gray-900' } animate-spin`} />
    )
} 
