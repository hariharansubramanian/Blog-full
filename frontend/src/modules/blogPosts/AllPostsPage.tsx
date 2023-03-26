import React, {useEffect} from "react";
import {useFetchPosts} from "./hooks/useFetchPosts";
import {CircularProgressIndicator} from "../common/components/ProgressIndicator";
import StatusAlert from "../common/components/StatusAlert";
import {PostsList} from "./components/PostsList";
import {PostsListSelector} from "./state/postAtoms";
import {useRecoilValue} from "recoil";

export const AllPostsPage = () => {
    const {fetchPosts, isLoading, isError} = useFetchPosts();
    const posts = useRecoilValue(PostsListSelector)

    // fetch blog posts when the component is mounted and posts are not fetched yet
    useEffect(() => {
        if (posts.length === 0) fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only call fetchPosts once, when the component is mounted

    return (
        <>
            {isLoading && <CircularProgressIndicator text={'Fetching blog posts..'}/>}
            {isError && <StatusAlert text={'Error fetching blog posts'} variant={'outlined'} severity={'error'}/>}
            {!isLoading && !isError && <PostsList/>}
        </>
    );
};
