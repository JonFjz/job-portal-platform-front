<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
    job: Object // Define the prop for job, which is an object containing id and title
})

// Create a ref to manage the bookmark state
const isBookmarked = ref(false)

// Method to handle the bookmark click
const toggleBookmark = () => {
    isBookmarked.value = !isBookmarked.value
    console.log(props.job.id)
}
</script>

<template>
    <div href="#" class="relative">
        <div
            class="flex flex-col items-start justify-start p-4 w-full h-fit bg-white dark:bg-gray-700 border-gray-400 dark:border-green-500 border-2 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-500 hover:border-l-8"
        >
            <div class="flex flex-row justify-between items-center w-full">
                <!-- pfp, company name, title and position -->
                <div class="flex flex-row items-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Job image"
                        class="h-12 rounded-lg"
                    />
                    <div class="flex flex-col text-gray-600 dark:text-gray-300 pl-4">
                        <p>Company Name</p>
                        <p>EmploymentType/Position</p>
                    </div>
                </div>
                <!-- bookmark icon -->
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
            </div>
            <!-- tags -->
            <div class="flex items-center justify-start">
                <div class="flex flex-row items-center space-x-2 py-2">
                    <span
                        class="align-middle px-2 py-1 border-2 border-slate-300 text-center text-gray-600 dark:text-gray-300 text-xs rounded-xl"
                        >Tag-Test</span
                    >
                    <span
                        class="align-middle px-2 py-1 border-2 border-slate-300 text-center text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >Tag-Test</span
                    >
                    <span
                        class="align-middle px-2 py-1 border-2 border-slate-300 text-center text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >Tag-Test</span
                    >
                </div>
            </div>
            <!-- job title and decription -->
            <div class="flex flex-col items-start justify-start text-gray-600 dark:text-gray-300">
                <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-300">
                    Job Position Title
                </h1>
                <h2 class="text-xl text-gray-500 dark:text-gray-300 line-clamp-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ratione minima
                    vero asperiores ducimus similique deleniti libero magni reiciendis tempora.
                </h2>
            </div>
            <!-- know more button and part/full-time -->
            <div class="flex flex-row items-center justify-between w-full pt-4 pb-1">
                <div class="flex items-center justify-center">
                    <button class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                        Know More
                    </button>
                </div>
                <div>
                    <span class="text-gray-600 dark:text-gray-300 align-middle"
                        >Part/Full-Time</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
