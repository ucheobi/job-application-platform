"use client"

import { ErrorResponse } from "@/app/types"
import { createUser, signInUser } from "@/lib/actions/user.actions"
import { useMutation } from "@tanstack/react-query"


export const useCreateAccountMutation = () => {
    const { mutate, status, error, isPending, isSuccess, data } = useMutation({
        mutationKey: ['register'],
        mutationFn: createUser,
        onError: (error) => {
            console.error("Creating nNew User Failed", error)
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
    const {isPending, isSuccess, data, mutate} = useMutation({
        mutationKey: ["signin"],
        mutationFn: signInUser,
        onError: (error) => {
            console.error("Login failed", error)
        },
    })

    let errorDetails = ""

    if (data && "detail" in data) {
        errorDetails = data["detail"]
    }

    return {
        loginError: errorDetails,
        loginPending: isPending,
        loginSuccess: isSuccess,
        token: data,
        loginMutate: mutate
    }
}