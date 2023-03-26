import {UserPostInterest} from "./UserPostInterest";
import {Post} from "./Post";

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

    constructor(postResult: IPostData) {
        this.post = new Post(postResult.post);
        this.likeCount = postResult.likeCount;
        this.dislikeCount = postResult.dislikeCount;
        this.userPostInterest = postResult.userPostInterest;
    }

    static default(): PostData {
        return new PostData({
            post: Post.default(),
            likeCount: 0,
            dislikeCount: 0,
            userPostInterest: UserPostInterest.Neutral
        })
    }
}
