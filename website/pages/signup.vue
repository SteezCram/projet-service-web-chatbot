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
                            <template v-slot:label>
                                Adresse e-mail
                            </template>
                        </input-text>

                        <input-text name="nickname" type="text" v-model="nickname" placeholder="John Doe" required>
                            <template v-slot:label>
                                Surnom
                            </template>
                        </input-text>
                        
                        <input-text name="password" type="password" v-model="password" required>
                            <template v-slot:label>
                                Mot de passe
                            </template>
                        </input-text>
                        
                        <input-text class="!mt-1" name="verifyPassword" type="password" v-model="verifyPassword" required>
                            <template v-slot:label>
                                Vérifier le mot de passe
                            </template>
                        </input-text>

                        <btn-primary ref="submitButton">
                            Créer un compte
                        </btn-primary>
                        
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous avez déjà un compte ? <btn-link link="/login">Créer un compte</btn-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default
{
    data() {
        return {
            email: '',
            nickname: '',
            password: '',
            verifyPassword: '',
        }
    },


    methods:
    {
        async signup()
        {
            this.$refs.submitButton.disabled = true;

            try
            {
                console.log(this.email, this.password, this.verifyPassword)

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
                    this.$refs.submitButton.disabled = false;
                    return;
                }

                const data = await response.json();

                sessionStorage.setItem('user', JSON.stringify({
                    id: data.user.id,
                    email: this.email,
                    nickname: this.nickname,
                    isAdmin: false,
                    image: data.user.image,
                }));

                window.location.href = '/dashboard';
                return;
            }
            catch (error)
            {
                alert('Internal error.');
                console.log(error);
            }

            this.$refs.submitButton.disabled = false;
        }
    }
}
</script>