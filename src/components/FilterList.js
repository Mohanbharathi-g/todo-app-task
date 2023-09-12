import React from 'react';
import {
  setTodos,
  selectFilterItems,
  setActive,
  selectActive,
} from '../app/todoSlice';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Stack } from '@mui/material';

const FilterList = () => {
  //  declarations
  const dispatch = useDispatch();

  const filterItems = useSelector(selectFilterItems);

  const active = useSelector(selectActive);

  // functions

  // filter All function
  const handleFilterAll = (id) => {
    dispatch(setActive(id));

    dispatch(setTodos(filterItems));
  };

  // this functioon used for showing Only completed tasks
  const handleComplete = (id) => {
    console.log(id);
    dispatch(setActive(id));
    // setFilterItems(todos)
    console.log(filterItems);
    const completeItem = filterItems.filter((todo) => todo.isComplete === true);

    console.log(completeItem);

    dispatch(setTodos(completeItem));
  };

  // this function are used to showing only pending Functions
  const handlePending = (id) => {
    dispatch(setActive(id));
    //  setFilterItems(filterItems)
    const pendingItems = filterItems.filter(
      (todo) => todo.isComplete === false
    );

    dispatch(setTodos(pendingItems));
  };
  // this function used to clear the task locally.
  // const handleClear = async () => {
  //   dispatch(setTodos([]));
  // };

  // useEffect(()=>{
  //   console.log('filterItems',filterItems)
  // },[])

  // button list array of objects.

  const buttonList = [
    { id: 1, title: 'All', onClick: handleFilterAll },
    { id: 2, title: 'Pending', onClick: handlePending },
    { id: 3, title: 'Complete', onClick: handleComplete },
  ];

  // console.log(active)
  return (
    <Stack
      marginTop={'3rem'}
      sx={{
        backgroundColor: '#25273c',
        width: {
          xs: 330,
          sm: 470,
        },

        margin: '2rem auto 1rem auto',

        padding: {
          xs: '10px',
          sm: '15px',
        },
        borderRadius: '8px',
      }}
      direction={'row'}
      spacing={3}
      justifyContent={'space-evenly'}
    >
      {buttonList.map((button) => {
        return (
          <Button
            key={button.id}
            onClick={() => button.onClick(button.id)}
            style={{
              borderBottom: active === button.id ? '2px solid #fff' : '#000',
            }}
            sx={{
              borderRadius: '0',
              fontSize: '1.25rem',
              color: '#9394a5',
              height: '30px',
              textTransform: 'capitalize',
            }}
            disableElevation
            disableRipple
          >
            {button.title}
          </Button>
        );
      })}
    </Stack>
  );
};

export default FilterList;
