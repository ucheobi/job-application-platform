
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { UseRegisterHook } from '../custom-hooks/use-register-hook'


const Register = () => {
    const {  
        user: {firstName, lastName, email, password, role},
        handleChangeUser, 
        handleSubmitUser
    } 
    = UseRegisterHook();

  return (
        <Box className="flex flex-col py-6 px-auto h-screen justify-center">
            <Typography className='h-1 m-8 text-3xl self-center font-bold font-sans'>Create Account</Typography>

            <TextField
                variant='outlined'
                required
                fullWidth
                id='first_name'
                label="First Name"
                name='first_name'
                autoComplete='first_name'
                autoFocus
                value={firstName}
                className='m-5 w-2/6 self-center'
                onChange={handleChangeUser}
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
                value={lastName}
                className='m-5 w-2/6 self-center'
                onChange={handleChangeUser}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label="Email Address"
                name='email'
                autoComplete='email'
                className='m-5 w-2/6 self-center'
                autoFocus
                value={email}
                onChange={handleChangeUser}
            />

            <TextField
                variant='outlined'
                required
                fullWidth
                id='password'
                label="Password"
                name='password'
                autoComplete='password'
                autoFocus
                value={password}
                className='m-5 w-2/6 self-center'
                onChange={handleChangeUser}
            />          

            <FormControl required size='small' className='m-5 w-1/6 self-center'>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    id="role-select"
                    value={role}
                    label="Role"
                    onChange={(e) => console.log(e.target.value)}
                >
                    <MenuItem value="applicant">Applicant</MenuItem>
                    <MenuItem value="employer">Employer</MenuItem>
                </Select>
            </FormControl>

            <Button 
                variant="contained" 
                onClick={handleSubmitUser}
                className='w-1/4 p-4 font-extrabold self-center rounded-lg shadow-none hover:bg-blue-800 hover:shadow-none'
            >
                Create Account
            </Button>
    </Box>
  )
}

export default Register;
