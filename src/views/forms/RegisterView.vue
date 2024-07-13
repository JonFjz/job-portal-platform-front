<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const termsAgreed = ref(false);

</script>

<template>
    <div class="pt-[7vh] pb-[7vh] flex items-center justify-center">
      <div class="container max-w-md bg-white p-2 rounded-lg w-full">
        <div class="text-center">
            <img src="/src/assets/vueJobsLogo.svg" alt="VueJobs Logo" class="h-9 lg:h-12 mx-auto">
                      <div class="font-display font-medium text-2xl lg:text-4xl mt-4 lg:mt-6">Hiring starts here</div>
          <div class="mt-4 text-muted lg:text-lg">Create an account and post a job!</div>
        </div>
        <div class="flex gap-4 mt-8">
          <button type="button" class="grow h-[44px] border border-gray-300 text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png" alt="LinkedIn Logo" class="w-5 h-5 mr-2">with LinkedIn
          </button>
          <button type="button" class="grow h-[44px] border border-gray-300 text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub Logo" class="w-5 h-5 mr-2">with GitHub
          </button>
        </div>
        <form @submit.prevent class="form-grid mt-8">
          <div class="form-field relative mb-7">
            <label for="name" class="flex items-center justify-between mb-1">
              <div class="form-label font-medium text-sm">Name</div>
            </label>
            <input type="text" v-model="name" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm" placeholder="Your name">
          </div>
          <div class="form-field relative mb-7">
            <label for="email" class="flex items-center justify-between mb-1">
              <div class="form-label font-medium text-sm">Email</div>
            </label>
            <input type="email" v-model="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm" placeholder="Your e-mail">
          </div>
          <div class="form-field relative mb-7">
            <label for="password" class="flex items-center justify-between mb-1">
              <div class="form-label font-medium text-sm">Password</div>
            </label>
            <input type="password" v-model="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm" placeholder="Password">
          </div>
          <div class="form-field relative mb-7">
            <label for="confirmPassword" class="flex items-center justify-between mb-1">
              <div class="form-label font-medium text-sm">Confirm your password</div>
            </label>
            <input type="password" v-model="confirmPassword" id="confirmPassword" class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm" placeholder="Confirm Password">
          </div>
          <div class="form-field flex items-center mb-7">
            <input type="checkbox" v-model="termsAgreed" id="termsAgreed" class="mr-2">
            <label for="termsAgreed" class="text-sm">I agree with the terms of use</label>
          </div>
          <button type="submit" class="w-full bg-slate-700 text-white px-6 rounded-[10px] h-[50px] text-lg mt-6 relative flex items-center justify-center">
            Register
            <i class="fa fa-regular fa-arrow-right fa-fw ml-2 absolute right-4" aria-hidden="true"></i>
          </button>
        </form>
        <div class="mt-6 text-center text-base">
          Already have an account? <a href="#" class="font-semibold hover:underline">Login now</a>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
</style>