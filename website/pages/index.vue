<template>
    <container-full class="!h-full flex">
        <container class="flex flex-col m-auto">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Un nouveau <span class="text-primary-600 dark:text-primary-500">monde de conversation intelligente</span> avec nos chatbots.
            </h1>

            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Découvrez un monde de conversation intelligente avec notre site de discussion de chatbot, où l'intelligence artificielle rencontre l'interaction humaine pour des expériences uniques et engageantes !</p>
        
            <div class="flex flex-row justify-center">
                <btn-primary class="!w-auto mt-10 flex flex-row justify-center items-baseline"
                             @click="$router.push(logged ? '/dashboard' : '/login')">
                    Démarrer maintenant
                    <i class="ml-1 icon icon-arrow-right"></i>
                </btn-primary>
            </div>
        </container>
    </container-full>
</template>

<script setup>
// Prevent access to this page if the user is not logged in
const logged = useCookie('user-id');
</script>