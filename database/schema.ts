import { sqliteTable, integer, real } from 'drizzle-orm/sqlite-core'

export const telemetry = sqliteTable('telemetry', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  lat: real('lat').notNull(),
  lng: real('lng').notNull(),
  speedKmh: real('speed_kmh').notNull(),
  accX: real('acc_x').notNull(),
  accY: real('acc_y').notNull(),
  accZ: real('acc_z').notNull(),
  recordedAt: real('recorded_at').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
