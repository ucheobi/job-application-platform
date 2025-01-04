import { CookieProps } from '@/app/types';
import { Box, Button, Modal, Typography } from '@mui/material';

const style = {
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

  
const CookieModal = ({ handleBackgroundActivity, cookiesAccepted }: CookieProps) => {

  return (
    <Modal
        open={cookiesAccepted}
    >
        <Box sx={style} className="absolute top-1/2 left-1/2 p-3 rounded-sm border border-slate-800">
            <Typography id="modal-modal-title" component="p" className='font-semibold'>
                This website uses cookies to enhance the user experience.
            </Typography>

            <Button className='font-bold capitalize text-red-700 text-lg' onClick={handleBackgroundActivity}>Okay</Button>
        </Box>
    </Modal>
  )
}

export default CookieModal;
