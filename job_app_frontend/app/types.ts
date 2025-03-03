import { UseMutateAsyncFunction } from "@tanstack/react-query";
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
}

export interface UserSession {
    user?: {
        id?: string | null;
        name?: string | null;
        image?: string | null;
        email?: string;
        role?: Role;
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

export type ApplicantProfileType = {
    title?: string,
    current_location?: string,
    resume_url?: string,
    portfolio_url?: string,
    skills?: string[],
    education?: Education[],
    work_experience?: WorkExperience[]
    owner: UserResponseType
}

export interface ApplicantProfileDetailsProps extends ApplicantProfileType {
    handleProfileUpdate: () => void
    handleProfileDelete: () => void
    handleOpenModal: () => void
    handleCloseModal: () => void
    openDeleteModal: boolean
}

export interface ApplicantUpdateProps { 
    applicantData: ApplicantProfileType, 
    resumeFile: File | null
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

export interface DeleteModalProps {
    openDeleteModal: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    handleProfileDelete: () => void;
}

export type Status = "Open" | "Closed"

export interface JobsProps {
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: string;
    techStack: string;
    status: Status;
    handleViewJob: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleApplyJob: () => void;
}

enum CompanySize {
    "Small",
    "Medium",
    "Large"
}

export interface Company {
    company_name: string;
    company_email: string;
    company_website: string;
    company_size: CompanySize;
    industry: string;
    company_description: string;
    company_logo: string;
    posting_permission: boolean;
}

export interface Job {
    id: number;
    title: string;
    description: string;
    required_skills: string[];
    technologies: string[];
    job_type: string;
    location: string;
    salary_max: number;
    salary_min: number;
    posted_date: string;
    status: Status;
    other_details: string;
    our_offers: string;
    company: Company;
}

export interface JobDetailsProps {
    job: Job
    openJobDetails: boolean
    handleJobApply: () => void
    handleCloseJobDetails: () => void
}

export interface PanelTabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type ProfileStatus = "success" | "error" | "pending" | "idle"

export type CreateMutationType = UseMutateAsyncFunction<any, Error, {
    applicantData: ApplicantProfileType;
    resumeFile: File;
}, unknown>

export interface PanelProps {
    jobsData: Job[];
}

export interface CreateApplicantProps {
  profileData: ApplicantProfileType | undefined;
  profileStatus: ProfileStatus;
  isEditing: boolean;
  setIsEditing: (state: boolean) => void
  handleCancelUpdate: () => void
}

export interface InitialDataType {
  access_token: string;
  token_type: string;
  user: UserResponseType
}

export interface CookieProps {
    cookiesAccepted: boolean
    handleBackgroundActivity: () => Promise<void>, 
}

export interface JobApplicationProps {
    job_id: number | undefined
}
