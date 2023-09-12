import React, { useState } from 'react';
import {
  setIsEditing,
  setTitle,
  setEditId,
  setIsConfirm,
  setDeleteId,
  setTostifySuccess,
} from '../app/todoSlice';
import { useDispatch } from 'react-redux';

import { BsTrash, BsPen } from 'react-icons/bs';

import { db } from '../utils/firebase/firebase';

import { doc, updateDoc } from 'firebase/firestore';
import {
  Button,
  Checkbox,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Empty from './Empty';
// import { CheckBox } from '@mui/icons-material';
// import Fade from '@mui/material'

const List = ({ currentItems }) => {
  const dispatch = useDispatch();

  const [isComplete, setIsComplete] = useState(false);

  // const [complete, setComplete] = useState(false);

  // const isConfirm=useSelector(selectIsConfirm)

  const handleEdit = (id) => {
    console.log(id);
    dispatch(setIsEditing(true));
    dispatch(setTitle(id.title));
    dispatch(setEditId(id.id));
  };

  const handleDelete = async (id) => {
    dispatch(setIsConfirm(true));
    dispatch(setDeleteId(id));

    // const deleteItem= await doc(db,'todos',id)

    // await deleteDoc(deleteItem)
  };

  const handleComplete = async (e, id) => {
    console.log(e.target.checked);

    // setComplete(e.target.value);
    setIsComplete(e.target.checked);

    const completeItem = await doc(db, 'todos', id);

    await updateDoc(completeItem, { isComplete: isComplete });

    if (isComplete) {
      dispatch(setTostifySuccess('The task is completed'));
    }
    // } else if (!isComplete) {
    //   dispatch(setTostifyError('Task was incomplete'));
    // }
  };

  return (
    <>
      {currentItems.length === 0 ? (
        <Empty />
      ) : (
        <TableContainer
          sx={{
            marginTop: '2rem',
            width: {
              xs: 350,
              sm: 500,
            },
            padding: {
              xs: '0 10px',
              sm: '0',
              md: '0',
            },
          }}
        >
          <Table
            sx={{
              backgroundColor: 'transparent',

              padding: '10px',
            }}
          >
            {currentItems &&
              currentItems.map((todo, index) => {
                //   console.log(id)

                return (
                  <TableRow
                    key={todo.id}
                    sx={{ backgroundColor: index % 2 === 0 ? '#25273c' : '' }}
                  >
                    <TableCell
                      size='small'
                      sx={{
                        borderBottom: 'none',
                        display: 'flex',
                        gap: '5px',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox
                        size='medium'
                        checked={todo.isComplete}
                        onChange={(e) => handleComplete(e, todo.id)}
                        sx={{
                          color: '#fff',
                          backgroundColor: 'transparent',
                        }}
                      />
                      <Typography
                        variant='body1'
                        sx={{
                          textDecoration: todo.isComplete ? 'line-through' : '',
                          fontSize: {
                            sm: '1.25rem',
                          },

                          fontWeight: '400',
                          textTransform: 'capitalize',
                        }}
                      >
                        {todo.title}
                      </Typography>
                    </TableCell>
                    <TableCell
                      size='small'
                      sx={{
                        borderBottom: 'none',
                      }}
                    >
                      <Typography
                        variant='body1'
                        sx={{
                          fontSize: {
                            sm: '1.25rem',
                          },
                        }}
                      >
                        {todo.isComplete ? 'Completed' : 'Active'}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='center'
                      size='small'
                      sx={{
                        borderBottom: 'none',
                        display: 'flex',
                      }}
                    >
                      <Button onClick={() => handleEdit(todo)}>
                        <BsPen style={{ fontSize: '1.5rem', color: 'green' }} />
                      </Button>
                      <Button onClick={() => handleDelete(todo.id)}>
                        <BsTrash style={{ fontSize: '1.5rem', color: 'red' }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default List;
// #25273c
