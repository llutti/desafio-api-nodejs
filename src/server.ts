import { fastifySwagger } from '@fastify/swagger';
import scalarAPIReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider, } from 'fastify-type-provider-zod';
import { registerRoutes } from './routes/routes.ts';
import { envApp } from './infra/utils/environment.ts';

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
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
      hideModels: true,
    }
  });
}

// Compiladores de validação e serialização do Zod
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// Registra todas as rotas da aplicação a partir de um ponto central
server.register(registerRoutes, { prefix: '/api' });

server.listen({ port: envApp.PORT, host: '0.0.0.0' }, (err) =>
{
  if (err)
  {
    server.log.error(err);
    process.exit(1);
  }
});
