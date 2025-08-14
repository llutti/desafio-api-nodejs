import { fastifySwagger } from '@fastify/swagger';
import scalarAPIReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider, } from 'fastify-type-provider-zod';
import { fastifyDrizzle } from './infra/libs/drizzle.ts';
import { logger } from './infra/libs/logger.ts';
import { envApp } from './infra/utils/environment.ts';
import { registerRoutes } from './routes/routes.ts';

export function buildServer({ ativarLogs }: { ativarLogs?: boolean } = { ativarLogs: true })
{
  const server = fastify(
    {
      logger: ativarLogs ? undefined : false,
      loggerInstance: ativarLogs ? logger : undefined,
    }).withTypeProvider<ZodTypeProvider>();

  if (process.env.NODE_ENV === 'development')
  {
    server.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Desafio Node.JS',
          version: '1.0.0'
        }
      },
      transform: jsonSchemaTransform
    });

    server.register(scalarAPIReference, {
      routePrefix: '/docs',
      configuration: {
        title: 'Desafio Node.JS',
        metaData: {
          title: 'Desafio Node.JS - Documentação',
        },
        theme: 'saturn',
        hideModels: true,
        layout: 'modern',
        defaultHttpClient: {
          targetKey: 'node',
          clientKey: 'fetch',
        }
      }
    });
  };

  server.register(fastifyDrizzle, {
    databaseURL: envApp.DATABASE_URL
  });

  // Compiladores de validação e serialização do Zod
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Registra todas as rotas da aplicação a partir de um ponto central
  server.register(registerRoutes, { prefix: '/api' });

  return server;
}
