
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { UseRegisterHook } from '../custom-hooks/use-register-hook'
import { Role } from '../types'


const Register = () => {
    const {  
        userData,
        setUserData,
        handleSubmitUser
    } 
    = UseRegisterHook();

  return (
        <Box className="flex flex-col md:px-auto md:h-screen justify-center">
            <Typography className='my-4 text-2xl md:text-3xl self-center font-bold font-sans'>Create Account</Typography>

            <TextField
                variant='outlined'
                required
                fullWidth
                id='first_name'
                label="First Name"
                name='first_name'
                autoComplete='first_name'
                autoFocus
                value={userData.first_name}
                className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                onChange={e => {
                    setUserData({
                        ...userData,
                        first_name: e.target.value
                    })
                }}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                id='last_name'
                label="Last Name"
                name='last_name'
                autoComplete='last_name'
                autoFocus
                value={userData.last_name}
                className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                onChange={e => {
                    setUserData({
                        ...userData,
                        last_name: e.target.value
                    })
                }}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label="Email Address"
                name='email'
                autoComplete='email'
                className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                autoFocus
                value={userData.email}
                onChange={e => {
                    setUserData({
                        ...userData,
                        email: e.target.value
                    })
                }}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                id='password'
                type='password'
                label="Password"
                name='password'
                autoComplete='password'
                autoFocus
                value={userData.password}
                className='mx-auto my-2 w-3/4 md:m-5 md:w-1/2 self-center'
                onChange={e => {
                    setUserData({
                        ...userData,
                        password: e.target.value
                    })
                }}
            />          

            <FormControl required size='small' className='my-3 mx-auto w-2/6 md:w-2/6'>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    id="role-select"
                    value={userData.role}
                    label="Role"
                    onChange={e => {
                        setUserData({
                            ...userData,
                            role: e.target.value as Role
                        })
                    }}
                >
                    <MenuItem value="applicant">Applicant</MenuItem>
                    <MenuItem value="employer">Employer</MenuItem>
                </Select>
            </FormControl>

            <Button 
                variant="contained" 
                onClick={handleSubmitUser}
                className='mt-4 w-2/5 p-3 md:w-1/4 md:p-4 md:font-extrabold self-center rounded-lg shadow-none bg-sky-600 hover:bg-sky-300 hover:shadow-none'
            >
                Create Account
            </Button>
    </Box>
  )
}

export default Register;
