<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goBack = () => {
    router.push('/')
}

const showAddJobForm = ref(false)
const isEditing = ref(false)
const newJob = ref({
    title: '',
    closingDate: '',
    workType: null,
    workLevel: null,
    description: '',
    responsibilities: '',
    notificationEmail: ''
})

const employerId = ref('')
const jobs = ref([])

onMounted(() => {
    employerId.value = localStorage.getItem('employerId') // null
    fetchJobs()
})

const fetchJobs = async () => {
    try {
        const response = await axios.get(
            `https://localhost:7136/api/JobPostings/by-employer/${employerId.value}`
        )
        jobs.value = response.data
    } catch (error) {
        console.error('Error fetching jobs:', error)
    }
}

const handleSubmit = () => {
    if (isEditing.value) {
        updateJob()
    } else {
        addJob()
    }
}

const addJob = async () => {
    const token = localStorage.getItem('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    }

    const date = new Date(newJob.value.closingDate)
    newJob.value.closingDate = date.toISOString()

    try {
        await axios.post(
            'https://localhost:7136/api/JobPostings',
            {
                title: newJob.value.title,
                closingDate: newJob.value.closingDate,
                workType: parseInt(newJob.value.workType),
                workLevel: parseInt(newJob.value.workLevel),
                description: newJob.value.description,
                responsibilities: newJob.value.responsibilities,
                notificationEmail: newJob.value.notificationEmail
            },
            config
        )

        await fetchJobs()
        resetForm()
    } catch (error) {
        if (error.response && error.response.data) {
            console.error('Error adding job:', error.response.data)
        } else {
            console.error('Error adding job:', error.message)
        }
    }
}

const editJob = (job) => {
    newJob.value = { ...job }
    isEditing.value = true
    showAddJobForm.value = true
}

const updateJob = async () => {
    try {
        await axios.put(`http://localhost:3000/jobs/${newJob.value.id}`, newJob.value)
        await fetchJobs()
        resetForm()
    } catch (error) {
        console.error('Error updating job:', error)
    }
}

const deleteJob = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/jobs/${id}`)
        await fetchJobs()
    } catch (error) {
        console.error('Error deleting job:', error)
    }
}

const resetForm = () => {
    newJob.value = {
        title: '',
        closingDate: '',
        workType: null,
        workLevel: null,
        description: '',
        responsibilities: '',
        notificationEmail: ''
    }
    isEditing.value = false
    showAddJobForm.value = false
}

const isManageJobsPage = computed(() => route.path === '/employer-dashboard/')
</script>

<template>
    <div class="flex w-screen h-screen bg-white text-gray-600">
        <aside class="w-64 h-full p-4">
            <h2 class="text-xl font-bold text-gray-700 mb-6">Employer Dashboard</h2>
            <ul class="space-y-4">
                <li>
                    <RouterLink
                        to="/employer-dashboard/"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
                            ></path>
                        </svg>
                        <span>Manage Jobs</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink
                        to="/employer-dashboard/job-listings"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors"
                    >
                        <span>Jobs</span>
                    </RouterLink>
                </li>

                <li>
                    <RouterLink
                        to="/employer-dashboard/job-applications"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M7 2a1 1 0 00-1 1v1h2V3a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v1h2V3a1 1 0 00-1-1zM5 7h10v1H5V7zM5 9h10v1H5V9zM5 11h10v1H5v-1zM4 6V5a1 1 0 011-1h10a1 1 0 011 1v1H4z"
                            ></path>
                        </svg>
                        <span>Applications</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        to="/employer-dashboard/profile"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                            ></path>
                        </svg>
                        <span>Profile</span>
                    </RouterLink>
                </li>
                <button
                    @click="goBack"
                    class="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition-colors"
                >
                    Back
                </button>
            </ul>
        </aside>
        <main class="flex-1 p-6 bg-gray-100">
            <RouterView></RouterView>
            <div v-if="isManageJobsPage">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Manage Jobs</h2>
                <button
                    @click="showAddJobForm = true"
                    class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                >
                    Add New Job
                </button>

                <div v-if="showAddJobForm" class="mt-6 bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-4">
                        {{ isEditing ? 'Edit Job' : 'Add New Job' }}
                    </h3>
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-4">
                            <label for="title" class="block text-gray-700 font-semibold mb-2">
                                Title
                            </label>
                            <input
                                v-model="newJob.title"
                                id="title"
                                type="text"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div class="mb-4">
                            <label for="closingDate" class="block text-gray-700 font-semibold mb-2">
                                Closing Date
                            </label>
                            <input
                                v-model="newJob.closingDate"
                                id="closingDate"
                                type="date"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div class="mb-4">
                            <label for="workType" class="block text-gray-700 font-semibold mb-2">
                                Work Type
                            </label>
                            <select
                                v-model="newJob.workType"
                                id="workType"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Work Type</option>
                                <option value="1">Full-time</option>
                                <option value="2">Part-time</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label for="workLevel" class="block text-gray-700 font-semibold mb-2">
                                Work Level
                            </label>
                            <select
                                v-model="newJob.workLevel"
                                id="workLevel"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Work Level</option>
                                <option value="1">Junior</option>
                                <option value="2">Mid-level</option>
                                <option value="3">Senior</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label for="description" class="block text-gray-700 font-semibold mb-2">
                                Description
                            </label>
                            <textarea
                                v-model="newJob.description"
                                id="description"
                                rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            ></textarea>
                        </div>

                        <div class="mb-4">
                            <label for="responsibilities" class="block text-gray-700 font-semibold mb-2">
                                Responsibilities
                            </label>
                            <textarea
                                v-model="newJob.responsibilities"
                                id="responsibilities"
                                rows="4"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            ></textarea>
                        </div>

                        <div class="mb-4">
                            <label for="notificationEmail" class="block text-gray-700 font-semibold mb-2">
                                Notification Email
                            </label>
                            <input
                                v-model="newJob.notificationEmail"
                                id="notificationEmail"
                                type="email"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div class="flex justify-end space-x-4">
                            <button
                                type="submit"
                                class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                            >
                                {{ isEditing ? 'Update Job' : 'Add Job' }}
                            </button>
                            <button
                                @click="resetForm"
                                type="button"
                                class="bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <div class="mt-6">
                    <h3 class="text-xl font-semibold mb-4">Your Jobs</h3>
                    <ul class="space-y-4">
                        <li v-for="job in jobs" :key="job.id" class="bg-white p-4 rounded-lg shadow-md">
                            <h4 class="text-lg font-semibold">{{ job.title }}</h4>
                            <p class="text-gray-600">{{ job.closingDate }}</p>
                            <p class="text-gray-600">{{ job.workType }}</p>
                            <p class="text-gray-600">{{ job.workLevel }}</p>
                            <p class="text-gray-600">{{ job.description }}</p>
                            <p class="text-gray-600">{{ job.responsibilities }}</p>
                            <p class="text-gray-600">{{ job.notificationEmail }}</p>
                            <div class="flex space-x-2 mt-4">
                                <button
                                    @click="editJob(job)"
                                    class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteJob(job.id)"
                                    class="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
</style>
