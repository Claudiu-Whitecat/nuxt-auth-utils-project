import { hashPassword } from '#imports';
import { z } from 'zod/v4';
import { tables } from '~~/server/utils/database';
const registerSchema = z.object({
  email: z.email(),
  name: z.string().min(1, 'Name is required').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);

  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, body.email),
  });
  if (existingUser) {
    throw createError({
      statusCode: 409, // Conflict
      statusMessage: 'Email already registered',
      data: {
        code: 'EMAIL_EXISTS',
      },
    });
  }
  const hashedPassword = await hashPassword(body.password);
  const [user] = await db
    .insert(tables.users)
    .values({
      email: body.email,
      name: body.name,
      passwordHash: hashedPassword,
    })
    .returning({
      id: tables.users.id,
      name: tables.users.name,
    });

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
    },
    lastLoggedIn: new Date(),
  });

  return { success: true };
});
