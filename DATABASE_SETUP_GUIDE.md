# Database Setup Guide for Admin Panel

## Current Setup (LocalStorage)
Currently, the admin panel uses **localStorage** which means:
- ✅ Changes are immediate
- ❌ Data is browser-specific (each device has its own data)
- ❌ Data is lost if browser cache is cleared
- ❌ Not shared across team members

## Database Options for Team Collaboration

To make changes visible to **everyone** across all devices, you need a database. Here are the best options:

---

## Option 1: Supabase (Recommended - Easiest & Free)

### Why Supabase?
- ✅ **Free tier** (up to 500MB database, 2GB bandwidth)
- ✅ **Real-time updates** (changes appear instantly)
- ✅ **Easy setup** (5 minutes)
- ✅ **Built-in authentication** (better security)
- ✅ **REST API** (works with static sites)

### Setup Steps:

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project

2. **Create Database Table**
   ```sql
   -- Run this in Supabase SQL Editor
   CREATE TABLE our_work_data (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     videos JSONB NOT NULL,
     logos JSONB NOT NULL,
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Insert initial data
   INSERT INTO our_work_data (videos, logos) VALUES (
     '[]'::jsonb,
     '[]'::jsonb
   );
   ```

3. **Enable Row Level Security (RLS)**
   - Go to Authentication > Policies
   - Create policy to allow read access to everyone
   - Create policy to allow write access only with API key

4. **Get API Keys**
   - Go to Project Settings > API
   - Copy: `Project URL` and `anon public` key

5. **Update Your Code**
   - Install: `npm install @supabase/supabase-js`
   - Create `src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = 'YOUR_SUPABASE_URL'
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
   
   export const supabase = createClient(supabaseUrl, supabaseKey)
   ```

6. **Update Data Functions**
   - Modify `src/data/ourWorkData.ts` to fetch from Supabase
   - Update save functions to write to Supabase

**Cost**: Free for small projects, $25/month for production

---

## Option 2: Firebase Firestore (Google)

### Why Firebase?
- ✅ **Free tier** (1GB storage, 50K reads/day)
- ✅ **Real-time sync**
- ✅ **Easy integration**
- ✅ **Google infrastructure**

### Setup Steps:

1. **Create Firebase Project**
   - Go to https://firebase.google.com
   - Create project
   - Enable Firestore Database

2. **Create Collection**
   - Collection: `ourWorkData`
   - Document: `main`
   - Fields: `videos` (array), `logos` (array)

3. **Get Config**
   - Project Settings > General > Your apps
   - Copy Firebase config

4. **Update Code**
   - Install: `npm install firebase`
   - Create `src/lib/firebase.ts`
   - Update data functions

**Cost**: Free tier, then pay-as-you-go

---

## Option 3: Airtable (No-Code Database)

### Why Airtable?
- ✅ **Visual interface** (like Excel)
- ✅ **Free tier** (1,200 records/base)
- ✅ **Easy for non-technical team**
- ✅ **REST API**

### Setup Steps:

1. **Create Airtable Base**
   - Go to https://airtable.com
   - Create base: "Our Work Data"
   - Create tables: "Videos" and "Logos"

2. **Get API Key**
   - Account > Developer Hub
   - Create personal access token

3. **Update Code**
   - Install: `npm install airtable`
   - Create API functions

**Cost**: Free for small teams, $20/month for pro

---

## Option 4: Netlify Functions + JSON File (Simplest)

### Why This?
- ✅ **No external service**
- ✅ **Uses Netlify infrastructure**
- ✅ **Free with Netlify**
- ⚠️ **Requires Git commits** (not instant)

### Setup Steps:

1. **Create Netlify Function**
   - Create `netlify/functions/getData.js`
   - Create `netlify/functions/saveData.js`

2. **Store Data in Repo**
   - Create `data/ourWorkData.json` in repo
   - Function reads/writes to this file

3. **Update Code**
   - Fetch from Netlify function endpoint
   - Save via Netlify function

**Cost**: Free (included with Netlify)

---

## Option 5: MongoDB Atlas (Most Flexible)

### Why MongoDB?
- ✅ **Free tier** (512MB storage)
- ✅ **Flexible schema**
- ✅ **Powerful queries**
- ⚠️ **More complex setup**

### Setup Steps:

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster

2. **Create Database & Collection**
   - Database: `phygital_studio`
   - Collection: `our_work_data`

3. **Get Connection String**
   - Connect > Drivers
   - Copy connection string

4. **Update Code**
   - Install: `npm install mongodb`
   - Create connection functions

**Cost**: Free tier, then $9/month

---

## Recommended Implementation: Supabase

I recommend **Supabase** because:
1. **Easiest setup** (5 minutes)
2. **Real-time updates** (changes appear instantly)
3. **Free tier** is generous
4. **Better security** with RLS
5. **Works perfectly** with static sites

### Quick Implementation Guide:

1. **Install Supabase**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Supabase Client** (`src/lib/supabase.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
   const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
   
   export const supabase = createClient(supabaseUrl, supabaseKey)
   ```

3. **Update Data Functions** (`src/data/ourWorkData.ts`):
   ```typescript
   export const getVideoData = async (): Promise<VideoItem[]> => {
     const { data } = await supabase
       .from('our_work_data')
       .select('videos')
       .single()
     return data?.videos || defaultVideoData
   }
   
   export const saveVideoData = async (data: VideoItem[]): Promise<void> => {
     await supabase
       .from('our_work_data')
       .update({ videos: data })
       .eq('id', 'main-id')
   }
   ```

4. **Add Environment Variables** (`.env`):
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Update Netlify Environment Variables**:
   - Netlify Dashboard > Site Settings > Environment Variables
   - Add both variables

---

## Migration Path

1. **Phase 1**: Keep localStorage as fallback
2. **Phase 2**: Add database fetching
3. **Phase 3**: Sync localStorage with database
4. **Phase 4**: Remove localStorage dependency

---

## Need Help?

If you want me to implement any of these options, let me know which one you prefer and I'll:
1. Set up the database structure
2. Update all the code
3. Deploy the changes
4. Test everything

**Recommended**: Start with Supabase - it's the easiest and most reliable for your use case.

