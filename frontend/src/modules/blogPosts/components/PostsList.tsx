import React from "react";
import {useRecoilValue} from "recoil";
import {PostsListSelector} from "../state/postAtoms";
import StatusAlert from "../../common/components/StatusAlert";
import {Box} from "@mui/material";
import {PostListItem} from "./PostListItem";

export function PostsList() {
    const posts = useRecoilValue(PostsListSelector)

    if (posts.length === 0) return <StatusAlert text={'No posts found'} variant={'outlined'} severity={'info'}/>;

    return (
        <Box>
            {posts.map((postData, index) => (
                <PostListItem key={index} postData={postData}/>
            ))}
        </Box>
    );
}