import { desc, and, ne, gte, lte, max, min } from 'drizzle-orm';

const limit = 1000;

export default defineEventHandler(async (event) => {
    const { from, to } = getQuery(event);
    const fromTimestamp = from ? Math.floor(new Date(from as string).getTime() / 1000) : undefined;
    const toTimestamp = to ? Math.floor(new Date(to as string).getTime() / 1000) : undefined;

    const conditions = [
        ne(tables.telemetry.lat, 0),
        ne(tables.telemetry.lng, 0),
    ];
    if (fromTimestamp !== undefined && !isNaN(fromTimestamp)) {
        conditions.push(gte(tables.telemetry.recordedAt, fromTimestamp));
    }
    if (toTimestamp !== undefined && !isNaN(toTimestamp)) {
        conditions.push(lte(tables.telemetry.recordedAt, toTimestamp));
    }

    const data = await useDrizzle()
        .select({
            id: min(tables.telemetry.id).as('id'),
            lat: tables.telemetry.lat,
            lng: tables.telemetry.lng,
            speedKmh: tables.telemetry.speedKmh,
            accX: max(tables.telemetry.accX).as('accX'),
            accY: max(tables.telemetry.accY).as('accY'),
            accZ: max(tables.telemetry.accZ).as('accZ'),
            recordedAt: tables.telemetry.recordedAt,
            createdAt: min(tables.telemetry.createdAt).as('createdAt'),
        })
        .from(tables.telemetry)
        .where(and(...conditions))
        .groupBy(tables.telemetry.recordedAt)
        .orderBy(desc(tables.telemetry.recordedAt))
        .limit(limit);
    
    return {
        data,
    };
});