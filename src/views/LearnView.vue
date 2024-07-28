<script setup>
import LearnCarousel from '@/components/LearnPage/LearnCarousel.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LearnHeader from '@/components/LearnPage/LearnHeader.vue'
</script>

<template>
    <DefaultLayout>
        <LearnHeader />
        <LearnCarousel />
        <!-- next component -->
    </DefaultLayout>
</template>
