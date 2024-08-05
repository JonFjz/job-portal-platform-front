<script setup>
import { ref, onMounted } from 'vue'
import JobCard from './JobCard.vue'
import axios from 'axios'

const jobs = ref([])
const currentPage = ref(1)
const pageSize = 6 // Number of jobs per page
const totalPages = ref(0)
const isLoading = ref(false)

// Function to fetch job details by ID
const fetchJobById = async id => {
    console.log(`Fetching job with ID ${id}`)
    console.log(`Fetching job with ID ${id}`)
    try {
        const response = await axios.get(`http://34.159.188.181:8080/api/JobPostings/${id}`)
        console.log(`Fetched job with ID ${id}`, response.data)
        console.log(`Fetched job with ID ${id}`, response.data)
        console.log(`Fetched job with ID ${id}`, response.data)
        console.log(`Fetched job with ID ${id}`, response.data)
        console.log(`Fetched job with ID ${id}`, response.data)
        return response.data
    } catch (error) {
        console.error(`Failed to fetch job with ID ${id}`, error)
        return null
    }
}

// Function to fetch jobs for the current page until an error occurs
const fetchJobs = async () => {
    isLoading.value = true
    jobs.value = []
    let id = 1 // Starting ID
    let jobFetchedCount = 0 // Count of successfully fetched jobs
    let errorCount = 0 // Count of consecutive errors

    while (jobFetchedCount < pageSize) {
        const job = await fetchJobById(id)
        if (job) {
            jobs.value.push({ ...job, jobId: id }) // Ensure job.id exists
            jobFetchedCount++
            errorCount = 0 // Reset error count on success
        } else {
            errorCount++
            if (errorCount >= 5) {
                break // Stop fetching if 5 consecutive errors occur
            }
        }
        id++
    }

    // Calculate total pages based on fetched jobs
    totalPages.value = Math.ceil(jobs.value.length / pageSize)
    isLoading.value = false
}

// Initial fetch on component mount
onMounted(() => {
    fetchJobs()
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
                <!-- Skeleton loaders -->
                <template v-if="isLoading">
                    <div
                        v-for="n in pageSize"
                        :key="n"
                        class="bg-gray-200 dark:bg-gray-700 rounded-lg h-40"
                    ></div>
                </template>
                <!-- Job cards -->
                <template v-else>
                    <!-- for each  -->
                    <JobCard v-for="job in jobs" :key="job.jobId" :job="job" />
                </template>
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
