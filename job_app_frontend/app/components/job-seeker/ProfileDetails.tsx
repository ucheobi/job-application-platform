import { JobProfileDetails } from '@/app/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const ProfileDetails = ({ 
    title,
    current_location,
    portfolio_url,
    skills,
    work_experience,
    education,
    first_name,
    last_name,
    email,
    handleProfileEdit
}: JobProfileDetails) => {
  return (
    <Box>
        <Stack className='flex'>
            <Button className='self-end font-bold' variant="contained" onClick={handleProfileEdit}>Edit Profile</Button>
        </Stack>

        <Stack className="p-4 my-4 border rounded-lg">
            <Box className='flex'>
                <strong className='w-1/4 text-red-900'>First Name: </strong>
                <Typography className='ml-1 w-3/4 text-sm text-gray-700' component="span">{ first_name }</Typography>
            </Box>
            <Box className='flex'>
                <strong className='w-1/4 text-red-900'>Last name: </strong>
                <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{ last_name }</Typography>
            </Box>
            <Box className='flex'>
                <strong className='w-1/4 text-red-900'>Email: </strong>
                <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{ email }</Typography>
            </Box>
        </Stack>

        <Stack className="p-4 my-4 border rounded-lg">
            <Box className="flex">
                <strong className='w-1/4 text-red-900'>Job Title: </strong>
                <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{ title }</Typography>
            </Box>
            <Box className="flex">
                <strong className='w-1/4 text-red-900'>Location: </strong>
                <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{ current_location }</Typography>
            </Box>
            <Box className="flex">
                <strong className='w-1/4 text-red-900'>Portfolio Url: </strong>
                <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{ portfolio_url }</Typography>
            </Box>
            <Box className="flex">
                <strong className='w-1/4 text-red-900'>Skills: </strong>
                {
                    skills && skills.map((skill, index) => (
                        <Box key={index}>
                            <Typography className='text-sm text-gray-700' component="span">{ skill }</Typography>,
                        </Box>
                    ))
                }
            </Box>
        </Stack>

        <Stack className="my-2">
            <Typography className='text-center text-xl text-red-900'><strong>Work Experience</strong></Typography>
            {
                work_experience && work_experience.map((experience, index) => (
                    <Box key={index} className="p-4 my-2 border rounded-lg">
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Company: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{experience.company}</Typography>
                        </Box>
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Title: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{experience.title}</Typography>
                        </Box>
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Start Date: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{experience.start_date}</Typography>
                        </Box>
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>End Date: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{experience.end_date}</Typography>
                        </Box>
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Description: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{experience.description}</Typography>
                        </Box>
                    </Box>
                ))
            }
        </Stack>

        <Stack className="my-2">
            <Typography className='text-center text-xl text-red-900'><strong>Education</strong></Typography>
            {
                education && education.map((item, index) => (
                    <Box key={index} className="p-4 my-2 border rounded-lg">
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Institution: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{item.institution}</Typography>
                        </Box>
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Degree: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{item.degree}</Typography>
                        </Box>
                        <Box className="flex">
                            <strong className='w-1/4 text-red-900'>Grad. Year: </strong>
                            <Typography className='ml-1 w-3/4 text-sm text-gray-700'>{item.graduation_year}</Typography>
                        </Box>
                    </Box>
                ))
            }
        </Stack>
    </Box>
  )
}

export default ProfileDetails
