<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import axios from 'axios'

const props = defineProps({
    jobId: {
        type: Number,
        required: true
    }
})

const isBookmarked = ref(false)
const toast = useToast()

const user = JSON.parse(localStorage.getItem('user'))

const bookmarkedJobs = ref([])

const token = localStorage.getItem('token')

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
    }
}
const toggleBookmark = async () => {
    if (!token) {
        toast.open({
            message: 'Please log in to bookmark jobs.',
            type: 'warning',
            position: 'bottom-right',
            duration: 3000,
            dismissible: true,
            queue: false,
            pauseOnHover: true
        })
        return
    }
    if (user.role == 'Employer') {
        toast.open({
            message: 'Employers cannot bookmark jobs.',
            type: 'warning',
            position: 'bottom-right',
            duration: 3000,
            dismissible: true,
            queue: false,
            pauseOnHover: true
        })
        return
    }

    console.log('Toggling bookmark for jobId:', props.jobId) // Debug log
    isBookmarked.value = !isBookmarked.value
    const message = isBookmarked.value
        ? `Job ID ${props.jobId} bookmarked!`
        : `Job ID ${props.jobId} removed from bookmarks.`

    toast.open({
        message,
        type: isBookmarked.value ? 'success' : 'warning',
        position: 'top-right',
        duration: 3000,
        dismissible: true,
        queue: false,
        pauseOnHover: true
    })

    if (isBookmarked.value) {
        // add bookmark
        const response = await axios.post(
            'http://34.159.188.181:8080/bookmarks',
            {
                jobPostingId: props.jobId
            },
            config
        )
        console.log('Bookmark added response:', response)
        const result = await response
        console.log('Bookmark added result:', result)
    } else {
        // remove bookmark
        const response = await axios.delete(
            `http://34.159.188.181:8080/bookmarks/${props.jobId}`,
            config
        )
        console.log('Bookmark removed:', response)
        console.log('Bookmark removed:', response)
        console.log('Bookmark removed:', response)
        console.log('Bookmark removed:', response)
        console.log('Bookmark removed:', response)
        const data = await response
        if (data.length > 0) {
            console.log('Bookmark removed:', data[0].id)
        }
    }
}
const checkBookmarkStatus = async () => {
    try {
        const response = await axios.get('http://34.159.188.181:8080/bookmarked-jobs', config)
        bookmarkedJobs.value = response.data

        console.log('Bookmarked jobs:', bookmarkedJobs.value[0].jobPostingId)
        console.log('Bookmarked jobs:', bookmarkedJobs.value[1].jobPostingId)

        isBookmarked.value = bookmarkedJobs.value.some(job => job.jobPostingId === props.jobId)
        console.log('isBookmarked:', isBookmarked.value)
    } catch (error) {
        // console.error(error)
        return
    }
}
onMounted(() => {
    checkBookmarkStatus()
    //check if the job is already bookmarked

    // log the token
    // console.log('Token:', token)
    // log the role
    console.log('id:', props.jobId)
    console.log('id:', props.jobId)
    console.log('id:', props.jobId)
    console.log('id:', props.jobId)
    console.log('id:', props.jobId)
    console.log('id:', props.jobId)
    console.log('Role:', localStorage)

    console.log('Checking bookmark status for jobId:', props.jobId) // Debug log
    console.log('Checking bookmark status for jobId:', props.jobId) // Debug log
    console.log('Checking bookmark status for jobId:', props.jobId) // Debug log
    console.log('Checking bookmark status for jobId:', props.jobId) // Debug log
})
</script>

<template>
    <div class="flex items-center justify-center">
        <svg
            @click="toggleBookmark"
            :fill="isBookmarked ? '#eab308' : 'none'"
            :class="{ 'text-yellow-500': isBookmarked, 'text-gray-500': !isBookmarked }"
            class="h-8 w-8 cursor-pointer dark:text-gray-300 text-gray-500 transition-all duration-150"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    </div>
</template>
