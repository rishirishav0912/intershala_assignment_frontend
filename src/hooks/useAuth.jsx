import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


//  * A custom hook to access the authentication context.
//  * This hook uses the useContext hook from React to access the AuthContext.
//  * If the context is not found, it throws an error.


export const useAuth = ()=>{
     
    const context = useContext(AuthContext);

    if(!context){
        throw Error("No context found");
    }

    return context;
}