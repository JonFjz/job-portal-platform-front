<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const dateOfBirth = ref('')
const password = ref('')
const confirmPassword = ref('')
const companyName = ref('')
const industry = ref('')
const role = ref('jobseeker') // def to jobseeker
const dropdownVisible = ref(false)
const router = useRouter()
const toast = useToast()

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value
}

const selectRole = (selectedRole) => {
    role.value = selectedRole
    dropdownVisible.value = false
}

function validateFields() {
    switch (role.value) {
        case 'jobseeker':
            if (
                dateOfBirth.value === '' ||
                firstName.value === '' ||
                lastName.value === '' ||
                email.value === '' ||
                phone.value === '' ||
                password.value === ''
            ) {
                toast.error('Please fill all fields')
                break
            }
            break
        case 'employer':
            if (
                companyName.value === '' ||
                industry.value === '' ||
                email.value === '' ||
                phone.value === '' ||
                password.value === ''
            ) {
                toast.error('Please fill all fields')
                break
            }
            break
        default:
            toast.error('Invalid role')
            break
    }
    return true
}

const registerUser = async () => {
    try {
        // console log for employer fields
        if (password.value !== confirmPassword.value) {
            toast.error('Passwords do not match')
            return
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/g
        if (!passwordRegex.test(password.value)) {
            toast.error(
                'Password must contain at least 8 characters, one uppercase letter, and one symbol'
            )
            return
        }

        console.log('qitu ka mrri')

        if (validateFields() == true) {
            console.log('qitu ka mrri 2')
        }

        const endpoint =
            role.value === 'jobseeker' ? 'register-as-a-jobSeeker' : 'register-as-a-employer'
        await axios.post(`http://34.159.188.181:8080/api/Auth0/${endpoint}`, {
            ...(role.value === 'jobseeker'
                ? {
                      firstName: firstName.value,
                      lastName: lastName.value,
                      email: email.value,
                      phone: phone.value,
                      dateOfBirth: dateOfBirth.value,
                      password: password.value
                  }
                : {
                      companyName: companyName.value,
                      email: email.value,
                      phone: phone.value,
                      password: password.value,
                      industry: parseInt(industry.value)
                  })
        })

        toast.success('User registered successfully')
        router.push('/login')
    } catch (error) {
        toast.error('Error registering user')
        console.error('Error registering user:', error)
    }
}

// watch role changes to update form fields
watch(role, (newRole) => {
    if (newRole === 'jobseeker') {
        companyName.value = '' // clear employer-specific fields
    } else {
        firstName.value = ''
        lastName.value = ''
        dateOfBirth.value = '' // clear jobseeker-specific fields
    }
})
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
                    />
                    with LinkedIn
                </button>
                <button
                    type="button"
                    class="grow h-[44px] border border-gray-300 text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        alt="GitHub Logo"
                        class="w-5 h-5 mr-2"
                    />
                    with GitHub
                </button>
            </div>
            <form @submit.prevent="registerUser" class="mt-8 relative">
                <!-- show fields based on role -->
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
                    <label for="firstName" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">First Name</div>
                    </label>
                    <input
                        type="text"
                        v-model="firstName"
                        id="firstName"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        placeholder="Your first name"
                    />
                </div>
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
                    <label for="lastName" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Last Name</div>
                    </label>
                    <input
                        type="text"
                        v-model="lastName"
                        id="lastName"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        placeholder="Your last name"
                    />
                </div>
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
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
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
                    <label for="phone" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Phone</div>
                    </label>
                    <input
                        type="text"
                        v-model="phone"
                        id="phone"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        placeholder="Your phone number"
                    />
                </div>
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
                    <label for="dateOfBirth" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Date of Birth</div>
                    </label>
                    <input
                        type="date"
                        v-model="dateOfBirth"
                        id="dateOfBirth"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                </div>
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
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
                <div v-if="role === 'jobseeker'" class="form-field relative mb-7">
                    <label for="confirmPassword" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Confirm Password</div>
                    </label>
                    <input
                        type="password"
                        v-model="confirmPassword"
                        id="confirmPassword"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        placeholder="Confirm Password"
                    />
                </div>
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
                <div v-if="role === 'employer'" class="form-field relative mb-7">
                    <label for="industry" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Industry</div>
                    </label>
                    <select
                        id="industry"
                        v-model="industry"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    >
                        <option value="">Select Industry</option>
                        <option value="0">Technology</option>
                        <option value="1">Finance</option>
                        <option value="2">Healthcare</option>
                        <option value="3">Education</option>
                        <option value="4">Manufacturing</option>
                        <option value="5">Retail</option>
                        <option value="6">Construction</option>
                        <option value="7">Transportation</option>
                        <option value="8">RealEstate</option>
                        <option value="9">Energy</option>
                        <option value="10">Telecommunications</option>
                        <option value="11">Hospitality</option>
                        <option value="12">Entertainment</option>
                        <option value="13">Agriculture</option>
                        <option value="14">Legal</option>
                        <option value="15">Marketing</option>
                        <option value="16">Insurance</option>
                        <option value="17">Government</option>
                        <option value="18">NonProfit</option>
                        <option value="19">FoodAndBeverage</option>
                        <option value="20">Aerospace</option>
                        <option value="21">Automotive</option>
                        <option value="22">Biotechnology</option>
                        <option value="23">Pharmaceuticals</option>
                        <option value="24">Media</option>
                        <option value="25">Mining</option>
                        <option value="26">Logistics</option>
                        <option value="27">Sports</option>
                        <option value="28">Travel</option>
                        <option value="29">Utilities</option>
                        <option value="30">Consulting</option>
                        <option value="31">Engineering</option>
                    </select>
                </div>
                <div v-if="role === 'employer'" class="form-field relative mb-7">
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
                <div v-if="role === 'employer'" class="form-field relative mb-7">
                    <label for="phone" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Phone</div>
                    </label>
                    <input
                        type="text"
                        v-model="phone"
                        id="phone"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[38px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        placeholder="Your phone number"
                    />
                </div>
                <div v-if="role === 'employer'" class="form-field relative mb-7">
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
                <div v-if="role === 'employer'" class="form-field relative mb-7">
                    <label for="confirmPassword" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Confirm Password</div>
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
                <button
                    type="submit"
                    class="w-full text-white bg-teal-700 hover:bg-teal-800 focus:ring-1 focus:outline-none focus:ring-teal-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
                >
                    Register
                </button>
                <div class="text-center mt-4">
                    Already have an account?
                    <router-link to="/login" class="text-teal-600">Login here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}
.pagination button {
    margin: 0 0.5rem;
}
</style>
