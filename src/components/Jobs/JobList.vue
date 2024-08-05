<script setup>
import JobsCard from '@/components/Jobs/JobsCard.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentPage = ref(1) 
const jobsPerPage = 10

const searchTerm = ref('') 
const searchResults = ref([])


const navigateToJobDetail = (id) => {
    router.push(`/jobs/${id}`)
}

// handles pagination by slicing the search results array to return only the jobs for the current page
const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * jobsPerPage
    const end = start + jobsPerPage
    return searchResults.value.slice(start, end)
})

// calculates the total number of pages based on search results
const totalPages = computed(() => {
    return Math.ceil(searchResults.value.length / jobsPerPage)
})

// updates the currentPage & navigates to a specific page
const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

const searchJobs = async () => {
    const term = searchTerm.value.trim().toLowerCase();
    if (!term) return searchResults.value = [];

    try {
        const { data } = await axios.get('http://34.159.188.181:8080/api/JobPostings/search', {
            params: { searchTerm: term },
        });
        // split search term into individual words for partial matching
        const searchTerms = term.split(/\s+/);

        searchResults.value = data.filter(job => {
            const title = job.title.toLowerCase();
            // check if any of the search terms are included in the job title
            return searchTerms.some(term => title.includes(term));
        });
    } catch (error) {
        console.error('Search error:', error);
    }
};


</script>

<template>
    <div class="lg:col-span-5">
        <div class="bg-gray-100 rounded-2xl px-4 py-4 mb-4 dark:bg-gray-700 dark:text-gray-300">
            <div
                class="inline-block text-[10px] font-display font-bold text-white dark:bg-gray-700 dark:text-gray-300 bg-teal-900 rounded-md py-[1px] px-1">
                NEW!
            </div>
            <div class="font-semibold text-lg relative dark:text-gray-300">
                Do you want to see more jobs?
            </div>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
                We are working hard to bring you more Vue.js jobs. Get access to a larger database
                of hundreds of Vue.js jobs.
            </p>
            <button type="button"
                class="mt-4 font-bold uppercase bg-cyan-900 text-white px-4 rounded-[8px] h-[38px] text-sm">
                Get access!
            </button>
        </div>
        <input type="text" v-model="searchTerm" @input="searchJobs" placeholder="Search for jobs..."
            class="w-full p-2 border rounded" />
        <div v-if="searchTerm.length > 0" class="mt-4">
            <JobsCard v-for="job in paginatedJobs" :key="job.id" :job="job" />
        </div>
        <div class="mt-4 flex justify-between items-center">
            <button class="px-4 py-2 bg-green-500 text-white rounded-md" :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)">
                Previous
            </button>
            <span class="text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md" :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)">
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>
.job-list a {
    margin-bottom: 1rem;
}

.job-list a:last-child {
    margin-bottom: 0;
}
</style>
