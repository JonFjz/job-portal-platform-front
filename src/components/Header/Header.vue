<script setup>
import HeaderLink from './HeaderLink.vue'
import HeaderDropdown from './HeaderDropdown.vue'
import ThemeToggle from './HeaderThemeToggle.vue'
import { RouterLink, useRouter } from 'vue-router'
import VueJobsLogo from '../../assets/vueJobsLogo.svg'

// Retrieve user information from local storage
const user = JSON.parse(localStorage.getItem('user') || '{}')

// Get the router instance
const router = useRouter()

// Function to handle the "Post a job" button click
const handlePostJobClick = () => {
    if (user.name) {
        // Check if user is logged in
        router.push('/employer-dashboard/') // Redirect to employer dashboard
    } else {
        router.push('/login') // Redirect to login page if not logged in
    }
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 shadow-md">
        <nav
            class="flex flex-wrap items-center container mx-auto p-4 lg:py-0 py-2 w-full justify-between"
        >
            <div class="flex items-center">
                <RouterLink to="/" class="flex text-lg font-switzer">
                    <img
                        :src="VueJobsLogo"
                        class="pt-2 w-28 h-20 md:w-32 md:h-16 lg:w-40 lg:h-20"
                        alt="Vue Jobs Logo"
                    />
                </RouterLink>
            </div>
            <label for="menu-toggle" class="cursor-pointer lg:hidden block">
                <svg
                    class="fill-current text-gray-900 dark:text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                >
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input class="hidden" type="checkbox" id="menu-toggle" />
            <div class="hidden lg:flex lg:items-center lg:space-x-8 w-full lg:w-auto" id="menu">
                <div
                    class="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0 font-switzer"
                >
                <HeaderLink
                        to="/companies-by-industry"
                        text="Companies"
                        class="py-2 lg:py-0 text-gray-600 dark:text-gray-300"
                    />
                    <HeaderLink
                        to="/jobs"
                        text="Jobs"
                        class="py-2 lg:py-0 text-gray-600 dark:text-gray-300"
                    />
                    <HeaderLink
                        to="/hire-dev"
                        text="Hire Vue.Js Developers"
                        class="py-2 lg:py-0 text-gray-600 dark:text-gray-300"
                    />
                    <HeaderLink
                        to="/job-alert"
                        text="Job Alerts"
                        class="py-2 lg:py-0 text-gray-600 dark:text-gray-300"
                    />
                    <HeaderLink
                        to="/learn"
                        text="Learn"
                        class="py-2 lg:py-0 text-gray-600 dark:text-gray-300"
                    />
                </div>
                <div
                    class="flex flex-row justify-center items-center gap-x-5 pt-4 text-gray-600 md:gap-x-4 lg:pt-0"
                >
                    <button class="bg-yellow-400 px-4 py-2 rounded-md" @click="handlePostJobClick">
                        Post a job
                    </button>
                    <HeaderDropdown />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    </div>
</template>

<style>
#menu-toggle:checked + #menu {
    display: flex;
    flex-direction: column;
}
@media (min-width: 1024px) {
    #menu-toggle:checked + #menu {
        flex-direction: row;
    }
}
.dropdown:focus-within .dropdown-menu {
    display: block;
}
</style>
