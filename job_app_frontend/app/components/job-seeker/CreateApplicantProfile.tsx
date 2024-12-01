import React from "react"
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Theme, useTheme, styled } from "@mui/material/styles";

import { skillsArray, useCreateProfileHandler } from "@/app/custom-hooks/use-create-profile-handler";
import { JobProfileType } from "@/app/types";

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

const CreateApplicantProfile = (profileData: JobProfileType | undefined) => {
  const theme = useTheme();

  const {
    skillSet, 
    handleFileChange, 
    handleSkillChange, 
    register, 
    resumeName,
    resumeFile,
    handleSubmit, 
    onSubmit, 
    workFields, 
    educationFields,
    handleAddEducation,
    handleAddWorkExperience,
  } = useCreateProfileHandler(profileData)
  
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

            <FormGroup className="md:w-1/2 ">
              <FormLabel className="text-black mb-4">Upload Resume</FormLabel>
              <input
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                type="file"
                className="text-sm"
              />
              {
                resumeName && !resumeFile && (
                  <Box className="text-xs mt-1">
                    <strong>{ resumeName }</strong>
                  </Box>
                )
              }
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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

            <Button 
              onClick={handleAddWorkExperience} 
              className="flex self-center w-2/5 text-xs content-center md:text-sm md:font-bold">
                <AddIcon />Add work experience
            </Button>
        </FormGroup>

        <FormGroup> 
            <FormLabel className="text-black mb-1">Education</FormLabel>
            {
              educationFields.map((education, index) => (
                <Box key={education.id} className="p-4 border border-gray-300 bg-slate-50 mb-2 rounded-md">
                    <CustomTextfield
                        key={index}
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

              <Button 
                onClick={handleAddEducation} 
                className="flex self-center text-xs w-1/3 content-center mb-8 md:text-sm md:font-bold">
                  <AddIcon />Add education
              </Button>   
        </FormGroup>

          <CustomInputField 
            disableUnderline={true}
            type="submit"
            className="flex self-center bg-red-900 text-white 
              font-bold border border-none rounded-md mb-4 text-center text-sm w-1/2 
              cursor-pointer hover:bg-red-800"  
          />
      </Stack>
    </form>
  )
}

export default CreateApplicantProfile;