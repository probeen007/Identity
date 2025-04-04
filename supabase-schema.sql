
-- About Table
CREATE TABLE about (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT NOT NULL,
  email TEXT NOT NULL,
  profileImageUrl TEXT,
  socialLinks JSONB NOT NULL DEFAULT '{}'
);

-- Projects Table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  githubUrl TEXT,
  demoUrl TEXT,
  imageUrl TEXT
);

-- Skills Table
CREATE TABLE skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER NOT NULL
);

-- Experiences Table
CREATE TABLE experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Certificates Table
CREATE TABLE certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  url TEXT
);

-- Recommendations Table
CREATE TABLE recommendations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  text TEXT NOT NULL
);

-- Fun Facts Table
CREATE TABLE funfacts (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL
);

-- RLS Policies
-- Enable RLS on all tables
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE funfacts ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read data
CREATE POLICY "Anyone can read about" ON about FOR SELECT USING (true);
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Anyone can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Anyone can read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Anyone can read certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Anyone can read recommendations" ON recommendations FOR SELECT USING (true);
CREATE POLICY "Anyone can read funfacts" ON funfacts FOR SELECT USING (true);

-- Policy: Only authenticated users can modify data
CREATE POLICY "Authenticated users can insert about" ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update about" ON about FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete about" ON about FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert certificates" ON certificates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update certificates" ON certificates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete certificates" ON certificates FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recommendations" ON recommendations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update recommendations" ON recommendations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete recommendations" ON recommendations FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert funfacts" ON funfacts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update funfacts" ON funfacts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete funfacts" ON funfacts FOR DELETE USING (auth.role() = 'authenticated');
