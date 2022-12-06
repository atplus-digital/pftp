import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"
import { BrowserRouter as Router,  Route } from 'react-router-dom'
import { useAuth } from "../contexts/auth"




function Routes(){

    const { signed } = useAuth()


    return(
        <Router>
            { signed ? <PrivateRoutes/> : <PublicRoutes/> } 
        </Router>
    )
}

export default Routes