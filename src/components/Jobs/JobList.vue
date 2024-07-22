<script setup>
import JobsCard from '@/components/Jobs/JobsCard.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useJobStore } from '@/stores/jobStore';

const props = defineProps({
  filters: Object,
});

const router = useRouter();
const currentPage = ref(1); // tracking current page
const jobsPerPage = 10; 

const navigateToJobDetail = (id) => {
  router.push(`/jobs/${id}`);
};

const jobStore = useJobStore();
await jobStore.fetchJobs(); // Fetch jobs when the component mounts


// computed property to filter jobs based on props.filters 
const filteredJobs = computed(() => {
  return jobStore.jobs.filter(job => {
    return (
      (!props.filters.keyword || job.title.toLowerCase().includes(props.filters.keyword.toLowerCase())) &&
      (!props.filters.workType || job.title.toLowerCase().includes(props.filters.workType.toLowerCase())) &&
      (!props.filters.level || job.title.toLowerCase().includes(props.filters.level.toLowerCase())) &&
      (!props.filters.remote || job.remote) &&
      (!props.filters.remoteAllowed || job.remoteAllowed) &&
      (!props.filters.hybrid || job.hybrid)
    );
  })  .sort((a, b) => (b.featured === a.featured ? 0 : (b.featured ? 1 : -1))); // featured jobs first
});

// handles pagination by slicing the filtered jobs array to return only the jobs for the current page
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  return filteredJobs.value.slice(start, end);
});

const totalPages = computed(() => {
  // divides the total number of filtered jobs by the num of jobs per page
  return Math.ceil(filteredJobs.value.length / jobsPerPage);
});

// updates the currentPage & navigates to a specific page
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
</script>

<template>
  <div class="lg:col-span-5">
    <div class="bg-gray-100 rounded-2xl px-4 py-4 mb-4">
      <div class="inline-block text-[10px] font-display font-bold text-white bg-teal-900 rounded-md py-[1px] px-1">NEW!</div>
      <div class="font-semibold text-lg relative">Do you want to see more jobs?</div>
      <p class="mt-2 text-gray-600">We are working hard to bring you more Vue.js jobs. Get access to a larger database of hundreds of Vue.js jobs.</p>
      <button type="button" class="mt-4 font-bold uppercase bg-cyan-900 text-white px-4 rounded-[8px] h-[38px] text-sm">Get access!</button>
    </div>
    <div>
      <JobsCard v-for="job in paginatedJobs" :key="job.id" :job="job" />
    </div>

    <div class="mt-4 flex justify-between items-center">
      <button
        class="px-4 py-2 bg-green-500 text-white rounded-md"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <span class="text-sm text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="px-4 py-2 bg-green-500 text-white rounded-md"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.job-list a {
  margin-bottom: 1rem;
}
.job-list a:last-child {
  margin-bottom: 0;
}
</style>
