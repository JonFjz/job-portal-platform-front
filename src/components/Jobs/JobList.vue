<script setup>
import Bookmark from '@/components/Bookmark.vue'
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  filters: Object,
});
const router = useRouter();

const navigateToJobDetail = (id) => {
  router.push(`/jobs/${id}`);
};

const jobs = [
  {
    id: 1,
    title: "Vue.js Dev (4 yrs xp;Remote @ $140k/year)",
    company: "CSGOEmpire",
    logo: "https://app.vuejobs.com/storage/2204/bdc57da8-4665-4ea9-8a9e-7290496e4c91.png",
    remote: true,
    salary: "140,000",
    featured: true,
  },
  {
    id: 2,
    title: "FrontEnd Developer (3 yrs xp;Remote @ $95k/year)",
    company: "Twitter",
    logo: "https://seeklogo.com/images/T/twitter-logo-2629C04D18-seeklogo.com.png",
    remote: false,
    salary: "95,000",
    featured: false 
  },

  {
    id: 3,
    title: "BackEnd Developer (2 yrs xp;Hybrid @ $105k/year)",
    company: "Gjirafa",
    logo: "https://cdn6.aptoide.com/imgs/a/e/8/ae850e1836e6a9fcee2a23aef27185a7_icon.png",
    remote: true,
    salary: "105,000",
    featured: false,
    hybrid: true,
    location: 'Prishtina',
    
  },
  // 
];

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
  });
});

const bookmarkJob = (event, job) => { 
  // stop the event from propagating further (prevent it from triggering other listeners)
  event.stopPropagation();
  console.log('Bookmark saved for job:', job);
};
</script>


<template>
  <div class="lg:col-span-5 ">
    <div class="bg-gray-100 rounded-2xl px-4 py-4 mb-4">
      <div class="inline-block text-[10px] font-display font-bold text-white bg-teal-900 rounded-md py-[1px] px-1">NEW!</div>
      <div class="font-semibold text-lg relative">Do you want to see more jobs?</div>
      <p class="mt-2 text-gray-600">We are working hard to bring you more Vue.js jobs. Get access to a larger database of hundreds of Vue.js jobs.</p>
      <button type="button" class="mt-4 font-bold uppercase bg-cyan-900 text-white px-4 rounded-[8px] h-[38px] text-sm">Get access!</button>
    </div>
    <div>
      <a v-for="job in filteredJobs" :key="job.id"  @click="navigateToJobDetail(job.id)" class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-green-500 hover:border-green-500 cursor-pointer relative block border rounded-xl p-4 mb-4" :class="{ 'bg-yellow-200': job.featured, 'bg-white': !job.featured }">
        <div v-if="job.featured" class="absolute top-3 right-4 font-bold text-xs text-yellow-800">
          <i class="fa-regular fa-star" aria-hidden="true"></i> Featured
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
          <span v-if="job.remote" class="inline-block bg-green-100 px-1.5 py-0.5 rounded-lg"><i class="fa-regular fa-check-circle text-green-500" aria-hidden="true"></i> Remote </span>
          <span class="bg-purple-100 px-1.5 py-0.5 rounded-lg">
            <i class="fa-regular fa-circle-dollar fa-fw text-purple-500" aria-hidden="true"></i>
            <div class="inline-flex ml-1">
              <span>USD</span><span>{{ job.salary }}</span><span>/yr</span>
            </div>
          </span>
          
        </div>
      </a>
      
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
