import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';
import { IconBrandTwitter, IconBrandLinkedin } from '@tabler/icons-react';

interface Props {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const title = slug.split('-').join(' ');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/post/${encodeURIComponent(title)}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-4">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
        {post.excerpt && (
          <p className="text-xl text-gray-700 mb-6">{post.excerpt}</p>
        )}
        <div className="flex gap-4">
          <TwitterShareButton url={shareUrl} title={post.title}>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <IconBrandTwitter className="h-5 w-5 mr-2" />
              Share on Twitter
            </button>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={post.title}>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <IconBrandLinkedin className="h-5 w-5 mr-2" />
              Share on LinkedIn
            </button>
          </LinkedinShareButton>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
    </article>
  );
} 