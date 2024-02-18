import { Box, Stack } from '@mui/material'
import React from 'react'
import Participants from './Participants'
import Chat from './Chat'

const Room = () => {
  return (
    <Stack sx={{ width: '100%', height:'100%'}} direction={"row"}>
      <Stack sx={{width:'25%', minWidth: 'fit-content', padding: '0px', borderRight: '1px solid #a0a0a050', height: '100%' }}>
        <Participants />
      </Stack>
      <Box sx={{ width: '100%', paddingBottom:'10px'}}>
        <Chat />
      </Box>
    </Stack>
  )
}

export default Room
