// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },
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
            'picmo',
        ],
    }
})
