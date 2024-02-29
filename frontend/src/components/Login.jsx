'use client'
import React, { useEffect, useState } from 'react';
import { Button, Modal, Stack, TextField, Typography } from '@mui/material';
import TextInput from './StyledInput';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetError } from '@/redux/feature/auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from '../../assets';
import Image from 'next/image';
import Link from 'next/link';

const Login = ({ open, setOpen }) => {
    const [signup, setSignup] = useState(false)
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSinupLogin = (value) => {
        setSignup(value);
        dispatch(resetError())
    }
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
            {signup ?
                <Stack sx={{
                    backgroundColor: '#fff', padding: '10px',
                    borderRadius: '7px',
                    outline: 'none',
                    padding: '30px 20px'
                }}
                >
                    <Stack spacing={2} sx={{ alignItems: 'center', flexDirection: 'column' }}>
                        <TextInput
                            type='text'
                            label='Name'
                            height="45px"
                            width="230px"
                            textColor="#000"
                            inputColor="grey"
                            fontSize="15px"
                            focusColor="#1976d2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                                SIGNUP
                            </Button>
                        }
                        {auth.error &&
                            <Stack>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: 'tomato'
                                    }}
                                >{auth.error}</Typography>
                            </Stack>
                        }
                        <Typography sx={{ fontSize: '14px' }}>Already have an account?{" "}
                            <Link href="#"
                                style={{ color: '#1976d2' }}
                                onClick={() => handleSinupLogin(false)}
                            >
                                Login
                            </Link>
                        </Typography>
                    </Stack>
                    <Toaster />
                </Stack>
                :
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
                        {auth.error &&
                            <Stack>
                                <Typography
                                    sx={{
                                        textAlign: 'center',
                                        color: 'tomato'
                                    }}
                                >{auth.error}</Typography>
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
                        <Typography sx={{ fontSize: '14px' }}>Don't have an account?{" "}
                            <Link href="#"
                                style={{ color: '#1976d2' }}
                                onClick={() => handleSinupLogin(true)}
                            >
                                Signup
                            </Link>
                        </Typography>
                    </Stack>
                    <Toaster />
                </Stack>
            }
        </Modal>
    )
}

export default Login
