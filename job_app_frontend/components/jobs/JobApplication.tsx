import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useApplyJob } from '@/app/api/job/use-job-queries';
import { JobApplicationProps } from '@/app/types';
import DoneIcon from '@mui/icons-material/Done';


const JobApplication = (jobId: JobApplicationProps) => {
  const [isAccepted, setIsAccepted] = useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAccepted((event.target as HTMLInputElement).value);
  }

  const jobQuery = useApplyJob()

  const handleSubmit = () => {
    //Making sure jobId is defined
    if (jobId) jobQuery.mutate(jobId)
  }

  return (
   <>
   {!jobQuery.isSuccess && (
    <>
     <Box>
      <Typography className=''>We would be sending data from your profile 
        including your resume for your application.</Typography>

      <FormControl className='mt-10'>
        <FormLabel >By accepting you agree that your data will be sent and processed by this employer</FormLabel>
        <RadioGroup
          row
          value={isAccepted}
          onChange={handleChange}
        >
          <FormControlLabel value="accept" control={<Radio />} label="Accept" />
          <FormControlLabel value="reject" control={<Radio />} label="Reject" />
        </RadioGroup>
      </FormControl>
    </Box>

      <Box>
          <Button onClick={handleSubmit} size="small" disabled={isAccepted !== "accept"} variant='contained' className='font-bold mt-2'>
            Submit Application
          </Button>
      </Box>
      </>
    )}

      {jobQuery.isSuccess && (
        <Typography className='mt-6 p-4 text-white bg-green-400 w-fit font-bold'>Your application has been successfully submitted<DoneIcon /></Typography>
      )
    }
   </>
  )
}

export default JobApplication
