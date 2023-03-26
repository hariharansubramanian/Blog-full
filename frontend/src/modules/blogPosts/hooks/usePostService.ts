import {useRecoilCallback} from "recoil";
import {IPostResult, PostResult} from "../types/PostResult";
import {PostsSelector} from "../state/postAtoms";

export const usePostService = () => {

    const savePosts = useRecoilCallback(
        ({snapshot, set}) =>
            (posts: IPostResult[]) => {
                posts.forEach((data) => {
                    const postResult = new PostResult(data)
                    set(PostsSelector(postResult.post.id), postResult)
                })

            }, []
    )

    return {savePosts}
}