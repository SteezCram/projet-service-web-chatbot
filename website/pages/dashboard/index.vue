<template>
    <container>
        <div class="flex flex-col">
            <header-1>Bienvenue {{ user_nickname }}</header-1>

            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                <btn-primary class="!w-auto" @click="$router.push(`/dashboard/users/${user_id}`)">
                    <i class="icon icon-edit"></i>
                    Paramètres du compte
                </btn-primary>

                <btn-primary class="!w-auto" @click="$router.push('/dashboard/discuss/new')">
                    <i class="icon icon-plus"></i>
                    Nouvelle discussion avec un bot
                </btn-primary>
            </div>
        </div>
    </container>
</template>

<script>
export default {
    data() {
        return {
            user_nickname: 'Steez',
        }
    },

    mounted() {

    }
}
</script>