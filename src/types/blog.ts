export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  excerpt?: string;
  content: string;
  status?: string;
}

export interface BlogPostUpdate extends Partial<BlogPostInput> {
  updated_at?: string;
} 