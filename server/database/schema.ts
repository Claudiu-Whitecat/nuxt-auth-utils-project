import { sqliteTable } from 'drizzle-orm/sqlite-core/table';

export const users = sqliteTable('users', (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  passwordHash: t.text().notNull(),
  createAt: t.integer({ mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
  updateAt: t
    .integer({ mode: 'timestamp_ms' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
}));
