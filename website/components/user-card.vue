<template>
    <article class="bg-gray-100 dark:bg-gray-900 rounded shadow">
        <div class="flex flex-col md:flex-row">
            <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3">
                <img class="w-full h-auto rounded-t lg:rounded-l aspect-square" :src="image">
            </div>

            <div class="w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                <header-2><slot name="header"></slot></header-2>

                <p class="text-gray-500">{{ user_email }}</p>

                <div class="mt-4 mb-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <btn-primary class="!w-auto" @click="$router.push('/dashboard/user/edit')">
                        <i class="icon icon-edit"></i>
                        Modifier
                    </btn-primary>

                    <btn-primary class="!w-auto" @click="logout">
                        <i class="icon icon-logout"></i>
                        Déconnexion
                    </btn-primary>

                    <div class="hidden lg:block"></div>

                    <btn-delete class="!w-auto" @click="deleteAccount">
                        <i class="icon icon-trash"></i>
                        Supprimer
                    </btn-delete>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: true
        },
    }
}
</script>