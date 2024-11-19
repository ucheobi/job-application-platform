"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextType } from "../types"
import { useRouter } from "next/navigation"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function SharedLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        const token = sessionStorage.getItem("token")

        if (token) {
            setIsAuthenticated(true)
        }
    }, [])

    const handleAuthetication = (token: string) => {
        sessionStorage.setItem("token", token)
        setIsAuthenticated(true) 
        router.push("/dashboard/applicant")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleAuthetication }}>
            {children}
        </AuthContext.Provider>
    )
  }

  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useContext must be within an AuthProvider")
    }

    return context
}