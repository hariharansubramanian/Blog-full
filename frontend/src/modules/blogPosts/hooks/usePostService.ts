import {useRecoilCallback} from "recoil";
import {IPostData, PostData} from "../types/PostData";
import {PostsSelector} from "../state/postAtoms";
import {UserIpAddressAtom} from "../state/userIpAddressAtom";

export const usePostService = () => {

    const savePosts = useRecoilCallback(
        ({set}) =>
            (posts: IPostData[]) => {
                posts.forEach((data) => {
                    const postResult = new PostData(data)
                    set(PostsSelector(postResult.post.id), postResult)
                })

            }, []
    )

    const saveUserIpAddress = useRecoilCallback(
        ({set}) =>
            (ipAddress: string) => {
                set(UserIpAddressAtom, ipAddress)
            }, []
    )

    return {savePosts, saveUserIpAddress}
}