<template>
    <container>
        <header-1 class="mb-5">Paramètres de votre compte</header-1>

        <article class="bg-gray-100 dark:bg-gray-900 rounded shadow">
            <div class="flex flex-col md:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3">
                    <img class="w-full h-auto rounded-t lg:rounded-l aspect-square" :src="user_image">
                </div>

                <div class="w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <header-2>{{ user_nickname }}</header-2>

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
    </container>
</template>

<script setup>
// Prevent access to this page if the user is not logged in
const logged = useCookie('user-id');
if (!logged.value) {
    useRouter().push('/login');
}


const user_nickname = useCookie('user-nickname');
const user_email = useCookie('user-email');
const user_image = useCookie('user-image');
const user_isAdmin = useCookie('user-is-admin');
const user_id = useCookie('user-id');

function logout() {
    user_nickname.value = null;
    user_email.value = null;
    user_image.value = null;
    user_isAdmin.value = null;
    user_id.value = null;

    // Use a redirection since the shell is not reactive
    location.href = '/login';
}

async function deleteAccount()
{
    if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Il n\'y a aucun retour en arrière possible.')) return;

    const response = await fetch(`http://localhost:3001/users/${user_id.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        alert('An error occured.');
        return;
    }

    logout();
}
</script>