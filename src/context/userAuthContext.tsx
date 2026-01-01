import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from "firebase/auth";
import { firebaseAuth } from "@/firebaseConfig";
type userAuthContextProps = {
    user: User | null,
    logIn: typeof logIn,
    signUp: typeof signUp,
    logOut: typeof logOut,
    signUpWithGoogle: typeof signUpWithGoogle
}
type userAuthContextProviderProps = {
    children: React.ReactNode
}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password).then(() => alert("Login Successful"))
}
const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password).then(() => alert("Sign Up Successful"))
}
const logOut = () => {
    signOut(firebaseAuth)
}
const signUpWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(firebaseAuth, googleProvider)
}

const userAuthContext = createContext<userAuthContextProps>(
    {
        user: null,
        logIn,
        signUp,
        logOut,
        signUpWithGoogle
    }
)

export const UserAuthContextProvider: React.FunctionComponent<userAuthContextProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    const value = {
        user,
        logIn,
        signUp,
        logOut,
        signUpWithGoogle
    }
    return (
        <userAuthContext.Provider value={value}>
            {!loading && children}
        </userAuthContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userAuthContext)
}