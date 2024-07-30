<script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    isVisible: Boolean
  })
  
  const emit = defineEmits(['close', 'submit'])
  const newReview = ref('')
  const rating = ref(5)
  
  const submitReview = () => {
    if (newReview.value.trim() && rating.value) {
      emit('submit', { review: newReview.value, rating: rating.value })
      newReview.value = ''
      rating.value = 5
    }
  }
  const close = () => {
    emit('close')
  }
  </script>

<template>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-4 z-60">
        <div class="flex justify-between items-center border-b pb-2">
          <h2 class="text-xl font-semibold">Leave a Review</h2>
          <button @click="close" class="text-gray-500 dark:text-gray-300">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="mt-4">
          <div class="flex items-center mb-2">
            <template v-for="star in 5" :key="star">
              <svg
                @click="rating = star"
                :class="{'text-yellow-500': star <= rating, 'text-gray-300': star > rating}"
                class="w-6 h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.6-.921 1.901 0l2.452 5.833 6.407.569c.965.084 1.355 1.253.654 1.888l-4.94 4.147 1.485 6.452c.238 1.016-1.165 1.791-1.748.897L12 17.229l-5.662 3.154c-.584.893-1.986.119-1.748-.897l1.485-6.452-4.94-4.147c-.701-.635-.311-1.804.654-1.888l6.407-.569 2.452-5.833z"/>
              </svg>
            </template>
          </div>
          <textarea v-model="newReview" placeholder="Write your review here" class="w-full border rounded-md p-2"></textarea>
          <button @click="submitReview" class="bg-teal-800 text-white px-4 py-2 rounded-md mt-2">Submit Review</button>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
</style>
  