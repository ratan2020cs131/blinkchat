'use client'
import React, { useEffect, useState } from 'react';
import { Button, Modal, Stack, TextField, Typography } from '@mui/material';
import TextInput from './StyledInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/feature/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from '../../assets';
import Image from 'next/image';

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
            toast.success('Login Successfull', {
                duration: 16000,
                position: 'top-center',
            })
            var timeout = setTimeout(() => handleClose(), 1600);
        }
        return () => clearTimeout(timeout)
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
                <Stack spacing={2} sx={{ alignItems: 'center', flexDirection: 'column' }}>
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
                    {auth.isLogging &&
                        <Image src={Loader} alt="...loading" style={{ height: '40px' }} />
                    }
                    {!auth.isAuth && !auth.isLogging &&
                        <Button variant='contained'
                            onClick={handleSubmit}
                            sx={{ height: '40px' }}
                        >
                            LOGIN
                        </Button>
                    }

                    {auth.loginError &&
                        <Stack>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    color: 'tomato'
                                }}
                            >{auth.loginError}</Typography>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '13px',
                                    color: 'tomato'
                                }}>
                                Check email and password
                            </Typography>
                        </Stack>
                    }
                </Stack>
                <Toaster />
            </Stack>
        </Modal>
    )
}

export default Login
