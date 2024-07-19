<script setup>
import Bookmark from '@/components/Bookmark.vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  filters: Object,
});

const router = useRouter();
const currentPage = ref(1); // tracking current page
const jobsPerPage = 10; 

const navigateToJobDetail = (id) => {
  router.push(`/jobs/${id}`);
};

const jobs = [
  { id: 1, title: "Vue.js Dev (4 yrs xp;Remote @ $140k/year)", 
  company: "CSGOEmpire", logo: "https://app.vuejobs.com/storage/2204/bdc57da8-4665-4ea9-8a9e-7290496e4c91.png", 
  remote: true, 
  salary: "140,000",
  featured: true },

  { id: 2, 
    title: "FrontEnd Developer (3 yrs xp;Remote @ $95k/year)", 
    company: "Twitter", logo: "https://seeklogo.com/images/T/twitter-logo-2629C04D18-seeklogo.com.png",
    remote: false, 
    salary: "95,000", 
    featured: false },

  { id: 3, title: "BackEnd Developer (2 yrs xp;Hybrid @ $105k/year)",
   company: "Gjirafa",
   logo: "https://cdn6.aptoide.com/imgs/a/e/8/ae850e1836e6a9fcee2a23aef27185a7_icon.png", 
   remote: true, 
   salary: "105,000", 
   featured: false, 
   hybrid: true, 
   location: 'Prishtina' },

  { id: 4, 
    title: "BackEnd Developer (4 yrs xp;Remote @ $155k/year)", 
    company: "KodeLabs", 
    logo: "https://lh3.googleusercontent.com/IeNzmhUWcxYgo6YBI-6JSUn6cBJg0bm7_aDtBO3eyWhCQHaA2qubgqDAqO-b6pYhWouE3cqTXniz2qlYGD7krP6r2KrlnaY8DlONUQw616kRzm5IjKQ", 
    remote: true, 
    salary: "105,000", 
    featured: true, 
    hybrid: false, 
    location: 'Prishtina' },

  { id: 5, title: "DevOps Engineer (2 yrs xp;Hybrid @ $180k/year)",
   company: "Binance", 
   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/768px-Binance_Logo.svg.png", 
   remote: true, 
   salary: "180,000", 
   featured: false, 
   hybrid: true, 
   location: 'Prishtina' },

  { id: 6, title: "BackEnd Developer (5 yrs xp;Hybrid @ $250k/year)",
   company: "FedEx", 
   logo: "https://logocreator.io/wp-content/uploads/2023/11/fedex-logo-free-download-free-vector-1.jpg", 
   remote: true, 
   salary: "250,000", 
   featured: true, 
   hybrid: true, 
   location: 'Prishtina' },

  { id: 7, title: "FrontEnd Developer (5 yrs xp;Remote @ $260k/year)", 
  company: "Netflix", 
  logo: "https://static.vecteezy.com/system/resources/previews/042/165/811/original/netflix-logo-transparent-background-free-png.png",
  remote: true, 
  salary: "260,000", 
  featured: false, 
  hybrid: false, 
  location: 'Prishtina' },

  { id: 8, title: "BackEnd Developer (3 yrs xp;Remote @ $195k/year)", 
  company: "Hulu", 
  logo: "https://images.macrumors.com/t/A2boHEqLIphyIpIYs4pNLJaCXQw=/1200x1200/smart/article-new/2019/07/hulu-logo-2019.jpg", 
  remote: true, 
  salary: "195,000", 
  featured: true, 
  hybrid: false, 
  location: 'Prishtina' },

  { id: 9, title: "BackEnd Developer (4 yrs xp;Remote @ $200k/year)", 
  company: "Prime", 
  logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png", 
  remote: true, 
  salary: "200,000", 
  featured: false, 
  hybrid: false, 
  location: 'Prishtina' },

  { id: 10, title: "BackEnd Developer (2 yrs xp;Hybrid @ $105k/year)", company: "Gjirafa", logo: "https://cdn6.aptoide.com/imgs/a/e/8/ae850e1836e6a9fcee2a23aef27185a7_icon.png", remote: true, salary: "105,000", featured: false, hybrid: true, location: 'Prishtina' },
  { id:  19, title: "FrontEnd Developer (3 yrs xp;Remote @ $150k/year)", company: "Meta", logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png", remote: true, salary: "150,000", featured: true, hybrid: false, location: 'Prishtina' },
  // 
];


// computed property to filter jobs based on props.filters 
const filteredJobs = computed(() => {
  return jobs.filter(job => {
    return (
      (!props.filters.keyword || job.title.toLowerCase().includes(props.filters.keyword.toLowerCase())) &&
      (!props.filters.workType || job.title.toLowerCase().includes(props.filters.workType.toLowerCase())) &&
      (!props.filters.level || job.title.toLowerCase().includes(props.filters.level.toLowerCase())) &&
      (!props.filters.remote || job.remote) &&
      (!props.filters.remoteAllowed || job.remoteAllowed) &&
      (!props.filters.hybrid || job.hybrid)
    );
  }).sort((a, b) => b.featured - a.featured); // featured jobs first 
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

const bookmarkJob = (event, job) => {
   // prevent it from triggering other listeners
  event.stopPropagation();
  console.log('Bookmark saved for job:', job);
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
      <a v-for="job in paginatedJobs" :key="job.id" @click="navigateToJobDetail(job.id)" class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-green-500 hover:border-green-500 cursor-pointer relative block border rounded-xl p-4 mb-4" :class="{ 'bg-yellow-200': job.featured, 'bg-white': !job.featured }">
        <div v-if="job.featured" class="absolute top-3 right-4 font-bold text-xs text-yellow-800">
          <i class=""></i> Featured
        </div>
        <Bookmark class="absolute top-10 right-4" :jobId="job.id" @click.stop="bookmarkJob($event, job)" />
        <div class="flex flex-col justify-center md:flex-row md:justify-start md:items-center">
          <div class="flex items-center">
            <div class="overflow-hidden w-12 h-12 md:w-12 md:h-12 rounded-xl">
              <img :src="job.logo" alt="Logo" class="object-contain w-full h-full" loading="lazy">
            </div>
            <div class="ml-3">
              <div class="font-display text-lg leading-tight font-bold">{{ job.title }}</div>
              <div class="flex items-center text-sm font-medium text-muted">at {{ job.company }}</div>
            </div>
          </div>
          <div class="ml-auto font-display font-bold transition-opacity duration-400 absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 text-sm">
            View details <i class="far fa-arrow-right fa-fw ml-1" aria-hidden="true"></i>
          </div>
        </div>
        <div class="text-xs mt-3 flex gap-x-4 gap-y-1 flex-wrap items-center md:gap-2">
          <span v-if="job.remote" class="inline-block bg-green-100 px-1.5 py-0.5 rounded-lg">
            <i class="fa-regular fa-check-circle text-green-500" aria-hidden="true"></i> Remote
          </span>
          <span v-if="job.hybrid" class="inline-block bg-green-100 px-1.5 py-0.5 rounded-lg">
            <i class=""></i> Hybrid
          </span>
          <span v-if="job.salary" class="inline-block bg-purple-100 px-1.5 py-0.5 rounded-lg">USD {{ job.salary }}/yr</span>
          <span v-if="job.location" class="inline-block bg-teal-100 px-1.5 py-0.5 rounded-lg">
            <i class=""></i> {{ job.location }}
          </span>
        </div>
      </a>
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
