import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import { JobDetailsProps } from '@/app/types';


const style = {
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxHeight: "100vh",
  overflowY: "auto"
};

export default function JobDetails({job, openJobDetails, handleCloseJobDetails, handleJobApply }: JobDetailsProps) {
    const {
        description, 
        required_skills, 
        technologies, 
        our_offers, 
        other_details, 
        company,
        title,
        location,
        job_type,
        status
    } = job;

  return (
      <Modal
        open={openJobDetails}
        onClose={handleCloseJobDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="absolute top-1/2 left-1/2 rounded-sm border border-slate-800">
            <Box className="flex justify-between p-4 mb-2">
                <Box></Box>
                <Box className="">
                    <Typography className='font-semibold text-sm'>{ company.company_name }</Typography>
                    <Typography className='font-bold text-xl mb-2 font-sans'>
                        { title }
                       { status === "Open" ? <VerifiedUserIcon className="text-base text-blue-600 ml-1" /> : <GppBadIcon className="text-lg text-red-600 ml-1" /> }
                    </Typography>
                    <Typography className='text-gray-500'>{ location }</Typography>
                    <Typography className='bg-green-100 w-fit px-2 mt-2'>{ job_type }</Typography>
                </Box>

                <Box className="flex flex-col justify-between">
                    <Button className='font-bold capitalize flex justify-end hover:bg-white' onClick={handleCloseJobDetails}>
                        <CloseIcon />
                    </Button>

                    <Button className="font-bold capitalize text-sm" disabled={status === "Closed"} variant='contained' onClick={handleJobApply}>
                        Apply Now
                    </Button>
                </Box>
            </Box>
             
            <Divider />

            <Box className="p-4">
                <Typography variant="h5" className='uppercase text-center text-lg mb-2'>
                    Job Description
                </Typography>
        
                <Typography className='text-sm text-zinc-600'>
                    { description }
                </Typography>

                <Box className='mt-4'>
                    <Typography className='text-sm font-semibold' variant='h6'>Required Skills and Experience</Typography>
                    <List className='p-3 text-zinc-600 text-sm'>
                        {required_skills.map((skill, index) => (
                            <ListItem key={index} disablePadding >
                                <Typography className='text-sm mr-2 font-bold'>•</Typography>{ `${skill}` }
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box className='mt-4'>
                    <Typography className='text-sm font-semibold' variant='h6'>Technologies</Typography>
                    <List className='p-3 text-zinc-600 text-sm'>
                        {technologies.map((tech, index) => (
                            <ListItem key={index} disablePadding>
                                <Typography className='text-sm mr-2 font-bold'>•</Typography>{`${tech}` }
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box className='mt-4'>
                    <Typography className='text-sm font-semibold' variant='h6'>Our offers</Typography>
                    <Typography>{ our_offers }</Typography>
                </Box>
                
                <Box className='mt-4'>
                    <Typography className='text-sm font-semibold' variant='h6'>Other Details</Typography>
                    <Typography>{ other_details }</Typography>
                </Box>
            </Box>
        </Box>
      </Modal>
  );
}
