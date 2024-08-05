<script setup>
import { useRouter } from 'vue-router'
import Bookmark from '@/components/Bookmark.vue'

const props = defineProps({
    job: Object
})

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user') || '{}')

const navigateToJobDetail = (id) => {
    router.push(`/jobs/${id}`)
}
</script>

<template>
    <div class="job-card" :class="{ 'bg-yellow-200': job.featured, 'bg-white': !job.featured }">
        <div v-if="job.featured" class="featured-label"><i class=""></i> Featured</div>
        <Bookmark class="bookmark-icon" :jobId="job.id" />

        <div class="job-info">
            <div class="job-details">
                <div class="job-title">{{ job.title }}</div>
                <div class="job-type">Type: {{ job.workType }}</div>
                <div class="job-position">Position: {{ job.workLevel }}</div>
            </div>
        </div>
        <div class="job-tags">
            <span v-if="job.remote" class="job-tag remote-tag">
                <i class="fa-regular fa-check-circle text-green-500" aria-hidden="true"></i> Remote
            </span>
            <span v-if="job.hybrid" class="job-tag hybrid-tag"> <i class=""></i> Hybrid </span>
            <span v-if="job.salary" class="job-tag salary-tag">USD {{ job.salary }}/yr</span>
            <span v-if="job.location" class="job-tag location-tag">{{ job.location }}</span>
        </div>
        <button @click="navigateToJobDetail(props.job.id)" class="know-more-button">
            Know More
        </button>
    </div>
</template>

<style scoped lang="sugass">
.job-card {
    @apply dark:bg-gray-700 dark:text-gray-300 transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-green-500 hover:border-green-500 relative block border rounded-xl p-4 mb-4;

    &.bg-yellow-200 {
        @apply bg-yellow-200;
    }

    &.bg-white {
        @apply bg-white;
    }
}

.featured-label {
    @apply dark:text-yellow-300 absolute top-3 right-4 font-bold text-xs text-yellow-800;
}

.bookmark-icon {
    @apply absolute top-10 right-4;
}

.job-info {
    @apply flex flex-col justify-center md:flex-row md:justify-start md:items-center;
}

.job-details {
    @apply flex items-center;

    .job-title {
        @apply font-display text-lg leading-tight font-bold;
    }

    .job-type,
    .job-position {
        @apply flex items-center text-sm font-medium text-muted;
    }
}

.job-tags {
    @apply text-xs mt-3 flex gap-x-4 gap-y-1 flex-wrap items-center md:gap-2;

    .job-tag {
        @apply inline-block px-1.5 py-0.5 rounded-lg dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700;

        &.remote-tag {
            @apply bg-green-100;
        }

        &.hybrid-tag {
            @apply bg-green-100;
        }

        &.salary-tag {
            @apply bg-purple-100;
        }

        &.location-tag {
            @apply bg-teal-100;
        }
    }
}

.know-more-button {
    @apply border-2 border-black p-2 rounded-lg;
}
</style>
