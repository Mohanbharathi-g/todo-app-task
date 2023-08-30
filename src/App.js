
import './App.css';
import Form from './components/Form';

import Title from './components/Title';
import FilterList from './components/FilterList';
// import List from './components/List';
import Pagination from './components/Pagination';
import Confirm from './components/Confirm';



function App() {
  return (
    <div className='app' style={{width:'full',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#161722',color:'#9394a5'}}>
   <div style={{width:'600px',height:'auto',padding:'10px 15px',position:'relative'}}>
    <Confirm/>
   <Title/>
    <Form/>
    <FilterList/>
    {/* <List/> */}
    <Pagination itemsPerPage={7}/>
   </div>
    </div>
  );
}

export default App;
