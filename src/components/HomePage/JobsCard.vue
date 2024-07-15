<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    job: Object // Define the prop for job, which is an object containing id and title
})
</script>
<template>
    <a href="#" class="relative">
        <div
            class="bg-white dark:bg-gray-800 border-gray-400 dark:border-green-500 border-2 rounded-xl h-24 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-green-500 hover:border-l-8"
        >
            <div class="text-center text-gray-600">
                <p class="font-semibold text-lg">{{ job.id }}</p>
                <p class="">{{ job.title }}</p>
            </div>
        </div>
    </a>
</template>

<style lang="scss" scoped></style>
