import TableBodyCol from "../../../project/TableBodyCol"
import { AiFillDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import {AiOutlineCheck} from 'react-icons/ai'
import { useState } from "react"
import Input from "../../../project/Input"
import ProgressBar from "../ProgressBar"
import ConvertSizeDisk from "./ConvertSizeDisk"
import DiskUsedPercent from "./DiskUsedPercent"

function TableBodyLine({ UserData, handleUpdateUser, handleShowModalDelete}){


    const [isEditable, setIsEditable] = useState(false)

    const [ userFtpUpdate, setUserFtpUpdate ] = useState({}) 

    const [ UserFTP, setUserFTP ] = useState( UserData || {})

    const {User, status, ipaccess, QuotaSize, QuotaFiles, QuotaUtilization} = UserFTP

    

    const handleSubmit =  () => {
        if(Object.keys(userFtpUpdate).length > 0  ){
            handleUpdateUser(userFtpUpdate)
            setUserFTP(userFtpUpdate)
            setUserFtpUpdate({})
        }
        setIsEditable(false)
    }

    const handleChange = (e) => setUserFtpUpdate({...UserFTP, [e.target.name]: e.target.value})

    
    return(
        <tr  >
            <TableBodyCol>
                <div className="flex items-center">
                    <div className="">
                        <div className="text-md  leading-5 text-gray-700">
                            {User}
                        </div>
                    </div>
                </div>
            </TableBodyCol>
            <TableBodyCol>
                {isEditable ? (
                    <Input 
                        Type="password" 
                        Name="Password" 
                        PlaceHolder="Adicionar nova senha" 
                        handleOnChange={handleChange} 
                        Size="w-full p-1.5"
                        FocusOpacity="focus:ring-opacity-20"
                        BorderColor="border-white"
                        />
                ) : (
                    <div className="text-lg leading-5 text-gray-700  ">
                        ••••••••••
                    </div>
                )}
            </TableBodyCol>
            <TableBodyCol customClass="px-0 py-4 border-b border-gray-200 whitespace-nowrap" >
                { status === "1" ? 
                (
                    <span className="inline-flex px-2  text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full" >
                        Ativo
                    </span>
                ) : 
                (
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-500 bg-red-100 rounded-full" >
                        Desativado
                    </span>
                )
                }
            </TableBodyCol>
            <TableBodyCol  customClass="px-7 py-4 border-b border-gray-200 whitespace-nowrap"  >
                {isEditable ? (
                    <Input 
                        Type="text" 
                        Name="ipaccess" 
                        defaultValue={ipaccess}
                        handleOnChange={handleChange} 
                        Size="w-full p-1.5"
                        FocusOpacity="focus:ring-opacity-20"
                        BorderColor="border-white"
                        />
                ) : (
                    <div className="text-sm leading-5 text-gray-700">
                        {ipaccess}
                    </div>
                )}
            </TableBodyCol>
            <TableBodyCol  customClass="px-1 py-4   border-b border-gray-200 whitespace-nowrap"  >
                {isEditable ? (
                    <Input 
                        Type="number"
                        Name="QuotaFiles" 
                        defaultValue={QuotaFiles}
                        MinValue='0'
                        handleOnChange={handleChange} 
                        Size="w-full p-1.5"
                        FocusOpacity="focus:ring-opacity-20"
                        BorderColor="border-white"
                        />
                ) : (
                    <div className="pl-10 md:px-0 sm:px-0 leading-5 whitespace-nowrap text-gray-800">
                        <span className="text-sm  font-extralight  tracking-widest ">{ !QuotaUtilization ? (0) : (QuotaUtilization.totalfilesUsage) }/</span>
                        <span className="text-base font-light" >{!+QuotaFiles ? "∞" : QuotaFiles }</span>          
                    </div>
                )}
            </TableBodyCol>
            <TableBodyCol  customClass="px-0 py-4 w-60 border-b border-gray-200 whitespace-nowrap" >
                {isEditable ? (
                    <Input  
                        Type="number"
                        Name="QuotaSize"
                        defaultValue={QuotaSize}
                        MinValue='0' 
                        handleOnChange={handleChange} 
                        Size="w-full p-1.5"
                        FocusOpacity="focus:ring-opacity-20"
                        BorderColor="border-white"
                        />
                ) : (
                    <>
                    <div className="flex justify-between mb-1" >
                        <span className="text-sm font-light  text-gray-700" >{`${DiskUsedPercent((!QuotaUtilization ? (0) : QuotaUtilization.DiskUsage), QuotaSize )}%`}</span>
                        <span className="text-sm font-extralight tracking-wide text-gray-700">{`${ConvertSizeDisk((!QuotaUtilization ? (0) : QuotaUtilization.DiskUsage), 0)} de ${(QuotaSize || 0)}GB`}</span>
                    </div>
                     <ProgressBar percentValue={DiskUsedPercent((!QuotaUtilization ? (0) : QuotaUtilization.DiskUsage), QuotaSize )} />
                    </>
                )}  
            </TableBodyCol>
            <TableBodyCol customClass="px-6 py-4 text-2xl  leading-5 text-right  border-b border-gray-200 whitespace-nowrap" >
                <div className='flex flex-row items-center justify-end ' > 

                {isEditable ? 
                   ( 
                    <button onClick={handleSubmit} className='text-green-700 m-1 hover:text-green-500 '>
                        <AiOutlineCheck/>
                    </button>
                   ) : (
                    <button onClick={() => {setIsEditable(true)}}  className='text-gray-500 m-1 hover:text-gray-700 '>
                        <MdModeEditOutline/>
                    </button>
                   )

                     }
                    <button onClick={ () => handleShowModalDelete(User)  } className='text-red-500 m-1 hover:text-red-600 ' > 
                        <AiFillDelete/>
                    </button>
                </div>
            </TableBodyCol>
        </tr>
    )
}

export default TableBodyLine