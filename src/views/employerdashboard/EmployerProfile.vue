<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification' // Import the toast library

const token = localStorage.getItem('token')

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: '*/*'
    }
}

const profile = ref({
    email: '', // Include email in the profile for binding, but exclude during update
    companyName: '',
    phone: '',
    founded: 0,
    companySize: 0,
    companyLink: '',
    industry: 0, // Use numeric value for industry
    description: ''
})

const toast = useToast() // Initialize toast

const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Construction',
    'Transportation',
    'RealEstate',
    'Energy',
    'Telecommunications',
    'Hospitality',
    'Entertainment',
    'Agriculture',
    'Legal',
    'Marketing',
    'Insurance',
    'Government',
    'NonProfit',
    'FoodAndBeverage',
    'Aerospace',
    'Automotive',
    'Biotechnology',
    'Pharmaceuticals',
    'Media',
    'Mining',
    'Logistics',
    'Sports',
    'Travel',
    'Utilities',
    'Consulting',
    'Engineering'
]

onMounted(() => {
    fetchProfile()
})

const fetchProfile = async () => {
    console.log('Fetching profile...')
    try {
        const response = await axios.get(`http://34.159.188.181:8080/api/Employers/profile`, config)
        profile.value = response.data
        // Map the industry string to its corresponding index
        profile.value.industry = industries.indexOf(profile.value.industry)
        console.log('Profile fetched successfully:', profile.value)
    } catch (error) {
        console.error('Error fetching profile:', error)
    }
}

const updateProfile = async () => {
    try {
        // Create a new object without the id and email properties
        const { id, email, ...profileData } = profile.value

        // Map the industry index to its corresponding number
        profileData.industry = Number(profileData.industry)

        // Replace null or undefined values with empty strings
        for (const key in profileData) {
            if (profileData[key] === null || profileData[key] === undefined) {
                profileData[key] = ''
            }
        }

        console.log('Updating profile with this information:', profileData)
        await axios.put('http://34.159.188.181:8080/api/Employers/profile', profileData, config)
        toast.success('Profile updated successfully!') // Show success toast
        await fetchProfile() // Refetch the profile after update
    } catch (error) {
        console.error('Error updating profile:', error)
        toast.error('Failed to update profile.') // Show error toast
    }
}
</script>

<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>
        <form @submit.prevent="updateProfile">
            <div class="space-y-4">
                <div>
                    <label for="email" class="block text-gray-600">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="profile.email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="companyName" class="block text-gray-600">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        v-model="profile.companyName"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label for="industry" class="block text-gray-600">Industry:</label>
                    <select
                        id="industry"
                        v-model.number="profile.industry"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option v-for="(industry, index) in industries" :key="index" :value="index">
                            {{ industry }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="companySize" class="block text-gray-600">Company Size:</label>
                    <input
                        type="number"
                        id="companySize"
                        v-model="profile.companySize"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label for="companyLink" class="block text-gray-600">Company Link:</label>
                    <input
                        type="text"
                        id="companyLink"
                        v-model="profile.companyLink"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label for="founded" class="block text-gray-600">Founded Year:</label>
                    <input
                        type="number"
                        id="founded"
                        v-model="profile.founded"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label for="description" class="block text-gray-600">Description:</label>
                    <textarea
                        id="description"
                        v-model="profile.description"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows="4"
                    ></textarea>
                </div>
            </div>
            <div class="mt-4">
                <button
                    type="submit"
                    class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors"
                >
                    Update Profile
                </button>
            </div>
        </form>
    </div>
</template>
