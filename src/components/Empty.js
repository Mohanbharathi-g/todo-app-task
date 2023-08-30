import { Stack, Typography } from '@mui/material'
import React from 'react'
import { RiEmotionUnhappyFill } from 'react-icons/ri'


// There is no list of tasks in Ui this component will be dispayed.
const Empty = () => {
  return (
    <Stack sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'5rem'}}>
        <Typography variant='h4' component={'div'}>Please Enter Your Todo list</Typography>
        <RiEmotionUnhappyFill style={{fontSize:'5rem',color:'#3a7bfd'}}/>
      
    </Stack>
  )
}

export default Empty
