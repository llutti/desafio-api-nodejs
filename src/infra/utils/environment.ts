import { z } from 'zod';

const environmentSchema = z.object({
  // Variáveis de Ambiente
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(7001),

  // Logger
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Base de Dados
  DATABASE_URL: z.string({ message: 'DATABASE_URL environment variable is required' }),
});

export type Environment = z.infer<typeof environmentSchema>;
export const envApp = environmentSchema.parse(process.env);
