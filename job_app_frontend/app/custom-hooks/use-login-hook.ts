import { useState } from "react";
import { useSignInMutate } from "../server/mutations/use-signin-mutate";
import { UserLogin } from "../types";

export const UseLoginHook = () => {
    const [user, setUser] = useState<UserLogin>({
        username: "",
        password: ""
    })

    const {loginMutate } = useSignInMutate()


    const handleSubmitUser = (event: React.MouseEvent<HTMLButtonElement>) => {
       event.preventDefault()
       loginMutate(user)
    }

    return {
        user,
        setUser,
        handleSubmitUser,
    }
}