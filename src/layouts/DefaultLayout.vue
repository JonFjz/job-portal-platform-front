<script setup>
import Header from '../components/Header/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
    <div>
        <Header></Header>
        <slot />
        <!-- todo footer -->
        <Footer></Footer>
    </div>
</template>
