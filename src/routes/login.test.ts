import request from 'supertest';
import { expect, test } from 'vitest';
import { buildServer } from '../server.ts';
import { makeUser } from '../tests/factories/make-user.ts';

test('login',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const { user, passwordBeforeHash } = await makeUser();

    const response = await request(server.server)
      .post('/api/sessions')
      .set('Content-Type', 'application/json')
      .send({
        email: user.email,
        password: passwordBeforeHash,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });

test('login - 400 User not found',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const response = await request(server.server)
      .post('/api/sessions')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user.email@example.com',
        password: 'passwordBeforeHash',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: expect.any(String) });
  });

test('login - 400 Password invalid',
  async () =>
  {
    const server = buildServer({ ativarLogs: false });

    await server.ready();

    const { user } = await makeUser();

    const response = await request(server.server)
      .post('/api/sessions')
      .set('Content-Type', 'application/json')
      .send({
        email: user.email,
        password: 'passwordBeforeHash',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: expect.any(String) });
  });
