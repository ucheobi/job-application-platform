import { RegisterProps } from '../../types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Controller } from 'react-hook-form-mui'
import Alert from '@mui/material/Alert';



const Register = ({
    control,
    showPassword,
    registerMutateError,
    registerFormStateError,
    registerNewUser,
    handleRegisterSubmit,
    handleRegisterUser,
    handlePasswordVisibility,
    handleMouseDownPassword,
    handleMouseUpPassword
}: RegisterProps) => {

  return (
        <Box className="flex flex-col md:px-auto md:h-screen justify-center">
            <Typography className='my-4 text-2xl md:text-3xl self-center font-bold font-sans'>Create Account</Typography>

            <form onSubmit={handleRegisterUser(handleRegisterSubmit)} className='flex flex-col'>
                <TextField
                    variant='outlined'
                    fullWidth
                    label="First Name"
                    {...registerNewUser("first_name", { 
                        required: "First name is required", 
                        minLength: { value: 3, message: "First name must be at least 3 characters"} 
                    })}
                    error={!!registerFormStateError.first_name}
                    helperText={registerFormStateError.first_name?.message}
                    className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                />

                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    label="Last Name"
                    {...registerNewUser("last_name", 
                        { 
                            required: "Last name is required", 
                            minLength: { value: 3, message: "Last name must be at least 3 characters"} 
                        })}
                    error={!!registerFormStateError.last_name}
                    helperText={registerFormStateError.last_name?.message}
                    className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                />

                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    label="Email Address"
                    {...registerNewUser("email", { 
                        required: "Email is required", 
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })}
                    error={!!registerFormStateError.email}
                    helperText={registerFormStateError.email?.message}
                    className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                />

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...registerNewUser("password", { 
                            required: "Password is required", 
                            minLength: { value: 6, message: "Password must be at least 6 characters"}
                        })}
                        error={!!registerFormStateError.password}
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
                </FormControl>

                <FormControl className='my-3 mx-auto w-2/6 md:w-2/6'>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Role is required"}}
                        render={({ field }) => (
                            <Select
                                label="Role"
                                {...field}
                            >
                                <MenuItem value="applicant">
                                    Applicant
                                </MenuItem>
                                <MenuItem value="employer">
                                    Employer
                                </MenuItem>
                            </Select>
                        )}
                    />

                    
                </FormControl>
                {registerMutateError && (
                    <Alert severity="error" className="mt-4 mx-auto text-center text-xs justify-center w-1/2">{registerMutateError}</Alert>
                )}  
                <Button 
                    variant="contained" 
                    type='submit'
                    className='mt-4 w-2/5 p-3 md:w-1/4 md:p-4 md:font-extrabold self-center rounded-lg shadow-none bg-sky-600 hover:bg-sky-300 hover:shadow-none'
                >
                    Create Account
                </Button>
            </form>    
        </Box>
  )
}

export default Register;
