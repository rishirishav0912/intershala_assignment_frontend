import { useState } from "react"
import { auth } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword
} from "firebase/auth";



//  * A custom hook to handle user signup.

//  * This hook uses the useState hook from React to manage the state of the error and loading status.

//  * It also uses the Firebase authentication library to handle the actual signup process.

//  * returns an object containing the error, loading status, and a function to handle signup.
 

const useSignup = () => {

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (email, password) => {

        setIsLoading(true);
        setError(null);
        setSuccess(null);
        createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
            const response = await fetch(`${process.env.REACT_APP_PROXY}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setSuccess(null);
                setError(json.error);
                const timer = setTimeout(() => {
                    setError(null);
                }, 5000);
                return () => clearTimeout(timer);
            }

            if (response.ok) {
                setIsLoading(false);
                setSuccess(json.message);
                setError(null);
                const timer = setTimeout(() => {
                    setSuccess(null);
                }, 5000);
                return () => clearTimeout(timer);
            }
        }).catch((err) => {
            setIsLoading(false);
            setError(err.message);
        })
    }

    return ({ signup, success, error, isLoading })
}

export default useSignup