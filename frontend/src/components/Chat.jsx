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
    const [name, setName] = useState(null);

    useEffect(() => {
        const id = window.sessionStorage.getItem('id');
        const name = window.sessionStorage.getItem('name');
        if (id) {
            setId(id);
            setName(name);
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

        socket.on('recieve-message', (message, id, name) => {
            console.log("received: ", message);
            setChats(prev => [...prev, { id, name, message }]);
        });

        return () => {
            socket.off('recieve-message');
            socket.off('connect');
        };
    }, []);

    const sendMessage = () => {
        if (message !== '') {
            console.log("send: ", message);
            socket.emit('send-message', message, id, name, room);
            setChats(prev => [...prev, { id, name, message }]);
        }
        setMessage('');
    };

    const handleMessage = (e) => {
        if (e.target.value[0] === '\n') { setMessage('') }
        else { setMessage(e.target.value) }
    }


    return (
        <Stack sx={{height: '100%', justifyContent: 'flex-end', alignItems:'center'}} spacing={2}>
            <Converstation chats={chats} id={id} />

            <Stack sx={{ position: 'relative', justifyContent: 'center', paddingBottom:'10px', width:'99%'}}>
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

    useEffect(() => {
        function scrollToBottom() {
            var chatContainer = document.querySelector("#container");
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        // Scroll to bottom initially
        scrollToBottom();
    }, [chats])


    return (
        <div
            style={{
                width:'100%',
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
            }}
        >
            <div
                className={`${styles.conversation}`}
                id="container"
                style={{
                    maxHeight: "90vh",
                    height: "auto",
                    overflowY: "auto",
                    padding:'0 10px',
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 0,
                    flexWrap: "wrap",
                }}
            >
                {chats.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: item.id !== id ? "flex-start" : "flex-end",
                            width: "100%",
                            flexShrink: 0,
                            margin: 0,
                        }}
                    >
                        {item.id !== id && <Typography sx={{ fontSize: '9px', marginBottom: '-6px', marginLeft: '3px' }}>{item.name}</Typography>}
                        <Typography
                            className={`${styles.fontFamily}`}
                            sx={{
                                background: item.id !== id ? '#a0a0a0' : 'yellowgreen',
                                borderRadius: '10px',
                                padding: '10px',
                                width: 'fit-content',
                                maxWidth: '70%',
                                // t: item.id !== id ? 'flex-start' : 'flex-end',
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
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}


