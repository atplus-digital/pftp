import TitlePage from "../../project/TitlePage"
import Container from "../../layouts/Container"
import {IconContext} from 'react-icons'
import { IoAdd } from 'react-icons/io5'
import Table from "../../project/Table"
import TableHeadCol from "../../project/TableHeadCol"
import { useState, useEffect } from 'react'
import api from "../../../services/api"
import TableBodyLine from './TableBodyLine'
import Form from './Form'
import ModalDelete from "../../project/ModalDelete"
import {LoadingSpinner} from "../../project/LoadingSpinner"

function UsersAdmin(){

    const [ AllUsersAdmin, setAllUsersAdmin ] = useState([])

    const [ ShowFormCreate, setShowFormCreate ] = useState(false)

    const [ ShowModalDelete, setShowModalDelete ] = useState(false)

    const [ UserAdminDelete, setUserAdminDelete ]  = useState('')

    const [ ErrorMessageCreate, setErrorMessageCreate ] = useState()

    const [ LoadingSpinnerState, setLoadingSpinnerState ] = useState(true)

    const closeErrorMessage = () => {
        setErrorMessageCreate(false)
    }

    const handleCloseFormCreate = () => {
        setShowFormCreate(false)
    }

    const handleShowModalDelete = (Id) => {
        setUserAdminDelete(Id)
        setShowModalDelete(true)
        
    }

    const handleCloseModalDelete = () => {
        setShowModalDelete(false)
    }


    useEffect(() => {
        api.get('/getadminusers')
            .then((res) => {
                setLoadingSpinnerState(false)
                setAllUsersAdmin(res.data)
            })
    }, [])

    const updateUserAdmin = (UserAdminUpdate) => {        
        api.put('/updateadminuser', UserAdminUpdate)
            .then(data => console.log("Atualizado com sucesso"))
            .catch(e => console.log(e))
    }

    const createUserAdmin = async (UserAdmin) => {
        try {
            const response = await api.post('/createadminuser', UserAdmin)
            setAllUsersAdmin([...AllUsersAdmin, response.data.UserInfo ])
            handleCloseFormCreate()
        } catch (error) {
            if(error.response.status === 409){ setErrorMessageCreate('Usuário inexistente ou senha incorreta')}
        }
    }

    const deleteUserAdmin = (Id) => {
        api.delete(`/deleteadminuser?Id=${Id}`)
            .then((admin) => {
                setAllUsersAdmin(AllUsersAdmin.filter(admin => admin.id !== Id ))
                setShowModalDelete(false)
            })
            .catch(e => console.log(e))
    }


    return(
        <Container customClass='mt-2' >
            <TitlePage Title='Usuários' />
            <Container customClass="flex flex-col mt-8" >
                <Container customClass="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" >
                    <Container customClass="inline-block min-w-full overflow-hidden align-middle border border-gray-300 shadow sm:rounded-lg">
                        <div className='flex m-2 my-2  justify-end  ' >
                            <button onClick={ () => setShowFormCreate(true) }
                                className='text-gray-700 text-sm sm:-ml-1 sm:-mr-10 lg:-mr-1 lg:-ml-1 bg-gray-50 rounded-lg px-4 py-2 
                                text-center inline-flex items-center border border-gray-400 
                                hover:bg-green-100 hover:text-green-800 hover:font-semibold
                                focus:ring-1  focus:outline-none focus:ring-gray-100
                                active:bg-green-200 '
                                >
                                <IconContext.Provider value={{  className: "mr-4 -ml-2 w-5 h-5 " }}>
                                    <IoAdd/>
                                </IconContext.Provider>
                                    Adicionar Usuário
                            </button>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeadCol title='Nome'/>
                                    <TableHeadCol title='Senha'/>
                                    <TableHeadCol customClass="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                                </tr>
                            </thead>
                            <tbody className="bg-white" >
                                { AllUsersAdmin.map((data) => (
                                    <TableBodyLine  
                                        key={data.id}
                                        UserData={{Id: data.id, Username: data.Username}}
                                        handleUpdateUser={updateUserAdmin}
                                        handleShowModalDelete={handleShowModalDelete}
                                    />
                                )) }
                            </tbody>
                        </Table>
                            { LoadingSpinnerState ? 
                                (<div className="flex justify-center p-4 bg-white" ><LoadingSpinner/></div>)
                                :
                                (<div></div>)
                            }
                    </Container>
                </Container>
            </Container>
            { ShowFormCreate && 
                <Form handleSubmit={createUserAdmin} handleCloseForm={handleCloseFormCreate} handleErrorMessage={ErrorMessageCreate} CloseErrorMessage={closeErrorMessage} />
            }
            { ShowModalDelete &&
                <ModalDelete handleUserDelete={UserAdminDelete} handleSubmit={deleteUserAdmin} handleCloseModalDelete={handleCloseModalDelete}   />
            }
        </Container>
            
        
    )
}

export default UsersAdmin