<template>
    <container class="xl:max-w-6xl">
        <div class="flex flex-col lg:flex-row lg:items-center mb-5">
            <header-1 class="mb-3 lg:mb-0">Bienvenue {{ user_nickname }}</header-1>

            <div class="lg:ml-auto flex flex-col lg:flex-row">
                <btn-primary class="mb-2 lg:mb-0 lg:mr-2 !w-auto" @click="$router.push(`/dashboard/user`)">
                    <i class="icon icon-edit"></i>
                    Paramètres du compte
                </btn-primary>

                <btn-primary class="!w-auto" @click="$router.push('/dashboard/discussions/new')">
                    <i class="icon icon-plus"></i>
                    Nouvelle discussion avec un bot
                </btn-primary>
            </div>
        </div>

        <section class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <user-card v-for="x in bots" :image="x.image">
                <template #header>{{ x.name }}</template>
                <template #description>{{ x.description }}</template>
                <template #actions>
                    <btn-primary class="!w-auto" @click="$router.push(`/dashboard/discussions/${x.id}`)">
                        <i class="icon icon-external-link"></i>
                        Reprendre la discussion
                    </btn-primary>
                </template>
            </user-card>
        </section>
    </container>
</template>

<script setup>
// Prevent access to this page if the user is not logged in
const logged = useCookie('user-id');
if (!logged.value) {
    useRouter().push('/login');
}


const user_id = useCookie('user-id');
const user_nickname = useCookie('user-nickname');

const { data:bots } = await useFetch(`http://localhost:3001/discussions/${user_id.value}`);
</script>