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
        '/admin/*': { cors: true, ssr: true, static: false, swr: false, },
        '/*': { cors: true, static: true, },
    }
})
