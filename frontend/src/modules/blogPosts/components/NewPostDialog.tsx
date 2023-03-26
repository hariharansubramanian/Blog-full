import React from 'react';
import {AppBar, Box, Button, Dialog, IconButton, TextField, Toolbar, Typography} from '@mui/material';
import {Close as CloseIcon, SaveAs} from '@mui/icons-material';

type NewPostDialogProps = {
    open: boolean;
    handleClose: () => void;
}
export const NewPostDialog = ({open, handleClose}: NewPostDialogProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implement the logic to create a new post
        console.log('Create new post');
        handleClose();
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Create a New Post
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="form" onSubmit={handleSubmit} sx={{padding: 2}}>
                <TextField fullWidth label="Title" margin="normal" required/>
                <TextField fullWidth label="Author" margin="normal" required/>
                <TextField fullWidth label="Content" margin="normal" required multiline rows={20}/>
                <Button fullWidth size={'large'} variant='contained' startIcon={<SaveAs/>}>Create post</Button>
            </Box>
        </Dialog>
    );
};
