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
const currentView = ref('settings')
const hasResume = ref(false)
const token = localStorage.getItem('token')
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*'
    }
}

const profile = ref({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    dateOfBirth: ''
})

const resumeFile = ref(null)

const getJobSeekerProfile = async () => {
    try {
        const response = await axios.get(
            `http://34.159.188.181:8080/api/JobSeekers/profile`,
            config
        )
        profile.value = response.data
        profile.value.dateOfBirth = profile.value.dateOfBirth.split('T')[0]
        hasResume.value = response.data.resumeUploaded || false
        if (hasResume.value) {
            toast.info(
                'You have a resume uploaded. To change it, please delete the current one first.'
            )
        }
    } catch (error) {
        router.push('/login')
        localStorage.removeItem('token')
    }
}

const formattedDateOfBirth = computed(() => {
    return profile.value.dateOfBirth.split('T')[0]
})

const updateProfile = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    }

    const formattedDateForBackend = `${formattedDateOfBirth.value}T00:00:00`

    const updatedProfile = {
        ...profile.value,
        dateOfBirth: formattedDateForBackend
    }

    try {
        const response = await axios.put(
            'http://34.159.188.181:8080/api/JobSeekers',
            updatedProfile,
            config
        )
        toast.success('Profile updated successfully')
    } catch (error) {
        console.error('Error updating profile:', error)
        toast.error('Error updating profile')
    }

    if (resumeFile.value) {
        const resumeByteString = new FormData()
        resumeByteString.append('File', resumeFile.value)

        try {
            const response = await axios.post(
                'http://34.159.188.181:8080/api/Resumes/upload',
                resumeByteString,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                        Accept: '*/*'
                    }
                }
            )
            toast.success('Resume uploaded successfully')
        } catch (error) {
            console.error('Resume already existant, delete it then add another:', error)
            toast.error('Resume already existant, delete it then add another')
        }
    } else {
        toast.warning('Please select a resume file to upload')
    }
}

const downloadOwnResume = async () => {
    try {
        const response = await axios.get('http://34.159.188.181:8080/api/Resumes/download', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/pdf'
            },
            responseType: 'blob'
        })

        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'resume.pdf'
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Error downloading resume:', error)
        toast.error('Error downloading resume')
    }
}

const deleteOwnResume = async () => {
    try {
        const response = await axios.delete('http://34.159.188.181:8080/api/Resumes/delete', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*'
            }
        })
        toast.success('Resume deleted successfully')
        hasResume.value = false
    } catch (error) {
        console.error('Error deleting resume:', error)
        toast.error('Error deleting resume')
    }
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
        resumeFile.value = file
    } else {
        toast.error('Please upload a valid PDF file.')
        resumeFile.value = null
    }
}

const fetchJobApplications = async () => {
    try {
        const response = await axios.get('http://34.159.188.181:8080/by-jobseeker', config)
        applications.value = response.data.items
    } catch (error) {
        console.error('Error fetching job applications:', error)
        toast.error('Error fetching job applications')
    }
}

onMounted(() => {
    getJobSeekerProfile()
    fetchJobApplications()
    userId.value = getUserId()
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
                <button
                    @click="goBack"
                    class="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-500 transition-colors"
                >
                    Back
                </button>
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
                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                    <p>* make sure to click save changes after uploading a new resume</p>
                </form>
            </div>

            <!-- Bookmarks View -->
            <div v-if="currentView === 'bookmarks'">
                <h2 class="text-xl font-bold mb-4">Bookmarked Jobs</h2>
                <BookmarkedJobs :userId="userId" />
            </div>

            <!-- Applications View -->
            <!-- Applications View -->
            <div v-if="currentView === 'applications'">
                <h2 class="text-xl font-bold mb-4">Applications</h2>
                <div
                    v-for="application in applications"
                    :key="application.id"
                    class="bg-gray-100 p-4 mb-4 rounded-md"
                >
                    <p>
                        <strong>Applied On:</strong>
                        {{ new Date(application.appliedOn).toLocaleDateString() }}
                    </p>
                    <p><strong>Company Name:</strong> {{ application.jobPosting.companyName }}</p>
                    <p><strong>Job Title:</strong> {{ application.jobPosting.title }}</p>
                    <p><strong>Work Type:</strong> {{ application.jobPosting.workType }}</p>
                    <p><strong>Work Level:</strong> {{ application.jobPosting.workLevel }}</p>
                    <p><strong>Status:</strong> {{ application.jobApplicationStatus }}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>
