import { asc, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const limit = query.limit ? parseInt(query.limit as string, 10) : undefined
    let q = useDrizzle()
        .select()
        .from(tables.telemetry)
        .orderBy(desc(tables.telemetry.createdAt));
    if (limit) {
        return await q.limit(limit).all();
    } else {
        return await q.all();
    }
})