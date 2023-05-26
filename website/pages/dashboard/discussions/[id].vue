<template>
    <container-full class="relative h-full">
        <!-- <div class="absolute top-0 left-0 w-full bg-gray-100 dark:bg-gray-900 rounded-b-lg shadow-md">
            <container class="!min-h-0 flex flex-row items-center px-3 py-2">
                <img class="w-10 h-10 rounded-full mr-2" :src="bot_image">

                <div class="flex flex-col">
                    <header-4 class="flex flex-row items-baseline">
                        {{ bot_name }}
                    </header-4>

                    <span class="text-sm text-gray-500">{{ bot_description }}</span>
                </div>
            </container>
        </div> -->

        <section ref="discussionSection" style="height: calc(100% - 57.6px);" class="pb-5 overflow-y-auto">
            <container class="flex flex-col">
                <div v-if="discussions.length > 0" :class="`${x.is_bot ? 'flex flex-row' : 'flex flex-row mt-2 ml-auto'}`" v-for="x in discussions">
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

                        <p v-if="emojiRegex.test(x.message)" class="text-justify text-4xl">{{ x.message }}</p>
                        <p v-else-if="x.message !== '...'" class="text-justify">{{ x.message }}</p>
                        <p v-else class="text-sm text-gray-500 text-justify">{{ bot_name }} écrit...</p>
                    </article>

                    <img v-if="!x.is_bot" class="w-10 h-10 rounded-full ml-2" :src="user_image">
                </div>

                <div v-if="discussions.length === 0 || bot_rivescripts.length === 0" :class="`flex flex-row ${bot_rivescripts.length === 0 ? 'mt-4' : ''}`">
                    <img class="w-10 h-10 rounded-full mr-2" src="/img/system.png">

                    <article class="max-w-sm">
                        <header-4 class="flex flex-row items-baseline">
                            Système
                            <span class="ml-2 text-xs text-gray-500">{{ new Date().toLocaleString() }}</span>
                        </header-4>

                        <p v-if="discussions.length === 0" class="text-justify">
                            Envoyer votre premier message à 
                            <span>
                                <img class="w-5 h-5 rounded-full inline mr-1" :src="bot_image">
                                <span class="font-semibold">{{ bot_name }}</span>
                            </span>
                            pour créer la discussion.
                        </p>
                        <p v-else>
                            <span>
                                <img class="w-5 h-5 rounded-full inline mr-1" :src="bot_image">
                                <span class="font-semibold">{{ bot_name }}</span>
                            </span> ne possède plus de cerveaux pour répondre à vos messages. Il est impossible de continuer la discussion pour le moment.
                        </p>
                    </article>
                </div>
            </container>
        </section>

        <form @submit.prevent="sendMessage" class="absolute bottom-0 w-full">
            <container class="!min-h-0">
                <!-- <div v-if="bot_rivescripts.length === 0" class="mx-auto bg-black bg-opacity-50 absolute top-0 left-0 z-50 w-full h-full"></div> -->

                <label for="chat" class="sr-only">Votre message</label>

                <div class="flex items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-md">
                    <button @click="addEmoji" ref="emojiButton" :disabled="bot_rivescripts.length === 0" type="button" class="sm:p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Ajouter un emoji</span>
                    </button>

                    <textarea @keypress="enterKeyHandler($event)" :disabled="bot_rivescripts.length === 0" v-model.trim="message" rows="1" class="block mx-2 sm:mx-4 sm:p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" :placeholder="`Envoyer un message à ${bot_name}`"></textarea>
                    
                    <button ref="submitButton" type="submit" :disabled="bot_rivescripts.length === 0" class="inline-flex justify-center sm:p-2 text-primary-600 rounded-full cursor-pointer hover:bg-primary-100 dark:text-primary-100 dark:hover:bg-primary-600">
                        <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        <span class="sr-only">Envoyer le message</span>
                    </button>
                </div>
            </container>
        </form>
    </container-full>
</template>

<script setup>
import { i18n } from 'picmo';
import { createPopup } from '@picmo/popup-picker';

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
const bot_rivescripts = bot.value.rivescripts;
const user_id = useCookie('user-id');
const user_email = useCookie('user-email');
const user_nickname = useCookie('user-nickname');
const user_isAdmin = useCookie('user-is-admin');
const user_image = useCookie('user-image');
const message = ref('');
const emojiButton = ref(null);
const emojiRegex = /\p{Emoji_Presentation}/u; // Regex to check if a string contains an emoji

const { data:discussions } = await useFetch(`http://localhost:3001/discussions/${user_id.value}/${bot_id}`);
let picker = ref(null);

onMounted(() => {
    scrollDiscussionToBottom(350); // Need a timeout since the page transition break the scroll

    picker = createPopup({
        i18n: i18n.fr,
        locale: 'fr',
    }, {
        referenceElement: emojiButton.value,
        triggerElement: emojiButton.value,
        hideOnEmojiSelect: false,
    });
    picker.addEventListener('emoji:select', event => {
        message.value += event.emoji;
    });
});

function addEmoji() {
    picker.open();
}

function scrollDiscussionToBottom(timeout = 0) {
    if (timeout === 0) {
        discussionSection.value.scrollTo(0, discussionSection.value.scrollHeight);
        return;
    }

    setTimeout(() => {
        discussionSection.value.scrollTo(0, discussionSection.value.scrollHeight);
    }, timeout);
}

function enterKeyHandler(event)
{
    if (event.which === 13 && !event.shiftKey) {
        if (!event.repeat) {
            const newEvent = new Event("submit", { cancelable: true });
            event.target.form.dispatchEvent(newEvent);
        }

        event.preventDefault();
    }
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