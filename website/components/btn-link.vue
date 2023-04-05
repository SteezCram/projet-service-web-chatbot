<template>
    <a :href="link" class="font-medium text-primary-500 hover:underline hover:text-primary-600">
        <slot></slot>
    </a>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            required: true,
        },
    },
}
</script>