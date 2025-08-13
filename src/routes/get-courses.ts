import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { db } from '../infra/libs/drizzle.ts';
import { courses } from '../infra/database/schema.ts';

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) =>
{
  server.get('/courses', {
    schema: {
      tags: ['Courses'],
      summary: 'Get all courses',
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),
              title: z.string(),
            })
          )
        })
      }
    }
  }, async (request, reply) =>
  {
    const result = await db
      .select(
        {
          id: courses.id,
          title: courses.title,
        })
      .from(courses);

    return reply.send({ courses: result });
  });
};
