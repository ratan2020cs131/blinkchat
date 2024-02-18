'use client'
import { Stack, Typography, Button } from '@mui/material'
import React from 'react';
import styles from './style.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast, { Toaster } from 'react-hot-toast';

const Participants = () => {

  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      const linkMsg = ` ${url} \n CODE: ${url.split('/').pop()} `
      await navigator.clipboard.writeText(linkMsg);
      toast.success('Link copied', {
        position: 'bottom-center',
      })
    } catch (err) {
      console.log("error while copying room link: ", err.message);
    }
  }

  return (
    <Stack sx={{ alignItems: 'center', userSelect: 'none' }}>
      <Typography sx={{ color: '#fff', padding: '10px 0', fontWeight: 900, fontSize: '20px', color: '#1976d2' }} className={`${styles.fontFamily}`}>Participants</Typography>
      <Stack>
        <Typography className={`${styles.fontFamily}`} sx={{ ":hover": { backgroundColor: '#1f1f1f' }, color: '#fff', padding: '2px 0', fontWeight: 600, fontSize: '18px', padding: '5px 30px', borderRadius: '8px' }}>Ratan</Typography>
      </Stack>
      <Stack sx={{ position: 'absolute', bottom: '20px' }} spacing={1}>
        <Toaster />
        <Button color="success"
          sx={{ padding: '5px 20px', display: 'flex', alignItems: 'center', fontSize: '17px' }}
          className={`${styles.fontFamily}`}
          onClick={handleCopyLink}
        >
          Invite
          <ContentCopyIcon sx={{ height: '15px' }} />
        </Button>
        <Button variant='outlined' color="error"
          sx={{ padding: '5px 20px', textTransform: 'capitalize' }}
          className={`${styles.fontFamily}`}
        >
          Delete Room
        </Button>
      </Stack>
    </Stack>
  )
}

export default Participants
