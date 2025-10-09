import type { Post } from '../types';
import Link from 'next/link';

const ADDRESS = 'http://localhost:3000/api/posts';

async function getPosts(): Promise<Post[]> {

	const res = await fetch(ADDRESS, {
		cache: 'no-store'
	});

	if (!res.ok) {
		throw new Error('Failed to fetch posts');
	}

	type ApiResponse = {
		status: string;
		results: number;
		data: {
			posts: Post[];
		};
	};

	const apiResponse: ApiResponse = await res.json();

	return apiResponse.data.posts;
};

export default async function HomePage() {
	const posts = await getPosts();

	return (
		<main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
		  <h1>My Blog</h1>
		  <div>
			{posts.length > 0 ? (
			  posts.map((post) => (
				<article key={post._id} style={{ marginBottom: '1rem' }}>
				  {/* 2. Wrap the title in a Link component */}
				  <Link href={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
					<h2 style={{ marginBottom: '0.25rem' }}>{post.title}</h2>
				  </Link>
				  <p style={{ margin: 0, color: '#555' }}>{post.body.substring(0, 150)}...</p>
				</article>
			  ))
			) : (
			  <p>No posts available.</p>
			)}
		  </div>
		</main>
	  );
};

