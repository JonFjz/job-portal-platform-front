<script setup>
    import CourseSlider from './CourseSlider.vue'
    import SchoolSlider from './SchoolSlider.vue'
</script>

<template>
    <div class="container py-12">
        <h2 class="font-semibold text-2xl">From Udemy</h2>
        <div class="mt-4">
            <CourseSlider />
        </div>
        <h2 class="font-semibold text-2xl mt-12">Learn Vue.js with Vue School</h2>
        <div class="mt-4">
            <SchoolSlider />
        </div>
    </div>
</template>
  
<style scoped></style>