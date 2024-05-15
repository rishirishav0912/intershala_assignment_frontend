import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Export an async function that creates a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Export a function that signs in a user with email and password
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Export an async function that signs in a user with Google popup
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  if(!(result.ok)){
    console.log("user not able to sign in");
  }
  else{
      const user = result.user;
    return user;
  }
};

// Export a function that signs out the current user
export const doSignOut = () => {
  return auth.signOut();
};
