export enum Role {
    APPLICANT = "applicant",
    EMPLOYER = "employer"
}

export type UserBase = {
    email: string;
    password: string;
}

export type UserRegister =  UserBase & {
    firstName: string;
    lastName: string;
    role: Role
}

export type UserLogin = {
    username: string;
    password: string
}