<template>
    <div class="flex items-center justify-center">
        <svg
            @click="toggleBookmark"
            :fill="isBookmarked ? '#eab308' : 'none'"
            :class="{ 'text-yellow-500': isBookmarked, 'text-gray-500': !isBookmarked }"
            class="h-8 w-8 cursor-pointer dark:text-gray-300 text-gray-500 transition-all duration-150"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const props = defineProps({
    jobId: {
        type: Number,
        required: true
    }
})

const isBookmarked = ref(false)
const toast = useToast()

const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value
    const message = isBookmarked.value
        ? `Job ID ${props.jobId} bookmarked!`
        : `Job ID ${props.jobId} removed from bookmarks.`

    toast.open({
        message,
        type: isBookmarked.value ? 'success' : 'warning',
        position: 'top-right',
        duration: 3000,
        dismissible: true,
        queue: false,
        pauseOnHover: true
    })
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
