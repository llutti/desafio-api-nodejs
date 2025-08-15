import request from 'supertest';
import { expect, test } from 'vitest';
import { buildServer } from '../server.ts';
import { makeCourse } from '../tests/factories/make-course.ts';
import { makeAuthenticateUser } from '../tests/factories/make-user.ts';

test('get course by id',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const { token } = await makeAuthenticateUser('manager');
    const course = await makeCourse();

    const response = await request(server.server)
      .get(`/api/courses/${course.id}`)
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      course: {
        id: expect.any(String),
        title: expect.any(String),
        description: null,
      }
    });
  });

test('get course by id - return 404 for nom existing course',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const { token } = await makeAuthenticateUser('manager');

    const response = await request(server.server)
      .get('/api/courses/e8d367ba-aa39-4356-9dd6-d9cc0684a860')
      .set('Authorization', token);

    expect(response.status).toBe(404);
  });
