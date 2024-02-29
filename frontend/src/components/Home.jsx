'use client'
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RoomIdModal from './RoomIdModal';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Home = ({ name }) => {
    const auth = useSelector(state => state.auth)
    const router = useRouter();
    const [openModal, setModal] = useState(false);
    const handleClose = () => setModal(false);
    const handleOpen = () => setModal(true);

    const createRoom = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        router.push(`/room/${code}`)
    }

    return (
        <Stack sx={{ height: '100%', width: '100%', alignItems: 'center', paddingTop: '100px' }} spacing={2}>
            {auth.isAuth &&
                <>
                    <Typography sx={{ textWrap: 'wrap', textAlign: 'center', fontSize: '25px', color: '#4CBB17', fontWeight: 700 }}>Welcome! {name}</Typography>
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
                </>
            }
        </Stack>
    )
}

export default Home;
