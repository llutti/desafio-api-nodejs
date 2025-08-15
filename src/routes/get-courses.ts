import { and, asc, count, eq, ilike, type SQL } from 'drizzle-orm';
import { type FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { courses, enrollments } from '../infra/database/schema.ts';
import { checkRequestJWT } from './hooks/check-request-jwt.ts';
import { checkUserRole } from './hooks/check-user-role.ts';

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) =>
{
  server.get('/courses', {
    preHandler: [
      checkRequestJWT,
      checkUserRole('manager'),
    ],
    schema: {
      tags: ['Courses'],
      summary: 'Get all courses',
      querystring: z.object({
        search: z.string().optional(),
        orderBy: z.enum(['id', 'title']).default('title'),
        page: z.coerce.number().positive().optional().default(1),
      }),
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),
              title: z.string(),
              enrollments: z.number(),
            })
          ),
          total: z.number(),
        })
      }
    }
  },
    async (request, reply) =>
    {
      const { search, orderBy, page } = request.query;
      const limit = 10;
      const offset = (page - 1) * limit;
      const conditions: SQL[] = [];

      if (search)
      {
        conditions.push(ilike(courses.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        server.db
          .select(
            {
              id: courses.id,
              title: courses.title,
              enrollments: count(enrollments.id),
            })
          .from(courses)
          .leftJoin(enrollments, eq(courses.id, enrollments.courseId))
          .where(and(...conditions))
          .orderBy(asc(courses[orderBy]))
          .limit(limit)
          .offset(offset)
          .groupBy(courses.id),
        server.db.$count(courses, and(...conditions)),
      ]);

      return reply.send({ courses: result, total });
    });
};
