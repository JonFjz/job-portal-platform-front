<script setup>
import { ref, onMounted, watch } from 'vue'
import JobCard from './JobCard.vue'

// Data variables
const jobs = ref([])
const currentPage = ref(1)
const pageSize = 6 // Number of jobs per page
let totalPages = ref(1)

// Dummy data for demonstration
const dummyJobs = ref([
    { id: 1, title: 'Job 1' },
    { id: 2, title: 'Job 2' },
    { id: 3, title: 'Job 3' },
    { id: 4, title: 'Job 4' },
    { id: 5, title: 'Job 5' },
    { id: 6, title: 'Job 6' },
    { id: 7, title: 'Job 7' },
    { id: 8, title: 'Job 8' },
    { id: 9, title: 'Job 9' }
])

// Function to fetch jobs
const fetchJobs = () => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    jobs.value = dummyJobs.value.slice(startIndex, endIndex)
}

// Function to calculate total pages
const calculateTotalPages = () => {
    totalPages.value = Math.ceil(dummyJobs.value.length / pageSize)
}

// Watch for changes in dummyJobs to recalculate total pages
watch(dummyJobs, calculateTotalPages)

// Initial fetch on component mount
onMounted(() => {
    fetchJobs()
    calculateTotalPages()
})

// Pagination functions
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
        fetchJobs()
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        fetchJobs()
    }
}
</script>

<template>
    <div class="flex flex-col w-full bg-white dark:bg-gray-800 pb-8">
        <!-- Header section -->
        <div class="flex flex-row justify-between items-center w-full container mx-auto px-4">
            <div class="flex flex-col">
                <h2 class="text-green-600 text-xl font-semibold">Get a Vue.js job</h2>
                <h1 class="text-3xl text-slate-700 dark:text-gray-100 font-semibold">
                    Browse the Latest Vue.js Job Opportunities
                </h1>
            </div>
            <div>
                <button class="hidden md:flex bg-green-600 text-white px-6 py-3 rounded-lg">
                    View All Jobs
                </button>
            </div>
        </div>

        <!-- Job Cards section -->
        <div class="container mx-auto p-4">
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
                <!-- Job cards here -->
                <JobCard v-for="job in jobs" :key="job.id" :job="job" />
            </div>
        </div>

        <!-- Pagination section -->
        <div class="flex justify-center mt-4">
            <button
                class="bg-gray-800 text-white rounded-l-md dark:border-2 dark:border-green-500 py-2 hover:bg-green-500 hover:text-white px-3"
                @click="prevPage"
                :disabled="currentPage === 1"
            >
                <div class="flex flex-row align-middle">
                    <svg
                        class="w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <p class="ml-2">Prev</p>
                </div>
            </button>
            <span class="bg-gray-800 mx-2 dark:border-2 dark:border-green-500 text-white py-2 px-3"
                >{{ currentPage }} / {{ totalPages }}</span
            >
            <button
                class="bg-gray-800 text-white rounded-r-md py-2 dark:border-2 dark:border-green-500 hover:bg-green-500 hover:text-white px-3"
                @click="nextPage"
                :disabled="currentPage === totalPages"
            >
                <div class="flex flex-row align-middle">
                    <span class="mr-2">Next</span>
                    <svg
                        class="w-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
