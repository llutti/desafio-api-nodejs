import { drizzle } from 'drizzle-orm/node-postgres';
import { type FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance
  {
    db: ReturnType<typeof drizzle>;
  }
}

interface FastifyDrizzlePluginOptions
{
  databaseURL: string;
}

export const fastifyDrizzle: FastifyPluginAsync<FastifyDrizzlePluginOptions> = async (fastify, options) =>
{
  const db = drizzle(options.databaseURL, { logger: true });

  fastify.decorate('db', db);

  // fastify.addHook('onClose', async () =>
  // {
  //   // Close database connection if your client supports it
  //   // For libsql, client.close() might not be explicitly needed for simple cases
  // });
};

export default fastifyPlugin(fastifyDrizzle, {
  fastify: '5.x',
  name: 'fastify-drizzle'
});
