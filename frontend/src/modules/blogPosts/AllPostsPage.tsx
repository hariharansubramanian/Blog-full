import React, {useEffect} from "react";
import {useFetchPosts} from "./hooks/useFetchPosts";
import {CircularProgressIndicator} from "../common/components/ProgressIndicator";
import StatusAlert from "../common/components/StatusAlert";
import {useRecoilValue} from "recoil";
import {PostsListSelector} from "./state/postAtoms";

export const AllPostsPage = () => {
    const {fetchPosts, isLoading, isError} = useFetchPosts();
    const postsList = useRecoilValue(PostsListSelector)

    // fetch blog posts when the component is mounted
    useEffect(() => {
        if (postsList.length === 0) {
            fetchPosts()
        }
    }, [fetchPosts, postsList.length]); // Only call fetchPosts once, when the component is mounted

    return (
        <>
            {isLoading && <CircularProgressIndicator text={'Fetching blog posts..'}/>}
            {isError && <StatusAlert text={'Error fetching blog posts'} variant={'outlined'} severity={'error'}/>}
            {!isLoading && !isError && <div>Blog posts</div>}
        </>
    );
};
