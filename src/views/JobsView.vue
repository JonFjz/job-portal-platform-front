<script setup>
import { ref } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import JobHeader from '@/components/Jobs/JobHeader.vue'
import Filters from '@/components/Jobs/Filters.vue'
import JobList from '@/components/Jobs/JobList.vue'

const filters = ref({
    keyword: '',
    workType: '',
    level: '',
    remote: false,
    remoteAllowed: false,
    hybrid: false
})

const updateFilters = (newFilters) => {
    filters.value = newFilters
}
</script>

<style scoped></style>

<template>
    <DefaultLayout>
        <div class="pb-8 bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <div class="bg-slate-100 py-12 dark:bg-gray-700 dark:text-gray-300">
                <JobHeader />
            </div>
            <div class="container">
                <div class="grid grid-cols-1 lg:grid-cols-9 gap-8 mt-12">
                    <div class="lg:col-span-2">
                        <Filters @updateFilters="updateFilters" />
                    </div>
                    <JobList :filters="filters" />
                    <div class="lg:col-span-2">
                        <div class="sticky top-6">
                            <div class="flex flex-col gap-2">
                                <a
                                    href="https://twitter.com/intent/follow?screen_name=vuejsjob&amp;tw_p=followbutton"
                                    target="_blank"
                                    class="flex w-full items-center p-2 xl:px-5 xl:py-4 rounded-lg bg-slate-50 hover:bg-gray-200 duration-200 relative dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                                >
                                    <div class="absolute opacity-20 right-4">
                                        <img
                                            src="https://seeklogo.com/images/T/twitter-logo-2629C04D18-seeklogo.com.png"
                                            class="h-6 xl:h-8"
                                            alt="Twitter icon"
                                        />
                                    </div>
                                    <div class="leading-none relative">
                                        <div class="font-display font-semibold text-sm">
                                            Follow us on Twitter!
                                        </div>
                                        <div class="text-sm text-muted">@VuejsJob</div>
                                    </div>
                                </a>
                                <a
                                    href="https://discord-invite.vuejobs.com"
                                    target="_blank"
                                    class="flex w-full items-center p-2 xl:px-5 xl:py-4 rounded-lg bg-slate-50 hover:bg-gray-200 duration-200 relative dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                                >
                                    <div class="absolute opacity-20 right-4">
                                        <img
                                            src="https://seeklogo.com/images/T/twitter-logo-2629C04D18-seeklogo.com.png"
                                            class="h-6 xl:h-8"
                                            alt="Discord icon"
                                        />
                                    </div>
                                    <div class="leading-none relative">
                                        <div class="font-display font-semibold text-sm">
                                            Join our Discord!
                                        </div>
                                        <div class="text-sm text-muted">discord.vuejobs.com</div>
                                    </div>
                                </a>
                            </div>
                            <div class="mt-2 text-xs font-medium text-muted">
                                Do you want to be listed here?
                                <a href="mailto:hello@vuejobs.com">Contact us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
