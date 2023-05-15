<template>
    <container-full class="relative h-full">
        <section ref="discussionSection" style="height: calc(100% - 57.6px);" class="pb-5 overflow-y-auto">
            <container class="flex flex-col">
                <div :class="`${x.is_bot ? 'flex flex-row' : 'flex flex-row mt-2 ml-auto'}`" v-for="x in discussions">
                    <img v-if="x.is_bot " class="w-10 h-10 rounded-full mr-2" :src="bot_image">

                    <article class="max-w-sm">
                        <header-4 v-if="x.is_bot" class="flex flex-row items-baseline">
                            {{ bot_name }}
                            <span class="ml-2 text-xs text-gray-500">{{ new Date(x.timestamp).toLocaleString() }}</span>
                        </header-4>
                        <header-4 v-else class="text-right flex flex-row-reverse items-baseline">
                            {{ user_nickname }}
                            <span class="mr-2 text-xs text-gray-500">{{ new Date(x.timestamp).toLocaleString() }}</span>
                        </header-4>

                        <p v-if="x.message !== '...'" class="text-justify">{{ x.message }}</p>
                        <p v-else class="text-sm text-gray-500 text-justify">{{ bot_name }} écrit...</p>
                    </article>

                    <img v-if="!x.is_bot" class="w-10 h-10 rounded-full ml-2" :src="user_image">
                </div>
                <!-- <div v-else class="flex flex-row mt-2 ml-auto">
                    <article class="max-w-sm">
                        <header-4 class="text-right">{{ user_nickname }}</header-4>
                        <p class="text-justify">{{ x.content }}</p>
                    </article>

                    <img class="w-10 h-10 rounded-full ml-2" :src="user_image">
                </div> -->
                <!-- <div class="flex flex-row">
                    <img class="w-10 h-10 rounded-full mr-2" :src="bot_image">

                    <article class="max-w-sm">
                        <header-4>{{ bot_name }}</header-4>
                        <p class="text-justify">Salut comment vas-tu ?</p>
                    </article>
                </div>

                <div class="flex flex-row mt-2 ml-auto">
                    <article class="max-w-sm">
                        <header-4 class="text-right">{{ user_nickname }}</header-4>
                        <p class="text-justify">Salut, bien et toi ?</p>
                    </article>

                    <img class="w-10 h-10 rounded-full ml-2" :src="user_image">
                </div>

                <div class="flex flex-row">
                    <img class="w-10 h-10 rounded-full mr-2" :src="bot_image">

                    <article class="max-w-sm">
                        <header-4>{{ bot_name }}</header-4>
                        <p class="text-sm text-gray-500 text-justify">Jackie écrit...</p>
                    </article>
                </div>

                <div class="flex flex-row mt-2 ml-auto">
                    <article class="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                        <header-4 class="text-right">{{ user_nickname }}</header-4>
                        
                        <p class="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
    quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
    fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
    consequuntur! Commodi minima excepturi repudiandae velit hic maxime
    doloremque. Quaerat provident commodi consectetur veniam similique ad 
    earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
    fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
    suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
    modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
    totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
    quasi aliquam eligendi, placeat qui corporis!
                        </p>
                    </article>

                    <img class="w-10 h-10 rounded-full ml-2" :src="user_image">
                </div> -->
            </container>
        </section>

        <form @submit.prevent="sendMessage" class="absolute bottom-0 w-full">
            <container class="!min-h-0">
                <label for="chat" class="sr-only">Votre message</label>

                <div class="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md">
                    <!-- <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Upload image</span>
                    </button> -->

                    <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Ajouter un emoji</span>
                    </button>

                    <textarea v-model="message" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" :placeholder="`Envoyer un message à ${bot_name}`"></textarea>
                    
                    <button ref="submitButton" type="submit" class="inline-flex justify-center p-2 text-primary-600 rounded-full cursor-pointer hover:bg-primary-100 dark:text-primary-100 dark:hover:bg-primary-600">
                        <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        <span class="sr-only">Envoyer le message</span>
                    </button>
                </div>
            </container>
        </form>
    </container-full>
</template>

<script setup>
// Prevent access to this page if the user is not logged in
const logged = useCookie('user-id');
if (!logged.value) {
    useRouter().push('/login');
}


const { data:bot } = await useFetch(`http://localhost:3001/bots/${useRoute().params.id}`);

const submitButton = ref(null);
const discussionSection = ref(null);
const bot_id = bot.value.id;
const bot_name = bot.value.name;
const bot_image = bot.value.image;
const user_id = useCookie('user-id');
const user_email = useCookie('user-email');
const user_nickname = useCookie('user-nickname');
const user_isAdmin = useCookie('user-is-admin');
const user_image = useCookie('user-image');
const message = ref('');

const { data:discussions } = await useFetch(`http://localhost:3001/discussions/${user_id.value}/${bot_id}`);


onMounted(() => {
    scrollDiscussionToBottom();
});

function scrollDiscussionToBottom() {
    discussionSection.value.scrollTo(0, discussionSection.value.scrollHeight);
}


async function sendMessage()
{
    submitButton.value.disabled = true;

    if (message.value.length === 0) {
        submitButton.value.disabled = false;
        return;
    }

    discussions.value.push({
        is_bot: false,
        message: message.value,
        timestamp: Date.now(),
    });

    const response = await fetch(`http://localhost:3001/discussions/${user_id.value}/${bot_id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            is_bot: false,
            message: message.value,
        }),
    });

    if (!response.ok) {
        discussions.value.pop();
        alert('Une erreur est survenue lors de l\'envoi du message.');
    }

    scrollDiscussionToBottom();
    submitButton.value.disabled = false;

    receiveMessage();
}

async function receiveMessage()
{
    discussions.value.push({
        is_bot: true,
        message: '...',
        timestamp: Date.now(),
    });

    const messageToSend = message.value;
    message.value = '';

    const response = await fetch(`http://localhost:3001/discussions/${user_id.value}/${bot_id}/reply`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: messageToSend,
        }),
    });

    if (!response.ok) {
        discussions.value.pop();
        alert('Une erreur est survenue lors de la récéption du message.');
    }
    else {
        const data = await response.json();
        discussions.value[discussions.value.length - 1].message = data.message;
        scrollDiscussionToBottom();
    }
}
</script>