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
    const token = data.access_token

    // Create session
    await createSession(token)

    return data
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

    if (!token) { 
        console.log(token)
        redirect("/account/auth") 
    }

    const sessionData = await decryptToken(token?.value as string) 

    const { first_name, id, role } =  sessionData

    const userDetails: UserSession = {
        user: {
            name: first_name,
            id: JSON.stringify(id),
            role,
            image: 'https://avatars.githubusercontent.com/u/19550456' // random image, will change later 
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
