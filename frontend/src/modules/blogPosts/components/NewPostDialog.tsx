import React from 'react';
import {AppBar, Dialog, IconButton, Toolbar, Typography} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';
import {NewPostForm} from "./NewPostForm";

type NewPostDialogProps = {
    open: boolean;
    handleClose: () => void;
}

export const NewPostDialog = ({open, handleClose}: NewPostDialogProps) => {

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
            <NewPostForm handleClose={handleClose}/>
        </Dialog>
    );
};
