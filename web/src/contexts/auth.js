import  { React, createContext, useContext , useState, useEffect  } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export default function AuthProvider({children}){


    const [ user, SetUser ] = useState()

    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');


        if (storagedToken && storagedUser) {
            SetUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
          }
    }, [])


    useEffect(() => {
        api.interceptors.response.use(function (response) {
            // 200 type responses, this should be left as it is
            return response;
            }, function (error) {
                if(error.response.data.message === "Invalid token"){
                    Logout()
                    window.location.href= '/'
                }
                return Promise.reject(error);
              });
    }, [])

    async function Login(UserData){
        const respondeUser = await api.post('/login', UserData)

        SetUser(respondeUser.data.User)
        api.defaults.headers.Authorization = `Bearer ${respondeUser.data.token}`

        localStorage.setItem('@App:user', JSON.stringify(respondeUser.data.User));
        localStorage.setItem('@App:token', respondeUser.data.token);
    }

    function Logout(){
        localStorage.removeItem('@App:user')
        localStorage.removeItem('@App:token')
        SetUser(null)
        
    }

    return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout}}>
        {children}
    </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
  
    return context;
  }






 


