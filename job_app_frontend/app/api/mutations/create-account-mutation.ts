import { useAuth } from "@/app/(pages)/layout"
import axiosInstance from "@/app/config/axios"
import { ErrorResponse, UserRegisterType } from "@/app/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const createUser = async (userData: UserRegisterType) => {
    const response = await axiosInstance.post("/users", userData)

    if (response.statusText == "error") {
        throw new Error("Error creating account!")
    }

    return response.data;
}

export const createAccountMutation = () => {
    const { handleAuthetication } = useAuth()
    const { mutate, status, error, isPending, isSuccess, data} = useMutation({
        mutationKey: ['register'],
        mutationFn: createUser,
        onSuccess: (data) => {
            const token = data.access_token

            handleAuthetication(token)
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