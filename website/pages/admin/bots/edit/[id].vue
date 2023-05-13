<template>
    <container>
        <header-1 class="mb-3">Modifier {{ originalBot.name }}</header-1>

        <form @submit.prevent="editBot" class="flex flex-col">
            <article class="bg-gray-100 dark:bg-gray-900 rounded flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative">
                    <img class="w-full h-auto rounded-t sm:rounded-t-none sm:rounded-tl sm:rounded-bl aspect-square" :src="bot.image">

                    <div class="w-full flex absolute top-0 h-full bg-black bg-opacity-25 rounded-t sm:rounded-t-none sm:rounded-tl sm:rounded-bl">
                        <label class="w-full cursor-pointer flex items-center justify-center p-4 text-white text-center font-semibold" for="file">
                            <span>Téléverser une nouvelle photo de profil</span>
                        </label>

                        <input id="file" name="file" type="file" class="hidden" ref="file" @change="changeImage($event)" accept="image/*">
                    </div>
                </div>

                <div class="flex flex-col w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <input-text class="mb-2" name="nickname" type="text" v-model="bot.name" placeholder="John Doe" required>
                        <template v-slot:label>
                            Nom du bot
                        </template>
                    </input-text>

                    <input-text class="mt-2" type="text" name="description" v-model="bot.description" required>
                        <template v-slot:label>
                            Description du bot
                        </template>
                    </input-text>
                </div>
            </article>

            <rivescript-manager for-bot :rivescripts="bot.rivescripts" @update:rivescripts="updateRivescripts($event)" class="mt-5"></rivescript-manager>

            <btn-primary ref="submitButton" class="mt-10 !w-auto">
                <i class="icon icon-logout"></i>
                Modifier {{ originalBot.name }}
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


const submitButton = ref(null);
const route = useRoute();

const { data: bot, pending, refresh, error } = await useFetch(`http://localhost:3001/bots/${route.params.id}`);
const originalBot = {
    ...bot.value,
};

async function editBot()
{
    if (bot.value.name.length === 0 || bot.value.description.length === 0 || bot.value.script.length === 0) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    submitButton.value.$el.disabled = true;

    const botObject = {
        name: bot.value.name,
        description: bot.value.description,
        image: bot.value.image,
        script: bot.value.script,
        rivescripts: bot.value.rivescripts,
    };

    for (const key in botObject) {
        if (botObject[key] === originalBot[key]) {
            delete botObject[key];
        }
    }

    if (Object.keys(botObject).length === 0) {
        alert('Aucune modification n\'a été apportée.');
        submitButton.value.$el.disabled = false;
        return;
    }

    const response = await fetch(`http://localhost:3001/bots/${bot.value.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(botObject),
    });

    if (!response.ok) {
        alert('Une erreur est survenue lors de la modification du bot.');
        submitButton.value.$el.disabled = false;
        return;
    }

    useRouter().push('/admin');
}

async function changeImage(event)
{
    const file = event.target.files[0];

    bot.value.image = await new Promise((resolve, reject) =>
    {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.readAsDataURL(file);
    });
}

function updateRivescripts(rivescripts)
{
    // Need to stringify the rivescripts object because it's an object and not a string
    bot.value.rivescripts = JSON.stringify(rivescripts);
}
</script>