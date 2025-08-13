
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { courses } from '../infra/database/schema.ts';


export const createCourseRoute: FastifyPluginAsyncZod = async (server) =>
{
  server.post('/courses',
    {
      schema: {
        tags: ['Courses'],
        summary: 'Create a course',
        body: z.object({
          title: z.string().min(5, 'Título precisa ter pelo menos 5 caracteres').describe('Título do curso'),
          description: z.string().optional().describe('Descrição do curso'),
        }),
        response: {
          201: z.object(
            {
              courseId: z.uuid().describe('ID do curso criado'),
            }).describe('Curso criado com sucesso!'),
        }
      }
    },
    async (request, reply) =>
    {
      const result = await server.db
        .insert(courses)
        .values({
          title: request.body.title,
          description: request.body?.description ?? null,
        })
        .returning({ id: courses.id });

      return reply.status(201).send({ courseId: result[0].id });
    });
};
