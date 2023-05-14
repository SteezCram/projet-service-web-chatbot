<template>
    <section class="flex justify-center items-center h-full">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <header-3 class="text-center">
                        Créer un compte
                    </header-3>

                    <form @submit.prevent="signup($event)" class="space-y-4 md:space-y-6" action="#">
                        <input-text name="email" type="email" v-model="email" placeholder="name@company.com" required>
                            <template #label>
                                Adresse e-mail
                            </template>
                        </input-text>

                        <input-text name="nickname" type="text" v-model="nickname" placeholder="John Doe" required>
                            <template #label>
                                Surnom
                            </template>
                        </input-text>
                        
                        <input-text name="password" type="password" v-model="password" required>
                            <template #label>
                                Mot de passe
                            </template>
                        </input-text>
                        
                        <input-text class="!mt-1" name="verifyPassword" type="password" v-model="verifyPassword" required>
                            <template #label>
                                Vérifier le mot de passe
                            </template>
                        </input-text>

                        <btn-primary ref="submitButton">
                            Créer un compte
                        </btn-primary>
                        
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous avez déjà un compte ? <btn-link link="/login">Connecter-vous</btn-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
// Prevent logged users from accessing this page
const logged = useCookie('user-id');
if (logged.value) {
    const user_isAdmin = useCookie('user-is-admin');
    useRouter().push(user_isAdmin.value ? '/admin' : '/dashboard');
}


const email = ref('');
const nickname = ref('');
const password = ref('');
const verifyPassword = ref('');
const submitButton = ref(null);

async function signup()
{
    submitButton.value.$el.disabled = true;

    try
    {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.email,
                nickname: this.nickname,
                password: this.password,
            }),
        });

        if (!response.ok) {
            alert('The account already exists.');
            submitButton.value.$el.disabled = false;
            return;
        }

        const data = await response.json();

        // Set cookies
        const userId = useCookie('user-id');
        userId.value = data.id;
        const userEmail = useCookie('user-email');
        userEmail.value = email.value;
        const userNickname = useCookie('user-nickname');
        userNickname.value = nickname.value;
        const userIsAdmin = useCookie('user-is-admin');
        userIsAdmin.value = false;
        const userImage = useCookie('user-image');
        userImage.value = data.image;

        // Use a redirection since the shell is not reactive
        window.location.href = '/dashboard';
        return;
    }
    catch (error) {
        alert('Internal error.');
        console.log(error);
    }

    submitButton.value.$el.disabled = false;
}
</script>