import { faker } from '@faker-js/faker';
import request from 'supertest';
import { expect, test } from 'vitest';
import { buildServer } from '../server.ts';
import { makeAuthenticateUser } from '../tests/factories/make-user.ts';

test('create a course',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const { token } = await makeAuthenticateUser('manager');

    const response = await request(server.server)
      .post('/api/courses')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({ title: faker.lorem.words(4) });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ courseId: expect.any(String) });
  });
