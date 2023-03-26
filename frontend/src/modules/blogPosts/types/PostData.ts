import {UserPostInterest} from "./UserPostInterest";
import {IPost, Post} from "./Post";

export interface PostResponse {
    userIpAddress: string,
    posts: IPostData[]
}

export interface IPostData {
    post: Post
    likeCount: number
    dislikeCount: number
    userPostInterest: UserPostInterest
}

export class PostData implements IPostData {
    dislikeCount: number;
    likeCount: number;
    post: Post;
    userPostInterest: UserPostInterest;

    constructor(post: IPost, likeCount: number, dislikeCount: number, userPostInterest: UserPostInterest) {
        this.post = new Post(post.title, post.author, post.content, post.created_at, post.id, post.updated_at);
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.userPostInterest = userPostInterest;
    }

    public static fromResponse(postResult: IPostData): PostData {
        return new PostData(postResult.post, postResult.likeCount, postResult.dislikeCount, postResult.userPostInterest)
    }
}
