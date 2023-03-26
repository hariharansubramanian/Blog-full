import React from 'react';
import {useParams} from "react-router";
import {useRecoilValue} from "recoil";
import {PostsSelector} from "./state/postAtoms";
import StatusAlert from "../common/components/StatusAlert";
import {Box, Container} from "@mui/material";
import {PostHeader} from "./components/PostHeader";
import {PostTimestamps} from "./components/PostTimestamps";
import {PostContent} from "./components/PostContent";
import {PostActions} from "./components/PostActions";

export const SinglePostPage = () => {
    const {id} = useParams();
    const postId = parseInt(id ?? '', 10);
    const postData = useRecoilValue(PostsSelector(postId)); // Replace with the actual selector function

    if (!postData) {
        return <StatusAlert text={'Post not found'} variant={'outlined'} severity={'error'}/>;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{marginTop: 3}}>
                <PostHeader title={postData.post.title} author={postData.post.author}/>
                <PostTimestamps created_at={postData.post.created_at} updated_at={postData.post.updated_at}/>
                <PostContent content={postData.post.content}/>
            </Box>
            <Box sx={{marginTop: 3}} display={'flex'} justifyContent={'center'}>
                <PostActions
                    userPostInterest={postData.userPostInterest}
                    likeCount={postData.likeCount}
                    dislikeCount={postData.dislikeCount}
                />
            </Box>
        </Container>
    );
};