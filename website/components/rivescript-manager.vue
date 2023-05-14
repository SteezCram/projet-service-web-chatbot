<template>
    <section>
        <header-3 v-if="forBot" class="mb-3">Fichier rivescripts</header-3>
        <header-1 v-else class="mb-5">Fichier rivescripts</header-1>

        <form @submit.prevent="">
            <div v-if="rivescripts.length > 0" class="rounded mb-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                <article v-for="x in rivescripts" class="bg-gray-100 dark:bg-gray-900 rounded shadow">
                    <div class="px-4 py-2 flex flex-col">
                        <header-5 class="text-sm text-gray-900 dark:text-white mb-2">{{ x.name }}</header-5>

                        <div class="grid grid-cols-2">
                            <btn-link class="!w-auto cursor-pointer no-underline" @click="downloadRive(x.id, x.name)" link="#">
                                <i class="icon icon-download"></i>
                                Télécharger
                            </btn-link>

                            <div v-if="forBot" class="flex flex-row items-center">
                                <input v-model="rivescriptsChecked" id="default-checkbox" type="checkbox" :value="x.id" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded ring-offset-gray-100 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-900 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Activer le fichier</label>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-row space-x-2 rounded-b bg-gray-200 dark:bg-gray-800 px-4 py-2 flew-wrap">
                        <btn-primary class="!w-auto" @click="openDialog(x.id)">
                            <i class="icon icon-edit"></i>
                            Modifier
                        </btn-primary>

                        <btn-delete class="!w-auto" @click="deleteRive(x.id, x.name)">
                            <i class="icon icon-trash"></i>
                            Supprimer
                        </btn-delete>
                    </div>
                </article>
            </div>

            <div>
                <label for="fileInput" class="mb-1 block text-sm font-medium text-gray-900 dark:text-white">Téléverser un nouveau fichier</label>
                <input @change="addRive" ref="fileInput" id="fileInput" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file">
                <p class="text-sm text-gray-500 dark:text-gray-300">Fichier rivescripts (.rive)</p>
            </div>
        </form>

        <dialog ref="dialogRef" class="bg-transparent max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full p-0 max-h-[1024px] h-full py-4">
            <section class="flex flex-col h-full rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900">
                <header-2 class="px-4 pt-4">Modifier {{ rivescriptModify.name }}</header-2>

                <form @submit.prevent="" class="h-full">
                    <div class="px-4 py-2" style="height: calc(100% - 56px)">
                        <label for="rivescriptContent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenu du fichier</label>
                        <textarea id="rivescriptContent" v-model="rivescriptModify.content" class="block w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  style="height: calc(100% - 20px - 16px)">
                        </textarea>
                    </div>

                    <div class="bg-gray-200 dark:bg-gray-800 px-4 py-2 flex flex-row-reverse space-x-2 space-x-reverse rounded-b-lg">
                        <btn-delete class="!w-auto" @click="closeDialog">
                            <i class="icon icon-x"></i>
                            Close
                        </btn-delete>

                        <btn-primary class="!w-auto" @click="updateRive">
                            <i class="icon icon-edit"></i>
                            Modify
                        </btn-primary>
                    </div>
                </form>
            </section>
        </dialog>
    </section>
</template>

<script setup>
import { saveAs } from 'file-saver';

const rivescriptModify = ref({});
const dialogRef = ref(null);
const fileInput = ref(null);
const { data:rivescripts, pending, error, refresh } = await useFetch('http://localhost:3001/rivescripts');


/**
 * Open the dialog to modify a rivescript.
 * @param {number} id - Rivescript ID to modify
 */
function openDialog(id)
{
    rivescriptModify.value = rivescripts.value.find(x => x.id === id);
    dialogRef.value.showModal();
}

/**
 * Close the dialog to modify a rivescript.
 */
function closeDialog()
{
    dialogRef.value.close();
}

/**
 * Add a rivescript.
 */
async function addRive()
{
    const file = fileInput.value.files[0];
    if (file.name.split('.').pop() !== 'rive') {
        alert('Le fichier doit être un fichier rivescript (.rive)');
        return;
    }

    const rivetext = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });

    const response = await fetch('http://localhost:3001/rivescripts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: file.name,
            content: rivetext
        }),
    });

    if (!response.ok) {
        alert('Une erreur est survenue lors de l\'envoi du fichier');
        return;
    }

    refresh();
}

/**
 * Delete a rivescript.
 * @param {number} id - Rivescript ID to delete
 * @param {*} name - Rivescript file name
 */
async function deleteRive(id, name)
{
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le fichier ${name} ?`)) {
        return;
    }

    const response = await fetch(`http://localhost:3001/rivescripts/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        alert('Une erreur est survenue lors de la suppression du fichier');
        return;
    }

    refresh();
}

/**
 * Download a rivescript.
 * @param {number} id - Rivescript ID to download
 * @param {*} name - Rivescript file name
 */
async function downloadRive(id, name)
{
    const response = await fetch(`http://localhost:3001/rivescripts/${id}/download`);

    if (!response.ok) {
        alert('Une erreur est survenue lors du téléchargement du fichier');
        return;
    }

    // Write the file to the origin private directory
    const blob = await response.blob();
    saveAs(blob, name);
}

/**
 * Update a rivescript. Update the content of the file opened in the dialog.
 */
async function updateRive()
{
    const response = await fetch(`http://localhost:3001/rivescripts/${rivescriptModify.value.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: rivescriptModify.value.content,
        }),
    });

    if (!response.ok) {
        alert('Une erreur est survenue lors de la modification du fichier');
        return;
    }

    refresh();
    closeDialog();
}
</script>

<script>
export default {
    props: {
        forBot: {
            type: Boolean,
            default: false,
        },
        rivescripts: {
            type: Array,
            default () {
                return [];
            }
        }
    },

    data() {
        return {
            rivescriptsChecked: this.rivescripts,
        }
    },

    watch: {
        rivescriptsChecked: {
            handler(val) {
                this.$emit('update:rivescripts', val);
            },

            deep: true,
        }
    },
}
</script>