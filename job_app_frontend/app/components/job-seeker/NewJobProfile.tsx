"use client"

import React from "react"
import { JobProfile } from "@/app/types";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Chip, FormControl, FormGroup, FormLabel, Input, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, styled, TextField, Theme, useTheme } from "@mui/material";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form-mui"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skillsArray = [
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

function getStyles(skill: string, skillSet: readonly string[], theme: Theme) {
  return {
    fontWeight: skillSet.includes(skill)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const CustomTextfield = styled(TextField)({
  "& .MuiInputBase-input": {
   backgroundColor: "#fff",
  }
})

const CustomInputField = styled(Input)({
  "& .MuiInputBase-input": {
   padding: "0.8rem",
   borderRadius: "0.3rem",
   textDecorationLine: "none",
   cursor: "pointer"
  },
})

const NewJobProfile = () => {
  const [skillSet, setSkillSet] = React.useState<string[]>([]);
  const {
    handleSubmit,
    register,
    control
  } = useForm<JobProfile>({
    defaultValues: {
      title: "",
      current_location: "",
      resume_url: "",
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

  const {fields: workFields, append: appendExperience, remove: removeExperience} = useFieldArray<JobProfile>({
    control,
    name: "work_experience"
  })

  const {fields: educationFields, append: appendEducation, remove: removeEducation} = useFieldArray<JobProfile>({
    control,
    name: "education"
  })
  
  const theme = useTheme();

  const onSubmit: SubmitHandler<JobProfile> = (data) => console.log(data)

  const handleSkillChange = (event: SelectChangeEvent<typeof skillSet>) => {
    const {
      target: { value },
    } = event;

    setSkillSet(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} className="p-8 border border-gray-300">
        <FormGroup>
          <FormLabel className="text-black">Job Title</FormLabel>
          <TextField
            variant="outlined"
            required
            placeholder="Frontend Software Engineer"
            {...register("title")}
            className="w-full"
          />
        </FormGroup>

        <Box className="flex flex-col md:flex-row">
            <FormGroup className="mb-4 md:mb-0 md:w-1/2 md:mr-4">
              <FormLabel className="text-black">Current Location</FormLabel>
              <TextField
                variant="outlined"
                required
                placeholder="Frankfurt, Germany"
                {...register("current_location")}
              />
            </FormGroup>

            <FormGroup className="md:w-1/2">
              <FormLabel className="text-black">Upload Resume</FormLabel>
              <TextField
                variant='outlined'
                {...register("resume_url")}
                required
                type="file"
              />
            </FormGroup>
        </Box>

        <Box className="flex flex-col md:flex-row">
            <FormGroup className="mb-4 md:mb-0 md:w-1/2 md:mr-4">
              <FormLabel className="text-black">Portfolio Url</FormLabel>
              <TextField
                variant='outlined'
                {...register("portfolio_url")}
                placeholder="http://myportfolio-url.com"
              />
            </FormGroup>

            <FormControl className="md:w-1/2">
                <FormLabel className="text-black">Skills</FormLabel>
                <Select
                  label="Skills"
                  {...register("skills")}
                  multiple
                  value={skillSet}
                  onChange={handleSkillChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} className="">
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {skillsArray.map((skill) => (
                    <MenuItem
                      key={skill}
                      value={skill}
                      style={getStyles(skill, skillSet, theme)}
                    >
                      {skill}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
        </Box>

        <FormGroup>
          <FormLabel className="text-black mt-6 mb-1">Work Experience</FormLabel>
           
              {
                workFields.map((work, index) => (
                  <Box key={work.id} className="p-4 border border-gray-300 mb-2 rounded-md bg-slate-50">
                    <CustomTextfield
                      {...register(`work_experience.${index}.company`, { required: true })}
                      variant='outlined'
                      fullWidth
                      label="Company"
                      className="mb-4"
                    />
                    
                    <CustomTextfield
                      {...register(`work_experience.${index}.title`, { required: true })}
                      variant='outlined'
                      fullWidth
                      label="Title"
                      className="mb-4" 
                    />

                    <Box className="flex flex-col md:flex-row mb-4">
                      <CustomTextfield
                        {...register(`work_experience.${index}.start_date`, { required: true })}
                        variant='outlined'
                        fullWidth
                        label="Start Date"
                        placeholder="yyyy-mm-dd"
                        className="mr-4" 
                      />

                      <CustomTextfield
                        {...register(`work_experience.${index}.end_date`, { required: true })}
                        variant='outlined'
                        fullWidth
                        label="End Date"
                        placeholder="yyyy-mm-dd"
                      />
                     </Box>

                    <CustomTextfield
                      {...register(`work_experience.${index}.description`, { required: true })}
                      variant='outlined'
                      fullWidth
                      label="Description"
                    />
                  </Box>
                ))
              }

            <Button className="flex text-xs content-center md:text-sm md:font-bold"><AddIcon />Add work experience</Button>
        </FormGroup>

        <FormGroup> 
            <FormLabel className="text-black mb-1">Education</FormLabel>
            {
              educationFields.map((education, index) => (
                <Box key={education.id} className="p-4 border border-gray-300 bg-slate-50 mb-2 rounded-md">
                <CustomTextfield
                    variant='outlined'
                    {...register(`education.${index}.institution`, { required: true })}
                    fullWidth
                    label="Institution"
                    className="mb-4"
                />

                <Box className="flex flex-col md:flex-row">
                  <CustomTextfield
                    {...register(`education.${index}.degree`, { required: true })}
                    variant='outlined'
                    fullWidth
                    label="Degree"
                    className="mb-4 md:mb-0 md:w-1/2 md:mr-4"
                  />
                  <CustomTextfield
                    {...register(`education.${index}.graduation_year`, { required: true })}
                    variant='outlined'
                    label="Graduation Year"
                    placeholder="2010"
                    fullWidth
                    className="md:w-1/2"
                  />
                </Box>   
            </Box>
              ))
            }
            
            <Button className="flex text-xs content-center mb-8 md:text-sm md:font-bold"><AddIcon />Add education</Button>
        </FormGroup>

          <CustomInputField 
            disableUnderline={true}
            type="submit"
            className="flex self-center bg-red-900 text-white font-bold border border-none rounded-md mb-4 text-center text-sm w-1/2 cursor-pointer hover:bg-red-800"  
          />
      </Stack>
    </form>
  )
}

export default NewJobProfile;

// input {
//   display: block;
//   box-sizing: border-box;
//   width: 100%;
//   border-radius: 4px;
//   border: 1px solid white;
//   padding: 10px 15px;
//   margin-bottom: 10px;
//   font-size: 14px;
// }