<template>
    <div class="w-screen h-screen bg-white dark:bg-black">
        <header class="w-screen h-16 p-4 bg-primary-500 flex flex-row items-center text-white">
            <nuxt-link to="/">
                <img class="w-8 h-8 mr-4" src="/favicon.ico">
            </nuxt-link>

            <nav class="w-full">
                <ul class="flex flex-row font-semibold">
                    <li class="mr-2 hover:text-gray-200">
                        <nuxt-link to="/dashboard">
                            <i class="icon icon-home1"></i>
                            Accueil
                        </nuxt-link>
                    </li>

                    <li class="mr-2 hover:text-gray-200">
                        <nuxt-link to="/admin">
                            <i class="icon icon-dashboard"></i>
                            Dashboard
                        </nuxt-link>
                    </li>

                    <li v-if="isAdmin !== 'false'" class="hover:text-gray-200">
                        <nuxt-link to="/">
                            <i class="icon icon-settings1"></i>
                            Admin
                        </nuxt-link>
                    </li>

                    <li v-if="!logged" class="ml-auto hover:text-gray-200">
                        <nuxt-link to="/login">
                            <i class="icon icon-user"></i>
                            Connexion
                        </nuxt-link>
                    </li>

                    <p v-if="!logged" class="px-2">|</p>

                    <li v-if="!logged" class="hover:text-gray-200">
                        <nuxt-link to="/signup">
                            <i class="icon icon-user-plus"></i>
                            Créer un compte
                        </nuxt-link>
                    </li>

                    <li v-if="logged" class="hover:text-gray-200">
                        <btn-primary @click="disconnect">
                            <i class="icon icon-logout"></i>
                            Créer un compte
                        </btn-primary>
                    </li>
                </ul>
            </nav>
        </header>

        <main style="height: calc(100% - 64px);">
            <slot></slot>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logged: false,
            isAdmin: false,
        }
    },

    mounted() {
        this.logged = sessionStorage.getItem('logged');
        this.isAdmin = sessionStorage.getItem('isAdmin');

        if (this.isAdmin)
            console.log('is admin');
        console.log(this.isAdmin, this.logged);
    }
}
</script>