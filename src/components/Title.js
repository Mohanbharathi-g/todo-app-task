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
    console.log('hiii');
    dispatch(setIsOpen(!isOpen));
  };

  const handleFilterAll = () => {
    dispatch(setTodos(filterItems));
  };

  const handleComplete = () => {
    //  setFilterItems(todos)
    console.log(filterItems);
    const completeItem = filterItems.filter((todo) => todo.isComplete === true);

    console.log(completeItem);

    dispatch(setTodos(completeItem));
  };

  const handlePending = () => {
    // setFilterItems(todos)
    const pendingItems = filterItems.filter(
      (todo) => todo.isComplete === false
    );

    dispatch(setTodos(pendingItems));
  };

  return (
    <Stack
      direction={'row'}
      sx={{
        display: 'flex',
        color: '#fff',
        alignItems: 'flex-center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        margin: '2rem 0 2rem 0',
      }}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          fontWeight: '700',
          textTransform: 'capitalize',
        }}
      >
        T o d o
      </Typography>
      <div style={{ position: 'relative' }}>
        <RiCalendarTodoLine style={{ fontSize: '2rem' }} onClick={handleOpen} />
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          <Box
            sx={{
              width: '100px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem',
              position: 'absolute',
              left: '-40px',
              top: '40px',
              backgroundColor: '#25273c',
              gap: '5px',
              borderRadius: '8px',
              boxShadow: `2px 2px 2px rgba(0, 0, 0, 0.25),'-2px -2px 2px rgba(0, 0, 0, 0.25)`,
              transition: '0.3s',
              translateX: '100px',
              zIndex: '10',
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
