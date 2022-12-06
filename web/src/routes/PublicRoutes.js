import { BrowserRouter as Router , Routes, Route, useNavigate } from 'react-router-dom'
import Login from '../components/pages/Login/index'


function PublicRoutes(){

    const history = useNavigate()
    
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
        </Routes>
    )
}

export default PublicRoutes