export enum Role {
    APPLICANT = "applicant",
    EMPLOYER = "employer"
}

export type UserBase = {
    email: string;
    password: string;
}

export type UserRegister =  UserBase & {
    first_name: string;
    last_name: string;
    role: Role
}

export type UserLogin = {
    username: string;
    password: string
}
