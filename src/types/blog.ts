export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: string;
  published: boolean;
  category?: string;
  summary?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  excerpt?: string;
  content: string;
  status?: string;
  category?: string;
  summary?: string;
}

export interface BlogPostUpdate extends Partial<BlogPostInput> {
  updated_at?: string;
} 