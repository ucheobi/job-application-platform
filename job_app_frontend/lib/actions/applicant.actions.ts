"use server"

import { ApplicantProfileType, ApplicantUpdateProps } from "@/app/types"
import customRequest from "@/config/custom-config"

export const createApplicantProfile = async ({applicantData, resumeFile }: { applicantData: ApplicantProfileType, resumeFile: File }) => {
    const formData = new FormData()

    formData.append("applicantData", JSON.stringify(applicantData))
    formData.append("resumeFile", resumeFile)

    const response = await customRequest("/applicant/create",{
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        console.error("Error Creating applicant profile")
    }

    const data = await response.json()

    return data;
}

export const fetchApplicantProfile = async (): Promise<ApplicantProfileType | undefined> => {
    const response = await customRequest("/applicant");

    if (!response.ok) {
        console.error("Error fetching applicant profile")
    }

    const data = await response.json();

    return data; 
}

export const updateApplicantProfile = async ({applicantData, resumeFile }: ApplicantUpdateProps) => {
    const formData = new FormData()

    if (resumeFile) {   
        formData.append("resumeFile", resumeFile)
    }

    formData.append("applicantData", JSON.stringify(applicantData))

    const response = await customRequest("/applicant/update", {
        method: "PUT",
        body: formData
    })

    if (!response.ok) {
        console.error("Error updating applicant profile")
    }

    const data = await response.json()

    return data;
   
}

export const deleteApplicantProfile = async () => {
    const response = await customRequest("/applicant/delete",{
        method: "DELETE",
    });

    if (!response.ok) {
        console.error("Error Deleting applicant profile")
    }
}