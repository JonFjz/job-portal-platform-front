<script setup>
import { useRouter } from 'vue-router';
import Bookmark from '@/components/Bookmark.vue';

const props = defineProps({
  job: Object,
});

const router = useRouter();
const user = JSON.parse(localStorage.getItem('user') || '{}');


const navigateToJobDetail = (id) => {
  router.push(`/jobs/${id}`);
};

const handleBookmarkClick = (event, job) => {
  event.stopPropagation();

  if (!user || !user.id) {
    // user is not logged in
    router.push({ name: 'register' });
    // do not call bookmarkJob here
  } else {
    // user is logged in / handle bookmark
    bookmarkJob(job);
  }
};

const bookmarkJob = (job) => {
  console.log('Bookmark saved for job:', job);
};
</script>


<template>
  <div @click="navigateToJobDetail(props.job.id)" class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-green-500 hover:border-green-500 cursor-pointer relative block border rounded-xl p-4 mb-4" :class="{ 'bg-yellow-200': job.featured, 'bg-white': !job.featured }">
    <div v-if="job.featured" class="absolute top-3 right-4 font-bold text-xs text-yellow-800">
      <i class=""></i> Featured
    </div>
    <Bookmark class="absolute top-10 right-4" :jobId="job.id" @click.stop="handleBookmarkClick($event, job)" />
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
  </div>
</template>


<style scoped>
.job-card {
  margin-bottom: 1rem;
}
.job-card:last-child {
  margin-bottom: 0;
}
</style>
