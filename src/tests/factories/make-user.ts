import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { users } from '../../infra/database/schema.ts';
import { db } from '../../infra/libs/drizzle.ts';
import { envApp } from '../../infra/utils/environment.ts';

type Role = 'manager' | 'student';

export async function makeUser(role?: Role)
{
  const passwordBeforeHash = randomUUID();

  const result = await db
    .insert(users)
    .values(
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash(passwordBeforeHash),
        role,
      })
    .returning();

  return {
    user: result[0],
    passwordBeforeHash
  };
}


export async function makeAuthenticateUser(role?: Role)
{
  const { user } = await makeUser(role);

  const token = jwt.sign({ sub: user.id, role: user.role }, envApp.JWT_SECRET);

  return {
    user,
    token
  };
}
