export default defineEventHandler(async (event) => {
    await useDrizzle().delete(tables.telemetry).run();
    return { success: true };
})