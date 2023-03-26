import {UserPostInterest} from "./UserPostInterest";
import {Post} from "./Post";

export interface PostResult {
    post: Post
    likeCount: number
    dislikeCount: number
    userPostInterest: UserPostInterest
}

