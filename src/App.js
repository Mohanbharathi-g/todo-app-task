import './App.css';
import Form from './components/Form';

import Title from './components/Title';
import FilterList from './components/FilterList';
// import List from './components/List';
import Pagination from './components/Pagination';
import Confirm from './components/Confirm';
import { Stack } from '@mui/material';

function App() {
  return (
    <Stack
      className='app'
      sx={{
        backgroundColor: '#161722',
        color: '#9394a5',
        minHeight: '100vh',
      }}
    >
      <Stack
        sx={{
          width: {
            xs: '300',
            sm: 500,
          },

          margin: 'auto',
        }}
      >
        <Confirm />
        <Title />
        <Form />
        <FilterList />
        {/* <List/> */}
        <Pagination itemsPerPage={7} />
      </Stack>
    </Stack>
  );
}

export default App;
