<template>
    <container>
        <div class="flex flex-col lg:flex-row lg:items-center mb-5">
            <header-1 class="mb-3 lg:mb-0">Bots</header-1>

            <btn-primary class="lg:ml-auto !w-auto" @click="$router.push('/admin/bots/add')">
                <i class="icon icon-plus"></i>
                Ajouter un bot
            </btn-primary>
        </div>

        <user-card v-for="x in bots" :image="x.image" class="mt-4">
            <template v-slot:header>{{ x.name }}</template>
            <template v-slot:description>{{ x.description }}</template>
            <template v-slot:actions>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <btn-primary class="!w-auto" @click="$router.push(`/admin/bots/edit/${x.id}`)">
                        <i class="icon icon-edit"></i>
                        Modifier
                    </btn-primary>

                    <btn-delete class="!w-auto" @click="deleteBot(x.id, x.name);">
                        <i class="icon icon-trash"></i>
                        Supprimer
                    </btn-delete>
                </div>
            </template>
        </user-card>
    </container>
</template>

<script setup>
// Prevent access to this page if the user is not logged in or is not an admin*
const logged = useCookie('user-id');
if (!logged.value) {
    useRouter().push('/login');
}
const isAdmin = useCookie('user-is-admin');
if (!isAdmin.value) {
    useRouter().push('/dashboard');
}


const { data: bots, pending, refresh, error } = await useFetch(`http://localhost:3001/bots`);

async function deleteBot(id, name)
{
    if (!confirm(`Voulez-vous supprimer le bot ${name} ? Cette opération est irréversible.`)) {
        return;
    }

    const response = await fetch(`http://localhost:3001/bots/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    refresh();
}
</script>