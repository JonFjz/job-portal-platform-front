<script setup>
import VueJobsLogo from '@/assets/vueJobsLogo.svg'
import TwitterLogo from '@/assets/twitterLogo.svg'
import LinkedInLogo from '@/assets/linkedinLogo.svg'
import DiscordLogo from '@/assets/discordLogo.svg'
</script>

<template>
    <footer class="bg-slate-800 dark:bg-gray-700 text-white p-4">
        <div class="flex-col items-center">
            <ul
                class="grid grid-cols-2 gap-4 w-full md:flex md:flex-row md:justify-around md:gap-8 md:w-full py-12 lg:py-24"
            >
                <li class="p-2 flex items-center justify-start">
                    <div>
                        <div class="">
                            <img :src="VueJobsLogo" class="" alt="Vue Jobs Logo" />
                        </div>
                        <!-- social media icons -->
                        <ul class="flex items-center justify-center space-x-4 mt-4">
                            <li
                                class="flex items-center justify-center bg-gray-700 hover:bg-green-500 w-10 h-10 rounded-md transition duration-200"
                            >
                                <a href="https://www.twitter.com" target="_blank">
                                    <img :src="TwitterLogo" alt="Twitter" class="h-5" />
                                </a>
                            </li>
                            <li
                                class="flex items-center justify-center bg-gray-700 hover:bg-green-500 w-10 h-10 rounded-md transition duration-200"
                            >
                                <a href="https://www.linkedin.com" target="_blank">
                                    <img :src="LinkedInLogo" alt="LinkedIn" class="h-6" />
                                </a>
                            </li>
                            <li
                                class="flex items-center justify-center bg-gray-700 hover:bg-green-500 w-10 h-10 rounded-md transition duration-200"
                            >
                                <a href="https://www.discord.com" target="_blank">
                                    <img :src="DiscordLogo" alt="Discord" class="h-6" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="p-2 flex items-center justify-center w-full md:hidden"></li>
                <li class="p-2 flex items-start justify-start w-max">
                    <div>
                        <h1 class="text-2xl font-bold md:text-xl">Find a Job</h1>
                        <div class="mt-2 flex flex-col">
                            <a href="#" class="text-xl">Subscribe to job alerts</a>
                            <a href="#" class="text-xl">Latest Vue.js jobs</a>
                        </div>
                    </div>
                </li>
                <li class="p-2 flex items-start justify-start w-max">
                    <div>
                        <h1 class="text-2xl font-bold md:text-xl">Discover</h1>
                        <div class="mt-2 flex flex-col">
                            <a href="#" class="text-xl">Learnin Vue.js resources</a>
                        </div>
                    </div>
                </li>
                <li class="p-2 flex items-start justify-start w-max">
                    <div>
                        <h1 class="text-2xl font-bold md:text-xl">Hire</h1>
                        <div class="mt-2 flex flex-col">
                            <a href="#" class="text-xl">Hire Vue.js developers</a>
                            <a href="#" class="text-xl">Post a job</a>
                        </div>
                    </div>
                </li>
                <li class="p-2 flex items-start justify-start w-max">
                    <div>
                        <h1 class="text-2xl font-bold md:text-xl">VueJobs</h1>
                        <div class="mt-2 flex flex-col">
                            <a href="#" class="text-xl">Contact</a>
                            <a href="#" class="text-xl">Referral program</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </footer>
    <div class="bg-slate-700 dark:bg-gray-900 w-fill">
        <div class="flex flex-col items-start md:flex-row md:justify-between py-4 px-8">
            <div>Copyright © 2024 - All rights reserved</div>
            <div>Terms of use – Privacy policy</div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
