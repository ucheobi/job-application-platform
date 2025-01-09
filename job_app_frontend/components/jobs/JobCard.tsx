import { JobsProps } from '@/app/types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function JobCard({ 
    jobTitle, 
    companyName, 
    techStack, 
    location, 
    jobType, 
    status,
    handleApplyJob, 
    handleViewJob 
}: JobsProps) {
  return (
    <Card className='m-2 max-w-80 min-w-65'>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          { companyName }
        </Typography>
        <Typography className='text-xl mb-1'>
            { jobTitle }
        </Typography>
        <Typography className='mb-4 text-xs text-blue-900 max-w-60'>
            { techStack }
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            { location } - { jobType }
        </Typography>
      </CardContent>

        <CardActions>
            <Button onClick={handleViewJob} size="small" className='font-bold'>View Full Description</Button>
            <Button onClick={handleApplyJob} size="small" disabled={status === "Closed"} variant='contained' className='font-bold'>Apply Now</Button>
        </CardActions>
    </Card>
  );
}
