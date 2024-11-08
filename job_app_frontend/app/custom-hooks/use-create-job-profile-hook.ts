import { SubmitHandler, useFieldArray, useForm } from "react-hook-form-mui";
import { JobProfile } from "../types";
import { useState } from "react";
import { useSubmitApplicantProfile } from "../api/mutations/use-submit-applicant-profile-mutate";
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

export const UseCreateJobProfile = () => {
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const {
    handleSubmit,
    register,
    control
  } = useForm<JobProfile>({
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

  const {fields: workFields} = useFieldArray<JobProfile>({
    control,
    name: "work_experience"
  })

  const {fields: educationFields} = useFieldArray<JobProfile>({
    control,
    name: "education"
  })

  const { createJobProfileMutate } = useSubmitApplicantProfile()
  

  const onSubmit: SubmitHandler<JobProfile> = (applicantData: JobProfile, event?: React.BaseSyntheticEvent) => {
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

  return {
    skillSet,
    handleSubmit,
    register,
    workFields,
    educationFields,
    onSubmit,
    handleSkillChange,
    handleFileChange,
  }

}