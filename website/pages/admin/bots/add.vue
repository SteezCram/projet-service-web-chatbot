<template>
    <container>
        <header-1 class="mb-3">Ajouter un bot</header-1>

        <form @submit.prevent="addBot" class="flex flex-col">
            <article class="bg-gray-100 dark:bg-gray-900 rounded flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative">
                    <img class="w-full h-auto rounded-t lg:rounded-l aspect-square" :src="bot.image">

                    <div class="w-full flex absolute top-0 h-full bg-black bg-opacity-25 rounded-t lg:rounded-l">
                        <label class="w-full cursor-pointer flex items-center justify-center p-4 text-white text-center font-semibold" for="file">
                            <span>Téléverser une nouvelle photo de profil</span>
                        </label>

                        <input id="file" name="file" type="file" class="hidden" ref="file" @change="changeImage($event)" accept="image/*">
                    </div>
                </div>

                <div class="flex flex-col w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <input-text class="mb-2" name="nickname" type="text" v-model.trim="bot.name" placeholder="John Doe" required>
                        <template #label>
                            Nom du bot
                        </template>
                    </input-text>

                    <input-text class="mt-2" type="text" name="description" v-model.trim="bot.description" required>
                        <template #label>
                            Description du bot
                        </template>
                    </input-text>
                </div>
            </article>

            <rivescript-manager for-bot ref="rivescriptManager" class="mt-5"></rivescript-manager>

            <btn-primary ref="submitButton" class="mt-10 !w-auto">
                <i class="icon icon-logout"></i>
                Créer le bot
            </btn-primary>
        </form>
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
</script>

<script>
export default {
    data() {
        return {
            bot: {
                name: '',
                description: '',
                image: '',
                script: '',
                rivescripts: [],
            }
        }
    },

    methods:
    {
        async changeImage(event)
        {
            const file = event.target.files[0];

            this.bot.image = await new Promise((resolve, reject) =>
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
            if (this.bot.name.length === 0 || this.bot.description.length === 0 || this.bot.script.length === 0) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            this.bot.rivescripts = this.$refs.rivescriptManager.rivescriptsChecked;

            this.$refs.submitButton.disabled = true;

            const response = await fetch(`http://localhost:3001/bots`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.bot),
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