import { useContext } from "react";
import { AuthContext } from "../../post/auth.context";

export  function useAuth (){

     const context = useContext(AuthContext);


     return context
}
