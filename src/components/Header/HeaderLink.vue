<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
    to: {
        required: true
    },
    text: {
        required: true
    }
})
</script>

<template>
    <RouterLink :to="props.to" class="text-black p-2 rounded-sm" as="a">
        <div class="hover:scale-110">
            {{ props.text }}
        </div>
    </RouterLink>
</template>
