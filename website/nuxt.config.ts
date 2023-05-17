// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
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
        '/**': { cors: true, ssr: true },
    },
    build: {
        transpile: [
            '@joeattardi/emoji-button',
        ],
    }
})
