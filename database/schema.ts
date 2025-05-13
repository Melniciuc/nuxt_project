import { sqliteTable, integer, real } from 'drizzle-orm/sqlite-core'

export const positionTelemetry = sqliteTable('position_telemetry', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  x: real('x').notNull(),
  y: real('y').notNull(),
  z: real('z').notNull(),
  speedKmh: real('speed_kmh').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const accelerationTelemetry = sqliteTable('acceleration_telemetry', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  accX: real('acc_x').notNull(),
  accY: real('acc_y').notNull(),
  accZ: real('acc_z').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})