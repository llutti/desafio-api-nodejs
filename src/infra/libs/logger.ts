import pino from 'pino';
import { envApp } from '../utils/environment.ts';


const isProduction = process.env?.NODE_ENV === 'production';

const logger = pino(
  {
    level: envApp.LOG_LEVEL,
    redact: ['req.headers.authorization'],
    ...(!isProduction && {
      transport: {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname', // Opcional: esconde o ID do processo e o hostname
        },
      },
    }),
  });

export { logger };
