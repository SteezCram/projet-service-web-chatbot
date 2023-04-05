<template>
    <section class="h-full">
        <article class="rounded bg-gray-100 dark:bg-gray-900" v-for="x in bots">
            <div class="flex flex-row items-center p-2">
                <img class="rounded mr-2 h-8 w-8" :src="x.image" :alt="x.name"/>
                <h1>{{ x.name }}</h1>
            </div>

            <p>{{ x.description }}</p>

            <div class="bg-gray-200 dark:bg-gray-800">
                <button class="bg-primary-600">
                    <i class="icon icon-pencil"></i>
                    Modifier
                </button>
            </div>
        </article>
    </section>
</template>

<script>
export default
{
    data() {
        return {
            bots: [],
        }
    },


    async mounted()
    {
        const response = await this.$fetch('http://localhost:3001/bots');

        this.bots = await response.json();
    }
}
</script>