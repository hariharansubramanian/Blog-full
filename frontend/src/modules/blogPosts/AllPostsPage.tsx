import React, {useEffect} from "react";
import {useFetchPosts} from "./hooks/useFetchPosts";
import {CircularProgressIndicator} from "../common/components/ProgressIndicator";
import StatusAlert from "../common/components/StatusAlert";

export const AllPostsPage = () => {
    const {fetchPosts, isLoading, isError} = useFetchPosts();

    // fetch blog posts when the component is mounted
    useEffect(() => {
        fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only call fetchPosts once, when the component is mounted

    return (
        <>
            {isLoading && <CircularProgressIndicator text={'Fetching blog posts..'}/>}
            {isError && <StatusAlert text={'Error fetching blog posts'} variant={'outlined'} severity={'error'}/>}
            {!isLoading && !isError && <div>Blog posts</div>}
        </>
    );
};
