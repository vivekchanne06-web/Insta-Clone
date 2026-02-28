import { createContext, useState, useEffect  } from "react";
import { login, register, getMe } from "../auth/services/auth.api";

export const AuthContext = createContext()



export function AuthProvider ({ children }){


    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

useEffect(() => {
  const fetchUser = async () => {
    setloading(true);

    try {
      const response = await getMe();
      setuser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  fetchUser();
}, []);

const handleLogin = async (username, password)=>{

    setloading(true)

    try {
        const response = await login(username, password)
    setuser(response.user)

    } catch (error) {
        throw error;
        
    }finally{setloading(false)}


}

const handleRegister = async (username, email, password)=>{

    setloading(true)

    try {
        const response = await register (username, email, password)
         setuser(response.user)
        

    } catch (error) {
        throw error;

        
    }finally{setloading(false)}


}



return(
    <AuthContext.Provider
  value={{ user, loading, handleLogin, handleRegister }}
>
  {children}
</AuthContext.Provider>
)

}


