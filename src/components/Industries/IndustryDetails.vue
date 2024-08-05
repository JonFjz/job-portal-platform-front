<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const industryName = route.params.industryName
const companies = ref([])

const fetchCompanies = async (industryName) => {
    try {
        const response = await axios.get(
            `http://34.159.188.181:8080/api/Employers/by-industry?industry=${industryName}`
        )
        companies.value = response.data.items || []
    } catch (error) {
        console.error('Error fetching companies:', error)
    }
}

onMounted(() => {
    fetchCompanies(industryName)
})

const navigateToJobDetail = (companyId) => {
    router.push(`/jobs-by-employer/${companyId}`)
}
</script>
<style scoped></style>

<template>
    <DefaultLayout>
        <div class="container mx-auto py-8 bg-white dark:bg-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
                Companies in {{ industryName }}
            </h2>
            <div v-if="companies.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    v-for="company in companies"
                    :key="company.id"
                    @click="navigateToJobDetail(company.id)"
                    class="relative bg-white dark:bg-gray-800 block p-6 border border-green-500 dark:border-green-600 rounded-lg cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <span
                        class="absolute inset-x-0 bottom-0 h-2 bg-green-500 dark:bg-green-600"
                    ></span>
                    <div class="my-4 text-center">
                        <p
                            class="company-name text-cyan-900 dark:text-gray-100 text-xl font-semibold"
                        >
                            {{ company.companyName }}
                        </p>
                    </div>
                    <div class="flex justify-center mt-6">
                        <button
                            class="px-4 py-2 text-cyan-900 dark:text-gray-100 border border-green-500 dark:border-green-600 font-semibold rounded hover:bg-green-500 hover:text-white dark:hover:bg-green-600 dark:hover:text-gray-100"
                        >
                            See Jobs
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="text-center text-gray-900 dark:text-gray-100">
                <p>No companies found for this industry.</p>
            </div>
        </div>
    </DefaultLayout>
</template>
