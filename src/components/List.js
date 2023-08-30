import React, {  useEffect, useState } from 'react'
import { setIsEditing,setTitle, setEditId, setIsConfirm,  setDeleteId, setTostifySuccess, setTostifyError, selectLoading} from '../app/todoSlice'
import { useDispatch,useSelector } from 'react-redux'

import {BsTrash,BsPen} from 'react-icons/bs'

import { db } from '../utils/firebase/firebase'

import {doc, updateDoc} from 'firebase/firestore'
import { Button, CircularProgress, Fade, Table,TableCell,TableRow, Typography } from '@mui/material'
import Empty from './Empty'
// import Fade from '@mui/material'

const List = ({currentItems}) => {
  const dispatch=useDispatch()
    


    

    const [isComplete,setIsComplete]=useState(false)

    // const isConfirm=useSelector(selectIsConfirm)
   

    const handleEdit=(id)=>{
        console.log(id)
        dispatch(setIsEditing(true))
        dispatch(setTitle(id.title))
        dispatch(setEditId(id.id))


    }

 const handleDelete= async(id)=>{
    dispatch(setIsConfirm(true))
    dispatch(setDeleteId(id))

    


    // const deleteItem= await doc(db,'todos',id)

    // await deleteDoc(deleteItem)

    }



    const handleComplete=async(id)=>{

        setIsComplete(!isComplete)

        const completeItem = await doc(db,'todos',id)

        await updateDoc(completeItem,{isComplete:isComplete})

        if(isComplete){
            dispatch(setTostifySuccess('The task is completed'))
        }else{
            dispatch(setTostifyError('Task was incomplete'))
        }

    }



 
  return (
    <>
   

   
    
    
    
    {currentItems.length===0?<Empty/>:<Table  sx={{display:'table',marginTop:'2rem',borderCollapse:'collapse'}}>
        {currentItems&&currentItems.map((todo)=>{
          

        //   console.log(id)

            return(
            
               
                <TableRow key={todo.id}  sx={{width:'550px',margin:'auto',backgroundColor:'#25273c',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0px 0px',borderRadius:'8px',marginTop:'10px',borderBottom:'none'}} >
                   <TableCell size='small' sx={{width:'50%',height:'50px',display:'flex',alignItems:'center',gap:'10px',borderBottom:'none'}}  >
                    <input type="checkbox" name='complete' id="completr" checked={todo.isComplete} onChange={()=>handleComplete(todo.id)} />
                    <p style={{textDecoration:todo.isComplete?'line-through':"",fontSize:'1.5rem',fontWeight:'400',textTransform:'capitalize'}}>{todo.title}</p>
                    </TableCell >
                    <TableCell size='small' sx={{width:'25%',display:'flex',justifyContent:'center',alignItems:'flex-start',height:'50px',textAlign:'left',fontSize:'1.15rem',borderBottom:'none'}} ><p>{todo.isComplete?'Completed':'Active'}</p></TableCell >
                    <TableCell align='center' size='small' sx={{width:'25%',height:'50px',display:'flex',justifyContent:'space-evenly',borderBottom:'none'}} >
                       
                    <Button  sx={{backgroundColor:'transparent',border:'none',cursor:'pointer'}} onClick={()=>handleEdit(todo)}><BsPen  style={{fontSize:'1.5rem', color:'green'}}/></Button >
                    <Button  sx={{backgroundColor:'transparent',border:'none',cursor:'pointer'}} onClick={()=>handleDelete(todo.id)}><BsTrash style={{fontSize:'1.5rem',color:'red'}}/></Button >
                    
                    </TableCell >
                </TableRow>
            )
        })}
      
    </Table>}
   
     
    </>
   
  )
}

export default List
