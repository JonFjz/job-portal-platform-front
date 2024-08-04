<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import JobCard from '@/components/Jobs/JobsCard.vue'
import { getUserId } from '@/services/authService'
import BookmarkedJobs from '@/components/Jobseeker/BookmarkedJobs.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const goBack = () => {
    router.push('/')
}

const userId = ref(null)
const user = ref({
    name: '',
    email: '',
    password: ''
})
const applications = ref([])
const currentView = ref('settings') // default view

const token = localStorage.getItem('token')
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*'
    }
}

const profile = ref({
    email: '', // Include email in the profile for binding, but exclude during update
    phone: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
})

const resumeFile = ref(null)

const getJobSeekerProfile = async () => {
    try {
        const response = await axios.get(`https://localhost:7136/api/JobSeekers/profile`, config)
        profile.value = response.data
        profile.value.dateOfBirth = profile.value.dateOfBirth.split('T')[0]
    } catch (error) {
        console.log('Error:', error)
        router.push('/login')
        localStorage.removeItem('token')
    }
}

const formattedDateOfBirth = computed(() => {
    return profile.value.dateOfBirth.split('T')[0]
})

const updateProfile = async () => {
    console.log('Updating profile:', profile.value)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    }

    // Format the date for sending to the backend
    const formattedDateForBackend = `${formattedDateOfBirth.value}T00:00:00`

    const updatedProfile = {
        ...profile.value,
        dateOfBirth: formattedDateForBackend
    }

    try {
        const response = await axios.put(
            'https://localhost:7136/api/JobSeekers',
            updatedProfile,
            config
        )
        console.log('Profile updated:', response.data)
        toast.success('Profile updated successfully')
    } catch (error) {
        console.error('Error updating profile:', error)
        toast.error('Error updating profile')
    }

    // In another request, send only the resume and the config, nothing else
    if (resumeFile.value) {
        const formData = new FormData()
        formData.append('File', resumeFile.value) // Ensure 'File' matches backend expectation

        try {
            const response = await axios.post(
                'https://localhost:7136/api/Resumes/upload',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                        Accept: '*/*'
                    }
                }
            )
            console.log('Resume uploaded:', response.data)
            toast.success('Resume uploaded successfully')
        } catch (error) {
            console.error('Error uploading resume:', error)
            toast.error('Error uploading resume')
        }
    } else {
        toast.warning('Please select a resume file to upload')
    }
}

const resumeDownloadLink = ref('') // Reactive variable for resume download link

const downloadOwnResume = async () => {
    try {
        const response = await axios.get('https://localhost:7136/api/Resumes/download', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/octet-stream'
            }
            // responseType: 'blob' // Ensure the response is treated as a blob
        })

        console.log('Resume downloaded:', response)

        // Extract the file name from the content-disposition header
        const contentDisposition =
            response.headers['content-disposition'] || response.headers['Content-Disposition']

        console.log('Content-Disposition:', contentDisposition)
        let fileName = 'resume'

        if (contentDisposition) {
            const matches = /filename="([^"]+)"/.exec(contentDisposition)
            const matchesUtf8 = /filename\*=UTF-8''([^"]+)/.exec(contentDisposition)

            if (matchesUtf8 && matchesUtf8[1]) {
                fileName = decodeURIComponent(matchesUtf8[1])
            } else if (matches && matches[1]) {
                fileName = matches[1]
            }
        }

        // Create a link element
        const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/octet-stream' })
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName) // Set the file name
        document.body.appendChild(link)
        link.click()

        // Clean up and remove the link element
        link.parentNode.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast.success('Resume downloaded successfully')
    } catch (error) {
        console.error('Error downloading resume:', error)
        toast.error('Error downloading resume')
    }
}

const deleteOwnResume = async () => {
    try {
        const response = await axios.delete('https://localhost:7136/api/Resumes/delete', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*'
            }
        })
        console.log('Resume deleted:', response.data)
        toast.success('Resume deleted successfully')
    } catch (error) {
        console.error('Error deleting resume:', error)
        toast.error('Error deleting resume')
    }
}
const handleFileChange = (event) => {
    resumeFile.value = event.target.files[0]
}

onMounted(() => {
    getJobSeekerProfile()
    userId.value = getUserId() // get the user ID dynamically
})
</script>

<template>
    <div class="flex w-screen h-screen bg-white">
        <aside class="w-64 h-full p-4">
            <h2 class="text-xl font-bold text-gray-700 mb-6">User Dashboard</h2>
            <ul class="space-y-4">
                <!-- Find Jobs link -->
                <li>
                    <RouterLink
                        to="/jobs"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left"
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
                        <span>Find Jobs</span>
                    </RouterLink>
                </li>
                <!-- User Settings link -->
                <li>
                    <button
                        @click="currentView = 'settings'"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M4 6a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2H4zM4 12a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2H4zM12 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V8zM12 12a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4z"
                            ></path>
                        </svg>
                        <span>User Settings</span>
                    </button>
                </li>

                <!-- Bookmarks link -->
                <li>
                    <button
                        @click="currentView = 'bookmarks'"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M15 3a3 3 0 00-3 3v10a1 1 0 01-2 0V6a3 3 0 00-3-3H4a3 3 0 00-3 3v11a1 1 0 001 1h12a1 1 0 001-1V6a3 3 0 00-3-3h-1zM5 2a1 1 0 011 1v12a1 1 0 01-2 0V3a1 1 0 011-1h2zm6 0a1 1 0 011 1v12a1 1 0 01-2 0V3a1 1 0 011-1h2z"
                            ></path>
                        </svg>
                        <span>Bookmarks</span>
                    </button>
                </li>

                <!-- Applications link -->
                <li>
                    <button
                        @click="currentView = 'applications'"
                        class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left"
                    >
                        <svg
                            class="w-6 h-6 fill-current text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M4 3a2 2 0 00-2 2v1a2 2 0 002 2h1v5H4a2 2 0 00-2 2v1a2 2 0 002 2h12a2 2 0 002-2v-1a2 2 0 00-2-2h-1V8h1a2 2 0 002-2V5a2 2 0 00-2-2H4z"
                            ></path>
                        </svg>
                        <span>Applications</span>
                    </button>
                </li>
            </ul>
        </aside>
        <main class="flex-1 p-6 overflow-y-auto text-gray-600">
            <!-- Profile Form -->
            <div v-if="currentView === 'settings'">
                <h2 class="text-xl font-bold mb-4">Profile Information</h2>
                <form @submit.prevent="updateProfile">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700"
                                >First Name</label
                            >
                            <input
                                type="text"
                                v-model="profile.firstName"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                v-model="profile.lastName"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                v-model="profile.email"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                disabled
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                v-model="profile.phone"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700"
                                >Date of Birth</label
                            >
                            <input
                                type="date"
                                v-model="profile.dateOfBirth"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Resume</label>
                            <input
                                type="file"
                                @change="handleFileChange"
                                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                            />
                        </div>
                    </div>
                    <div class="mt-6 gap-6">
                        <button
                            type="submit"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Save Changes
                        </button>
                        <button
                            @click="downloadOwnResume"
                            type="button"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Download Resume
                        </button>
                        <button
                            @click="deleteOwnResume"
                            type="button"
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Delete Resume
                        </button>
                    </div>
                </form>
            </div>

            <!-- Bookmarks View -->
            <div v-if="currentView === 'bookmarks'">
                <h2 class="text-xl font-bold mb-4">Bookmarked Jobs</h2>
                <BookmarkedJobs :userId="userId" />
            </div>

            <!-- Applications View -->
            <div v-if="currentView === 'applications'">
                <h2 class="text-xl font-bold mb-4">Applications</h2>
                <div v-for="application in applications" :key="application.id" class="mb-4">
                    <JobCard :job="application.job" />
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>
