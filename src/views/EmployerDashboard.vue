<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const showAddJobForm = ref(false)
const isEditing = ref(false)
const newJob = ref({
    title: '',
    company: '',
    location: '',
    salary: '',
    remote: false,
    hybrid: false,
    logo: '',
    featured: false
})

const employerId = ref('')
const jobs = ref([])

onMounted(() => {
    // fetch employer ID
    employerId.value = localStorage.getItem('employerId')
    fetchJobs()
})

const fetchJobs = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/jobs?employerId=${employerId.value}`)
        jobs.value = response.data
    } catch (error) {
        console.error('Error fetching jobs:', error)
    }
}

const addJob = async () => {
    try {
        await axios.post('http://localhost:3000/jobs', { ...newJob.value, employerId: employerId.value })
        await fetchJobs()
        resetForm()
    } catch (error) {
        console.error('Error adding job:', error)
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
        company: '',
        location: '',
        salary: '',
        remote: false,
        hybrid: false,
        logo: '',
        featured: false
    }
    isEditing.value = false
    showAddJobForm.value = false
}
</script>

<template>
    <div class="flex w-screen h-screen bg-white text-gray-600">
        <aside class="w-64 h-full p-4">
            <h2 class="text-xl font-bold text-gray-700 mb-6">Employer Dashboard</h2>
            <ul class="space-y-4">
                <li>
                    <RouterLink
                        to="/employer-dashboard"
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
                        to="/applications"
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
                        to="/settings"
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
                        <span>Settings</span>
                    </RouterLink>
                </li>
            </ul>
        </aside>
        <main class="flex-1 p-6 bg-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Manage Jobs</h2>
            <button
                @click="showAddJobForm = true"
                class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
            >
                Add New Job
            </button>

            <div v-if="showAddJobForm" class="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit Job' : 'Add New Job' }}</h3>
                <form @submit.prevent="isEditing ? updateJob() : addJob()">
                    <div class="space-y-4">
                        <div>
                            <label for="title" class="block text-gray-600">Title:</label>
                            <input
                                v-model="newJob.title"
                                type="text"
                                id="title"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label for="company" class="block text-gray-600">Company:</label>
                            <input
                                v-model="newJob.company"
                                type="text"
                                id="company"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label for="location" class="block text-gray-600">Location:</label>
                            <input
                                v-model="newJob.location"
                                type="text"
                                id="location"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label for="salary" class="block text-gray-600">Salary:</label>
                            <input
                                v-model="newJob.salary"
                                type="text"
                                id="salary"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div class="flex items-center">
                            <input
                                v-model="newJob.remote"
                                type="checkbox"
                                id="remote"
                                class="mr-2"
                            />
                            <label for="remote" class="text-gray-600">Remote</label>
                        </div>
                        <div class="flex items-center">
                            <input
                                v-model="newJob.hybrid"
                                type="checkbox"
                                id="hybrid"
                                class="mr-2"
                            />
                            <label for="hybrid" class="text-gray-600">Hybrid</label>
                        </div>
                        <div>
                            <label for="logo" class="block text-gray-600">Company Logo URL:</label>
                            <input
                                v-model="newJob.logo"
                                type="text"
                                id="logo"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div class="flex items-center">
                            <input
                                v-model="newJob.featured"
                                type="checkbox"
                                id="featured"
                                class="mr-2"
                            />
                            <label for="featured" class="text-gray-600">Featured</label>
                        </div>
                    </div>
                    <div class="mt-4">
                        <button
                            type="submit"
                            class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                        >
                            {{ isEditing ? 'Update Job' : 'Add Job' }}
                        </button>
                        <button
                            type="button"
                            @click="resetForm"
                            class="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div class="mt-6">
                <h3 class="text-xl font-semibold mb-4">Job Listings</h3>
                <div v-if="jobs.length === 0" class="text-gray-500">No jobs found.</div>
                <ul class="space-y-4">
                    <li v-for="job in jobs" :key="job.id" class="bg-white p-4 rounded-md shadow-md">
                        <h4 class="text-lg font-bold">{{ job.title }}</h4>
                        <p class="text-gray-600">{{ job.company }}</p>
                        <p class="text-gray-600">{{ job.location }}</p>
                        <p class="text-gray-600">{{ job.salary }}</p>
                        <div class="mt-4 flex space-x-4">
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
        </main>
    </div>
</template>
