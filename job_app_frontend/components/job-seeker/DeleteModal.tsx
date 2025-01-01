import { DeleteModalProps } from '@/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};



export default function DeleteProfileModal({ openDeleteModal, handleCloseModal, handleProfileDelete }: DeleteModalProps) {

  return (
      <Modal
        open={openDeleteModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="absolute top-1/2 left-1/2 p-3 rounded-sm border border-slate-800">
          <Typography id="modal-modal-title" variant="h6" component="h2" className='font-semibold'>
            Are you sure you want to delete your profile?
          </Typography>

          <Box className="flex flex-row mt-4 justify-center">
            <Button className=' font-bold capitalize text-red-700 text-xl' onClick={handleProfileDelete}>Yes</Button>
            <Button className=' font-bold capitalize text-xl text-green-400' onClick={handleCloseModal}>No</Button>
          </Box>
        </Box>
      </Modal>
  );
}
