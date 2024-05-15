import { auth } from "../firebase/firebase";
import {signOut } from "firebase/auth"


//  * A custom hook to handle user logout.

//  * This hook uses the signOut function from Firebase to handle the logout process.

//  * returns an object containing a function to handle logout.


const useLogout = ()=>{
    const logout = ()=>{
        signOut(auth).then(()=>{
          console.log("user signed out")
        }).catch((err)=>{
          console.log(err.message);
        })
    }
  return {logout}
}

export default useLogout