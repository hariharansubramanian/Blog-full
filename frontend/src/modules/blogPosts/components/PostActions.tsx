import {IconButton, Stack, Typography} from "@mui/material";
import {UserPostInterest} from "../types/UserPostInterest";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import React from "react";
import {ActionType} from "../types/ActionType";
import {usePostService} from "../hooks/usePostService";

type PostActionsProps = {
    postId: number;
    userPostInterest: UserPostInterest;
    likeCount: number;
    dislikeCount: number;
};
export const PostActions = ({postId, userPostInterest, likeCount, dislikeCount}: PostActionsProps) => {
    const {handlePostAction} = usePostService();

    return (

        <Stack direction="row" spacing={1}>
            <IconButton
                color={userPostInterest === UserPostInterest.Liked ? 'primary' : 'default'}
                onClick={() => handlePostAction(postId, ActionType.Like, userPostInterest)}
            >
                <ThumbUp/>
            </IconButton>
            <Typography>{likeCount}</Typography>

            <IconButton
                color={userPostInterest === UserPostInterest.Disliked ? 'secondary' : 'default'}
                onClick={() => handlePostAction(postId, ActionType.Dislike, userPostInterest)}
            >
                <ThumbDown/>
            </IconButton>
            <Typography>{dislikeCount}</Typography>
        </Stack>
    )
};