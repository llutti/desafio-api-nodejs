import { fakerPT_BR as faker } from '@faker-js/faker';
import { db } from '../libs/drizzle.ts';
import { courses, enrollments, users } from './schema.ts';

async function seed()
{
  const usersInsert = await db
    .insert(users)
    .values(Array(3).fill(0).map(() => ({ name: faker.person.fullName(), email: faker.internet.email() })))
    .returning();

  const coursesInsert = await db
    .insert(courses)
    .values(Array(2).fill(0).map(() => ({ title: faker.lorem.words(4) })))
    .returning();

  await db
    .insert(enrollments)
    .values(
      [
        { courseId: coursesInsert[0].id, userId: usersInsert[0].id },
        { courseId: coursesInsert[0].id, userId: usersInsert[1].id },
        { courseId: coursesInsert[1].id, userId: usersInsert[2].id },
      ]);
}

seed();
