import Input from "../../project/Input"
import { useState } from 'react'

function Form({ handleSubmit }){

    const [ userCredentials, setUserCredentials ]  = useState({})

    const handleInputCredentials = (e) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
    }

    const EventSubmit = (e) => {
        e.preventDefault()
        handleSubmit(userCredentials)
    }

    return(
        <form onSubmit={EventSubmit} className="mt-4" >
            <label className="block" >
                <span className="text-sm text-gray-700">Nome de Usuário</span>
                <Input
                    Type="text"
                    PlaceHolder="Insira o nome do usuário"
                    Name="Username"
                    Condition="required"
                    Size="w-full mt-1"
                    BorderColor="border-gray-200"
                    customClass="block"
                    // customClass="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    handleOnChange={handleInputCredentials}
                />
            </label>
            <label className="block mt-3" >
                <span className="text-sm text-gray-700">Senha</span>
                <Input
                    Type="password"
                    Name="Password"
                    PlaceHolder="Insira sua senha"
                    Condition="required"
                    Size="w-full mt-1"
                    BorderColor="border-gray-200"
                    customClass="block"
                    // customClass="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    handleOnChange={handleInputCredentials}
                />
            </label>
            <div className="mt-6" >
                <button className="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" >
                    Entrar
                </button>
            </div>
        </form>
    )
}

export default Form 