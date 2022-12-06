
function ProgressBar ({percentValue}){

    const currentColor = (PercentValue) => {
        if( PercentValue >= 80 && PercentValue < 95) return ( "bg-yellow-500") 
        
        if( PercentValue >= 95) return ("bg-red-500")

        return ("bg-indigo-500")
    }

    return(
        <div className="w-full  bg-gray-200 rounded-full h-1 mb-1" >
            <div className={`${currentColor(percentValue)} h-1 rounded-full`}  style={{width: percentValue + "%" }} ></div>
        </div>
    )
}

export default ProgressBar