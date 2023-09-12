import React, { useState } from 'react';
import {
  setItemOff,
  selectItemOff,
  selectTodo,
  selectLoading,
} from '../app/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

import ReactPaginate from 'react-paginate';
import List from './List';

import { Fade, CircularProgress, Stack, Typography } from '@mui/material';

const Pagination = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const itemoff = useSelector(selectItemOff);
  const todos = useSelector(selectTodo);
  const loading = useSelector(selectLoading);

  const endPoint = itemoff + itemsPerPage;

  const currentItems = todos.slice(itemoff, endPoint);
  // console.log(currentItems);

  const pageCount = Math.ceil(todos.length / itemsPerPage);

  // console.log(pageCount)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % todos.length;
    console.log(newOffset);

    dispatch(setItemOff(newOffset));
  };
  if (currentItems.length === 0) {
    if (todos.length <= 7) {
      dispatch(setItemOff(0));
      console.log(currentPage);
    } else if (todos.length <= 14) {
      dispatch(setItemOff(7));
      console.log(currentPage);
    } else if (todos.length <= 21) {
      dispatch(setItemOff(14));
      console.log(currentPage);
    } else if (todos.length <= 28) {
      dispatch(setItemOff(21));
      console.log(currentPage);
    } else if (todos.length <= 35) {
      dispatch(setItemOff(28));
      console.log(currentPage);
    } else if (todos.length <= 49) {
      dispatch(setItemOff(35));
      console.log(currentPage);
    }
  }

  if (currentPage >= pageCount) {
    setCurrentPage(pageCount - 1);
    console.log(currentPage);
  }
  return (
    <div>
      {loading ? (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          spacing={3}
          marginTop={2}
        >
          <Fade
            in={loading}
            style={{
              width: '100px',
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress size={'small'} color='secondary' />
          </Fade>
          <Typography variant='h5' color={'secondary'}>
            Loading....
          </Typography>
        </Stack>
      ) : (
        <>
          <List currentItems={currentItems} />
          {todos.length > 7 && (
            <ReactPaginate
              nextLabel={'>'}
              previousLabel={'<'}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              pageCount={pageCount}
              pageRangeDisplayed={5}
              renderOnZeroPageCount={null}
              breakLabel='...'
              forcePage={currentPage}
              className='pagination'
            />
          )}
        </>
      )}
    </div>
  );
};

export default Pagination;
