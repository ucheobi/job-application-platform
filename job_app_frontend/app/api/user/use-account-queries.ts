"use client"

import { ErrorResponse } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { createUser, signInUser } from "@/lib/actions/user.actions"


export const useCreateAccountMutation = () => {
    //const { handleAuthetication } = useAuth()
    const { mutate, status, error, isPending, isSuccess, data } = useMutation({
        mutationKey: ['register'],
        mutationFn: createUser,
        onSuccess: () => {
            //const token = data.access_token

            //handleAuthetication(token)
        },
        onError: (error) => {
            console.error("Login failed", error)
        }
    })

    const errorMessage = error as ErrorResponse
    const errorDetails = errorMessage?.response?.data?.detail

    return {
        registerMutateStatus: status,
        registerMutateSuccess: isSuccess,
        registerMutateError: errorDetails,
        registerMutatePending: isPending,
        registerMutateData: data,
        registerMutate: mutate
    }
}

export const useSignInMutation = () => {
    const {isPending, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ["signin"],
        mutationFn: signInUser,
        onSuccess: () => {
            // const token = data.access_token
            // sessionStorage.setItem("token", token)    
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