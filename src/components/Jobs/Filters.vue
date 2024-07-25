<script setup>
import { ref, watch } from 'vue'
import CustomSelect from './CustomSelect.vue'

const emit = defineEmits(['updateFilters'])
const localFilters = ref({
    keyword: '',
    workType: '',
    level: '',
    remote: false,
    remoteAllowed: false,
    hybrid: false
})

const workTypes = ['Full-time', 'Part-time', 'Freelance', 'Contract', 'Internship']
const levels = ['Junior', 'Mid', 'Senior']

watch(
    localFilters,
    (newFilters) => {
        emit('updateFilters', { ...newFilters })
    },
    { deep: true }
)

const resetFilters = () => {
    localFilters.value = {
        keyword: '',
        workType: '',
        level: '',
        remote: false,
        remoteAllowed: false,
        hybrid: false
    }
}
</script>

<template>
    <div class="dark:bg-gray-800 dark:text-gray-300">
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-2">
                <span
                    class="font-display font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >Filters</span
                >
                <span
                    class="text-xs bg-yellow-200 text-yellow-600 px-1 py-0.5 rounded-md font-display font-bold"
                    >NEW!</span
                >
            </div>
            <button class="text-sm text-gray-500" @click="resetFilters">Reset</button>
        </div>
        <div class="grid gap-5">
            <div class="relative">
                <input
                    type="text"
                    placeholder="Filter by keyword"
                    class="dark:bg-gray-800 dark:text-gray-300 text-gray-600 pl-10 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                    v-model="localFilters.keyword"
                />
                <i
                    class="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                ></i>
            </div>
            <div class="relative">
                <CustomSelect
                    :options="workTypes"
                    placeholder="Filter by work type"
                    v-model="localFilters.workType"
                />
            </div>
            <div class="relative">
                <CustomSelect
                    :options="levels"
                    placeholder="Filter by level"
                    v-model="localFilters.level"
                />
            </div>
            <div class="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    id="remote"
                    class="toggle-checkbox hidden"
                    v-model="localFilters.remote"
                />
                <label for="remote" class="toggle-label flex items-center cursor-pointer">
                    <span
                        class="toggle-label-inner bg-gray-200 h-5 w-8 px-1 relative inline-flex items-center rounded-full"
                    >
                        <span
                            class="toggle-switch h-3 w-3 inline-block transform bg-white rounded-full transition"
                        ></span>
                    </span>
                    <span>Remote</span>
                </label>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    id="remote-allowed"
                    class="toggle-checkbox hidden"
                    v-model="localFilters.remoteAllowed"
                />
                <label for="remote-allowed" class="toggle-label flex items-center cursor-pointer">
                    <span
                        class="toggle-label-inner bg-gray-200 h-5 w-8 px-1 relative inline-flex items-center rounded-full"
                    >
                        <span
                            class="toggle-switch h-3 w-3 inline-block transform bg-white rounded-full transition"
                        ></span>
                    </span>
                    <span>Remote Allowed</span>
                </label>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    id="hybrid"
                    class="toggle-checkbox hidden"
                    v-model="localFilters.hybrid"
                />
                <label for="hybrid" class="toggle-label flex items-center cursor-pointer">
                    <span
                        class="toggle-label-inner bg-gray-200 h-5 w-8 px-1 relative inline-flex items-center rounded-full"
                    >
                        <span
                            class="toggle-switch h-3 w-3 inline-block transform bg-white rounded-full transition"
                        ></span>
                    </span>
                    <span>Hybrid Work</span>
                </label>
            </div>
        </div>
        <div
            class="mt-6 inline-flex bg-gray-100 rounded-lg text-gray-500 px-2 py-1 text-xs dark:bg-gray-700 dark:text-gray-300"
        >
            More filters coming soon
        </div>
    </div>
</template>

<style scoped>
.toggle-checkbox:checked + .toggle-label .toggle-label-inner {
    background-color: #4ade80;
}

.toggle-checkbox:checked + .toggle-label .toggle-switch {
    transform: translateX(100%);
}
</style>
