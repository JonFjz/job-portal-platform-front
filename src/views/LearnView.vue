<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LearnCarousel from '@/components/LearnPage/LearnCarousel.vue';
import LearnHeader from '@/components/LearnPage/LearnHeader.vue'
</script>

<template>
    <DefaultLayout>
        <LearnHeader />
        <LearnCarousel />
        <!-- next component -->
    </DefaultLayout>
</template>

<style scoped></style>