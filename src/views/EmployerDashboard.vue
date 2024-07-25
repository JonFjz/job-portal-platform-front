<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const showAddJobForm = ref(false) // Reactive variable to control the visibility of the add/edit job form
const isEditing = ref(false) // Reactive variable to check if we're in editing mode
const newJob = ref({
    // Reactive variable to hold data for the new or edited job
    title: '',
    company: '',
    location: '',
    salary: '',
    remote: false,
    hybrid: false
})
const jobs = ref([])
const currentJob = ref(null) // (not used in this code)

// fetch jobs when the component is mounted
onMounted(async () => {
    await fetchJobs()
})

// function to fetch jobs from the API
const fetchJobs = async () => {
    try {
        const response = await axios.get('http://localhost:3000/jobs')
        jobs.value = response.data
    } catch (error) {
        console.error('Error fetching jobs:', error)
    }
}

// function to add a new job
const addJob = async () => {
    try {
        await axios.post('http://localhost:3000/jobs', newJob.value)
        await fetchJobs()
        resetForm()
    } catch (error) {
        console.error('Error adding job:', error)
    }
}

// function to set up the form for editing a job
const editJob = (job) => {
    newJob.value = { ...job } // pre-fill the form with the job data
    isEditing.value = true // set the editing flag to true
    showAddJobForm.value = true // show the add/edit job form
}

// function to update an existing job
const updateJob = async () => {
    try {
        await axios.put(`http://localhost:3000/jobs/${newJob.value.id}`, newJob.value)
        await fetchJobs()
        resetForm()
    } catch (error) {
        console.error('Error updating job:', error)
    }
}

// function to delete a job
const deleteJob = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/jobs/${id}`)
        await fetchJobs()
    } catch (error) {
        console.error('Error deleting job:', error)
    }
}

// function to reset the job form fields
const resetForm = () => {
    newJob.value = {
        // reset all form fields to their default values
        title: '',
        company: '',
        location: '',
        salary: '',
        remote: false,
        hybrid: false,
        logo: '',
        featured: false
    }
    isEditing.value = false // reset the editing
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
                <li v-if="userRole === 'Jobseeker'">
                    <RouterLink
                        to="/bookmarks"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M3 4a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM4 5h1V4H4v1zM3 8a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V8zM4 9h1V8H4v1zM8 4a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM9 5h1V4H9v1zM8 8a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V8zM9 9h1V8H9v1zM13 4a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1V4zM14 5h1V4h-1v1zM13 8a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1V8zM14 9h1V8h-1v1z"
                            ></path>
                        </svg>
                        <span>Bookmarks</span>
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
                <h3 class="text-xl font-semibold mb-4">
                    {{ isEditing ? 'Edit Job' : 'Add New Job' }}
                </h3>
                <form @submit.prevent="isEditing ? updateJob() : addJob()">
                    <div class="mb-4">
                        <label for="title" class="block text-gray-600">Title:</label>
                        <input
                            v-model="newJob.title"
                            type="text"
                            id="title"
                            class="border border-gray-300 p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="company" class="block text-gray-600">Company:</label>
                        <input
                            v-model="newJob.company"
                            type="text"
                            id="company"
                            class="border border-gray-300 p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="location" class="block text-gray-600">Location:</label>
                        <input
                            v-model="newJob.location"
                            type="text"
                            id="location"
                            class="border border-gray-300 p-2 rounded-md w-full"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="salary" class="block text-gray-600">Salary:</label>
                        <input
                            v-model="newJob.salary"
                            type="text"
                            id="salary"
                            class="border border-gray-300 p-2 rounded-md w-full"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="remote" class="inline-flex items-center">
                            <input
                                v-model="newJob.remote"
                                type="checkbox"
                                id="remote"
                                class="form-checkbox text-teal-600"
                            />
                            <span class="ml-2 text-gray-600">Remote</span>
                        </label>
                    </div>
                    <div class="mb-4">
                        <label for="hybrid" class="inline-flex items-center">
                            <input
                                v-model="newJob.hybrid"
                                type="checkbox"
                                id="hybrid"
                                class="form-checkbox text-teal-600"
                            />
                            <span class="ml-2 text-gray-600">Hybrid</span>
                        </label>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button
                            type="submit"
                            class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                        >
                            {{ isEditing ? 'Update Job' : 'Add Job' }}
                        </button>
                        <button
                            type="button"
                            @click="showAddJobForm = false"
                            class="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                    <div class="mb-4">
                        <label for="logo" class="block text-gray-600">Logo URL:</label>
                        <input
                            v-model="newJob.logo"
                            type="text"
                            id="logo"
                            class="border border-gray-300 p-2 rounded-md w-full"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="featured" class="inline-flex items-center">
                            <input
                                v-model="newJob.featured"
                                type="checkbox"
                                id="featured"
                                class="form-checkbox text-teal-600"
                            />
                            <span class="ml-2 text-gray-600">Featured</span>
                        </label>
                    </div>
                </form>
            </div>

            <div class="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4">Job List</h3>
                <div v-if="jobs.length === 0" class="text-gray-600">No jobs available.</div>
                <ul v-else>
                    <li v-for="job in jobs" :key="job.id" class="border-b border-gray-200 py-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <h4 class="text-lg font-semibold">{{ job.title }}</h4>
                                <p class="text-gray-600">{{ job.company }} - {{ job.location }}</p>
                                <p class="text-gray-500">
                                    {{ job.salary ? job.salary : 'Salary not specified' }}
                                </p>
                                <p class="text-gray-500">
                                    {{ job.remote ? 'Remote' : '' }}{{ job.hybrid ? 'Hybrid' : '' }}
                                </p>
                            </div>
                            <div>
                                <button
                                    @click="editJob(job)"
                                    class="bg-teal-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteJob(job.id)"
                                    class="bg-red-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-700 transition-colors ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</template>
