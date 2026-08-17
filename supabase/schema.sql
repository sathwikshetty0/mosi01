-- ===================================================
-- World Entrepreneurship Day Campaign — Supabase Schema
-- ===================================================

-- 1. Create Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  placeholder TEXT,
  required BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Default 4 Questions
INSERT INTO public.questions (id, text, placeholder, required, display_order)
VALUES 
  ('q1', 'What is your big idea?', 'Describe your vision or product in a few sentences...', true, 1),
  ('q2', 'What problem does it solve?', 'Explain the core pain point your idea addresses...', true, 2),
  ('q3', 'Who is it for?', 'Describe your primary audience or customer segment...', true, 3),
  ('q4', 'What''s your first step to start?', 'What immediate action will you take to begin execution?', true, 4)
ON CONFLICT (id) DO NOTHING;

-- 2. Create Pledge Submissions Table
CREATE TABLE IF NOT EXISTS public.pledge_submissions (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  video_url TEXT,
  status TEXT DEFAULT 'Pledge Taken'
);

-- 3. Enable RLS (Row Level Security) and Add Permissive Policies for Public Campaign
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to questions and submissions
CREATE POLICY "Allow public read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Allow public insert questions" ON public.questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update questions" ON public.questions FOR UPDATE USING (true);

CREATE POLICY "Allow public read submissions" ON public.pledge_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public insert submissions" ON public.pledge_submissions FOR INSERT WITH CHECK (true);

-- 4. Create Storage Bucket for Pledge Videos (Run in Supabase SQL Editor)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pledge-videos', 'pledge-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Security Policy: Allow Public Upload & Public Read
CREATE POLICY "Public Read Pledge Videos" ON storage.objects 
  FOR SELECT USING (bucket_id = 'pledge-videos');

CREATE POLICY "Public Upload Pledge Videos" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'pledge-videos');
