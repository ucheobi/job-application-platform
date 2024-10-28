import { useState } from "react";
import { useSignInMutate } from "../actions/mutations/use-signin-mutate";
import { UserLogin } from "../types";

export const UseLoginHook = () => {
    const [loginData, setLoginData] = useState<UserLogin>({
        username: "",
        password: ""
    })

    const { loginMutate } = useSignInMutate()


    const handleSubmitUser = (ev: React.MouseEvent<HTMLButtonElement>) => {
       ev.preventDefault()
       loginMutate(loginData)
    }

    return {
        loginData,
        setLoginData,
        handleSubmitUser,
    }
}