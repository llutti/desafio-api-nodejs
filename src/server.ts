import { fastify } from 'fastify';


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
});

server.get('/', async (request, reply) =>
{
  return reply.send({ hello: 'world' });
});

server.listen({ port: 7007, host: '0.0.0.0' }, (err) =>
{
  if (err)
  {
    server.log.error(err);
    process.exit(1);
  }
});
