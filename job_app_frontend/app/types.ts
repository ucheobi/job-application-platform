import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form-mui";

export const roles = [
    { value: "applicant", label: "Applicant"},
    { value: "employer", label: "Employer"}
] as const;

export type Role = typeof roles[number]["value"]

export type UserBase = {
    email: string;
    password: string;
}

export type UserDetailsType = {
    first_name: string;
    last_name: string;
    role: Role;
}

export type UserRegisterType =  UserBase & UserDetailsType

export interface UserResponseType extends UserDetailsType {
    id: number;
    email: string;
    exp?: number;
}

export interface UserSession {
    user?: {
        id?: string | null;
        name?: string | null;
        image?: string | null;
        email?: string;
        first_name?: string;
        last_name?: string;
    }
}

export type UserLoginType = {
    username: string;
    password: string
}

export type Education = {
    institution: string,
    degree: string,
    graduation_year: number
}

type WorkExperience = {
    company: string,
    title: string,
    start_date: string,
    end_date: string,
    description: string
}

export type JobProfileType = {
    title?: string,
    current_location?: string,
    resume_url?: string,
    portfolio_url?: string,
    skills?: string[],
    education?: Education[],
    work_experience?: WorkExperience[]
}

export type JobProfileDetails = JobProfileType & {
    email?: string;
    first_name?: string;
    last_name?: string;
    handleProfileEdit: () => void
}

export type LoginProps = {
    showPassword: boolean,
    registerLoginUser: UseFormRegister<UserLoginType>;
    loginError?: string | null,
    handleLoginUser: UseFormHandleSubmit<UserLoginType, undefined>
    handleLoginSubmit: (loginData: UserLoginType, event?: React.BaseSyntheticEvent) => void
    loginStateError: FieldErrors<UserLoginType>,
    handlePasswordVisibility: () => void,
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleMouseUpPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type RegisterProps = {
    control?: Control<UserRegisterType>
    showPassword: boolean,
    registerMutateError?: string | null,
    registerNewUser: UseFormRegister<UserRegisterType>,
    registerFormStateError: FieldErrors<UserRegisterType>,
    handleRegisterUser: UseFormHandleSubmit<UserRegisterType, undefined>,
    handleRegisterSubmit: (userData: UserRegisterType, event?: React.BaseSyntheticEvent) => void
    handlePasswordVisibility: () => void,
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void,
    handleMouseUpPassword: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface ErrorResponse {
    response?: {
        data?: {
            detail?: string | null
        }
    }
}

export interface AuthContextType {
    isAuthenticated: boolean;
    handleAuthetication: (token: string) => void
} 