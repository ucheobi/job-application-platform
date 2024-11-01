
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { UseLoginHook } from '../../custom-hooks/use-login-hook'

const Login = () => {
    const { loginData, handleSubmitUser, setLoginData} = UseLoginHook();

  return (
        <Box className="flex flex-col md:h-screen justify-center">
            <Typography className='mb-2 text-lg font-bold md:m-12 md:text-3xl self-center md:font-extrabold font-sans'>Sign In to Your Account</Typography>

            <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label="Your Email Address"
                name='username'
                type='username'
                value={loginData.username}
                className='mx-auto my-4 w-3/4 md:w-1/2 self-center'
                onChange={e => {
                    setLoginData({
                        ...loginData,
                        username: e.target.value
                    })
                }}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                type='password'
                label="Your Password"
                value={loginData.password}
                className='mx-auto my-2 w-3/4 md:w-1/2 self-center'
                onChange={e => {
                    setLoginData({
                        ...loginData,
                        password: e.target.value
                    })

                }}
            />          

            <Button 
                variant="contained" 
                onClick={handleSubmitUser} 
                className='w-3/5 mt-6 p-2 md:w-1/4 md:p-4 md:font-extrabold bg-sky-600 
                    self-center rounded-lg shadow-none hover:bg-sky-400 hover:shadow-none'
            >
                Sign In
            </Button>
        </Box>
  )
}

export default Login;
