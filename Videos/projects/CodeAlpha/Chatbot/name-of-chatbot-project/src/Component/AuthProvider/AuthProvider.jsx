import React from "react";
import auth from "../Firebase/Console.Firebase";
import { createContext } from "react";
import { useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ Children }) => {
  const [client, setClient] = useState(null);
  const [loading, setloading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const signWithGoogle = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signUpUser = (email, password) => {
    setloading(true);
    createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setloading(true);
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setloading(true);
    signOut(auth);
  };

  const authInfo = { signWithGoogle, signUpUser, logInUser, logOut };
  return (
    <AuthContext.Provider value={authInfo}>{Children}</AuthContext.Provider>
  );
};

export default AuthProvider;
