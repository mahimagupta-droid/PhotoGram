//importing all the functions and components
import { auth } from "@/firebase"
import React, { createContext, useContext, useEffect, useState } from "react"
import { type User, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth"

//declaring types of functions and variables, using typescript
type AuthContextTypes = {
    user: User | null,
    signIn: typeof signIn,
    logIn: typeof logIn,
    logOut: typeof logOut,
    googleLogIn: typeof googleLogIn,
}

type userAuthContextProviderTypes = {
    children: React.ReactNode
}

//declaring and defining the context API functions
const signIn = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const logOut = () => {
    return signOut(auth)
}

const googleLogIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
}

//declaring context using functions and types in it
const AuthContext = createContext<AuthContextTypes>(
    {
        user: null,
        signIn,
        logIn,
        logOut,
        googleLogIn,
    }
)

//declaring main logic
const UserAuthContextProvider: React.FunctionComponent<userAuthContextProviderTypes> = ({children}) => {
    const [ user, setUser ] = useState<User | null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user)
            }
            return () => unsubscribe();
        })
    }, [])
    const value: AuthContextTypes = {
        user,
        signIn,
        logIn,
        logOut,
        googleLogIn,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserAuthContextProvider

export const useFirebaseContext = () => {
    return useContext(AuthContext)
}
