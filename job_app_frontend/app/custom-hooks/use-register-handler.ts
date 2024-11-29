import { useCreateAccountMutation } from "../api/mutations/use-create-account-mutation";
import { UserRegisterType } from "../types";
import { useForm, SubmitHandler } from "react-hook-form-mui";


export const useRegisterHandler = () => {
    const { register, handleSubmit, control, formState: { errors }} = useForm<UserRegisterType>({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "applicant"
        },
        mode: "onBlur"
    })

    const { registerMutate, registerMutateError } = useCreateAccountMutation()

    const handleRegisterSubmit: SubmitHandler<UserRegisterType> = (userData: UserRegisterType, ev?: React.BaseSyntheticEvent) => {
        ev?.preventDefault()

        registerMutate(userData)
    }

    return {
        control,
        registerNewUser: register,
        registerFormStateError: errors,
        handleRegisterUser: handleSubmit,
        handleRegisterSubmit, 
        registerMutateError
    }
}