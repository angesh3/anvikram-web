export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  author: string;
  isPublished: boolean;
}

export interface BlogPostInput {
  title: string;
  summary: string;
  content: string;
  category: string;
  isPublished?: boolean;
}

export interface BlogPostUpdate extends Partial<BlogPostInput> {
  updatedAt?: string;
} 