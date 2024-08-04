<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import JobsCard from '@/components/Jobs/JobsCard.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const jobs = ref([])

const fetchJobs = async (employerId) => {
  try {
    const response = await axios.get(`https://localhost:7136/api/JobPostings/by-employer/${employerId}`)
    jobs.value = response.data.items || []
  } catch (error) {
    console.error('Error fetching jobs:', error)
  }
}

onMounted(() => {
  const employerId = route.params.employerId
  fetchJobs(employerId)
})

const navigateToJobDetail = (id) => {
  router.push(`/jobs/${id}`)
}
</script>
<style scoped>
</style>


<template>
  <DefaultLayout>
    <div class="container mx-auto py-8 dark:bg-gray-800">
      <h2 class="text-2xl font-bold mb-8 text-center dark:text-gray-100">Jobs by Company</h2>
      <div v-if="jobs.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobsCard
          v-for="job in jobs"
          :key="job.id"
          :job="job"
          @click="navigateToJobDetail(job.id)"
        />
      </div>
      <div v-else class="text-center dark:text-gray-100 ">
        <p>No jobs found for this company.</p>
      </div>
    </div>
  </DefaultLayout>
</template>



