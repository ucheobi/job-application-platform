"use client"

import Login from '@/app/components/user/Login';
import Register from '@/app/components/user/Register';
import { loginHandlerHook } from '@/app/custom-hooks/login-handler-hook';
import { registerHandlerHook } from '@/app/custom-hooks/register-handler-hook';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


const Account = () => {
  const [newUser, setNewUser] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { 
    handleLoginUser,
    handleLoginSubmit,
    loginStateError,
    registerLoginUser,
    loginError,
  } = loginHandlerHook();

  const {  
    registerFormStateError,
    registerNewUser,
    handleRegisterSubmit,
    handleRegisterUser,
    registerMutateError,
    control
  } 
  = registerHandlerHook();

  const handleSetNewUser = () => {
    setNewUser(!newUser)
  }

  const handlePasswordVisibility = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  }

  return (
    <Box className='flex flex-col md:flex-row w-screen p-0 m-0'>
      <Box className="my-14 md:w-2/3 md:justify-center md:items-center">
      { newUser ? 
        <Login 
          showPassword={showPassword}
          registerLoginUser={registerLoginUser}
          loginStateError={loginStateError} 
          loginError={loginError} 
          handleLoginUser={handleLoginUser}
          handleLoginSubmit={handleLoginSubmit}
          handlePasswordVisibility={handlePasswordVisibility}
          handleMouseDownPassword={handleMouseDownPassword}
          handleMouseUpPassword={handleMouseUpPassword}
        /> : 
        <Register 
          showPassword={showPassword}
          control={control}
          registerFormStateError={registerFormStateError}
          registerNewUser={registerNewUser}
          registerMutateError={registerMutateError}
          handleRegisterSubmit={handleRegisterSubmit}
          handleRegisterUser={handleRegisterUser}
          handlePasswordVisibility={handlePasswordVisibility}
          handleMouseDownPassword={handleMouseDownPassword}
          handleMouseUpPassword={handleMouseUpPassword}
        /> 
        }
      </Box>

      <Box 
        className="flex flex-col pt-14 pb-28 bg-sky-600 md:justify-center md:items-center md:w-1/3"
        >
        <Typography variant='h4' className='text-white text-center text-2xl'>{newUser ? "New Here?" : "Already have an Account?"}</Typography>
        <Typography className='text-slate-300 text-sm mx-auto my-4 md:m-4'>{newUser ? "Create an account to find your dream job!" : "Login to your account"}</Typography>

        <Button 
            variant="contained" 
            onClick={handleSetNewUser}
            className='w-2/4 self-center rounded-lg 
                        shadow-none text-gray-800 font-bold bg-orange-300
                         hover:bg-orange-200 hover:shadow-none mt-4'
        >
            {newUser ? "Create Account" : "Sign In"}
        </Button>
      </Box>
  
    </Box>
  )
}

export default Account;
