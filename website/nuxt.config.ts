// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        '~/assets/css/icons.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    routeRules: {
        '/*': { cors: true, }
    }
})
