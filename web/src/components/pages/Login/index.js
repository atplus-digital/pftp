import { useAuth } from "../../../contexts/auth"
import { useNavigate } from 'react-router-dom'
import Form from './Form'
import MessageLogin from './MessageLogin'
import { useState } from 'react'


function Login(){

    const { Login } = useAuth()

    const history = useNavigate()
    const [ Message ,SetMessage ] = useState()

    const closeMessage = () => {
        SetMessage(false)
    }

    const handleLogin =  async (userCredentials) => {
        try {
            await Login(userCredentials)
            history('/')
        } catch (error) {if(error.response.status === 401) SetMessage('Usuário inexistente ou senha incorreta')}
        }

    return(
        <>
            <div className="flex  flex-col items-center  justify-center h-screen px-6 bg-gray-200" >
                { Message && <MessageLogin  closeMessage={closeMessage} msg={Message} /> }
                <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-2xl shadow-slate-500" >
                    <div className="flex items-center justify-center" >
                        <span className="text-2xl font-semibold text-gray-700">PFTP</span>
                    </div>
                    <Form handleSubmit={handleLogin} />
                </div>
            </div>
        </>
    )

}

export default Login