import { Box, Stack } from '@mui/material'
import React from 'react'
import Participants from './Participants'
import Chat from './Chat'
import styles from './style.module.css'

const Room = () => {
  return (
    <Stack className={styles.room} sx={{ width: '100%', height: '100%' }} direction={"row"}>
      {/* <Stack sx={{width:'25%', minWidth: 'fit-content', padding: '0px', borderRight: '1px solid #a0a0a050', height: '100%' }}>
        <Participants />
      </Stack> */}
      <Box className={`${styles.chatContainer}`}>
        <Chat />
      </Box>
    </Stack>
  )
}

export default Room
