import { useState } from "react";
import { useRegisterMutation } from "../api/mutations/use-register-mutate";
import { EMAIL_REGEX, EMAIL_TEXT_MESSAGE, PASSWORD_REGEX, PASSWORD_TEXT_MESSAGE } from "../constant";
import { Role, UserRegister } from "../types";


export const UseRegisterHook = () => {
    const [userData, setUserData] = useState<UserRegister>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: Role.APPLICANT
    })
    const [newUser, setNewUser] = useState<boolean>(true)
    const [emailError, setEmailError] = useState<boolean>(false)
    const [emailHelperMessage, setEmailHelperMessage] = useState<string>("")
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [passwordHelperMessage, setpasswordHelperMessage] = useState<string>("")

    const { registerMutate } = useRegisterMutation()


    const handleSubmitUser = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault()
        registerMutate(userData)
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setUserData({
            ...userData,
            email: value
        })

        if (!EMAIL_REGEX.test(value)) {
            setEmailError(true)
            setEmailHelperMessage(EMAIL_TEXT_MESSAGE)
        } else {
            setEmailError(false);
            setEmailHelperMessage("");
        }
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setUserData({
            ...userData,
            password: value
        })

        if (!PASSWORD_REGEX.test(value)) {
            setPasswordError(true)
            setpasswordHelperMessage(PASSWORD_TEXT_MESSAGE)
        } else {
            setPasswordError(false);
            setpasswordHelperMessage("");
        }
    }

    const handleSetNewUser = () => {
        setNewUser(!newUser)
    }

    return {
        userData,
        newUser,
        emailError,
        emailHelperMessage,
        passwordError,
        passwordHelperMessage,
        setUserData,
        handleSetNewUser,
        handleSubmitUser, 
        handleChangeEmail,
        handleChangePassword
    }
}