import {Typography} from "@mui/material";
import React from "react";

type PostContentProps = {
    content: string;
}
export const PostContent = ({content}: PostContentProps) => {
    return <Typography variant="body2" color="text.secondary" sx={{marginTop: 2}}>
        {content}
    </Typography>;
}