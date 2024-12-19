"use client"

import { ErrorResponse } from "@/app/types";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../../lib/actions/user.actions";


export const useSignInMutation = () => {
    const {isPending, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ["signin"],
        mutationFn: signInUser,
        onSuccess: (data) => {
            const token = data.access_token
            sessionStorage.setItem("token", token)    
        },
        onError: (error) => {
            console.error("Login failed", error)
        },
    })

    const errorMessage = error as ErrorResponse
    const errorDetails = errorMessage?.response?.data?.detail

    return {
        loginError: errorDetails,
        loginPending: isPending,
        loginSuccess: isSuccess,
        loginToken: data,
        loginMutate: mutate
    }
}