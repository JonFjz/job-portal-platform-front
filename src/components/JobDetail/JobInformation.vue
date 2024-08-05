<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ReviewModal from '@/components/ReviewModal.vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const route = useRoute()
const jobId = ref(route.params.id)
const jobDetails = ref(null)
const reviews = ref([])
const showReviewModal = ref(false)

const user = JSON.parse(localStorage.getItem('user'))

const token = localStorage.getItem('token')

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
    }
}

const fetchJobDetails = async id => {
    id = Number(id)
    if (!id) return
    try {
        const response = await axios.get(`http://34.159.188.181:8080/api/JobPostings/${id}`, config)
        console.log('Job Details:', response.data)
        jobDetails.value = response.data
        // fetchReviews(jobDetails.value.company)
    } catch (error) {
        console.error('Error fetching job details:', error)
    }
}

const formatDateString = dateString => {
    if (!dateString) return 'Nothing to show'
    return dateString.split('T')[0]
}

const handleApplication = async () => {
    console.log('User:', user.role)
    if (!token) {
        toast.error('You need to login as an Employer to apply for this job')
        return
    }
    if (user.role == 'Employer') {
        toast.error('You need to login as an Employer to apply for this job')
        return
    }

    try {
        const response = await axios.get(
            'http://34.159.188.181:8080/api/JobSeekers/profile',
            config
        )
        console.log('Application response:', response.data.firstName)
        console.log('Application response:', response.data.lastName)
        // check if user has already applied for this job

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                    Accept: '*/*'
                }
            }
            const resumeId = await axios.get('http://34.159.188.181:8080/api/resumes', config)
            const formData = new FormData()
            formData.append('JobPostingId', Number(jobId.value))
            formData.append('FirstName', response.data.firstName)
            formData.append('LastName', response.data.lastName)
            formData.append('ResumeId', resumeId.data.id)
            formData.append('NewResumeFile', null)

            console.log('Application data:', formData)
            try {
                await axios.post('http://34.159.188.181:8080/apply', formData, config)
                toast.success('Application submitted successfully')
            } catch (error) {
                console.error('Application already submitted:', error)
                toast.error('Application already submitted')
            }
        } catch (error) {
            console.error('Error fetching resume:', error)
            toast.error('You need to upload a resume to apply for this job')
        }
    } catch (error) {
        console.error('Error submitting application:', error)
    }
}

// const postReview = async (reviewData) => {
//     if (reviewData.review.trim() && reviewData.rating && jobId.value) {
//         const review = {
//             jobId: jobId.value,
//             company: jobDetails.value.company,
//             review: reviewData.review,
//             rating: reviewData.rating
//         }
//         try {
//             await axios.post('http://localhost:3000/reviews', review, {
//                 headers: { 'Content-Type': 'application/json' }
//             })
//             // fetchReviews(jobDetails.value.company) // refresh reviews
//         } catch (error) {
//             console.error('Error posting review:', error)
//         }
//     }
// }

// computed property to calculate the average rating from all reviews
const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0 // if no reviews, return 0
    const total = reviews.value.reduce((sum, review) => sum + review.rating, 0) // sum up all ratings
    return total / reviews.value.length // the average
})

// if it's mounted fetch the jobs based on id
onMounted(() => {
    // get the id from the link and console log it
    console.log('Job ID:', jobId.value)
    // this returns {"name":"testing@gmail.com","role":"Employer"}
    console.log('user role', user.role)
    // this console logs the role of the user
    if (jobId.value) {
        fetchJobDetails(jobId.value)
    }
})

watch(
    () => route.params.id,
    newId => {
        jobId.value = newId
        fetchJobDetails(newId)
    }
)

// controlling the visibility of the review modal
const openReviewModal = () => {
    // check if user is logged in
    if (!token) {
        toast.error('You need to login to leave a review')
        return
    }
    if (user.role == 'Employer') {
        toast.error('Employers cannot leave reviews')
        return
    }

    showReviewModal.value = true
}

const closeReviewModal = () => {
    showReviewModal.value = false
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 dark:text-gray-300 text-gray-600">
        <div class="bg-slate-100 dark:bg-gray-700 dark:text-gray-300 px-4">
            <div
                class="flex flex-wrap items-center container mx-auto lg:py-0 py-2 w-full justify-between"
            >
                <div class="flex flex-row w-full justify-between py-8">
                    <div class="flex flex-col items-start md:items-center md:flex-row">
                        <img
                            :src="jobDetails?.logo || 'https://via.placeholder.com/150'"
                            alt="Job image"
                            class="h-12 md:h-16 lg:h-20 rounded-lg w-fit"
                        />
                        <div class="text-gray-600 dark:text-gray-300 md:pl-4">
                            <h1 class="font-semibold text-2xl md:text-4xl lg:text-5xl">
                                {{ jobDetails?.title || 'Loading...' }}
                            </h1>
                            <h2 class="text-xl md:text-3xl lg:text-4xl">
                                {{ jobDetails?.companyName || 'Loading...' }}
                            </h2>
                            <div class="flex items-center mt-2">
                                <template v-for="star in 5" :key="star">
                                    <svg
                                        :class="{
                                            'text-yellow-500': star <= averageRating,
                                            'text-gray-300': star > averageRating
                                        }"
                                        class="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M11.049 2.927c.3-.921 1.6-.921 1.901 0l2.452 5.833 6.407.569c.965.084 1.355 1.253.654 1.888l-4.94 4.147 1.485 6.452c.238 1.016-1.165 1.791-1.748.897L12 17.229l-5.662 3.154c-.584.893-1.986.119-1.748-.897l1.485-6.452-4.94-4.147c-.701-.635-.311-1.804.654-1.888l6.407-.569 2.452-5.833z"
                                        />
                                    </svg>
                                </template>
                                <span class="ml-2 text-gray-500"
                                    >({{ averageRating.toFixed(1) }} / 5)</span
                                >
                            </div>
                        </div>
                    </div>
                    <Bookmark :jobId="jobId" />
                </div>
            </div>
        </div>
        <div class="flex py-8 items-start justify-start px-4">
            <div class="flex flex-col md:flex-row container mx-auto lg:py-0 py-2 w-full">
                <div
                    class="flex flex-col w-full h-fit md:w-1/3 items-start md:items-start border-2 border-teal-800 rounded-md"
                >
                    <!-- Job Details -->
                    <!-- <div class="p-4">
                        <h1 class="font-semibold text-2xl">Location</h1>
                        <h2 class="text-xl">{{ jobDetails?.location || 'Nothing to show' }}</h2>
                        <h3>{{ jobDetails?.specific_location || '' }}</h3>
                    </div> -->
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Work Type</h1>

                        <h2 class="text-xl">{{ jobDetails?.workType || 'Nothing to show' }}</h2>
                    </div>
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Work Level</h1>
                        <h2 class="text-xl">{{ jobDetails?.workLevel || 'Nothing to show' }}</h2>
                    </div>
                    <!-- <div class="p-4">
                        <h1 class="font-semibold text-2xl">Salary</h1>
                        <h2 class="text-xl">{{ jobDetails?.salary || 'Nothing to show' }}</h2>
                    </div> -->
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Date Posted</h1>
                        <!-- i want to manipulate the string so that from this format 2024-08-01T17:57:20.7996262 it goes to this 2024-08-01-->
                        <h2 class="text-xl">
                            {{ formatDateString(jobDetails?.datePosted) }}
                        </h2>
                    </div>
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Closing Date</h1>
                        <!-- i want to manipulate the string so that from this format 2024-08-01T17:57:20.7996262 it goes to this 2024-08-01-->
                        <h2 class="text-xl">
                            {{ formatDateString(jobDetails?.closingDate) }}
                        </h2>
                    </div>
                    <div class="flex items-center justify-center w-full">
                        <button
                            @click="handleApplication"
                            class="w-full bg-teal-800 text-white px-6 py-3 rounded-sm font-semibold"
                        >
                            Apply Now 🔗
                        </button>
                    </div>
                </div>
                <div class="pl-0 md:pl-8 w-full md:w-2/3">
                    <h1 class="text-3xl">Job Description</h1>
                    <p class="line-clamp-3">
                        {{ jobDetails?.description || 'Nothing to show' }}
                    </p>
                    <h1 class="text-3xl">Job Responsibilities</h1>
                    <p class="line-clamp-3">
                        {{ jobDetails?.responsibilities || 'Nothing to show' }}
                    </p>
                    <h1 class="text-3xl">Job Required Skills</h1>
                    <p class="line-clamp-3">
                        {{ jobDetails?.requiredSkills || 'Nothing to show' }}
                    </p>
                </div>
            </div>
        </div>
        <div class="p-4 container">
            <h1 class="text-2xl font-semibold">Company Review</h1>
            <div class="p-4">
                <button
                    @click="openReviewModal"
                    class="bg-teal-800 text-white px-4 py-2 rounded-md"
                >
                    Leave a Review
                </button>
                <ReviewModal
                    :isVisible="showReviewModal"
                    @close="closeReviewModal"
                    @submit="postReview"
                />
            </div>
        </div>
    </div>
</template>
