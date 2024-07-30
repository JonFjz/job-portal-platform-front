<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  options: Array,
  placeholder: String,
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const dropdownOpen = ref(false);
const selectedOption = ref(props.modelValue);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit('update:modelValue', option);
  dropdownOpen.value = false; // after selection hide dropdown //
};

//// keep an eye on modelValue changes & update selectedOptions when it changes
watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue;
});
</script>

<template>
    <div class="relative">
      <button @click="toggleDropdown" class="pl-3 pr-10 py-2 border rounded-md w-full text-sm flex justify-between items-center">
        {{ selectedOption ? selectedOption : placeholder }}
        <!-- <i :class="`fa-solid fa-chevron-${dropdownOpen ? 'up' : 'down'} absolute right-3`"></i> -->
      </button>
      <div v-if="dropdownOpen" class="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
        <ul class="py-1 text-sm">
          <li v-for="option in options" :key="option" @click="selectOption(option)" class="cursor-pointer hover:bg-gray-200 px-4 py-2">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <style scoped>

  </style>
  