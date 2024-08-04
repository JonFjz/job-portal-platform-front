<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useToast } from 'vue-toast-notification' // Import the toast library

const toast = useToast() // Initialize toast

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem('user') || '{}')

// Get the router instance
const router = useRouter()

// Function to handle the "Post a job" button click
const handlePostJobClick = () => {
    console.log('user.role', user.role) // Debug log
    if (user.role == 'employer') {
        // Check if user is logged in
        router.push('/employer-dashboard/') // Redirect to employer dashboard
    } else if (user.role == 'JobSeeker') {
        toast.warning('Only employers can post jobs') // Display a warning toast
    } else {
        toast.warning('Please log in as an employer to post a job') // Display a warning toast
        router.push('/login') // Redirect to the login page
    }
}
</script>

<template>
    <DefaultLayout>
        <div
            class="flex flex-col items-center justify-center bg-white text-gray-600 dark:bg-gray-700"
        >
            <div class="flex flex-col items-center justify-center p-12">
                <div class="text-center w-9/12">
                    <h1 class="text-5xl md:text-7xl font-semibold text-gray-700 dark:text-gray-300">
                        The #1 resource for hiring Vue.js developers
                    </h1>
                    <h1
                        class="text-xl md:text-2xl font-semibold text-gray-500 my-12 dark:text-gray-200"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
                        dolorem omnis adipisci. Eveniet reiciendis eligendi, excepturi qui impedit
                        optio non.
                    </h1>
                </div>
                <button
                    class="dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700 bg-yellow-500 px-8 py-4 font-semibold rounded-2xl shadow-md hover:bg-yellow-600 transition-colors text-black"
                    @click="handlePostJobClick"
                >
                    Post a job for $2
                </button>
            </div>
            <div
                class="flex flex-col w-full items-center justify-center py-12 bg-slate-100 dark:bg-gray-800"
            >
                <div class="text-center w-9/12 md:w-1/2">
                    <h3 class="text-xl font-semibold text-green-400 dark:text-gray-300 mb-4">
                        Trusted by industry leaders
                    </h3>
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
                        Companies like Google, Facebook, and Amazon trust us to find top Vue.js
                        developers.
                    </h2>
                    <h1 class="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">
                        VueJobs was founded back in 2016. Since then we have helped more than 1200
                        companies (and counting) to hire Vue.js developers, from small startups to
                        world's leading organizations.
                    </h1>
                </div>
                <div class="hidden lg:flex justify-center space-x-8 overflow-x-auto pt-12">
                    <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://1000logos.net/wp-content/uploads/2021/05/Telefonica-logo.png"
                            alt="Apple"
                            class="h-12"
                        />
                    </a>
                    <a href="https://www.backmarket.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Back_Market.png"
                            alt="BackMarket"
                            class="h-12"
                        />
                    </a>
                    <a href="https://www.roku.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://1000logos.net/wp-content/uploads/2023/06/Roku-Logo.png"
                            alt="Roku"
                            class="h-12"
                        />
                    </a>
                    <a href="https://www.gitlab.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://1000logos.net/wp-content/uploads/2022/03/Gitlab-Logo.png"
                            alt="GitLab"
                            class="h-12"
                        />
                    </a>
                    <a
                        href="https://corporate.aboutyou.de/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Back_Market.png"
                            alt="AboutYou"
                            class="h-12"
                        />
                    </a>
                    <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://iconape.com/wp-content/files/qd/17570/svg/cib-apple-logo-icon-png-svg.png"
                            alt="NASA"
                            class="h-12"
                        />
                    </a>
                    <a href="https://www.telefonica.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://1000logos.net/wp-content/uploads/2021/05/Telefonica-logo.png"
                            alt="Telefonica"
                            class="h-12"
                        />
                    </a>
                    <div class="mt-4 text-center text-gray-500 h-12">And 2000+ more</div>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center p-12">
                <div class="text-center w-9/12">
                    <h1 class="text-5xl md:text-7xl font-semibold text-gray-700 dark:text-gray-300">
                        VueJobs in numbers
                    </h1>
                    <h1
                        class="text-xl md:text-2xl font-semibold text-gray-500 dark:text-gray-300 my-12"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sapiente?
                    </h1>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div
                        class="bg-white border border-gray-400 rounded-xl p-6 text-center dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    >
                        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">1200+</div>
                        <div class="text-gray-500 dark:text-gray-300">Companies helped</div>
                    </div>
                    <div
                        class="bg-white border border-gray-400 rounded-xl p-6 text-center dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    >
                        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">3000+</div>
                        <div class="text-gray-500 dark:text-gray-300">Jobs posted</div>
                    </div>
                    <div
                        class="bg-white border border-gray-400 rounded-xl p-6 text-center dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    >
                        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">5000+</div>
                        <div class="text-gray-500 dark:text-gray-300">Developers registered</div>
                    </div>
                    <div
                        class="bg-white border border-gray-400 rounded-xl p-6 text-center dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    >
                        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">150+</div>
                        <div class="text-gray-500 dark:text-gray-300">Countries reached</div>
                    </div>
                    <div
                        class="bg-white border border-gray-400 rounded-xl p-6 text-center dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    >
                        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">200+</div>
                        <div class="text-gray-500 dark:text-gray-300">Events hosted</div>
                    </div>
                    <div
                        class="bg-white border border-gray-400 rounded-xl p-6 text-center dark:border-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    >
                        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">100%</div>
                        <div class="text-gray-500 dark:text-gray-300">Satisfaction guaranteed</div>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<style lang="scss" scoped></style>
