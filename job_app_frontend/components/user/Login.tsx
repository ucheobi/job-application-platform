
import { LoginProps } from '@/types'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


const Login = ({
    showPassword,
    handleLoginUser,
    handleLoginSubmit,
    loginStateError,
    registerLoginUser,
    loginError,
    handlePasswordVisibility,
    handleMouseDownPassword,
    handleMouseUpPassword
 }: LoginProps) => {

  return (
        <Box className="flex flex-col md:h-screen justify-center">
            <Typography 
                className='mb-2 text-lg font-bold md:m-12 md:text-3xl self-center md:font-extrabold font-sans'
            >
                Sign In to Your Account
            </Typography>

            <form onSubmit={handleLoginUser(handleLoginSubmit)} className='flex flex-col'>
                <TextField
                    variant='outlined'
                    fullWidth
                    label="Your Email Address"
                    error={!!loginStateError.username}
                    helperText={loginStateError.username?.message}
                    {...registerLoginUser("username", { 
                        required: "Username is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })}
                    className='mx-auto my-4 w-3/4 md:w-1/2 self-center'
                />

                 <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className='mx-auto my-2 w-3/4 md:w-1/2 self-center'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...registerLoginUser("password", { required: "Password is required"})}
                        error={!!loginStateError.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handlePasswordVisibility}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    {loginError && (
                        <Box color='error' className='mt-4'>
                            <Alert severity="error" className="mt-4 mx-auto text-center text-xs justify-center">{loginError}</Alert>
                        </Box>
                    )}
                
                </FormControl>

                <Button 
                    variant="contained" 
                    type="submit"
                    className='w-3/5 mt-6 p-2 md:w-1/4 md:p-4 md:font-extrabold bg-sky-600 
                        self-center rounded-lg shadow-none hover:bg-sky-400 hover:shadow-none'
                >
                    Login
                </Button>     
            </form>
        </Box>
  )
}

export default Login;
