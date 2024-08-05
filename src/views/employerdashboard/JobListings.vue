<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const employerId = ref(null) // initialize with null or fetch from the backend
const jobs = ref([])
const error = ref('')

// fetch employerId from user data
const fetchEmployerId = async () => {
    try {
        const response = await axios.get('http://34.159.188.181:8080/api/Employers/current')
        employerId.value = response.data.id // set employerId from the response
    } catch (err) {
        console.error('Error fetching employer ID:', err)
        error.value = 'Failed to fetch employer ID. Please try again later.'
    }
}

const fetchJobs = async () => {
    try {
        if (!employerId.value) {
            // if employerId is not set, fetch it first
            await fetchEmployerId()
        }

        // fetch jobs by employerId
        const response = await axios.get(
            `http://34.159.188.181:8080/api/JobPostings/by-employer/${employerId.value}`
        )
        jobs.value = response.data
    } catch (err) {
        console.error('Error fetching jobs:', err)
        if (err.response && err.response.status === 500) {
            error.value = 'Internal Server Error. Please try again later.'
        } else {
            error.value = 'Failed to fetch job listings. Please try again later.'
        }
    }
}

onMounted(() => {
    fetchJobs()
})

const editJob = (job) => {
    // needs to implement
}

const deleteJob = async (id) => {
    try {
        await axios.delete(`http://34.159.188.181:8080/api/jobpostings/${id}`)
        fetchJobs()
    } catch (err) {
        console.error('Error deleting job:', err)
        error.value = 'Failed to delete the job. Please try again later.'
    }
}
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Job Listings</h2>
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">Title</th>
                    <th class="py-2 px-4 border-b">Closing Date</th>
                    <th class="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="job in jobs" :key="job.id">
                    <td class="py-2 px-4 border-b">{{ job.title }}</td>
                    <td class="py-2 px-4 border-b">{{ job.closingDate }}</td>
                    <td class="py-2 px-4 border-b">
                        <RouterLink
                            :to="`/employer-dashboard/job-listings/${job.id}/applications`"
                            class="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                        >
                            View Applications
                        </RouterLink>
                        <button
                            @click="editJob(job)"
                            class="bg-yellow-600 text-white px-2 py-1 rounded-md hover:bg-yellow-700 ml-2"
                        >
                            Edit
                        </button>
                        <button
                            @click="deleteJob(job.id)"
                            class="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 ml-2"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>
    </div>
</template>
