import Modal from "./Modal"
import { AiOutlineClose } from 'react-icons/ai'
import { FiAlertCircle } from 'react-icons/fi'
import {IconContext} from 'react-icons'


function ModalDelete({handleCloseModalDelete, handleSubmit, handleUserDelete}){

    const Submit = () => {
        handleSubmit(handleUserDelete)
    }

    return(
        <Modal handleCloseModel={handleCloseModalDelete} >
            <div className="flex items-center bg-gray-200 justify-end px-5 py-3 text-gray-700 border-b" >
                <button onClick={handleCloseModalDelete} >
                    <AiOutlineClose/>
                </button>
            </div>
            <div className="p-8 text-center" >
                <IconContext.Provider value={{  className: "mx-auto mb-4 w-14 h-14 text-gray-400" }}>
                    <FiAlertCircle/>
                </IconContext.Provider>
                <h3 className="mb-5 text-lg font-normal text-gray-500" >Você tem certeza que deseja excluir este usuário?</h3>
                <button  onClick={Submit} className="text-white bg-red-500 hover:bg-red-600 focus:ring-1
                 focus:outline-none focus:ring-red-200  font-medium rounded-lg 
                 text-sm inline-flex items-center px-5 py-2.5 text-center mr-4" >
                    Sim, Tenho certeza
                 </button>
                 <button onClick={handleCloseModalDelete} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-500 focus:z-10  " >
                    Não, Cancelar
                 </button>
            </div>
            
        </Modal>
    )

}

export default ModalDelete