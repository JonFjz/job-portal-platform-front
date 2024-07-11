<script setup>
// import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

// get username from random json api using axios

const username = 'guri'
</script>
<template>
    <div class="flex items-center justify-center">
        <div class="relative inline-block text-left dropdown">
            <span class="rounded-md shadow-sm">
                <button
                    class="h-full inline-flex justify-center w-full px-4 py-2 text-xl font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-gray active:bg-gray-50 active:text-gray-800"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
                    <span>{{ username }}</span>
                    <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </span>
            <div class="hidden dropdown-menu">
                <div
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    role="menu"
                >
                    <div class="py-1">
                        <RouterLink
                            to="/profile"
                            class="text-grayx-600 flex justify-between w-full px-4 py-2 text-lg leading-5 text-left hover:bg-gray-300"
                        >
                            User Dashboard
                        </RouterLink>
                    </div>
                    <div class="py-1">
                        <a
                            href="#"
                            class="text-red-400 flex justify-between w-full px-4 py-2 text-lg leading-5 text-left hover:bg-gray-300"
                            role="menuitem"
                        >
                            Log Out
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
