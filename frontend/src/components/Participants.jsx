'use client'
import { Stack, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Participants = () => {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true); // Assuming online by default

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    handleOnlineStatus();

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

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
      {!isOnline && <Typography sx={{ fontSize: '17px', fontWeight: 600, width: '100%', lineHeight: '50px', color: '#fff', textAlign: 'center', background: 'tomato' }}>No internet</Typography>}
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
          onClick={() => router.push('/')}
        >
          Delete Room
        </Button>
      </Stack>
    </Stack>
  )
}

export default Participants
