import { type FastifyInstance } from 'fastify';
import { createCourseRoute } from './create-course.ts';
import { getCourseByIdRoute } from './get-course-by-id.ts';
import { getCoursesRoute } from './get-courses.ts';
import { loginRoute } from './login.ts';

export async function registerRoutes(server: FastifyInstance)
{
  server.register(createCourseRoute);
  server.register(getCourseByIdRoute);
  server.register(getCoursesRoute);
  server.register(loginRoute);
}
