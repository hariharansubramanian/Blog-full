import {PostsList} from "./PostsList";
import {Fab, Tooltip} from "@mui/material";
import {Create} from "@mui/icons-material";
import React, {useState} from "react";
import {NewPostDialog} from "./NewPostDialog";

export const PostsAndCreateNew = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <PostsList/>
            <Tooltip title={'Create new post'}>
                <Fab color="primary" onClick={handleOpen} sx={{position: 'fixed', bottom: 16, right: 16}}>
                    <Create/>
                </Fab>
            </Tooltip>
            <NewPostDialog open={open} handleClose={handleClose}/>
        </>
    )
}