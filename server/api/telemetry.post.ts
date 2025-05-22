export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!Array.isArray(body)) {
        throw createError({ statusCode: 400, statusMessage: 'Body must be an array' })
    }
    const telemetryEntity = body.map((input) => {
        return {
            lat: input.lat,
            lng: input.lng,
            accX: input.x,
            accY: input.y,
            accZ: input.z,
            speedKmh: input.s,
            recordedAt: input.r,
            createdAt: new Date(),
        }
    })

    const insertedPositions = useDrizzle().insert(tables.telemetry).values(telemetryEntity).returning().all()
    return insertedPositions
})
