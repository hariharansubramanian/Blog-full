import {atom, atomFamily, DefaultValue, selector, selectorFamily} from "recoil";
import {IPostData} from "../types/PostData";

/**
 * This atom is used to store the ids of the posts.
 */
export const PostIds = atom<number[]>({
    key: 'postIds',
    default: []
})

/**
 * This is an atom family of blog posts
 */
export const PostAtoms = atomFamily<IPostData | undefined, number>({
    key: 'postsAtomFamily',
    default: (id: number) => undefined
});

/**
 * This is a selector family used to get and set blog posts and update the PostIds atom
 */
export const PostsSelector = selectorFamily<IPostData | undefined, number>({
    key: 'postsSelector',
    get: (id: number) =>
        ({get}) => get(PostAtoms(id)),
    set: (id: number) =>
        ({get, set, reset}, newVal) => {
            if (newVal instanceof DefaultValue || newVal === undefined) {
                reset(PostAtoms(id))
                return
            }

            set(PostAtoms(id), newVal)

            // If it's an update on existing post, there is no need to adjust the PostIds[] atom
            const ids = get(PostIds)
            if (ids.find((postId) => postId === newVal.post.id)) return

            // If it's a new post, we need to add into the PostIds[] atom
            set(PostIds, (prevPostIds) => {
                const newPostId = newVal.post.id
                return [...prevPostIds, newPostId]
            })
        }
})

/**
 * This is a selector used to get all the posts from the PostsAtomFamily
 */
export const PostsListSelector = selector<IPostData[]>({
    key: 'postsListSelector',
    get: ({get}) => {
        const postIds = get(PostIds);
        return postIds
            .map((postId) => get(PostsSelector(postId)))
            .filter((post) => post !== undefined) as IPostData[];
    },
});