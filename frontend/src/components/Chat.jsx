'use client'
import { Stack, OutlinedInput, Box, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from '@/components/style.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Plane } from '../../assets';
import { io } from 'socket.io-client';
const socket = io('https://blinkchat-wekq.onrender.com');

const Chat = () => {
    const sendRef = useRef(null)
    const auth = useSelector(state => state.auth);
    const router = useRouter();
    const [room, setRoom] = useState(null);
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        const id = window.sessionStorage.getItem('id');
        if (id) {
            setId(id);
        } else {
            router.push('/');
        }
    }, [])

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
        });

        const url = window.location.href;
        setRoom(url.split('/').pop());
        socket.emit('join-room', url.split('/').pop());

        socket.on('recieve-message', (message, id) => {
            console.log("received: ", message);
            setChats(prev => [...prev, { id: id, message }]);
        });

        return () => {
            socket.off('recieve-message');
            socket.off('connect');
        };
    }, []);

    const sendMessage = () => {
        if (message !== '') {
            console.log("send: ", message);
            socket.emit('send-message', message, room);
            setChats(prev => [...prev, { id: id, message }]);
        }
        setMessage('');
    };

    const handleMessage = (e) => {
        if (e.target.value[0] === '\n') { setMessage('') }
        else { setMessage(e.target.value) }
    }


    return (
        <Stack sx={{ height: '100%', padding: '10px 20px', justifyContent: 'flex-end' }} spacing={2}>
            <Converstation chats={chats} id={id} />

            <Stack sx={{ position: 'relative', justifyContent: 'center' }}>
                <textarea
                    className={`${styles.input} ${styles.fontFamily}`}
                    type="text"
                    placeholder='New message'
                    value={message}
                    onChange={handleMessage}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey) { setMessage(e.target.value) }
                        else if (e.key === 'Enter') {
                            sendRef.current.click();
                        }
                    }}
                />
                <Stack spacing={0.8} direction={"row"}
                    ref={sendRef}
                    className={`${styles.fontFamily}`}
                    sx={{ position: 'absolute', right: '10px', cursor: 'pointer', padding: '5px', background: '#1976d2', height: '28px', width: 'fit-content', borderRadius: '40px', alignItems: 'center', padding: '5px 16px' }}
                    onClick={sendMessage}
                >
                    <Image alt="." src={Plane} style={{ objectFit: 'contain', width: '60%', height: '50%' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '15px', color: '#fff' }}>Send</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Chat;


const Converstation = ({ chats, id }) => {
    return (
        <Box spacing={1} className={`${styles.conversation}`} style={{}}>
            {chats.map((item, index) => (
                <>
                    {item.id !== id && <Typography sx={{ fontSize: '9px', marginBottom: '-6px', marginLeft: '3px' }}>Name</Typography>}
                    <Typography
                        key={index}
                        className={`${styles.fontFamily}`}
                        sx={{
                            background: item.id !== id ? '#a0a0a0' : 'yellowgreen',
                            borderRadius: '10px',
                            padding: '10px',
                            width: 'fit-content',
                            maxWidth: '70%',
                            alignSelf: item.id !== id ? 'flex-start' : 'flex-end',
                            wordBreak: 'break-all',
                            margin: '5px 0'
                        }}
                    >
                        {item.message.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                        {/* {item.message} */}
                    </Typography>
                </>
            ))}
        </Box>
        // <Stack sx={{
        //     width: '100%', height: '100%', background: 'green',
        //     overflowY: 'auto',
        // }}>
        //     {
        //         Array(8).fill(1).map((item, index) => (
        //             <Typography
        //                 sx={{
        //                     marginLeft: index % 2 === 0 && 'auto',
        //                     marginRight: index % 2 !== 0 && 'auto'
        //                 }}
        //             >{"ndiidm" + index}</Typography>
        //         ))
        //     }
        // </Stack>
    )
}


