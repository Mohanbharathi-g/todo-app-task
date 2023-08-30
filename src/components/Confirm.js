import React from 'react';
import {
  selectIsConfirm,
  setIsConfirm,
  selectDeleteId,
  setTostifySuccess,
} from '../app/todoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../utils/firebase/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

import { Box, Button, Stack, Typography } from '@mui/material';

const Confirm = () => {
  // declarattions
  const dispatch = useDispatch();

  const isConfirm = useSelector(selectIsConfirm);

  const deleteId = useSelector(selectDeleteId);

  // functions

  const handleSubmit = async (text) => {
    if (text === 'Okay') {
      // console.log('hiii')
      const deleteItem = await doc(db, 'todos', deleteId);

      await deleteDoc(deleteItem);

      dispatch(setIsConfirm(false));
      dispatch(setTostifySuccess('Item was successfully deleted'));
    } else if (text === 'cancel') {
      // console.log('cancel')
      dispatch(setIsConfirm(false));
    } else {
      console.log('bye');
    }
  };
  // If user click delete icon, isConfirm value gets true ans show the Box coomponent, the Box component has a confirm message user click okay button the task was deleted.
  return (
    <>
      {isConfirm && (
        <Box
          sx={{
            width: '300px',
            height: '100px',
            border: '1px solid #fff',
            padding: '10px  20px',
            position: 'fixed',
            right: '50%',
            left: '40%',
            top: '50%',
            zIndex: '10',
            backgroundColor: '#25273c',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Typography variant='body1' sx={{ fontSize: '18px' }}>
            Are you sure to delete this Item?
          </Typography>
          <Stack direction={'row'} spacing={2}>
            <Button
              size='small'
              sx={{
                padding: '5px 8px',
                backgroundColor: '#161722',
                border: 'none',
                color: '#fff',
                borderRadius: '8px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                '&hover': {
                  border: '1px solid #fff',
                },
              }}
              onClick={() => handleSubmit('Okay')}
              disableRipple
            >
              Okay
            </Button>
            <Button
              size='small'
              sx={{
                padding: '5px 8px',
                backgroundColor: '#161722',
                border: 'none',
                color: '#fff',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleSubmit('cancel')}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Confirm;
