'use client'
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import RoomIdModal from './RoomIdModal';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();
    const [openModal, setModal] = useState(false);
    const handleClose = () => setModal(false);
    const handleOpen = () => setModal(true);

    function createRoom() {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        router.push(`/room/${code}`)
    }

    return (
        <Stack sx={{ height: '100%', width: '100%', alignItems: 'center', paddingTop: '100px' }} spacing={2}>
            <Button
                variant={'contained'}
                sx={{ width: '100px', fontWeight: 700 }}
                onClick={handleOpen}
            >
                Join
            </Button>

            <Button
                sx={{ width: '100px' }}
                onClick={createRoom}
            >
                Create
            </Button>
            {openModal && <RoomIdModal close={handleClose} open={openModal} />}
        </Stack>
    )
}

export default Home;
