"use client"

import Login from '@/app/components/user/Login';
import Register from '@/app/components/user/Register';
import { UseRegisterHook } from '@/app/custom-hooks/use-register-hook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Account = () => {
  const {newUser, handleSetNewUser} = UseRegisterHook()

  return (
    <Box className='flex flex-col md:flex-row w-screen h-screen p-0 m-0'>
      <Box className="my-14 md:w-2/3 md:justify-center md:items-center">{newUser ? <Login /> : <Register /> }</Box>

      <Box 
        className="flex flex-col h-screen pt-14 mb-0 bg-sky-600 md:justify-center md:items-center md:w-1/3"
        >
        <Typography variant='h4' className='text-white mx-auto text-2xl'>{newUser ? "New Here?" : "Already have an Account?"}</Typography>
        <Typography className='text-slate-300 text-sm mx-auto my-4 md:m-4'>{newUser ? "Create an account to find your dream job!" : "Login to your account"}</Typography>

        <Button 
            variant="contained" 
            onClick={handleSetNewUser}
            className='w-2/4 self-center rounded-lg 
                        shadow-none text-gray-800 font-bold bg-white
                         hover:bg-orange-200 hover:shadow-none mt-4'
        >
            {newUser ? " Create Account" : "Sign In"}
        </Button>
      </Box>
  
    </Box>
  )
}

export default Account;
