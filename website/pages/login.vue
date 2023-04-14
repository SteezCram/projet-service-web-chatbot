<template>
    <section class="flex justify-center items-center h-full">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <header-3 class="text-center">
                        Connectez-vous à votre compte
                    </header-3>

                    <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="login($event)">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                            <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                        </div>

                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input v-model="password" type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>

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
        async login(event)
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
                    body: {
                        email: this.email,
                        password: this.password,
                    }
                });

                console.log(response)

                if (!response.ok)
                {
                    this.$refs.submitButton.disabled = false;
                    alert('Internal error.');

                    return;
                }

                const data = await response.json();
                sessionStorage.setItem('logged', true);
                sessionStorage.setItem('isAdmin', data.isAdmin ? true : false);

                if (data.isAdmin) this.$router.push('/admin'); else this.$router.push('/dashboard');
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