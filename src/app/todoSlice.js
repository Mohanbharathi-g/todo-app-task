import {createSlice } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState={
    title:'',
    todos:[],
    isEditing:false,
    editId:null,
    fiterItems:[],
    active:null,
    isOpen:false,
    itemoff:0,
    isConfirm:false,
    deleteId:null,
    tostifySuccess:null,
    tositfyError:null,
    loading:false,

  
}


const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{

        setTitle:(state,action)=>{
            state.title=action.payload
        },
        setTodos:(state,action)=>{

            console.log(action.payload)

            state.todos=action.payload
        
        },
        setIsEditing:(state,action)=>{
            state.isEditing=action.payload

        },
        setEditId:(state,action)=>{
            state.editId=action.payload
        },
        setFilterItems:(state,action)=>{
            console.log(action.payload)
            state.fiterItems=action.payload
        },
        setActive:(state,action)=>{
            state.active=action.payload
        },
        setIsOpen:(state,action)=>{
            // console.log(action.payload)
            state.isOpen=action.payload
        },
        setItemOff:(state,action)=>{
            state.itemoff=action.payload
        },
        setIsConfirm:(state,action)=>{
            console.log(action.payload)
            state.isConfirm=action.payload
        },
        setDeleteId:(state,action)=>{
            state.deleteId=action.payload
        },
        setTostifyError:(state,action)=>{
           toast.error(action.payload)
            
            
            // toast.`${type}`(value)
            
        },
        setTostifySuccess:(state,action)=>{
            toast.success(action.payload)
             
             
             // toast.`${type}`(value)
             
         },
         setIsLoading:(state,action)=>{
            state.loading=action.payload
         }

    }
})

export const {setTitle,setTodos,setIsEditing,setEditId,setFilterItems,setActive,setIsOpen,setItemOff,setIsConfirm,setDeleteId,setTostifyError,setTostifySuccess,setIsLoading} =todoSlice.actions

export const selectTitle=(state)=>state.todo.title
export const selectTodo=(state)=>state.todo.todos
export const selectIsEditing=(state)=>state.todo.isEditing

export const selectEditId=(state)=>state.todo.editId
export const selectFilterItems=(state)=>state.todo.fiterItems

export const selectActive=(state)=>state.todo.active
export const selectIsOpen=(state)=>state.todo.isOpen
export const selectItemOff=(state)=>state.todo.itemoff

export const selectIsConfirm=(state)=>state.todo.isConfirm
export const  selectDeleteId=(state)=>state.todo.deleteId
export const selectLoading=(state)=>state.todo.loading



export default todoSlice.reducer