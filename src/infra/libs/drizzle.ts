import { drizzle } from 'drizzle-orm/node-postgres';
import { envApp } from '../utils/environment.ts';

export const db = drizzle(envApp.DATABASE_URL, { logger: true });
