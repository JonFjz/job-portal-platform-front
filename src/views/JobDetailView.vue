<script setup>
import SubscribeForm from '@/components/SubscribeForm.vue'
import JobInformation from '@/components/JobDetail/JobInformation.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
    <DefaultLayout>
        <JobInformation :job="jobDetails" />

        <SubscribeForm />
    </DefaultLayout>
</template>

<style scoped></style>
