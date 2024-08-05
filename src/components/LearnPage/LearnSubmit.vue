<script setup>
import JSIcon from '../../assets/Learn/Unofficial_JavaScript_logo_2.svg'
import ViteIcon from '../../assets/Learn/vite-icon.svg'
import TaiwlindIcon from '../../assets/Learn/tailwind-icon.svg'
import NodeJSIcon from '../../assets/Learn/nodejs-icon.svg'
import VueIcon from '../../assets/Learn/vuejs-icon.svg'
import PinitaIcon from '../../assets/Learn/pinia-icon.svg'
import NuxtIcon from '../../assets/Learn/nuxt-icon.svg'
import AxiosIcon from '../../assets/Learn/axios.svg'
</script>

<template>
        <!-- Add icon library -->
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <div class="bg-slate-100 py-12 dark:bg-gray-600 dark:text-gray-300">
        <div class="title container py-12 grid gap-12 grid-cols-1 lg:grid-cols-5 items-center">
            <div class="lg:col-span-3">
                <h1 class="font-display font-semibold text-4xl">Submit a course or tutorial</h1>
                <div class="text-muted mt-2 text-lg">Are we missing a resource or want your course listed here? From generic frontend topics to a very specific Vue.js or Nuxt.js concepts, let us know about it!</div>
                <button class="mt-6 inline-block px-5 py-2 text-s cursor-pointer text-center no-underline outline-none text-gray-800 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 dark:bg-green-500 dark:text-white dark:hover:bg-green-600 dark:active:bg-green-700">Submit a resource <i class="fa fa-plus-square-o ml-2"></i></button>
            </div>
            <div class="lg:col-span-2">
                <div class="grid grid-cols-4 gap-y-8 gap-x-4 lg:grid-cols-5 lg:gap-4">
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="VueIcon" class="object-contain w-full h-full" alt="VueJS logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="JSIcon" class="object-contain w-full h-full" alt="JS logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="TaiwlindIcon" class="object-contain w-full h-full" alt="Tailwind logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="NodeJSIcon" class="object-contain w-full h-full" alt="NodeJS logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="PinitaIcon" class="object-contain w-full h-full" alt="Pinita logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="NuxtIcon" class="object-contain w-full h-full" alt="Nuxt.js logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="AxiosIcon" class="object-contain w-full h-full" alt="Nuxt.js logo"></div>
                    <div class="w-16 h-16 bg-white rounded-lg p-2"><img :src="ViteIcon" class="object-contain w-full h-full" alt="Vite logo"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.btn {
    display: inline-block;
    padding: 10px 15px;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: white;
    background-color: #0f5e59;
    border: none;
    border-radius: 4px;
}
</style>