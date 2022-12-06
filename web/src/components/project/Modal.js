

function Modal({ handleCloseModel  ,children }){
    return(
        <div className="modal false z-50 fixed w-full h-full top-0 left-0 right-0 flex items-center justify-center" >
            <div onClick={handleCloseModel} className="absolute w-full h-full bg-gray-800 opacity-30 modal-overlay" ></div>
            <div className='z-50 w-full  max-w-sm modal-container overflow-hidden bg-white border rounded-md shadow-md' >
                {children}
            </div>
        </div>
    )
}


export default Modal


