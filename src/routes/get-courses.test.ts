import request from 'supertest';
import { expect, test } from 'vitest';
import { buildServer } from '../server.ts';
import { makeCourse } from '../tests/factories/make-course.ts';
import { randomUUID } from 'node:crypto';

test('get courses',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const titleId = randomUUID();
    await makeCourse(titleId);

    const response = await request(server.server)
      .get(`/api/courses?search=${titleId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: 1,
      courses: [
        {
          id: expect.any(String),
          title: titleId,
          enrollments: 0,
        }]
    });
  });
