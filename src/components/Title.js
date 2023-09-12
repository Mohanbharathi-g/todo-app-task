import React from 'react';

import { RiCalendarTodoLine } from 'react-icons/ri';
import {
  selectIsOpen,
  setIsOpen,
  selectFilterItems,
  setTodos,
} from '../app/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';

const Title = () => {
  // declarations
  const dispatch = useDispatch();

  const isOpen = useSelector(selectIsOpen);

  const filterItems = useSelector(selectFilterItems);

  // functions
  const handleOpen = () => {
    // console.log('hiii');
    dispatch(setIsOpen(!isOpen));
  };

  const handleFilterAll = () => {
    dispatch(setTodos(filterItems));
    dispatch(setIsOpen(false));
  };

  const handleComplete = () => {
    //  setFilterItems(todos)
    // console.log(filterItems);
    const completeItem = filterItems.filter((todo) => todo.isComplete === true);

    // console.log(completeItem);

    dispatch(setTodos(completeItem));
    dispatch(setIsOpen(false));
  };

  const handlePending = () => {
    // setFilterItems(todos)
    const pendingItems = filterItems.filter(
      (todo) => todo.isComplete === false
    );

    dispatch(setTodos(pendingItems));
    dispatch(setIsOpen(false));
  };

  return (
    <Stack
      justifyContent={'space-between'}
      direction={'row'}
      sx={{
        color: '#fff',
        padding: '50px 20px 10px 20px',
        position: 'relative',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          fontSize: {
            xs: '2rem',
          },
          fontWeight: {
            xs: '700',
          },
          textTransform: 'uppercase',
        }}
      >
        T o d o
      </Typography>
      <div>
        <RiCalendarTodoLine style={{ fontSize: '2rem' }} onClick={handleOpen} />
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          <Box
            zIndex={100000}
            sx={{
              width: '100px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem',
              position: 'absolute',
              right: 10,
              border: '1px solid #fff',

              backgroundColor: '#25273c',
              gap: '5px',
              borderRadius: '8px',
              boxShadow: `2px 2px 2px rgba(0, 0, 0, 0.25),'-2px -2px 2px rgba(0, 0, 0, 0.25)`,
              transition: '0.3s',
              translateX: '100px',
            }}
          >
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                color: '#9394a5',
                borderBottom: '1px solid #9394a5',
                paddingBottom: '5px ',
              }}
              onClick={handleFilterAll}
            >
              All
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                color: '#9394a5',
                borderBottom: '1px solid #9394a5',
                paddingBottom: '5px ',
              }}
              onClick={handlePending}
            >
              Pending
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '400',
                color: '#9394a5',
                borderBottom: '1px solid #9394a5',
                paddingBottom: '5px ',
              }}
              onClick={handleComplete}
            >
              Completed
            </button>
          </Box>
        </div>
      </div>
    </Stack>
  );
};

export default Title;
