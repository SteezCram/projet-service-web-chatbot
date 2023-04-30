<template>
    <div>
        <label :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><slot name="label"></slot></label>
        
        <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :name="name" :id="name" class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :required="required" :placeholder="placeholder" :spellcheck="spellcheck" :cols="cols" :rows="rows"></textarea>
    </div>
</template>

<script>
export default {
    props: [
        'name',
        'placeholder',
        'required',
        'cols',
        'rows',
        'spellcheck',
        
        'modelValue'
    ],
    emits: ['update:modelValue'],
}
</script>