import type { Post } from '../../../types';

async function getPost(id: string): Promise<Post> {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failt to fetch post!');
    }

    type ApiResponse = {
        status: string;
        data: {
            post: Post;
        };
    };

    const apiResponse: ApiResponse = await res.json();

    return apiResponse.data.post;
};

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);

    return (
        <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <article>
                <h1>{post.title}</h1>
                <p style={{ color: '#555', marginTop: '-0.5rem' }}>Publised on: {new Date(post.createdAt).toLocaleDateString()}</p>
                <div style={{ marginTop: '2rem', lineHeight: '1.7' }}>
                    {post.body}
                </div>
            </article>
        </main>
    );
};