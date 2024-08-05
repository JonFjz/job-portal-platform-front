<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const token = localStorage.getItem('token')

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
    }
}

const bookmarkedJobs = ref([])
const jobDetails = ref([])

const removeBookmark = async (jobId) => {
    try {
        const response = await axios.delete(`http://34.159.188.181:8080/bookmarks/${jobId}`, config)
        console.log('Bookmark removed:', response)
        toast.open({
            message: `Job ID ${jobId} removed from bookmarks.`,
            type: 'warning',
            position: 'top-right',
            duration: 3000,
            dismissible: true,
            queue: false,
            pauseOnHover: true
        })
        fetchBookmarkedJobs()
    } catch (error) {
        console.error('Failed to remove bookmark:', error)
        toast.open({
            message: 'Failed to remove bookmark.',
            type: 'error',
            position: 'top-right',
            duration: 5000,
            dismissible: true,
            queue: false,
            pauseOnHover: true
        })
    }
}

const fetchBookmarkedJobs = async () => {
    try {
        const response = await axios.get('http://34.159.188.181:8080/bookmarked-jobs', config)
        bookmarkedJobs.value = response.data
        console.log('Bookmarked Jobs:', bookmarkedJobs.value)
        await fetchJobDetails()
    } catch (error) {
        console.error(error)
        toast.open({
            message: 'Failed to fetch bookmarked jobs.',
            type: 'error',
            position: 'top-right',
            duration: 5000,
            dismissible: true,
            queue: false,
            pauseOnHover: true
        })
    }
}

const fetchJobDetails = async () => {
    try {
        for (let i = 0; i < bookmarkedJobs.value.length; i++) {
            const jobId = bookmarkedJobs.value[i].jobPostingId
            try {
                const response = await axios.get(
                    `http://34.159.188.181:8080/api/JobPostings/${jobId}`,
                    config
                )
                console.log(`Fetched job details for ID ${jobId}:`, response.data)

                // Add jobId to the response data before pushing
                const jobWithId = { ...response.data, jobId }

                jobDetails.value.push(jobWithId)
                console.log('Job Details:', jobDetails.value)
            } catch (error) {
                console.error(`Failed to fetch job details for ID ${jobId}:`, error)
            }
        }
    } catch (error) {
        console.error('Failed to fetch job details:', error)
        toast.open({
            message: 'Failed to fetch job details.',
            type: 'error',
            position: 'top-right',
            duration: 5000,
            dismissible: true,
            queue: false,
            pauseOnHover: true
        })
    }
}

onMounted(() => {
    fetchBookmarkedJobs()
})
</script>

<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Bookmarked Jobs</h2>
        <div v-if="jobDetails.length === 0" class="text-gray-500">No bookmarked jobs found.</div>
        <div class="grid gap-6 md:grid-cols-2 text-gray-600">
            <div
                v-for="job in jobDetails"
                :key="job.id"
                class="bg-gray-100 p-6 rounded-lg shadow-md"
            >
                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Title:
                        <p class="font-normal">{{ job.title }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Closing Date:
                        <p class="font-normal">{{ job.closingDate }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Company Name:
                        <p class="font-normal">{{ job.companyName }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Date Posted:
                        <p class="font-normal">{{ job.datePosted }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Description:
                        <p class="font-normal line-clamp-3">{{ job.description }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Required Skills:
                        <p class="font-normal line-clamp-3">{{ job.requiredSkills }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Responsibilities:
                        <p class="font-normal line-clamp-3">{{ job.responsibilities }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Work Level:
                        <p class="font-normal">{{ job.workLevel }}</p>
                    </h3>
                </div>

                <div class="pb-4">
                    <h3 class="text-2xl font-bold">
                        Work Type:
                        <p class="font-normal">{{ job.workType }}</p>
                    </h3>
                </div>

                <!-- button to go to job page -->
                <div class="flex justify-end">
                    <button
                        @click="router.push(`/jobs/${job.jobId}`)"
                        class="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Go to Job
                    </button>
                </div>
                <!-- button to remove bookmark -->
                <div class="flex justify-end">
                    <button
                        class="bg-red-500 text-white px-4 py-2 rounded-lg"
                        @click="removeBookmark(job.jobId)"
                    >
                        Remove Bookmark
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
