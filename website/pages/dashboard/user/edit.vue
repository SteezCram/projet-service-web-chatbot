<template>
    <container>
        <header-1 class="mb-3">Modifier votre compte</header-1>

        <article class="bg-gray-100 dark:bg-gray-900 rounded">
            <form @submit.prevent="updateAccount" class="flex flex-col sm:flex-row">
                <div class="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative">
                    <img class="w-full h-auto rounded-l" :src="user_image">

                    <div class="w-full flex absolute top-0 h-full bg-black bg-opacity-25 rounded-l">
                        <label class="w-full cursor-pointer flex items-center justify-center p-4 text-white text-center font-semibold" for="file">
                            <span>Téléverser une nouvelle photo de profile</span>
                        </label>

                        <input id="file" name="file" type="file" class="hidden" ref="file" @change="changeImage($event)" accept="image/*">
                    </div>
                </div>

                <div class="flex flex-col w-full sm:w-1/2 md:w-3/5 lg:w-2/3 p-4">
                    <input-text class="mb-2" name="nickname" type="text" v-model="user_nickname" placeholder="John Doe" required>
                        <template v-slot:label>
                            Surnom
                        </template>
                    </input-text>

                    <input-text name="email" type="email" v-model="user_email" placeholder="name@company.com" required>
                        <template v-slot:label>
                            Adresse e-mail
                        </template>
                    </input-text>

                    <!-- <input-text name="password" type="password" v-model="password" required>
                        <template v-slot:label>
                            Nouveau mot de passe
                        </template>
                    </input-text>
                    
                    <input-text class="!mt-1" name="verifyPassword" type="password" v-model="verifyPassword" required>
                        <template v-slot:label>
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

<script>
export default {
    data() {
        return {
            user_nickname: '',
            user_email: '',
            user_image: '',
            user_isAdmin: false,
            password: '',
            verifyPassword: '',
        }
    },

    mounted() {
        const user = sessionStorage.getItem('user');
        if (user === null) this.$router.push('/login');

        const userObject = JSON.parse(user);

        this.user_id = userObject.id;
        this.user_nickname = userObject.nickname;
        this.user_email = userObject.email;
        this.user_image = userObject.image.replace(/(\r\n|\n|\r)/gm, "");
        this.user_isAdmin = userObject.isAdmin;
    },

    methods:
    {
        async changeImage(event)
        {
            const file = event.target.files[0];

            this.user_image = await new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.readAsDataURL(file);
            });
        },

        async updateAccount()
        {
            this.$refs.submitButton.disabled = true;
            const userSession = JSON.parse(sessionStorage.getItem('user'));

            const user = {
                id: this.user_id,
                nickname: this.user_nickname,
                email: this.user_email,
                image: this.user_image,
                isAdmin: this.user_isAdmin,
            };

            for (const key in user) {
                if (user[key] === userSession[key] || user[key] === '') {
                    delete(user[key]);
                    continue;
                }

                userSession[key] = user[key];
            }

            const response = await fetch(`http://localhost:3001/users/${this.user_id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                alert('Une erreur est survenue lors de la mise à jour de votre compte.');
                this.$refs.submitButton.disabled = false;
                return;
            }



            sessionStorage.setItem('user', JSON.stringify(userSession));

            this.$router.push('/dashboard/user');
        }
    }
}
</script>