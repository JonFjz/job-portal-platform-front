<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Hero from '@/components/HomePage/Hero.vue'
import Jobs from '@/components/HomePage/Jobs.vue'
import SubscribeForm from '@/components/SubscribeForm.vue'
</script>

<template>
    <DefaultLayout>
        <Hero />
        <Jobs />
        <SubscribeForm />
        <!-- next component -->
    </DefaultLayout>
</template>
