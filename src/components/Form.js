import React, { useEffect } from 'react';
// import {TiTickOutline} from 'react-icons/ti'

import { db } from '../utils/firebase/firebase';
import {
  collection,
  Timestamp,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  selectTitle,
  setTitle,
  setTodos,
  selectIsEditing,
  selectEditId,
  setEditId,
  setIsEditing,
  setFilterItems,
  setTostifyError,
  setTostifySuccess,
  setIsLoading,
} from '../app/todoSlice';

import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const Form = () => {
  // declarations
  const dispatch = useDispatch();
  const isEditing = useSelector(selectIsEditing);

  const editId = useSelector(selectEditId);
  const title = useSelector(selectTitle);

  // functions

  // const notify = () => toast.success(`${title} is added`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      dispatch(setTostifyError('Please Enter the Todo value'));
    } else if (title.trim() && isEditing) {
      const editItem = await doc(db, 'todos', editId);

      await updateDoc(editItem, { title: title });

      dispatch(setTitle(''));
      dispatch(setEditId(null));
      dispatch(setIsEditing(false));
      dispatch(setTostifySuccess('Items are successfully Updated'));
    } else {
      console.log('hidbii');

      await addDoc(collection(db, 'todos'), {
        title: title.trim(),
        created: Timestamp.now(),
        isComplete: false,
      });

      dispatch(setTitle(''));
      dispatch(setTostifySuccess(`Task Added`));

      // notify()
    }
  };
  // getting the values from firebase
  useEffect(() => {
    console.log('use effect run');

    dispatch(setIsLoading(true));
    try {
      const q = query(collection(db, 'todos'), orderBy('created', 'desc'));

      // console.log(q)
      onSnapshot(q, (querySnopChat) => {
        // console.log(querySnopChat)
        dispatch(
          setTodos(
            querySnopChat.docs.map((doc) => {
              const data = doc.data();
              return { id: doc.id, ...data };
            })
          )
        );
        dispatch(
          setFilterItems(
            querySnopChat.docs.map((doc) => {
              const data = doc.data();
              return { id: doc.id, ...data };
            })
          )
        );
      });
    } catch (err) {
      console.log(err);
    }

    dispatch(setIsLoading(false));
  }, [dispatch]);

  // console.log(todos)
  return (
    <form
      style={{
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        marginTop: '3.5rem',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        type='text'
        variant='outlined'
        size='small'
        sx={{ width: '500px', backgroundColor: '#25273c', margin: '0' }}
        outline='none'
        placeholder='Create New Todo'
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value.trimStart()))}
        inputProps={{
          style: {
            color: '#9394a5',
            textTransform: 'capitalize',
            fontSize: '1.15rem',
            border: '1px solid #25273c',
            fontWeight: '400',
          },
        }}
      />

      <IconButton
        type='submit'
        color='inherit'
        size='large'
        sx={{
          backgroundColor: '#25273c',
          borderRadius: '0',
          width: '40px',
          height: '45px',
        }}
      >
        <CheckIcon />
      </IconButton>
      <ToastContainer theme='dark' type='success' />
    </form>
  );
};

export default Form;
