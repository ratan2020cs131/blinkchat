'use client'
import React, { useEffect, useState } from 'react';
import { Button, Modal, Stack, TextField, Typography } from '@mui/material';
import TextInput from './StyledInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/feature/auth/authSlice';

const Login = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (email && password)
            dispatch(login({ email, password }))
    }
    useEffect(() => {
        console.log(auth);
        if (auth.isAuth) {
            handleClose();
        }
    }, [auth])

    return (
        <Modal
            open={open}
            // onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Stack sx={{
                backgroundColor: '#fff', padding: '10px',
                borderRadius: '7px',
                outline: 'none',
                padding: '30px 20px'
            }}
            >
                <Stack spacing={2}>
                    <TextInput
                        type='email'
                        label='Email'
                        height="45px"
                        width="230px"
                        textColor="#000"
                        inputColor="grey"
                        fontSize="15px"
                        focusColor="#1976d2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        type='password'
                        label='Password'
                        height="45px"
                        width="230px"
                        textColor="#000"
                        inputColor="grey"
                        fontSize="15px"
                        focusColor="#1976d2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant='contained'
                        onClick={handleSubmit}
                    >
                        LOGIN
                    </Button>

                    {auth.loginError && <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'tomato'
                        }}
                    >{auth.loginError}</Typography>}
                </Stack>
            </Stack>
        </Modal>
    )
}

export default Login
