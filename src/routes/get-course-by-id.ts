import { eq } from 'drizzle-orm';
import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { courses } from '../infra/database/schema.ts';
import { checkRequestJWT } from './hooks/check-request-jwt.ts';

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) =>
{
  server.get('/courses/:id',
    {
      preHandler: [
        checkRequestJWT,
      ],
      schema: {
        tags: ['Courses'],
        summary: 'Get course by ID',

        params: z.object({
          id: z.uuid()
        }),
        response: {
          200: z.object(
            {
              course: z.object(
                {
                  id: z.uuid(),
                  title: z.string(),
                  description: z.string().nullable(),
                })
            }),
          404: z.null().describe('Course not found'),
        }
      }
    },
    async (request, reply) =>
    {
      const courseId = request.params.id;

      const result = await server.db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (result.length > 0)
      {
        return reply.send({ course: result[0] });
      }

      return reply.status(404).send();
    });
};
