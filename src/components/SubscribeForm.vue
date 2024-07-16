<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const jobs = ref([
    {
        id: 1,
        title: 'Senior Vue.js Engineer',
        company: 'Gjirafa',
        logo: 'https://cdn6.aptoide.com/imgs/a/e/8/ae850e1836e6a9fcee2a23aef27185a7_icon.png'
    },
    {
        id: 2,
        title: 'Frontend Engineer',
        company: 'Radix',
        logo: 'https://cdn.prod.website-files.com/6053f7fca5bf627283b582c2/6266da23999171a63bcbb2a7_Radix-Icon-Round-200x200.svg'
    },
    {
        id: 3,
        title: 'Senior Frontend Developer',
        company: 'KodeLabs',
        logo: 'https://lh3.googleusercontent.com/IeNzmhUWcxYgo6YBI-6JSUn6cBJg0bm7_aDtBO3eyWhCQHaA2qubgqDAqO-b6pYhWouE3cqTXniz2qlYGD7krP6r2KrlnaY8DlONUQw616kRzm5IjKQ'
    }
])
</script>

<template>
    <div class="flex flex-col w-full bg-white dark:bg-gray-800 pb-8">
        <div class="container mx-auto p-4">
            <div
                class="flex flex-col items-center justify-center lg:flex-row gap-8 lg:gap-20 bg-slate-50 dark:bg-gray-700 rounded-2xl lg:py-8"
            >
                <!-- left section / job listing & the phone border view -->
                <div class="shrink-0 w-80 hidden lg:block">
                    <div
                        class="border-t border-x !border-b-0 bg-gray-900 border-gray-900"
                        style="
                            border-width: 18px;
                            border-top-left-radius: 45px;
                            border-top-right-radius: 45px;
                        "
                    >
                        <div
                            class="px-5 pt-14 pb-4 bg-white relative dark:bg-gray-800"
                            style="border-top-left-radius: 32px; border-top-right-radius: 32px"
                        >
                            <div
                                class="bg-gray-900 absolute left-1/2 -translate-x-1/2 top-0 h-8 w-40 rounded-b-xl"
                            >
                                <div
                                    class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-20 bg-white h-1 rounded-full"
                                ></div>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-300 mt-2">
                                Heya! Here you go with the latest Vue.js jobs
                            </div>
                            <div class="flex flex-col mt-4 space-y-2">
                                <div
                                    v-for="job in jobs"
                                    :key="job.id"
                                    class="flex items-center space-x-3"
                                >
                                    <img :src="job.logo" class="w-8 h-8 object-contain" alt="" />
                                    <div>
                                        <div
                                            class="font-semibold text-sm text-gray-800 dark:text-gray-300"
                                        >
                                            {{ job.title }}
                                        </div>
                                        <div class="text-xs text-gray-500 dark:text-gray-300">
                                            {{ job.company }}
                                        </div>
                                        <div
                                            class="text-xs text-gray-500 mt-0.5 dark:text-gray-300"
                                        >
                                            🌎 Remote
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- right Section / the subscribe form) -->
                <div class="w-full max-w-3xl text-gray-600 dark:text-gray-300 p-8">
                    <div>
                        <h3 class="py-2.5 text-lg font-medium text-emerald-500">Get Job Alerts</h3>
                        <h2 class="text-3xl font-semibold pb-4">
                            Subscribe to get the latest Vue.js jobs
                        </h2>
                    </div>
                    <div>
                        <div class="form-grid">
                            <div class="form-field relative mb-4">
                                <label for="name" class="flex items-center mb-1">
                                    <span class="font-medium text-sm">Name</span>
                                </label>
                                <input
                                    v-model="name"
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    class="w-full px-4 py-2 border rounded-lg h-12 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-lg"
                                />
                            </div>
                            <div class="form-field relative mb-7">
                                <label for="email" class="flex items-center mb-1">
                                    <span class="font-medium text-sm">Email</span>
                                </label>
                                <input
                                    v-model="email"
                                    id="email"
                                    type="email"
                                    placeholder="Your e-mail"
                                    class="w-full px-4 py-2 border rounded-lg h-12 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                class="w-full px-4 py-2 rounded-lg h-12 text-lg text-white bg-teal-900 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                Subscribe!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
