import {useState} from "react";
import {useSnackbar} from "notistack";
import {PostResponse} from "../types/PostData";
import {usePostService} from "./usePostService";

export const useFetchPosts = () => {
    const getPostsUri = process.env.REACT_APP_BACKEND_BASE_URL + '/api/posts'
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const {savePosts, saveUserIpAddress} = usePostService()

    const fetchPosts = async () => {
        if (isLoading) return
        setIsLoading(true)
        setIsError(false)

        try {
            const response = await fetch(getPostsUri);
            const jsonData = await response.json();
            const data = jsonData as PostResponse;

            savePosts(data.posts)
            saveUserIpAddress(data.userIpAddress)
        } catch (error) {
            setIsError(true)
            enqueueSnackbar('Error fetching posts', {variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }

    return {isLoading, isError, fetchPosts}
}