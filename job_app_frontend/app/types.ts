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

type Education = {
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

export type JobProfile = {
    title: string,
    current_location: string,
    resume_url?: string,
    portfolio_url: string,
    skills: string[],
    education: Education[],
    work_experience: WorkExperience[]
}