import {HiOutlineServer} from 'react-icons/hi'

function Card({ Color, Title, Caption, customSize, LoadingSkeleton }){
   
    return(
        <div className={`w-full px-6 sm:w-1/2 xl:w-1/3  ${ LoadingSkeleton && "animate-pulse" }  ${customSize || ''} `}>
            <div className="flex items-center px-5 py-6  bg-white rounded-md shadow-sm">
                { !LoadingSkeleton ?
                    <>
                    <div className={`p-3 ${Color} bg-opacity-75 rounded-full `} >    
                        < HiOutlineServer className='w-8 h-8 text-white' />
                    </div>
                        <div className='mx-5' >
                        <h4 className='text-2xl font-semibold text-gray-700'>{Title}</h4>
                        <div className="text-gray-500">{Caption}</div>
                    </div>                    
                    </>
                    :
                    <div className='p-7'></div>
                }
            </div>
        </div>
    )
}

export default Card