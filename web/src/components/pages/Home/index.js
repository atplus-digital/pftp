import TitlePage from '../../project/TitlePage'
import Table from '../../project/Table';
import TableHeadCol from '../../project/TableHeadCol';
import TableBodyLine from './TableListUsersFTP/TableBodyLine';
import { useState, useEffect } from 'react';
import Container from '../../layouts/Container'
import { IoAdd } from 'react-icons/io5'
import {IconContext} from 'react-icons'
import Form from './Form'
import api from '../../../services/api';
import ModalDelete from '../../project/ModalDelete';
import Card from './Card';
import { LoadingSpinner } from '../../project/LoadingSpinner';


function Home(){

    const [ AllUsersFTP, setAllUsersFTP ] = useState()

    const [ ShowForm, setShowForm ] = useState(false)

    const [ ShowModalDelete, setShowModalDelete ] = useState(false)

    const [ UserFTPDelete, setUserFTPDelete ]  = useState('')

    const [ ServerInfo, SetServerInfo ] = useState()

    const [ LoadingSpinnerState, setLoadingSpinnerState ] = useState(true)

    const [ LoadingSkeletonState, setLoadingSkeletonState ] = useState(true)


    const [ ErrorMessageCreate, setErrorMessageCreate ] = useState()

    const closeErrorMessage = () => {
        setErrorMessageCreate(false)
    }

    const handleCloseForm = () => {
        setShowForm(false)
    }

    const handleShowModalDelete = (User) => {
        setUserFTPDelete(User)
        setShowModalDelete(true)
        
    }

    const handleCloseModalDelete = () => {
        setShowModalDelete(false)
    }


    useEffect(() => {
        api.get('/getftpusers')
            .then((res) => {
                setLoadingSpinnerState(false)
                setAllUsersFTP(res.data)
            })
            .catch((e) => console.log(e) )
    }, [])

    useEffect(() => {
        api.get('/serverinformation')
            .then((res) => {
                setLoadingSkeletonState(false)
                SetServerInfo(res.data)
            })
            .catch((e) => console.log(e))
    }, [])

    const updateUserFTP = (userFtpUpdate) => {        
        api.put('/updateftpuser', userFtpUpdate)
            .then(data => console.log("Atualizado com sucesso"))
            .catch(e => console.log(e))
    }

    const createUserFTP =   (accountFTP) => {
        api.post('/createftpuser', accountFTP)
            .then((res) => {
                setAllUsersFTP([...AllUsersFTP, res.data.UserInfo ])
                handleCloseForm()
            })
            .catch((error) => {if(error.response.status === 409){ setErrorMessageCreate('Usuário inexistente ou senha incorreta')}} )
    }

    const deleteUserFTP = (User) => {
        api.delete(`/deleteftpuser?User=${User}`)
            .then((data) => {
                setAllUsersFTP(AllUsersFTP.filter(account => account.User !== User ))
                setShowModalDelete(false)
            })
            .catch(e => console.log(e))
    }


    return(
        <Container customClass="mt-2" >
            <TitlePage Title="Início" />
            { ServerInfo && 
            (
                <div className='mt-4' >
                <Container customClass='flex flex-wrap -mx-6' >
                    <Card Title={ ServerInfo.DiskTotal  + " GB"}  Caption="Espaço Total" Color="bg-indigo-600" LoadingSkeleton={LoadingSkeletonState} />
                    <Card Title={ ServerInfo.DiskUsage + " GB"}  Caption="Espaço Usado" Color="bg-blue-600" customSize="mt-6 sm:mt-0" LoadingSkeleton={LoadingSkeletonState} />
                    <Card Title={ ServerInfo.DiskAvailable + " GB"}  Caption="Espaço Livre" Color="bg-red-600" customSize="mt-6 xl:mt-0" LoadingSkeleton={LoadingSkeletonState} />
                </Container>
            </div>
            )}
            <Container customClass="flex flex-col mt-8" >
                <Container customClass="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" >
                    <Container customClass="inline-block min-w-full overflow-hidden align-middle border  border-gray-300 shadow sm:rounded-lg">
                        <div className='flex m-2 my-2 justify-end' >
                            <button onClick={() => setShowForm(true)}
                                className='text-gray-700 text-sm sm:-ml-1 sm:-mr-10 lg:-mr-1 lg:-ml-1 bg-gray-50 rounded-lg px-4 py-2 
                                text-center inline-flex items-center border border-gray-400 
                                hover:bg-green-100 hover:text-green-800 hover:font-semibold
                                focus:ring-1  focus:outline-none focus:ring-gray-100
                                active:bg-green-200 ' >
                                <IconContext.Provider value={{  className: "mr-4 -ml-2 w-5 h-5 " }}>
                                    <IoAdd/>
                                </IconContext.Provider>
                                    Adicionar Conta
                            </button>
                        </div>
                        <Table >
                            <thead>
                                <tr>
                                    <TableHeadCol title='Nome' />
                                    <TableHeadCol title='Senha' />
                                    <TableHeadCol title='Status' CustomSize="px-0 py-2 "  />
                                    <TableHeadCol title='IP Permitido' CustomSize="px-6 py-2"  />
                                    <TableHeadCol title='Cota por arquivo'  CustomSize="px-0  py-2" />
                                    <TableHeadCol title='Cota' CustomSize="px-0 py-2  "  />
                                    <TableHeadCol  />
                                </tr>
                            </thead>
                            <tbody className="bg-white" >
                                { AllUsersFTP?.map((data) => (
                                    <TableBodyLine
                                        key={data.User}
                                        UserData={data}
                                        handleUpdateUser={updateUserFTP}
                                        handleShowModalDelete={handleShowModalDelete}
                                    />
                                ))}
                            </tbody>
                        </Table>
                        { LoadingSpinnerState &&
                                <div className='flex justify-center p-10 bg-white'>
                                    <LoadingSpinner/> 
                                </div>
                                
                            }  
                        {  (AllUsersFTP && AllUsersFTP.length <=  0) ?
                            (
                                <div className='flex justify-center bg-white p-10 ' >
                                    <h3 className='text-md  text-gray-700 font-medium' >Nenhuma conta criada</h3>
                                </div>
                            )
                            :
                            <></>
                        }
                    </Container>
                </Container>
            </Container>
            { ShowForm && 
                <Form   handleSubmit={createUserFTP} handleCloseForm={handleCloseForm} handleErrorMessage={ErrorMessageCreate} CloseErrorMessage={closeErrorMessage}/>
            }
            { ShowModalDelete &&
                <ModalDelete handleUserDelete={UserFTPDelete} handleSubmit={deleteUserFTP} handleCloseModalDelete={handleCloseModalDelete} />
            }
        </Container>        
    )
}


export default Home