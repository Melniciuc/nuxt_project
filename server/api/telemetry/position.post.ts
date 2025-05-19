export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!Array.isArray(body)) {
        throw createError({ statusCode: 400, statusMessage: 'Body must be an array' })
    }
    body.forEach((item) => {
        item.createdAt = new Date()
    })

    const insertedPositions = useDrizzle().insert(tables.positionTelemetry).values(body).returning().all()
    return insertedPositions
})
