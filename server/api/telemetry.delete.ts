import { and, gte, lte, inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { from, to } = getQuery(event);
  if (!from || !to) {
    return { success: false, error: 'Missing from/to params' };
  }
  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);
  const fromTimestamp = fromDate.getTime() / 1000;
  const toTimestamp = toDate.getTime() / 1000;
  if (isNaN(fromTimestamp) || isNaN(toTimestamp)) {
    return { success: false, error: 'Invalid date format' };
  }
  const db = useDrizzle();
  const idsToDelete = await db.select({ id: tables.telemetry.id })
    .from(tables.telemetry)
    .where(
      and(
        gte(tables.telemetry.recordedAt, fromTimestamp),
        lte(tables.telemetry.recordedAt, toTimestamp)
      )
    )
    .limit(1000);
  const idList = idsToDelete.map(row => row.id);
  if (idList.length === 0) {
    return { success: true, deleted: 0 };
  }
  const result = await db.delete(tables.telemetry)
    .where(inArray(tables.telemetry.id, idList));
  return { success: true, deleted: idList.length };
})