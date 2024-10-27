
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { UseLoginHook } from '../custom-hooks/use-login-hook'

const Login = () => {
    const { user, handleSubmitUser, setUser} = UseLoginHook();

  return (
        <Box className="flex flex-col h-screen justify-center">
            <Typography className='h-1 m-12 text-3xl self-center font-extrabold font-sans'>Sign In to Your Account</Typography>

            <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label="Your Email Address"
                name='username'
                type='user'
                autoComplete='email'
                autoFocus
                value={user.username}
                className='m-5 w-2/6 self-center'
                onChange={e => {
                    setUser({
                        ...user,
                        username: e.target.value
                    })

                }}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                type='password'
                id='password'
                label="Your Password"
                name='password'
                autoComplete='password'
                autoFocus
                value={user.password}
                className='mb-8 w-2/6 self-center'
                onChange={e => {
                    setUser({
                        ...user,
                        password: e.target.value
                    })

                }}
            />          

            <Button 
                variant="contained" 
                onClick={handleSubmitUser} 
                className='w-1/4 p-4 font-extrabold self-center rounded-lg shadow-none hover:bg-blue-800 hover:shadow-none'
            >
                Sign In
            </Button>
        </Box>
  )
}

export default Login;
