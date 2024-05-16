import { useState } from "react"
import { auth } from "../firebase/firebase";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";


//  * A custom hook to handle user authentication.

//  * This hook uses the useState hook from React to manage the state of the error and loading status.

//  * It also uses the Firebase authentication library to handle the actual authentication process.

//  * returns An object containing the error, loading status, and two functions to handle authentication.


const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const loginWithEmailAndPassword = async (email, password) => {

        setIsLoading(true);
        setError(null);
        signInWithEmailAndPassword(auth, email, password).then((cred) => {
            setError(null);
            setIsLoading(false);
        }).catch((err) => {
            setError(err.message);
            setIsLoading(false);
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);

        })
    }

    const loginWithGoogle = async() => {
        setIsLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then(async (cred) => {
            setError(null);
            setIsLoading(false);
            console.log(cred);
            const email = cred.user.email;
            const response = await fetch(`${process.env.REACT_APP_PROXY}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
                const timer = setTimeout(() => {
                    setError(null);
                }, 5000);
                return () => clearTimeout(timer);
            }

            if (response.ok) {
                setIsLoading(false);
                setError(null);
            }
        }).catch((err) => {
            setError(err.message);
            setIsLoading(false);
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        })
    }

    return { isLoading, error, loginWithEmailAndPassword, loginWithGoogle }
}

export default useLogin;
