<template>
    <section class="flex justify-center items-center h-full">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <header-3 class="text-center">
                        Connectez-vous à votre compte
                    </header-3>

                    <form @submit.prevent="login($event)" class="space-y-4 md:space-y-6" action="#">
                        <input-text name="email" type="email" v-model="email" placeholder="name@company.com" required>
                            <template v-slot:label>
                                Adresse e-mail
                            </template>
                        </input-text>
                        
                        <input-text name="password" type="password" v-model="password" required>
                            <template v-slot:label>
                                Mot de passe
                            </template>
                        </input-text>

                        <btn-primary ref="submitButton">
                            Se connecter
                        </btn-primary>
                        
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous n'avez pas de compte ? <btn-link link="/signup">Créer un compte</btn-link>
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
            password: '',
        }
    },


    methods:
    {
        async login()
        {
            this.$refs.submitButton.disabled = true;

            if (this.email === '' || this.password === '')
            {
                this.$refs.submitButton.disabled = false;
                alert('Please fill all the fields.');

                return;
            }

            try
            {
                const response = await fetch('http://localhost:3001/users/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    }),
                });

                console.log(response);

                if (!response.ok)
                {
                    this.$refs.submitButton.disabled = false;
                    alert('Internal error.');

                    return;
                }

                const data = await response.json();
                console.log(data);
                
                switch (data.response)
                {
                    case 0:
                        sessionStorage.setItem('user', JSON.stringify({
                            id: data.user.id,
                            email: this.email,
                            nickname: data.user.nickname,
                            image: data.user.image,
                            isAdmin: data.user.isAdmin,
                        }));

                        window.location.href = data.user.isAdmin ? '/admin' : '/dashboard';
                        break;

                    case 1:
                        alert('Account not found for this email.');
                        break;

                    case 2:
                        alert('Wrong password.');
                        break;
                }
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