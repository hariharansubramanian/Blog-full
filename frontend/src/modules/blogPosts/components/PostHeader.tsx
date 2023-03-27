import {Typography} from "@mui/material";
import React from "react";

type PostHeaderProps = {
    title: string;
    author: string;
}
export const PostHeader = ({title, author}: PostHeaderProps) => (
    <>
        <Typography gutterBottom variant="h4" component="div">
            {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
            By {author}
        </Typography>
    </>
);