<template>
    <section>
        <header-4 class="mb-3">Fichier rivescripts</header-4>

        <form submit.prevent="addFile">
            <div v-if="rivescripts.length > 0" class="bg-gray-100 p-2 rounded mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-1 gap-2">
                <div class="flex items-center" v-for="x in rivescripts">
                    <input id="default-checkbox" type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-200 border-gray-400 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-primary-800 focus:ring-2 dark:bg-primary-700 dark:border-primary-600">
                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                </div>
            </div>

            <div>
                <label for="fileInput" class="block text-sm font-medium text-gray-900 dark:text-white">Téléverser un nouveau fichier</label>
                <input id="fileInput" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file">
                <p class="text-sm text-gray-500 dark:text-gray-300">Fichier rivescripts (.rive)</p>
            </div>
        </form>
    </section>
</template>

<script setup>
const { data:rivescripts, pending, error, refresh } = await useFetch('http://localhost:3001/rivescripts');


async function addFile()
{

}
</script>