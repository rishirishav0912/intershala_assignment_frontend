import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

//Creating a new AuthContext.
export const AuthContext = createContext();

//  * A functional component that provides the authentication state to its child components.

//  * This component uses the useState hook to manage the state of the currentUser, userLoggedIn, and loading.

//  * It also uses the useEffect hook to listen for changes in the authentication state and update the currentUser accordingly.

// * returns JSX element containing the AuthContext.Provider.
 
export const AuthProvider =({ children })=> {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user)=> {
    if (user) {
      // console.log(user);
      setCurrentUser({ ...user });
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}