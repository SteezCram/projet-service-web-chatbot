<template>
    <div class="w-screen h-screen bg-white dark:bg-black">
        <header class="w-screen h-16 p-4 bg-primary-500 flex flex-row items-center text-white">
            <nuxt-link to="/">
                <img class="w-8 h-8 mr-4" src="/favicon.ico">
            </nuxt-link>

            <nav class="w-full">
                <ul class="flex flex-row font-semibold">
                    <li class="mr-auto hover:text-gray-200">
                        <nuxt-link to="/">
                            <i class="icon icon-home1"></i>
                            Accueil
                        </nuxt-link>
                    </li>

                    <li class="hover:text-gray-200">
                        <nuxt-link to="/login">
                            <i class="icon icon-user"></i>
                            Connexion
                        </nuxt-link>
                    </li>

                    <p class="px-2">|</p>

                    <li class="hover:text-gray-200">
                        <nuxt-link to="/signup">
                            <i class="icon icon-user-plus"></i>
                            Créer un compte
                        </nuxt-link>
                    </li>
                </ul>
            </nav>
        </header>

        <main style="height: calc(100% - 64px);">
            <slot></slot>
        </main>
    </div>
</template>