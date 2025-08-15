// Davi_Pereira@gmail.com

import { verify } from 'argon2';
import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { users } from '../infra/database/schema.ts';


export const loginRoute: FastifyPluginAsyncZod = async (server) =>
{
  server.post('/sessions',
    {
      schema: {
        tags: ['auth'],
        summary: 'Login',
        body: z.object({
          email: z.string().describe('E-mail do usuário'),
          password: z.string().describe('Senha do usuário'),
        }),
        // response: {
        //   201: z.object(
        //     {
        //       courseId: z.uuid().describe('ID do curso criado'),
        //     }).describe('Curso criado com sucesso!'),
        // }
      }
    },
    async (request, reply) =>
    {
      const { email, password } = request.body;

      const result = await server.db
        .select()
        .from(users)
        .where(eq(users.email, email));


      if (result.length === 0)
      {
        return reply.status(400).send({ message: 'Credenciais inválidas.' });
      }

      const isValid = await verify(result[0]?.password, password);

      if (!isValid)
      {
        return reply.status(400).send({ message: 'Credenciais inválidas.' });
      }

      return reply.status(200).send({ message: 'ok' });
    });
};
