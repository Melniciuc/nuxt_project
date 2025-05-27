export default defineNuxtPlugin((nuxtApp) => {

    const username = "user"
    const password = "pass"
    const basicAuth = btoa(`${username}:${password}`)

    const api = $fetch.create({
        // baseURL: '',
        onRequest({ request, options, error }) {
            options.headers.set('Authorization', `Basic ${basicAuth}`);
        },
        async onResponseError({ response }) {
            console.error('API Error:', response.status, response.statusText);
        }
    })

    return {
        provide: {
            api
        }
    }
})
