<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification' // Import the toast library
import { useRoute } from 'vue-router'

const $route = useRoute()

const applications = ref([])

const token = localStorage.getItem('token')

const toast = useToast() // Initialize toast

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
            `https://localhost:7136/${$route.params.id}/applications`,
            config
        )
        console.log('response: ', response.data.items)
        // response.data.items is the array of applications which are objects
        applications.value = response.data.items
        console.log('applications: ', applications.value)
        // 1: {id: 2, firstName: 'guri', lastName: 'sokoli'}

        console.log('applications.value[0].firstName: ', applications.value[0].firstName)
    } catch (error) {
        console.error(error)
        toast.error('Failed to fetch applications')
    }
}

const downloadResume = async (jobApplicationId, resumeOriginalName) => {
    try {
        const response = await axios.get(
            `https://localhost:7136/api/resumes/${jobApplicationId}/download`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/pdf' // Specify expected file type
                },
                responseType: 'blob' // Important to handle binary data
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
        <div v-for="(application, index) in applications" :key="index" class="application-row">
            <p>{{ application.firstName }} {{ application.lastName }}</p>
            <button @click="downloadResume(application.id, application.resumeOriginalName)">
                Download Resume
            </button>
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
