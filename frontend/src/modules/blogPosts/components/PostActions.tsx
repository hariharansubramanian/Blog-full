import {IconButton, Stack, Typography} from "@mui/material";
import {UserPostInterest} from "../types/UserPostInterest";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import React from "react";

type PostActionsProps = {
    userPostInterest: UserPostInterest;
    likeCount: number;
    dislikeCount: number;
};
export const PostActions = ({userPostInterest, likeCount, dislikeCount}: PostActionsProps) => (
    <Stack direction="row" spacing={1}>
        <IconButton
            color={userPostInterest === UserPostInterest.Liked ? 'primary' : 'default'}
            onClick={() => console.log('Like clicked')}
        >
            <ThumbUp/>
        </IconButton>
        <Typography>{likeCount}</Typography>
        <IconButton
            color={userPostInterest === UserPostInterest.Disliked ? 'secondary' : 'default'}
            onClick={() => console.log('Dislike clicked')}
        >
            <ThumbDown/>
        </IconButton>
        <Typography>{dislikeCount}</Typography>
    </Stack>
);