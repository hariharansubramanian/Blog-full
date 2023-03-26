import {UserPostInterest} from "./UserPostInterest";
import {Post} from "./Post";

export interface IPostResult {
    post: Post
    likeCount: number
    dislikeCount: number
    userPostInterest: UserPostInterest
}

export class PostResult implements IPostResult {
    dislikeCount: number;
    likeCount: number;
    post: Post;
    userPostInterest: UserPostInterest;

    constructor(postResult: IPostResult) {
        this.post = new Post(postResult.post);
        this.likeCount = postResult.likeCount;
        this.dislikeCount = postResult.dislikeCount;
        this.userPostInterest = postResult.userPostInterest;
    }

    static default(): PostResult {
        return new PostResult({
            post: Post.default(),
            likeCount: 0,
            dislikeCount: 0,
            userPostInterest: UserPostInterest.Neutral
        })
    }
}
