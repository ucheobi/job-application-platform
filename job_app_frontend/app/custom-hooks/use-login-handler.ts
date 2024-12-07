import { SubmitHandler, useForm } from "react-hook-form-mui";
import { useSignInMutation } from "../api/user/mutations/use-signin-mutation";
import { UserLoginType } from "../types";

export const useLoginHandler = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginType>({
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onBlur"
    })

    const { loginMutate, loginError } = useSignInMutation()

    const handleLoginSubmit: SubmitHandler<UserLoginType> = (loginData: UserLoginType, event?: React.BaseSyntheticEvent) => {
       event?.preventDefault()

       loginMutate(loginData)
    }

    return {
        registerLoginUser: register,
        handleLoginSubmit,
        handleLoginUser: handleSubmit,
        loginStateError: errors,
        loginError,
    }
}