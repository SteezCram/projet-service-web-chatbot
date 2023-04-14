<template>
    <button @click="$emit('click', $event)" class="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700">
        <slot></slot>
    </button>
</template>