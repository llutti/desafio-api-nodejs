import { faker } from '@faker-js/faker';
import { courses } from '../../infra/database/schema.ts';
import { db } from '../../infra/libs/drizzle.ts';

export async function makeCourse(title?: string)
{
  const result = await db
    .insert(courses)
    .values({ title: title ?? faker.lorem.words(4) })
    .returning();

  return result[0];
}
