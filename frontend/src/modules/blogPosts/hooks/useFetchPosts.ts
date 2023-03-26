import {useState} from "react";
import {useSnackbar} from "notistack";
import {PostResult} from "../types/PostResult";
import {usePostService} from "./usePostService";

export const useFetchPosts = () => {
    const getPostsUri = process.env.REACT_APP_BACKEND_BASE_URL + '/api/posts'
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const {savePosts} = usePostService()

    const fetchPosts = async () => {
        if (isLoading) return
        setIsLoading(true)
        setIsError(false)

        try {
            const response = await fetch(getPostsUri);
            const jsonData = await response.json();
            savePosts(jsonData as PostResult[])
        } catch (error) {
            setIsError(true)
            enqueueSnackbar('Error fetching posts', {variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }

    return {isLoading, isError, fetchPosts}
}