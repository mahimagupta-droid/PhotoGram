import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from "firebase/auth";
import { firebaseAuth } from "@/firebaseConfig";

type userAuthContextProps = {
    user: User | null,
    logIn: typeof logIn,
    signIn: typeof signIn,
    logOut: typeof logOut,
    signInWithGoogle: typeof signInWithGoogle
}
type userAuthContextProviderProps = {
    children: React.ReactNode
}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
}
const signIn = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
}
const logOut = () => {
    signOut(firebaseAuth)
}
const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(firebaseAuth, googleProvider)
}

const userAuthContext = createContext<userAuthContextProps>(
    {
        user: null,
        logIn,
        signIn,
        logOut,
        signInWithGoogle
    }
)

export const UserAuthContextProvider: React.FunctionComponent<userAuthContextProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if(user){
                setUser(user)
            } else {
                setUser(null)
            }
            return () => {
                unsubscribe()
            }
        })
    }, [])
    const value = {
        user,
        logIn,
        signIn,
        logOut,
        signInWithGoogle
    }
    return (
        <userAuthContext.Provider value={value}>
            {children}
        </userAuthContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(userAuthContext)
}