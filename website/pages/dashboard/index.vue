<template>
    <container>
        <div class="flex flex-col lg:flex-row lg:items-center">
            <header-1 class="mb-3 lg:mb-0">Bienvenue {{ user_nickname }}</header-1>

            <div class="lg:ml-auto flex flex-col lg:flex-row">
                <btn-primary class="mb-1 lg:mb-0 lg:mr-2 !w-auto" @click="$router.push(`/dashboard/user`)">
                    <i class="icon icon-edit"></i>
                    Paramètres du compte
                </btn-primary>

                <btn-primary class="!w-auto" @click="$router.push('/dashboard/bots/new')">
                    <i class="icon icon-plus"></i>
                    Nouvelle discussion avec un bot
                </btn-primary>
            </div>
        </div>
    </container>
</template>

<script setup>
// Prevent access to this page if the user is not logged in
const logged = useCookie('user-id');
if (!logged.value) {
    useRouter().push('/login');
}


const user_nickname = useCookie('user-nickname');
</script>

<!-- <script>
export default {
    data() {
        return {
            user_nickname: '',
        }
    },

    mounted() {
        const user = sessionStorage.getItem('user');

        if (user === null) this.$router.push('/login');

        const userObject = JSON.parse(user);

        this.user_nickname = userObject.nickname;
    }
}
</script> -->