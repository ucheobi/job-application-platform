"use server"

import customRequest from "@/config/custom-config"
import { ApplicantProfileType } from "@/types"

export const createApplicantProfile = async ({applicantData, resumeFile }: { applicantData: ApplicantProfileType, resumeFile: File }) => {
   try {
    const formData = new FormData()

    formData.append("applicantData", JSON.stringify(applicantData))
    formData.append("resumeFile", resumeFile)

    const response = await customRequest("/applicant",{
        method: "POST",
        body: formData,
    })

    const data = await response.json()

    return data;
    } catch (err) {
        throw new Error(`Error creating job profile!: ${err}`)
    }
}

export const fetchApplicantProfile = async (): Promise<ApplicantProfileType | undefined> => {
    try {
        const response = await customRequest("/applicant");

        const data = await response.json();

        return data;
    } catch(error) {
        console.error(`User does not have a profile details: ${error}`)
    }   
}

export const updateApplicantProfile = async ({applicantData, resumeFile }: { applicantData: ApplicantProfileType, resumeFile: File | null}) => {
    try {
        const formData = new FormData()

        if (resumeFile) {   
            formData.append("resumeFile", resumeFile)
        }

        formData.append("applicantData", JSON.stringify(applicantData))

        const response = await customRequest("/applicant", {
            method: "PUT",
            body: formData
        })

        const data = await response.json()

        return data;
    } catch(err) {
        throw new Error(`Error updating job profile: ${err}`)
    }
}

export const deleteApplicantProfile = async () => {
    try {
        const response = await customRequest("/applicant",{
            method: "DELETE",
        });

        const data = await response.json();

        if (response.statusText == "error") {
            throw new Error("Error deleting job profile!")
        }

        return data;
    } catch(error) {
        throw new Error(`User does not have a profile details: ${error}`)
    }   
}