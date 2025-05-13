export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const newPosition = {
        ...body,
        createdAt: new Date(),
    }
    const insertedPosition = useDrizzle().insert(tables.positionTelemetry).values(newPosition).returning().get()
    return insertedPosition
})