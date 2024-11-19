import ApplicantProfile from "@/app/components/job-seeker/ApplicantProfile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

  
 const page = () => {
   return (
    <Stack className="py-4 px-10">
      <Typography className="text-2xl font-extrabold my-4">Job Profile</Typography>
      <ApplicantProfile />
    </Stack>
   )
 }
 
 export default page
 