<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import { useRoute } from 'vue-router'

const $route = useRoute()
const applications = ref([])

const token = localStorage.getItem('token')
const toast = useToast()

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
        applications.value = response.data.items.map((application) => ({
            ...application,
            loading: false
        }))
        if (applications.value.length === 0) {
            toast.info('No job applications found')
        }
    } catch (error) {
        console.error(error)
        toast.error('Failed to fetch applications')
    }
}

const downloadResume = async (application) => {
    application.loading = true
    try {
        const response = await axios.get(
            `http://34.159.188.181:8080/api/Resumes/${application.id}/download`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/pdf',
                    Accept: '*/*'
                },
                responseType: 'blob'
            }
        )
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = application.resumeOriginalName
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Error downloading resume:', error)
        toast.error('Error downloading resume')
    } finally {
        application.loading = false
    }
}

const updateStatus = async (applicationId, newStatus) => {
    console.log('updating status:', applicationId, newStatus)
    try {
        await axios.put(
            `http://34.159.188.181:8080/${applicationId}/update-status`,
            newStatus,
            config
        )
        toast.success('Status updated successfully')
    } catch (error) {
        console.error('Error updating status:', error)
        toast.error('Failed to update status')
    }
}

onMounted(() => {
    fetchApplications()
})
</script>

<template>
    <div>
        <div v-if="applications.length === 0">No job applications</div>
        <div v-else>
            <div v-for="(application, index) in applications" :key="index" class="application-row">
                <p>FirstName: {{ application.firstName }}</p>
                <p>LastName: {{ application.lastName }}</p>
                <p>Status: {{ application.jobApplicationStatus }}</p>

                <button
                    @click="downloadResume(application)"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    <span v-if="application.loading">Downloading...</span>
                    <span v-else>Download Resume {{ application.resumeOriginalName }}</span>
                </button>

                <!-- dropdown to update status with these options that have these values:
                0 Pending,
                1 InterviewInvite,
                2 Interviewed,
                3 Accepted,
                4 Rejected,
                -->
                <select
                    v-model.number="application.jobApplicationStatus"
                    class="p-2 border-2 border-black rounded-md"
                >
                    <option value="0">Pending</option>
                    <option value="1">InterviewInvite</option>
                    <option value="2">Interviewed</option>
                    <option value="3">Accepted</option>
                    <option value="4">Rejected</option>
                </select>

                <button
                    @click="updateStatus(application.id, application.jobApplicationStatus)"
                    class="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Update Status
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
