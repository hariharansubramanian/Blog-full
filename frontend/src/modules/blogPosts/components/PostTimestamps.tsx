import {Typography} from "@mui/material";
import {formatDistanceToNow} from "date-fns";
import React from "react";

type PostTimestampsProps = {
    created_at?: string;
    updated_at?: string;
}
export const PostTimestamps = ({created_at, updated_at}: PostTimestampsProps) => (
    <Typography variant="caption" color="text.secondary" sx={{fontStyle: 'italic'}}>
        {created_at && `Created ${formatDistanceToNow(new Date(created_at))} ago`}
        {updated_at && ` - Updated ${formatDistanceToNow(new Date(updated_at))} ago`}
    </Typography>
);