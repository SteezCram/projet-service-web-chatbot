<template>
    <container>
        <header-1 class="mb-3">Ajouter un bot</header-1>

        <form @submit.prevent="updateAccount" class="flex flex-col">
            <article class="bg-gray-100 dark:bg-gray-900 rounded flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative">
                    <img class="w-full h-auto rounded-l" :src="bot_image">

                    <div class="w-full flex absolute top-0 h-full bg-black bg-opacity-25 rounded-l">
                        <label class="w-full cursor-pointer flex items-center justify-center p-4 text-white text-center font-semibold" for="file">
                            <span>Téléverser une nouvelle photo de profile</span>
                        </label>

                        <input id="file" name="file" type="file" class="hidden" ref="file" @change="changeImage($event)" accept="image/*">
                    </div>
                </div>

                <div class="flex flex-col w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <input-text class="mb-2" name="nickname" type="text" v-model="bot_name" placeholder="John Doe" required>
                        <template v-slot:label>
                            Nom du bot
                        </template>
                    </input-text>
                </div>
            </article>

            <input-text class="mt-2" type="text" name="description" v-model="bot_description" required>
                <template v-slot:label>
                    Description du bot
                </template>
            </input-text>

            <input-text-area class="mt-2" name="script" v-model="bot_script" rows="5" required>
                <template v-slot:label>
                    Rivescript du bot
                </template>
            </input-text-area>

            <btn-primary ref="submitButton" class="mt-10 !w-auto">
                <i class="icon icon-logout"></i>
                Créer le bot
            </btn-primary>
        </form>
    </container>
</template>

<script>
export default {
    data() {
        return {
            bot_name: '',
            bot_description: '',
            bot_image: '',
            bot_script: '',
        }
    },

    methods:
    {
        async changeImage(event)
        {
            const file = event.target.files[0];

            this.bot_image = await new Promise((resolve, reject) =>
            {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.readAsDataURL(file);
            });
        },

        async addBot()
        {
            this.$refs.submitButton.disabled = true;

            const response = await fetch(`http://localhost:3001/bots`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.bot_name,
                    description: this.bot_description,
                    image: this.bot_image,
                    script: this.bot_script,
                }),
            });

            if (!response.ok) {
                alert('Une erreur est survenue lors de la création du bot.');
                this.$refs.submitButton.disabled = false;
                return;
            }

            this.$router.push('/admin');
        }
    }
}
</script>