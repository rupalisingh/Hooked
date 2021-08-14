import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'

export const AuthContext = React.createContext()

function AuthProvider({ children }) {
    const [currentUser, setcurrentUser] = useState('')
    const [loading, setLoading] = useState(true)

    function Signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function Login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function Logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const value = {
        currentUser,
        Login,
        Signup,
        Logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
