import { signInMutation } from "../api/mutations/signin-mutation";
import { UserLoginType } from "../types";
import { SubmitHandler, useForm } from "react-hook-form-mui";

export const useLoginHandler = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginType>({
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onBlur"
    })

    const { loginMutate, loginError } = signInMutation()

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