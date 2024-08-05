<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const industries = ref([])
const displayedIndustries = ref([])
const currentPage = ref(1)
const pageSize = 6
const totalIndustries = ref(0)

const fetchIndustries = async (page = 1) => {
    try {
        const response = await axios.get(`http://34.159.188.181:8080/api/Employers/industries`, {
            params: {
                pageNumber: page,
                pageSize
            }
        })
        const data = response.data

        if (Array.isArray(data.items)) {
            industries.value = [...industries.value, ...data.items]
            totalIndustries.value = data.total
            updateDisplayedIndustries()
        } else if (Array.isArray(data)) {
            industries.value = [...industries.value, ...data]
            totalIndustries.value = data.length
            updateDisplayedIndustries()
        } else {
            console.error('Error: Unexpected data structure', data)
        }
    } catch (error) {
        console.error('Error fetching industries:', error)
    }
}

const updateDisplayedIndustries = () => {
    const endIndex = currentPage.value * pageSize
    displayedIndustries.value = industries.value.slice(0, Math.min(endIndex, totalIndustries.value))
}

const selectIndustry = (industry) => {
    router.push({ name: 'IndustryDetails', params: { industryName: industry } })
}

const loadMoreIndustries = () => {
    if (displayedIndustries.value.length < totalIndustries.value) {
        currentPage.value++
        fetchIndustries(currentPage.value)
    }
}

const getIconForIndustry = (industry) => {
    return industryIcons[industry] || 'pi pi-question-circle'
}

onMounted(() => {
    fetchIndustries()
})

const industryIcons = {
    Technology: 'pi pi-desktop',
    Healthcare: 'pi pi-heart',
    Finance: 'pi pi-money-bill',
    Education: 'pi pi-book',
    Travel: 'pi pi-globe',
    Construction: 'pi pi-tools',
    Retail: 'pi pi-shopping-cart',
    Manufacturing: 'pi pi-industry',
    Telecommunications: 'pi pi-phone',
    Energy: 'pi pi-sun',
    Automotive: 'pi pi-car',
    'Real Estate': 'pi pi-building',
    Legal: 'pi pi-gavel',
    Entertainment: 'pi pi-theater',
    Agriculture: 'pi pi-leaf',
    Hospitality: 'pi pi-cup',
    Transport: 'pi pi-train',
    Insurance: 'pi pi-shield',
    Aerospace: 'pi pi-rocket',
    Pharmaceutical: 'pi pi-medical',
    Nonprofit: 'pi pi-handshake',
    Cybersecurity: 'pi pi-lock',
    Biotechnology: 'pi pi-dna'
}
</script>

<template>
    <DefaultLayout>
        <div class="container mx-auto py-8 bg-white dark:bg-gray-800">
            <h2 class="text-2xl font-bold mb-12 text-center text-gray-600 dark:text-gray-100">
                Browse Companies by Industry
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    v-for="industry in displayedIndustries"
                    :key="industry"
                    @click="selectIndustry(industry)"
                    class="relative bg-white dark:bg-gray-800 block p-6 border border-green-500 dark:border-green-600 rounded-lg cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <span
                        class="absolute inset-x-0 bottom-0 h-2 bg-green-500 dark:bg-green-600"
                    ></span>
                    <div class="my-4 text-center">
                        <div class="icon-container text-5xl mb-4 text-cyan-900 dark:text-gray-100">
                            <i :class="getIconForIndustry(industry)"></i>
                        </div>
                        <h3
                            class="industry-name text-cyan-900 dark:text-gray-100 text-xl font-semibold"
                        >
                            {{ industry }}
                        </h3>
                    </div>
                    <div class="flex justify-center mt-6">
                        <button
                            class="px-4 py-2 text-cyan-900 dark:text-gray-100 border border-green-500 dark:border-green-600 font-semibold rounded hover:bg-green-500 hover:text-white dark:hover:bg-green-600"
                        >
                            See Companies
                        </button>
                    </div>
                </div>
            </div>
            <div
                v-if="displayedIndustries.length < totalIndustries"
                class="flex justify-center mt-12"
            >
                <button
                    @click="loadMoreIndustries"
                    class="reset-button py-3 px-6 bg-cyan-900 text-gray-100 rounded-lg hover:bg-cyan-700 transition-colors duration-300 dark:bg-cyan-800 dark:hover:bg-cyan-700"
                >
                    See More industries
                </button>
            </div>
        </div>
    </DefaultLayout>
</template>
<style scoped></style>
