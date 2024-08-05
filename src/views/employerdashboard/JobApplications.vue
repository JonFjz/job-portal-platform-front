<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import { useRoute } from 'vue-router'

const $route = useRoute()
const applications = ref([])

const token = localStorage.getItem('token')
const toast = useToast()

// Retrieve and parse the user object from localStorage
const user = JSON.parse(localStorage.getItem('user'))
console.log('user role:', user.role)

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
    }
}

const fetchApplications = async () => {
    try {
        const response = await axios.get(
            `http://34.159.188.181:8080/${$route.params.id}/applications`,
            config
        )
        console.log('response: ', response.data.items)
        applications.value = response.data.items
        if (applications.value.length === 0) {
            toast.info('No job applications found')
        }
    } catch (error) {
        console.error(error)
        toast.error('Failed to fetch applications')
    }
}

const downloadResume = async (jobApplicationId, resumeOriginalName) => {
    try {
        const response = await axios.get(
            `http://34.159.188.181:8080/api/resumes/${jobApplicationId}/download`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/pdf'
                },
                responseType: 'blob'
            }
        )

        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = resumeOriginalName
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Error downloading resume:', error)
        toast.error('Error downloading resume')
    }
}

onMounted(() => {
    fetchApplications()
})
</script>

<template>
    <div>
        <div v-if="applications.length === 0">
            No job applications
        </div>
        <div v-else>
            <div v-for="(application, index) in applications" :key="index" class="application-row">
                <p>{{ application.firstName }} {{ application.lastName }}</p>
                <button @click="downloadResume(application.id, application.resumeOriginalName)">
                    Download Resume
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.application-row {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
