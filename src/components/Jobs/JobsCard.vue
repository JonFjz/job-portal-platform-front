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

const handleBookmarkClick = (event, job) => {
    console.log('Bookmark clicked for job:', job)
    event.stopPropagation()

    if (!user || !user.id || !user.token || user.role === 'Employer') {
        router.push({ name: 'register' })
    } else {
        // user is logged in / handle bookmark
        bookmarkJob(job)
    }
}

const bookmarkJob = (job) => {
    console.log('Bookmark saved for job:', job)
}
</script>

<template>
    <div
        class="dark:bg-gray-700 dark:text-gray-300 transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-green-500 hover:border-green-500 relative block border rounded-xl p-4 mb-4"
        :class="{ 'bg-yellow-200': job.featured, 'bg-white': !job.featured }"
    >
        <div
            v-if="job.featured"
            class="dark:text-yellow-300 absolute top-3 right-4 font-bold text-xs text-yellow-800"
        >
            <i class=""></i> Featured
        </div>
        <Bookmark
            class="absolute top-10 right-4"
            :jobId="job.id"
            @click.stop="handleBookmarkClick($event, job)"
        />

        <div class="flex flex-col justify-center md:flex-row md:justify-start md:items-center">
            <div class="flex items-center">
                <!-- <div class="overflow-hidden w-12 h-12 md:w-12 md:h-12 rounded-xl">
                    <img
                        :src="job.logo"
                        alt="Logo"
                        class="object-contain w-full h-full"
                        loading="lazy"
                    />
                </div> -->

                <div class="ml-3">
                    <div class="font-display text-lg leading-tight font-bold">{{ job.title }}</div>
                    <div class="flex items-center text-sm font-medium text-muted">
                        Type: {{ job.workType }}
                    </div>
                    <div class="flex items-center text-sm font-medium text-muted">
                        Position: {{ job.workLevel }}
                    </div>
                </div>
            </div>
        </div>
        <div class="text-xs mt-3 flex gap-x-4 gap-y-1 flex-wrap items-center md:gap-2">
            <span
                v-if="job.remote"
                class="inline-block bg-green-100 px-1.5 py-0.5 rounded-lg dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
            >
                <i class="fa-regular fa-check-circle text-green-500" aria-hidden="true"></i> Remote
            </span>
            <span
                v-if="job.hybrid"
                class="inline-block bg-green-100 px-1.5 py-0.5 rounded-lg dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
            >
                <i class=""></i> Hybrid
            </span>
            <span
                v-if="job.salary"
                class="inline-block bg-purple-100 px-1.5 py-0.5 rounded-lg dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                >USD {{ job.salary }}/yr</span
            >
            <span
                v-if="job.location"
                class="inline-block bg-teal-100 px-1.5 py-0.5 rounded-lg dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
            >
                <i class=""></i> {{ job.location }}
            </span>
        </div>
        <button
            @click="navigateToJobDetail(props.job.id)"
            class="border-2 border-black p-2 rounded-lg"
        >
            Know More
        </button>
    </div>
</template>

<style scoped lang="scss">
.job-card {
    background-color: #e5e7eb; // Replace with appropriate color
    color: #1f2937; // Replace with appropriate color
    transition: all 0.2s ease-in-out;
    position: relative;
    display: block;
    border: 1px solid transparent; // Replace with border color if needed
    border-radius: 0.75rem; // rounded-xl
    padding: 1rem; // p-4
    margin-bottom: 1rem; // mb-4

    &.featured {
        background-color: #fef08a; // Replace with appropriate color
    }

    &.normal {
        background-color: #fff; // Replace with appropriate color
    }

    &.dark {
        background-color: #374151; // Dark mode color
        color: #d1d5db; // Dark mode text color
    }
}

.featured-label {
    position: absolute;
    top: 0.75rem; // top-3
    right: 1rem; // right-4
    font-weight: bold;
    font-size: 0.75rem; // text-xs
    color: #854d0e; // Replace with appropriate color

    @media (prefers-color-scheme: dark) {
        color: #fde047; // Dark mode color
    }
}

.bookmark-icon {
    position: absolute;
    top: 2.5rem; // top-10
    right: 1rem; // right-4
}

.job-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) {
        // md
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
}

.job-details {
    display: flex;
    align-items: center;

    .job-title {
        font-family: 'Your Font Display', sans-serif; // Replace with your actual font
        font-size: 1.125rem; // text-lg
        line-height: tight; // Replace with appropriate line-height
        font-weight: bold;
    }

    .job-type,
    .job-position {
        font-size: 0.875rem; // text-sm
        font-weight: medium; // font-medium
        color: #9ca3af; // Replace with appropriate color
    }
}

.job-tags {
    font-size: 0.75rem; // text-xs
    margin-top: 0.75rem; // mt-3
    display: flex;
    gap: 1rem; // gap-x-4
    flex-wrap: wrap;
    align-items: center;

    .job-tag {
        display: inline-block;
        padding: 0.375rem 0.375rem; // px-1.5 py-0.5
        border-radius: 0.5rem; // rounded-lg
        color: #d1d5db; // Replace with appropriate color
        background-color: #374151; // Replace with appropriate color

        &.remote-tag,
        &.hybrid-tag {
            background-color: #dcfce7; // Replace with appropriate color
        }

        &.salary-tag {
            background-color: #f3e8ff; // Replace with appropriate color
        }

        &.location-tag {
            background-color: #ccfbf1; // Replace with appropriate color
        }
    }
}

.know-more-button {
    border: 2px solid black;
    padding: 0.5rem; // p-2
    border-radius: 0.5rem; // rounded-lg
}
</style>
