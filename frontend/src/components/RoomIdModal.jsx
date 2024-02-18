import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

const RoomIdModal = ({ open, close }) => {
    const router = useRouter();
    const inputRef = useRef(null)
    const [id, setId] = useState('');
    const handleChange = (e) => {
        if (e.target.value !== ' ') {
            setId(e.target.value.toUpperCase())
        }
    }

    const handleSubmit = () => {
        if(id.length===6){
            router.push(`/room/${id.toLowerCase()}`)
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.querySelector('input').focus()
        }
    }, [inputRef])

    return (
        <Modal
            open={open}
            onClose={close}
            sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
        >
            <Stack
                spacing={2}
                sx={{ borderRadius: '10px', backgroundColor: '#36454f50', padding: '40px 80px 20px', width: 'fit-content', alignItems: 'center' }}
            >
                <TextField
                    ref={inputRef}
                    label="Room Id"
                    variant="outlined"
                    sx={{ ...inputStyles, width: '200px' }}
                    onChange={handleChange}
                    value={id}
                    inputProps={{ maxLength: 6 }} 
                />
                <Button
                    sx={{ width: '130px', fontWeight: 700 }}
                    onClick={handleSubmit}
                >
                    Connect
                </Button>
            </Stack>
        </Modal>
    )
}

export default RoomIdModal


const inputStyles = {
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& label': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        color: '#E0E3E7',
        '& fieldset': {
            borderColor: '#E0E3E7',
            borderRadius: '8px',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    },
}