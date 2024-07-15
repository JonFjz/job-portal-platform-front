<script setup>
import Header from '../components/Header/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
    <Header></Header>
    <slot />
    <Footer></Footer>
</template>
