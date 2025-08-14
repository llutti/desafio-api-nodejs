import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL)
{
  throw new Error('DATABASE_URL env is REQUIRED!');
}

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: './src/infra/database/migrations',
  schema: './src/infra/database/schema.ts',
});
