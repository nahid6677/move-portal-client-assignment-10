import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../forebase/firebase.init';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const signUpNew = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email,password);
    };
    const logOut = () =>{
        // setLoading(false);
        return signOut(auth)
    };
    const updateUserProfile = (info) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, info);
    };
    const forgotEmail = (email) =>{
        setLoading(true)
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(()=>{
        const unSubscrive = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        });
        return () =>{
            unSubscrive()
        }
    },[])


    const info = {
        loading,
        setLoading,
        signUpNew,
        signIn,
        user,
        logOut,
        updateUserProfile,
        forgotEmail
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;