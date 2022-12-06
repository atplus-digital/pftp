import Input from "../../project/Input"
import { AiOutlineClose, AiOutlineFile } from 'react-icons/ai'
import { FiUser, FiKey } from 'react-icons/fi'
import { GrStorage } from 'react-icons/gr'
import { TbNetwork } from 'react-icons/tb'
import Model from '../../project/Modal'
import { useState, useEffect } from 'react'



function Form({handleCloseForm, handleSubmit, handleErrorMessage, CloseErrorMessage}){

    const [ accountFTP, setAccountFTP ] = useState({})
    const [ VisibleErrorMessage, SetVisibleErrorMessage ] = useState(false)

    useEffect(() => {

        if(!handleErrorMessage){
            SetVisibleErrorMessage(false)
            return
        }

        SetVisibleErrorMessage(true)

        const timer = setTimeout(() => {
            SetVisibleErrorMessage(false)
            CloseErrorMessage()
        }, 2000)

        return () => clearTimeout(timer)
        
    }, [handleErrorMessage])

    const handleAccountData = (e) => {
        setAccountFTP({...accountFTP, [e.target.name]: e.target.value })
    }

    const EventSubmit = (e) => {
        e.preventDefault()
        console.log(accountFTP)
        handleSubmit(accountFTP)
    }

    return(
        <Model handleCloseModel={handleCloseForm}  >
            <form onSubmit={EventSubmit} >
                <div className='flex items-center justify-between px-5 py-3 text-gray-700 border-b' >
                    <h3 className='text-md' > Conta de FTP </h3>
                    <button onClick={handleCloseForm} >
                        <AiOutlineClose/>
                    </button>
                </div>
                <div className='px-5 py-2 text-gray-700 bg-gray-200 border-b' >
                    <label className="text-xs">Nome</label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3  ${ VisibleErrorMessage ? 'text-red-500' : 'text-gray-600' }`}  >
                            <FiUser/>
                        </span>
                        <Input  
                            Type="text" 
                            Condition='required' 
                            Name="User"
                            PlaceHolder="ftp-user"
                            BorderColor={(VisibleErrorMessage && "border-red-500" )}
                            TextColor={(VisibleErrorMessage && "text-red-500" )}
                            FocusBorderColor={(VisibleErrorMessage && "focus:border-red-600" )}
                            FocusRingColor={(VisibleErrorMessage && "focus:ring-red-500" )}
                            handleOnChange={handleAccountData}
                        />
                    </div>
                    {VisibleErrorMessage && (<p className='mt-1 text-xs font-normal text-red-500' >Este usuário já existe</p>) }
                </div>
                <div className='px-5 py-2 text-gray-700 bg-gray-200 border-b' >
                    <label className="text-xs">Senha</label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600' >
                            <FiKey/>
                        </span>
                        <Input  
                            Type="password" 
                            Condition='required' 
                            Name="Password"  
                            PlaceHolder="*******"
                            handleOnChange={handleAccountData}
                            />                    
                    </div>
                </div>
                <div className='px-4 py-2 text-gray-700 bg-gray-200 border-b' >
                    <label className="text-xs">Cota (GB)</label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600' >
                            <GrStorage/>
                        </span>
                        <Input  
                            Type="number" 
                            defaultValue='0' 
                            MinValue='0' 
                            Name="QuotaSize"  
                            handleOnChange={handleAccountData}
                            />                    
                    </div>
                </div>
                <div className='px-5 py-2 text-gray-700 bg-gray-200 border-b' >
                    <label className="text-xs">Cota por arquivo</label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600' >
                            <AiOutlineFile/>
                        </span>
                        <Input
                            Type="number"  
                            defaultValue='0' 
                            MinValue='0' 
                            Name="QuotaFiles"  
                            handleOnChange={handleAccountData}
                            />                    
                    </div>
                </div>
                <div className='px-5 py-2 pb-5  text-gray-700 bg-gray-200 border-b' >
                    <label className="text-xs">IP Permitido</label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600' >
                            <TbNetwork/>
                        </span>
                        <Input  
                            Type="text"  
                            Name="ipaccess" 
                            handleOnChange={handleAccountData}
                            />
                    </div>
                </div>
                <div className='flex items-center justify-between px-5 py-3' >
                    <button onClick={handleCloseForm} className='px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none' >
                        Cancelar
                    </button>
                    <button   className='px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none' >
                        Salvar
                    </button>
                </div>
            </form>
        </Model>

    )
}

export default Form