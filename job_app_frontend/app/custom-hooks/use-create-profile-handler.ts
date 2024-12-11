import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form-mui";
import { useUpdateApplicantMutation } from "../api/applicant/mutations/use-update-applicant-mutation";
import { JobProfileType } from "../types";
import { useCreateApplicantMutation } from "../api/applicant/mutations/use-create-applicant-mutation";
export const skillsArray = [
  "Python",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "React",
  "Vue.js",
  "Angular",
  "Java",
  "SQL",
  "MAchine Learning",
  "Django",
  "PostgreSQL",
  "MySQL"
]

export const useCreateProfileHandler = ( profileData: JobProfileType | undefined) => {
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>("");

  const {
    handleSubmit,
    register,
    control
  } = useForm<JobProfileType>({
    defaultValues: {
      title: profileData && profileData.title || "",
      current_location: profileData && profileData.current_location || "",
      portfolio_url: profileData && profileData.portfolio_url || "",
      skills: [""],
      education: profileData && profileData.education || [{
        institution: "",
        degree: "",
        graduation_year: 2010
      }],
      work_experience: profileData && profileData.work_experience || [{
        title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: ""
      }]
    }
  });

  useEffect(() => {
    if (profileData && profileData.skills && profileData.resume_url) {
      setSkillSet(profileData.skills)
      setResumeName(profileData.resume_url)
    }
  }, [profileData])

  const {fields: workFields, append: appendWorkExperience} = useFieldArray<JobProfileType>({
    control,
    name: "work_experience"
  })

  const {fields: educationFields, append: appendEducation} = useFieldArray<JobProfileType>({
    control,
    name: "education"
  })

  const { createJobProfileMutate } = useCreateApplicantMutation()
  const { updateApplicantMutate } = useUpdateApplicantMutation()
  
  const onSubmit: SubmitHandler<JobProfileType> = (applicantData: JobProfileType, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault()
    
    if (resumeFile && !profileData) {
        console.log("Create profile")
        createJobProfileMutate({applicantData, resumeFile})
    } else {
      console.log("Update Profile")
      updateApplicantMutate({applicantData, resumeFile})
    }

  }

  const handleFileChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault()

    if (event?.target.files) {
      setResumeFile(event?.target.files[0])
    } 
  }

  const handleSkillChange = (event: SelectChangeEvent<typeof skillSet>) => {
    const {
      target: { value },
    } = event;

    setSkillSet(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleAddEducation = () => {
    appendEducation({institution: "", degree: "", graduation_year: 2000})
  }

  const handleAddWorkExperience = () => {
    appendWorkExperience({company: "", title: "", start_date: "01.06.2000", end_date: "31.05.2004", description: ""})
  }

  return {
    skillSet,
    handleSubmit,
    register,
    resumeName,
    resumeFile,
    workFields,
    educationFields,
    onSubmit,
    handleSkillChange,
    handleFileChange,
    handleAddEducation,
    handleAddWorkExperience,
  }
}