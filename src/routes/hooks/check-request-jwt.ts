import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { envApp } from '../../infra/utils/environment.ts';

type JWTPayload = {
  sub: string,
  role: 'student' | 'manager';
}

export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply)
{
  const token = request.headers?.authorization?.split(' ')[1];

  if (!token)
  {
    return reply.status(401).send();
  }

  try
  {
    const payload = jwt.verify(token, envApp.JWT_SECRET) as JWTPayload;

    request.user = payload;
  }
  catch
  {
    // JWT Inválido
    return reply.status(401).send();
  }


}
