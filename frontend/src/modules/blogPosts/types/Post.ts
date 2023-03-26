export interface IPost {
    id: number
    title: string
    author: string
    content: string
    created_at: string
    updated_at?: string
}

export class Post implements IPost {
    id: number;
    title: string;
    author: string;
    content: string;
    created_at: string;
    updated_at?: string

    constructor(post: IPost) {
        this.id = post.id;
        this.title = post.title;
        this.author = post.author;
        this.content = post.content;
        this.created_at = post.created_at;
        this.updated_at = post.updated_at;
    }
}