"use client"

import Login from '@/app/components/Login';
import Register from '@/app/components/Register';
import { UseRegisterHook } from '@/app/custom-hooks/use-register-hook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Account = () => {
  const {newUser, handleSetNewUser} = UseRegisterHook()

  return (
    <Box className='flex w-screen h-screen p-0 m-0'>
      <Box className="w-2/3 justify-center items-center">{newUser ? <Login /> : <Register /> }</Box>

      <Box 
        className="flex flex-col bg-blue-600 justify-center items-center w-1/3"
        >
        <Typography variant='h4' className='text-white '>{newUser ? "New Here?" : "Already have an Account?"}</Typography>
        <Typography className='text-slate-300 m-4'>{newUser ? "Create an account to find your dream job!" : "Login to your account"}</Typography>

        <Button 
            variant="contained" 
            onClick={handleSetNewUser}
            className='w-2/4 self-center rounded-lg shadow-none text-gray-800 font-bold bg-white hover:bg-slate-200 hover:shadow-none'
        >
            {newUser ? " Create Account" : "Sign In"}
        </Button>
      </Box>
  
    </Box>
  )
}

export default Account;
