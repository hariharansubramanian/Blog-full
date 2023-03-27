export interface IPost {
    id?: number
    title: string
    author: string
    content: string
    created_at?: string
    updated_at?: string
}

export class Post implements IPost {
    id?: number;
    title: string;
    author: string;
    content: string;
    created_at?: string;
    updated_at?: string

    constructor(title: string, author: string, content: string, created_at?: string, id?: number, updated_at?: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}