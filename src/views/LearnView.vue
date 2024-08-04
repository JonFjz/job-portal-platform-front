<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LearnCarousel from '@/components/LearnPage/LearnCarousel.vue';
import LearnHeader from '@/components/LearnPage/LearnHeader.vue'
import LearnSubmit from '@/components/LearnPage/LearnSubmit.vue';
</script>

<template>
    <DefaultLayout>
        <div class="bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <LearnHeader />
            <LearnCarousel />
            <LearnSubmit />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>