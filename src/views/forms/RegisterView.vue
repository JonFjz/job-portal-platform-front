<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateTermsAgreed
} from '@/utils/registerValidation'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const termsAgreed = ref(false)
const role = ref('jobseeker') // default to jobseeker
const dropdownVisible = ref(false)
const companyName = ref('')
const router = useRouter()

// function to toggle the visibility of the role selection dropdown
const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value
}

// function to select a role from the dropdown
const selectRole = (selectedRole) => {
    role.value = selectedRole
    dropdownVisible.value = false
}

// function to handle user registration
const registerUser = async () => {
    if (
        validateName(name.value) &&
        validateEmail(email.value) &&
        validatePassword(password.value) &&
        validateConfirmPassword(password.value, confirmPassword.value) &&
        validateTermsAgreed(termsAgreed.value)
    ) {
        // creating a new user object
        const newUser = {
            // using timestamp as unique ID and also stringify it
            id: Date.now().toString(),
            name: name.value,
            email: email.value,
            password: password.value,
            role: role.value,
            companyName: role.value === 'employer' ? companyName.value : '', // include company name for employers
            employerId: role.value === 'employer' ? Date.now().toString() : '' // generate an employerId if role is employer
        }

        try {
            // make a POST request to register the user
            await axios.post('http://localhost:3000/users', newUser)
            alert('Registration successful')
            // Store the employerId in localStorage if role is employer
            if (role.value === 'employer') {
                localStorage.setItem('employerId', newUser.employerId)
            }
            router.push('/') // redirect to homepage after successful registration
        } catch (error) {
            console.error('There was an error registering the user!', error)
        }
    }
}
</script>

<template>
    <div class="bg-white flex items-center justify-center">
        <div class="container bg-slate-100 text-gray-600 max-w-md my-12 p-8 rounded-lg w-full">
            <div class="text-center">
                <img
                    src="/src/assets/vueJobsLogo.svg"
                    alt="VueJobs Logo"
                    class="h-9 lg:h-12 mx-auto"
                />
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
                        <svg
                            class="w-2.5 h-2.5 ms-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 4 4 4-4"
                            />
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
                                    <div class="ms-3">Jobseeker</div>
                                </div>
                            </li>
                            <li>
                                <div
                                    @click="selectRole('employer')"
                                    class="flex p-2 rounded hover:bg-gray-100 cursor-pointer"
                                >
                                    <div class="ms-3">Employer</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                  <!-- company name if registered as an employer -->
                  <div v-if="role === 'employer'" class="form-field relative mb-7">
                    <label for="companyName" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Company Name</div>
                    </label>
                    <input
                        type="text"
                        v-model="companyName"
                        id="companyName"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        placeholder="Your Company Name"
                    />
                </div>
                <div class="form-field relative mb-7">
                    <label class="flex items-center">
                        <input
                            type="checkbox"
                            v-model="termsAgreed"
                            id="termsAgreed"
                            class="form-checkbox h-4 w-4 text-teal-600"
                        />
                        <span class="ml-2 text-sm">
                            I agree to the <a href="#" class="text-teal-600">Terms and Conditions</a>
                        </span>
                    </label>
                </div>
                <button
                    type="submit"
                    class="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-1 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                >
                    Register
                </button>
                <div class="text-center mt-4">
                    Already have an account? <router-link to="/login" class="text-teal-600">Login here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
</style>
