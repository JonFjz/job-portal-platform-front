<script setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Bookmark from '@/components/Bookmark.vue'
// import { on } from 'tar/lib/read-entry'
import { onMounted } from 'vue'

const props = defineProps({
    job: Object
})

const router = useRouter()

const navigateToJobDetail = () => {
    console.log('props job', props.job)
    console.log('props job', props.job)
    console.log('props job', props.job)
    console.log('props job', props.job)
    router.push(`/jobs/${props.job.jobId}`)
}
</script>

<template>
    <!-- <div href="#" class="relative"> -->
    <div class="relative">
        <div
            class="flex flex-col items-start justify-start p-4 w-full h-fit bg-white dark:bg-gray-700 border-gray-400 dark:border-green-500 border-2 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-500 hover:border-l-8"
        >
            <div class="flex flex-row justify-between items-center w-full">
                <!-- pfp, company name, title and position -->
                <div class="flex flex-row items-center">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Job image"
                        class="h-12 rounded-lg"
                    />
                    <div class="flex flex-col text-gray-600 dark:text-gray-300 pl-4">
                        <p>{{ props.job.companyName }}</p>
                        <p>{{ props.job.workLevel }} || {{ props.job.workType }}</p>
                    </div>
                </div>
                <!-- bookmark icon -->
                <Bookmark :jobId="props.job.jobId" />
            </div>
            <!-- tags -->
            <div class="flex items-center justify-start">
                <div class="flex flex-row items-center space-x-2 py-2">
                    <span
                        class="align-middle px-2 py-1 border-2 border-slate-300 text-center text-gray-600 dark:text-gray-300 text-xs rounded-xl"
                        >Tag-Test</span
                    >
                    <span
                        class="align-middle px-2 py-1 border-2 border-slate-300 text-center text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >Tag-Test</span
                    >
                    <span
                        class="align-middle px-2 py-1 border-2 border-slate-300 text-center text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >Tag-Test</span
                    >
                </div>
            </div>
            <!-- job title and decription -->
            <div class="flex flex-col items-start justify-start text-gray-600 dark:text-gray-300">
                <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-300">
                    {{ props.job.title }}
                </h1>
                <h2 class="text-lg text-gray-500 dark:text-gray-300 line-clamp-3">
                    {{ props.job.responsibilities }}
                </h2>
            </div>
            <!-- know more button and part/full-time -->
            <div class="flex flex-row items-center justify-between w-full pt-4 pb-1">
                <div class="flex items-center justify-center">
                    <button
                        @click="navigateToJobDetail"
                        class="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        Know More
                    </button>
                </div>
                <div>
                    <span class="text-gray-600 dark:text-gray-300 align-middle">{{
                        props.job.workType
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
