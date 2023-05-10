<template>
    <container>
        <div class="flex flex-col lg:flex-row mb-5">
            <header-1 class="mb-3 lg:mb-0">Bots</header-1>

            <btn-primary class="lg:ml-auto !w-auto" @click="$router.push('/admin/bots/add')">
                <i class="icon icon-plus"></i>
                Ajouter un bot
            </btn-primary>
        </div>

        <article v-for="x in bots" class="bg-gray-100 dark:bg-gray-900 rounded shadow mt-4">
            <div class="flex flex-col md:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3">
                    <img class="w-full h-auto rounded-t lg:rounded-l aspect-square" :src="x.image">
                </div>

                <div class="w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <header-2>{{ x.name }}</header-2>

                    <p class="text-gray-500">{{ x.description }}</p>

                    <div class="mt-4 mb-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <btn-primary class="!w-auto" @click="$router.push(`/admin/bots/edit/${x.id}`)">
                            <i class="icon icon-edit"></i>
                            Modifier
                        </btn-primary>

                        <!-- <btn-primary class="!w-auto" @click="logout">
                            <i class="icon icon-logout"></i>
                            Déconnecter
                        </btn-primary> -->

                        <!-- <div class="hidden lg:block"></div> -->

                        <btn-delete class="!w-auto" @click="deleteBot(x.id, x.name);">
                            <i class="icon icon-trash"></i>
                            Supprimer
                        </btn-delete>
                    </div>
                </div>
            </div>
        </article>
    </container>
</template>

<script setup>
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