<script setup>
import { ref } from 'vue'; 
import { useRouter } from 'vue-router';
import axios from 'axios'; 

const name = ref(''); 
const email = ref(''); 
const password = ref(''); 
const confirmPassword = ref(''); 
const termsAgreed = ref(false); 
const role = ref('jobseeker'); // default to jobseeker
const dropdownVisible = ref(false); 
const router = useRouter(); 

// function to toggle the visibility of the role selection dropdown
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// function to select a role from the dropdown
const selectRole = (selectedRole) => {
  role.value = selectedRole; 
  dropdownVisible.value = false; 
};

// function to handle user registration
const registerUser = async () => {
  if (password.value !== confirmPassword.value) { 
    alert('Passwords do not match');
    return;
  }

  if (!termsAgreed.value) { 
    alert('You must agree to the terms of use');
    return;
  }

  // creating a new user object
  const newUser = {
    id: Date.now(), // using timestamp as unique ID
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value // user's selected role
  };

  try {
    // make a POST request to register the user
    await axios.post('http://localhost:3000/users', newUser);
    alert('Registration successful');
    router.push('/'); // redirect to homepage after successful registration
  } catch (error) {
    console.error('There was an error registering the user!', error);
  }
};
</script>

<style scoped>
</style>


<template>
  <div class="pt-[7vh] pb-[7vh] flex items-center justify-center">
    <div class="container max-w-md bg-white p-4 rounded-lg w-full">
      <div class="text-center">
        <img src="/src/assets/vueJobsLogo.svg" alt="VueJobs Logo" class="h-9 lg:h-12 mx-auto" />
        <div class="font-display font-medium text-2xl lg:text-4xl mt-4 lg:mt-6">
          Hiring starts here
        </div>
        <div class="mt-4 text-muted lg:text-lg">Create an account and post a job!</div>
      </div>
      <div class="flex gap-4 mt-8">
        <button
          type="button"
          class="grow h-[44px] border border-gray-300 text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"
            alt="LinkedIn Logo"
            class="w-5 h-5 mr-2"
          />with LinkedIn
        </button>
        <button
          type="button"
          class="grow h-[44px] border border-gray-300 text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub Logo"
            class="w-5 h-5 mr-2"
          />with GitHub
        </button>
      </div>
      <form @submit.prevent="registerUser" class="mt-8">
        <div class="form-field relative mb-7">
          <label for="name" class="flex items-center justify-between mb-1">
            <div class="form-label font-medium text-sm">Name</div>
          </label>
          <input
            type="text"
            v-model="name"
            id="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="Your name"
          />
        </div>
        <div class="form-field relative mb-7">
          <label for="email" class="flex items-center justify-between mb-1">
            <div class="form-label font-medium text-sm">Email</div>
          </label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="Your e-mail"
          />
        </div>
        <div class="form-field relative mb-7">
          <label for="password" class="flex items-center justify-between mb-1">
            <div class="form-label font-medium text-sm">Password</div>
          </label>
          <input
            type="password"
            v-model="password"
            id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="Password"
          />
        </div>
        <div class="form-field relative mb-7">
          <label for="confirmPassword" class="flex items-center justify-between mb-1">
            <div class="form-label font-medium text-sm">Confirm your password</div>
          </label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            placeholder="Confirm Password"
          />
        </div>
        <div class="form-field relative mb-7">
          <label class="flex items-center justify-between mb-1">
            <div class="form-label font-medium text-sm">Select your role</div>
          </label>
          <button
            id="roleDropdownButton"
            @click="toggleDropdown"
            type="button"
            class="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-1 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          >
            {{ role === 'jobseeker' ? 'Jobseeker' : 'Employer' }}
            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div
            v-if="dropdownVisible"
            id="roleDropdownMenu"
            class="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-full"
          >
            <ul class="p-2 space-y-1 text-sm text-gray-700">
              <li>
                <div
                  @click="selectRole('jobseeker')"
                  class="flex p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <div class="flex items-center h-5">
                    <input
                      type="radio"
                      v-model="role"
                      value="jobseeker"
                      id="role-jobseeker"
                      class="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500"
                    />
                  </div>
                  <div class="ms-2 text-sm">
                    <label for="role-jobseeker" class="font-medium text-gray-900">
                      Jobseeker
                      <p class="text-xs font-normal text-gray-500">Find and apply for jobs.</p>
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div
                  @click="selectRole('employer')"
                  class="flex p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <div class="flex items-center h-5">
                    <input
                      type="radio"
                      v-model="role"
                      value="employer"
                      id="role-employer"
                      class="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500"
                    />
                  </div>
                  <div class="ms-2 text-sm">
                    <label for="role-employer" class="font-medium text-gray-900">
                      Employer
                      <p class="text-xs font-normal text-gray-500">Post and manage jobs.</p>
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="form-field relative mb-7 flex items-center">
          <input
            type="checkbox"
            v-model="termsAgreed"
            id="termsAgreed"
            class="w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500"
          />
          <label for="termsAgreed" class="ms-2 text-sm text-gray-600">
            I agree to the <router-link to="/terms" class="text-teal-600 hover:underline">terms of use</router-link>
          </label>
        </div>
        <button
          type="submit"
          class="w-full bg-slate-700 text-white px-6 rounded-[10px] h-[50px] text-lg mt-6 relative flex items-center justify-center"
        >
          Register
          <i class="fa fa-regular fa-arrow-right fa-fw ml-2 absolute right-4" aria-hidden="true"></i>
        </button>
      </form>
      <div class="mt-6 text-center text-base">
        Already have an account?
        <router-link to="/login" class="font-semibold hover:underline">Login now</router-link>
      </div>
    </div>
  </div>
</template>

