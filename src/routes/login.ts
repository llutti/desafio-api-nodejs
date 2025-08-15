// Davi_Pereira@gmail.com

import { verify } from 'argon2';
import { eq } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { users } from '../infra/database/schema.ts';
import { envApp } from '../infra/utils/environment.ts';

export const loginRoute: FastifyPluginAsyncZod = async (server) =>
{
  server.post('/sessions',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Login',
        body: z.object({
          email: z.string().describe('E-mail do usuário'),
          password: z.string().describe('Senha do usuário'),
        }),
        response: {
          200: z.object({ token: z.string().describe('JWT Token') }).describe('Autencicação realizada com sucesso!'),
          400: z.object({ message: z.string().describe('Mensagem de erro') }).describe('Credenciais inválidas.'),
        }
      }
    },
    async (request, reply) =>
    {
      const { email, password } = request.body;

      const result = await server.db
        .select()
        .from(users)
        .where(eq(users.email, email));


      const user = result?.at(0) ?? null;

      if (!user)
      {
        return reply.status(400).send({ message: 'Credenciais inválidas.' });
      }

      const isPasswordValid = await verify(user.password, password);

      if (!isPasswordValid)
      {
        return reply.status(400).send({ message: 'Credenciais inválidas.' });
      }

      const token = jwt.sign({ sub: user.id, role: user.role }, envApp.JWT_SECRET);

      return reply.status(200).send({ token });
    });
};
