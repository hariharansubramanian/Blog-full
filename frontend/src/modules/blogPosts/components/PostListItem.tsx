import React from 'react';
import {Card, CardActions, CardContent,} from '@mui/material';
import {IPostData} from "../types/PostData";
import {PostHeader} from "./PostHeader";
import {PostTimestamps} from "./PostTimestamps";
import {PostActions} from "./PostActions";
import {Constants} from "../../../utils/Constants";
import {truncateContent} from "../../../utils/truncateContent";
import {PostContent} from "./PostContent";
import {Link} from "react-router-dom";

type PostListItemProps = {
    postData: IPostData;
}

export const PostListItem = ({postData}: PostListItemProps) => {
    const truncatedContent = truncateContent(postData.post.content, Constants.MaxPostItemLength);

    return (
        <Card sx={{marginBottom: 3}}>
            <CardContent>
                <PostHeader title={postData.post.title} author={postData.post.author}/>
                <PostTimestamps created_at={postData.post.created_at} updated_at={postData.post.updated_at}/>
                <Link to={`/posts/${postData.post.id}`} style={{textDecoration: 'none'}}>
                    <PostContent content={truncatedContent}/>
                </Link>
            </CardContent>
            <CardActions>
                <PostActions
                    userPostInterest={postData.userPostInterest}
                    likeCount={postData.likeCount}
                    dislikeCount={postData.dislikeCount}
                />
            </CardActions>
        </Card>
    );
};