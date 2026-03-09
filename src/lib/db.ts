import { turso } from './turso';

export interface VideoItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    category: string;
}

export interface LogoItem {
    name: string;
    folder: string;
    color_url?: string;
    white_url?: string;
}

export interface Inquiry {
    id?: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    created_at?: string;
}

export const initDb = async () => {
    await turso.execute(`
    CREATE TABLE IF NOT EXISTS videos (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      thumbnail TEXT,
      url TEXT,
      category TEXT,
      display_order INTEGER
    )
  `);

    await turso.execute(`
    CREATE TABLE IF NOT EXISTS logos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      folder TEXT,
      color_url TEXT,
      white_url TEXT,
      display_order INTEGER
    )
  `);

    await turso.execute(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Migration: Add phone column if it doesn't exist
    try {
        await turso.execute('ALTER TABLE inquiries ADD COLUMN phone TEXT');
    } catch (e) {
        // Silently fail if column already exists
    }
};

export const getVideos = async (): Promise<VideoItem[]> => {
    const result = await turso.execute('SELECT * FROM videos ORDER BY display_order ASC');
    return result.rows.map(row => ({
        id: row.id as string,
        title: row.title as string,
        description: row.description as string,
        thumbnail: row.thumbnail as string,
        url: row.url as string,
        category: row.category as string,
    }));
};

export const saveVideos = async (videos: VideoItem[]) => {
    await turso.execute('DELETE FROM videos');
    for (let i = 0; i < videos.length; i++) {
        const v = videos[i];
        await turso.execute({
            sql: 'INSERT INTO videos (id, title, description, thumbnail, url, category, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args: [v.id, v.title, v.description, v.thumbnail, v.url, v.category, i],
        });
    }
};

export const getLogos = async (): Promise<LogoItem[]> => {
    const result = await turso.execute('SELECT * FROM logos ORDER BY display_order ASC');
    return result.rows.map(row => ({
        name: row.name as string,
        folder: row.folder as string,
        color_url: row.color_url as string,
        white_url: row.white_url as string,
    }));
};

export const saveLogos = async (logos: LogoItem[]) => {
    await turso.execute('DELETE FROM logos');
    for (let i = 0; i < logos.length; i++) {
        const l = logos[i];
        await turso.execute({
            sql: 'INSERT INTO logos (name, folder, color_url, white_url, display_order) VALUES (?, ?, ?, ?, ?)',
            args: [l.name, l.folder, l.color_url || '', l.white_url || '', i],
        });
    }
};

export const saveInquiry = async (inquiry: Omit<Inquiry, 'id' | 'created_at'>) => {
    await turso.execute({
        sql: 'INSERT INTO inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)',
        args: [inquiry.name, inquiry.email, inquiry.phone, inquiry.message],
    });
};

export const getInquiries = async (): Promise<Inquiry[]> => {
    const result = await turso.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
    return result.rows.map(row => ({
        id: row.id as number,
        name: row.name as string,
        email: row.email as string,
        phone: row.phone as string,
        message: row.message as string,
        created_at: row.created_at as string,
    }));
};
