"use server"

import customRequest from "@/config/custom-config";
import { UserLoginType, UserRegisterType, UserResponseType, UserSession } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "../session";

export const signInUser = async (loginData: UserLoginType) => {
        const userData = new FormData();
        userData.append("username", loginData.username)
        userData.append("password", loginData.password)

        const response = await customRequest("/login", {
                method: "POST",
                body: userData,
            }   
        )

        const data = await response.json()

        // Get access token
        const token = data.access_token

        // Create session
        await createSession(token)

        // Redirect user to dashboard
        redirect("/dashboard")
}

export const createUser = async (userData: UserRegisterType) => {
    const response = await customRequest("/register", {
        method: "POST",
        body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (response.statusText == "error") {
        throw new Error("Error creating account!")
    }

    return data;
}

export const getCurrentUser = async () => {
    const cookieStore = await cookies() 
    const token = cookieStore.get("user") 

    const sessionData = decryptToken(token?.value as string) 

    const { first_name, last_name, user_id, email, role } = await sessionData

    const userDetails: UserSession = {
        user: {
            name: first_name + " " + last_name,
            first_name,
            last_name,
            id: JSON.stringify(user_id),
            email,
            role,
            image: 'https://avatars.githubusercontent.com/u/19550456'
        }
    }
        
    return userDetails
}

export const decryptToken = async (token: string): Promise<UserResponseType> => {
    return jwtDecode(token)
}

export const signOutUser = async () => {
    const cookieStore = await cookies()
    cookieStore.delete("user")

    redirect("/account/auth")
}
