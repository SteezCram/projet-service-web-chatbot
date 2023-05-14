<template>
    <container class="xl:max-w-6xl">
        <div class="flex flex-col lg:flex-row lg:items-center mb-5">
            <header-1 class="mb-3 lg:mb-0">Nouvelle discussion avec un bot</header-1>

            <!-- <btn-primary class="lg:ml-auto !w-auto" @click="$router.push('/admin/bots/add')">
                <i class="icon icon-plus"></i>
                Ajouter un bot
            </btn-primary> -->
        </div>

        <section class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <user-card v-for="x in bots" :image="x.image">
                <template #header>{{ x.name }}</template>
                <template #description>{{ x.description }}</template>
                <template #actions>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <btn-primary class="!w-auto" @click="$router.push(`/dashboard/discussions/${x.id}`)">
                            <i class="icon icon-external-link"></i>
                            Sélectionner
                        </btn-primary>
                    </div>
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


const { data: bots, pending, refresh, error } = await useFetch(`http://localhost:3001/bots`);
</script>