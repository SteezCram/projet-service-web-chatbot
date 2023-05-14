<template>
    <container>
        <header-1 class="mb-5">Modifier votre compte</header-1>

        <article class="bg-gray-100 dark:bg-gray-900 rounded">
            <form @submit.prevent="updateAccount" class="flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative">
                    <img class="w-full h-auto rounded-t lg:rounded-l aspect-square" :src="user.image">

                    <div class="w-full flex absolute top-0 h-full bg-black bg-opacity-25 rounded-t lg:rounded-l">
                        <label class="w-full cursor-pointer flex items-center justify-center p-4 text-white text-center font-semibold" for="file">
                            <span>Téléverser une nouvelle photo de profil</span>
                        </label>

                        <input id="file" name="file" type="file" class="hidden" ref="file" @change="changeImage($event)" accept="image/*">
                    </div>
                </div>

                <div class="flex flex-col w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <input-text class="mb-2" name="nickname" type="text" v-model="user.nickname" placeholder="John Doe" required>
                        <template #label>
                            Surnom
                        </template>
                    </input-text>

                    <input-text name="email" type="email" v-model="user.email" placeholder="name@company.com" required>
                        <template #label>
                            Adresse e-mail
                        </template>
                    </input-text>

                    <!-- <input-text name="password" type="password" v-model="password" required>
                        <template #label>
                            Nouveau mot de passe
                        </template>
                    </input-text>
                    
                    <input-text class="!mt-1" name="verifyPassword" type="password" v-model="verifyPassword" required>
                        <template #label>
                            Vérifier le mot de passe
                        </template>
                    </input-text> -->

                    <btn-primary ref="submitButton" class="mt-5 md:mt-auto !w-auto">
                        <i class="icon icon-logout"></i>
                        Mettre à jour
                    </btn-primary>
                </div>
            </form>
        </article>
    </container>
</template>

<script setup>
// Prevent access to this page if the user is not logged in
const logged = useCookie('user-id');
if (!logged.value) {
    useRouter().push('/login');
}

const user_id = useCookie('user-id');
const user_nickname = useCookie('user-nickname');
const user_email = useCookie('user-email');
const user_image = useCookie('user-image');
const submitButton = ref(null);

// Store the value to modify here
const user = {
    nickname: user_nickname.value,
    email: user_email.value,
    image: user_image.value,
}


async function changeImage(event)
{
    const file = event.target.files[0];

    user.image = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.readAsDataURL(file);
    });
}

async function updateAccount()
{
    submitButton.value.$el.disabled = true;

    const userObject = {}

    if (user.nickname && user.nickname !== user_nickname.value) {
        userObject.nickname = user.nickname;
    }
    if (user.email && user.email !== user_email.value) {
        userObject.email = user.email;
    }
    if (user.image && user.image !== user_image.value) {
        userObject.image = user.image;
    }

    if (Object.keys(userObject).length === 0) {
        alert('Aucun champs n\'a été modifié.');
        submitButton.value.$el.disabled = false;
        return;
    }

    const response = await fetch(`http://localhost:3001/users/${user_id.value}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject),
    });

    if (!response.ok) {
        alert('Une erreur est survenue lors de la mise à jour de votre compte.');
        submitButton.value.$el.disabled = false;
        return;
    }

    // Update the cookies value
    user_nickname.value = user.nickname;
    user_email.value = user.email;
    user_image.value = user.image;

    submitButton.value.$el.disabled = false;

    useRouter().push('/dashboard/user');
}
</script>