import NewJobProfile from "@/app/components/job-seeker/NewJobProfile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
///import { Typography } from "@mui/material"

  
 const page = () => {
   return (
    <Stack className="py-4 px-10">
      <Typography className="text-2xl font-extrabold my-4">Job Profile</Typography>
      <NewJobProfile />
    </Stack>
    
   )
 }
 
 export default page
 