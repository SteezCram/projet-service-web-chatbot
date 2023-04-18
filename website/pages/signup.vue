<template>
    <section class="flex justify-center items-center h-full">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <header-3 class="text-center">
                        Créer un compte
                    </header-3>

                    <form @submit.prevent="signup($event)" class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                            <input v-model="email" type="email" name="email" id="email" class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@company.com" required="">
                        </div>

                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input v-model="password" type="password" name="password" id="password" class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="">
                        </div>

                        <div>
                            <label for="verifyPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vérification du mot de passe</label>
                            <input v-model="verifyPassword" type="password" name="verifyPassword" id="verifyPassword" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>

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
            password: '',
            verifyPassword: '',
        }
    },

    async mounted()
    {
        const logged = sessionStorage.getItem('logged');
        if (logged !== null) this.$router.push('/dashboard');
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
                        password: this.password,
                    }),
                });

                if (!response.ok) {
                    alert('The account already exists.');
                    this.$refs.submitButton.disabled = false;
                    return;
                }

                console.log(response);

                sessionStorage.setItem('logged', true);

                location.reload();
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