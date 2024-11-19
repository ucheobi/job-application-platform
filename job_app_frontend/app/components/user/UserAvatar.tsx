import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

type User = {
    firstName: string
}

const UserAvatar = ({ firstName }: User) => {
    
  return (
    <Box>
        <IconButton>
            <AccountCircleIcon />
        </IconButton>
        <Typography>Hello { firstName }</Typography>
    </Box>
  )
}

export default UserAvatar
