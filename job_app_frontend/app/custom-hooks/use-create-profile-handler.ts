import { SubmitHandler, useFieldArray, useForm } from "react-hook-form-mui";
import { JobProfileType } from "../types";
import { useEffect, useState } from "react";
import { useApplicantProfileMutation } from "../api/mutations/use-applicant-profile-mutation";
import { SelectChangeEvent } from "@mui/material";

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

export const useCreateProfileHandler = ( profileData: JobProfileType | undefined ) => {
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  
  const {
    handleSubmit,
    register,
    control,
    reset
  } = useForm<JobProfileType>({
    defaultValues: {
      title: "",
      current_location: "",
      portfolio_url: "",
      skills: [""],
      education: [{
        institution: "",
        degree: "",
        graduation_year: 2010
      }],
      work_experience: [{
        title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: ""
      }]
    }
  });


  useEffect(() => {
    if (profileData) {
      reset({
        ...profileData,
       work_experience: profileData.work_experience || [],
      })
    }
  }, [profileData, reset])

  const {fields: workFields, append: appendWorkExperience} = useFieldArray<JobProfileType>({
    control,
    name: "work_experience"
  })

  const {fields: educationFields, append: appendEducation} = useFieldArray<JobProfileType>({
    control,
    name: "education"
  })

  const { createJobProfileMutate } = useApplicantProfileMutation()
  

  const onSubmit: SubmitHandler<JobProfileType> = (applicantData: JobProfileType, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault()
    
    if (resumeFile) {
      createJobProfileMutate({applicantData, resumeFile})
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
    appendWorkExperience({company: "", title: "", start_date: "01.06.2000", end_date: "", description: ""})
  }

  return {
    skillSet,
    handleSubmit,
    register,
    workFields,
    educationFields,
    onSubmit,
    handleSkillChange,
    handleFileChange,
    handleAddEducation,
    handleAddWorkExperience
  }
}