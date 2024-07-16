<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    company: String,
    title: String
})
</script>

<template>
    <div>
        <h1>{{ title }}</h1>
        <h2>{{ company }}</h2>
        <!-- Add more job details here -->
    </div>
</template>

<style scoped></style>
