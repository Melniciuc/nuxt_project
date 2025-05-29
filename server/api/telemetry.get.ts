import { desc, and, ne } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const limit = query.limit ? parseInt(query.limit as string, 10) : 10
    const offset = query.offset ? parseInt(query.offset as string, 10) : 0
    const data = await useDrizzle()
        .select()
        .from(tables.telemetry)
        .where(
            or(
                ne(tables.telemetry.lat, 0),
                ne(tables.telemetry.lng, 0)
            )
        )
        .orderBy(desc(tables.telemetry.id))
        .limit(limit)
        .offset(offset)
    const total = await useDrizzle()
        .select({ count: sql<number>`count(*)` })
        .from(tables.telemetry)
        .where(
            or(
                ne(tables.telemetry.lat, 0),
                ne(tables.telemetry.lng, 0)
            )
        )

    return {
        data,
        total: total[0].count,
        limit,
        offset
    }
})