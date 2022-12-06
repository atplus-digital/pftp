import TableBodyCol from '../../project/TableBodyCol'
import { AiFillDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import {AiOutlineCheck} from 'react-icons/ai'
import { useState } from "react"
import Input from "../../project/Input"
import {FaUserCircle} from 'react-icons/fa'
import {IconContext} from 'react-icons'

function TableBodyLine({ UserData, handleUpdateUser, handleShowModalDelete}){


    const [isEditable, setIsEditable] = useState(false)

    const [ userAdminUpdate, setuserAdminUpdate ] = useState({}) 

    const [ UserAdmin, setUserAdmin ] = useState( UserData || {})

    const { Id ,Username} = UserAdmin

    

    const handleSubmit =  () => {

        if(Object.keys(userAdminUpdate).length > 0  ){
            handleUpdateUser(userAdminUpdate)
            setUserAdmin(userAdminUpdate)
            setuserAdminUpdate({})
        }
        setIsEditable(false)
    }


    const handleChange = (e) => {
        setuserAdminUpdate({...UserAdmin, [e.target.name]: e.target.value})
    }
    
    return(
        <tr>
            <TableBodyCol>
                    <div className="flex   items-center">
                        <IconContext.Provider value={{  className: "text-gray-400  w-8 h-8" }}>
                            <div>
                                <FaUserCircle/>
                            </div>
                        </IconContext.Provider>
                        <div className="ml-4">
                            <div className="text-md font-medium leading-5 text-gray-700">
                                {Username}
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
            <TableBodyCol customClass="px-6 py-4 text-2xl  leading-5 text-right  border-b border-gray-200 whitespace-nowrap" >
                <div className='flex flex-row items-center justify-end' > 

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
                    <button onClick={ () => handleShowModalDelete(Id)} className='text-red-500 m-1 hover:text-red-600 ' > 
                        <AiFillDelete/>
                    </button>
                </div>
            </TableBodyCol>
        </tr>
    )
}

export default TableBodyLine

