export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface Post {
    // columns
    id: number
    user_id: number
    body: string
    created_at: string|null
    updated_at: string|null
    // relations
    user: User
}

export type PostsProps = {
    posts: {
        data: Post[];
    };
}
