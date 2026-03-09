import { createClient } from '@libsql/client';

const TURSO_DB_URL = 'libsql://phygital-website-digitalhues.aws-ap-south-1.turso.io';
const TURSO_DB_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjczNTIyNjksImlkIjoiNjAzZGU5MjItY2QyYi00MzJmLWI1NTUtNWEyOTA3ZTJkNzFiIiwicmlkIjoiZWZkOWE2ZTMtNDE5OC00ZDhmLWFmYzEtYWE5NTE3MTZkODFmIn0.B2M1wXKdiAxraejLgmcfm-eeks_Kpi7IuoCkypYOa238sYimvpG4LMLlQmIJaxexARW3orMO21cDQpGmNxO8Aw';

export const turso = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_TOKEN,
});
