import {useRecoilCallback} from "recoil";
import {IPostData, PostData} from "../types/PostData";
import {PostsSelector} from "../state/postAtoms";
import {UserIpAddressAtom} from "../state/userIpAddressAtom";
import {CreatedPostResult} from "../types/CreatedPostResult";
import {IPost, Post} from "../types/Post";
import {UserPostInterest} from "../types/UserPostInterest";
import {ActionType} from "../types/ActionType";
import {cloneDeep} from "lodash";

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

    const handlePostAction = useRecoilCallback(
        ({set}) =>
            (postId: number, action: ActionType, userPostInterest: UserPostInterest) => {
                const resolvedData = resolveNextActions(action, userPostInterest)

                // Adjust likeCount, dislikeCount and the new user's post interest for the post
                set(PostsSelector(postId), (oldPostData) => {
                    if (!oldPostData) return oldPostData

                    const newPostData = cloneDeep(oldPostData)
                    newPostData.likeCount += resolvedData.likesIncrement
                    newPostData.dislikeCount += resolvedData.dislikesIncrement
                    newPostData.userPostInterest = resolvedData.newUserPostInterest
                    return newPostData
                })

                // Create actions on server
                const createPostActionUri = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/posts/${postId}/action`
                resolvedData.nextActions.forEach((action) => {
                    const body = {
                        actionType: action
                    }
                    fetch(createPostActionUri, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                });
            }
    )

    /**
     * Determines the next action(s) to be performed based on the current action type and user post interest.
     *  When clicking LIKE button:
     *     ->if UserPostInterest.Neutral -> create ActionType.Like
     *     ->if UserPostInterest.Disliked -> create ActionType.Undo_dislike and ActionType.Like
     *     ->if UserPostInterest.Liked -> create ActionType.Undo_like
     *
     *   When clicking DISLIKE button:
     *     ->if UserPostInterest.Neutral -> create ActionType.Dislike
     *     ->if UserPostInterest.Liked -> create ActionType.Undo_like and ActionType.Dislike
     *     ->if UserPostInterest.Disliked -> create ActionType.Undo_dislike
     * @param actionType The current action type.
     * @param userPostInterest The user's current interest in the post.
     */
    const resolveNextActions = (actionType: ActionType, userPostInterest: UserPostInterest) => {
        let nextActions: ActionType[] = []; // the next user actions to be performed
        let likesIncrement = 0; // likes to adjust for the post
        let dislikesIncrement = 0; // dislikes to adjust for the post
        let newUserPostInterest = userPostInterest; // the new user post interest
        switch (actionType) {
            case ActionType.Like:
                switch (userPostInterest) {
                    case UserPostInterest.Neutral:
                        nextActions = [ActionType.Like];
                        newUserPostInterest = UserPostInterest.Liked;
                        likesIncrement = likesIncrement + 1;
                        break;
                    case UserPostInterest.Liked:
                        nextActions = [ActionType.Undo_like];
                        newUserPostInterest = UserPostInterest.Neutral;
                        likesIncrement = likesIncrement - 1;
                        break;
                    case UserPostInterest.Disliked:
                        nextActions = [ActionType.Undo_dislike, ActionType.Like];
                        newUserPostInterest = UserPostInterest.Liked;
                        dislikesIncrement = dislikesIncrement - 1;
                        likesIncrement = likesIncrement + 1;
                        break;
                }
                break;
            case ActionType.Dislike:
                switch (userPostInterest) {
                    case UserPostInterest.Neutral:
                        nextActions = [ActionType.Dislike];
                        newUserPostInterest = UserPostInterest.Disliked;
                        dislikesIncrement = dislikesIncrement + 1;
                        break;
                    case UserPostInterest.Liked:
                        nextActions = [ActionType.Undo_like, ActionType.Dislike];
                        newUserPostInterest = UserPostInterest.Disliked;
                        likesIncrement = likesIncrement - 1;
                        dislikesIncrement = dislikesIncrement + 1;
                        break;
                    case UserPostInterest.Disliked:
                        nextActions = [ActionType.Undo_dislike];
                        newUserPostInterest = UserPostInterest.Neutral;
                        dislikesIncrement = dislikesIncrement - 1;
                        break;
                }
                break;
        }
        return {nextActions, newUserPostInterest, likesIncrement, dislikesIncrement}
    };


    return {savePosts, saveUserIpAddress, savePost, handlePostAction}
}