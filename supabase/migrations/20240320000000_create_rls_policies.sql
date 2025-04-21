-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Allow public read access to published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Allow admin full access to all posts" ON blog_posts
  FOR ALL
  USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  );

-- Create policies for users
CREATE POLICY "Allow users to read their own data" ON users
  FOR SELECT
  USING (
    auth.uid() = id
  );

CREATE POLICY "Allow admin full access to users" ON users
  FOR ALL
  USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
  );

-- Set default permissions
ALTER TABLE blog_posts FORCE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY; 