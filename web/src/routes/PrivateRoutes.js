import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import Home from '../components/pages/Home/index'
import Container from '../components/layouts/Container'
import SideBar from '../components/layouts/sidebar'
import Main from '../components/layouts/Main'
import Header from '../components/layouts/Header'
import UsersAdmin from '../components/pages/UsersAdmin'
import useSideBar from '../contexts/useSideBar'
import { useState } from 'react'


function PrivateRoutes(){

    const [StateSidebar, setStateSideBar] = useState(false)


    return(
    
    <Container customClass="flex h-screen bg-gray-200 font-roboto" >
      <useSideBar.Provider value={[StateSidebar, setStateSideBar]} >
        <SideBar/>
          <Container customClass="flex-1 flex flex-col overflow-hidden" >
              <Header/>
              <Main>
                <Routes>
                  <Route   path='/' element={<Home/>}  />
                  <Route   path='/usersadmin' element={<UsersAdmin/>}  />
                </Routes>
              </Main>
          </Container>
      </useSideBar.Provider>
    </Container>
    )
}


export default PrivateRoutes