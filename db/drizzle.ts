import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon(process.env.NEON_DSN!);
export const db = drizzle({ client: sql });
