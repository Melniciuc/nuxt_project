import { drizzle } from 'drizzle-orm/better-sqlite3';
export { sql, eq, and, or } from 'drizzle-orm'
import Database from 'better-sqlite3';

import * as schema from '~/database/schema'

export const tables = schema
const sqlite = new Database(process.env.DATABASE_URL);

export function useDrizzle() {
    return drizzle(sqlite, { schema })
}

export type Position = typeof schema.positionTelemetry.$inferSelect
export type Acceleration = typeof schema.accelerationTelemetry.$inferSelect