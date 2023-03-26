import {useRecoilCallback} from "recoil";
import {IPostData, PostData} from "../types/PostData";
import {PostsSelector} from "../state/postAtoms";
import {UserIpAddressAtom} from "../state/userIpAddressAtom";
import {CreatedPostResult} from "../types/CreatedPostResult";
import {IPost, Post} from "../types/Post";
import {UserPostInterest} from "../types/UserPostInterest";

export const usePostService = () => {

    const savePosts = useRecoilCallback(
        ({set}) =>
            (posts: IPostData[]) => {
                posts.forEach((data) => {
                    const postResult = PostData.fromResponse(data)
                    set(PostsSelector(postResult.post.id!), postResult)
                })

            }, []
    )

    const saveUserIpAddress = useRecoilCallback(
        ({set}) =>
            (ipAddress: string) => {
                set(UserIpAddressAtom, ipAddress)
            }, []
    )

    const savePost = useRecoilCallback(
        ({set}) =>
            (requestPost: IPost, createdPost: CreatedPostResult) => {
                const newPost = new Post(requestPost.title, requestPost.author, requestPost.content, createdPost.createdAt, createdPost.id, createdPost.updatedAt)
                // TODO: increment likeCount and change UserPostInterest to UserPostInterest.Like if server adds a default like action on post creation
                const newPostData = new PostData(newPost, 0, 0, UserPostInterest.Neutral)
                set(PostsSelector(newPostData.post.id!), newPostData)
                return newPostData
            }
    )

    return {savePosts, saveUserIpAddress, savePost}
}