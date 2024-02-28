import React from 'react';
import { Button, Modal, Stack, TextField } from '@mui/material';
import TextInput from './StyledInput';

const Login = ({ open, setOpen }) => {
    const handleClose = () => setOpen(false)

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
                    />
                    <Button variant='contained'>
                        LOGIN
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    )
}

export default Login
