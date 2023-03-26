import {useState} from "react";
import {useSnackbar} from "notistack";
import {usePostService} from "./usePostService";
import {CreatedPostResult} from "../types/CreatedPostResult";
import {IPostData} from "../types/PostData";

export const useCreatePost = () => {
    const createPostUri = process.env.REACT_APP_BACKEND_BASE_URL + '/api/posts/create'
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [savedPost, setSavedPost] = useState<IPostData | undefined>(undefined)
    const {enqueueSnackbar} = useSnackbar()
    const {savePost} = usePostService()

    const createPost = async (title: string, author: string, content: string) => {
        if (isLoading) return
        setSavedPost(undefined)
        setIsLoading(true)
        setIsError(false)

        try {
            const requestBody = JSON.stringify({
                title: title,
                author: author,
                content: content
            });
            const response = await fetch(createPostUri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            });

            const jsonData = await response.json();
            const createdPost = jsonData as CreatedPostResult;
            // save into recoil state
            const savedPost = savePost({title: title, author: author, content: content}, createdPost);

            // save into local state - used for notifying consumer components
            setSavedPost(savedPost)
        } catch (error) {
            setIsError(true)
            enqueueSnackbar('Error creating post', {variant: 'error'})
        } finally {
            setIsLoading(false)
        }
    }

    return {isLoading, isError, createPost, savedPost}
}
