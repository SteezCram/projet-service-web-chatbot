<template>
    <container>
        <header-1 class="mb-5">Paramètres de votre compte</header-1>

        <user-card :image="user_image">
            <template v-slot:header>{{ user_nickname }}</template>
            <template v-slot:description>{{ user_email }}</template>
            <template v-slot:actions>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
            </template>
        </user-card>
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