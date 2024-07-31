<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const profile = ref({
    email: '',
    companyName: '',
    phone: '',
    industry: '',
  })
  
  onMounted(() => {
    fetchProfile()
  })
  
  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://localhost:7136/api/Employers/profile')
      profile.value = response.data
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
  
  const updateProfile = async () => {
    try {
      await axios.put('https://localhost:7136/api/Employers/profile', profile.value)
      alert('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error)
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
            <input v-model="profile.email" type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label for="companyName" class="block text-gray-600">Company Name:</label>
            <input v-model="profile.companyName" type="text" id="companyName" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label for="phone" class="block text-gray-600">Phone:</label>
            <input v-model="profile.phone" type="tel" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label for="industry" class="block text-gray-600">Industry:</label>
            <input v-model="profile.industry" type="text" id="industry" class="w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
         
        </div>
        <div class="mt-4">
          <button type="submit" class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors">Update Profile</button>
        </div>
      </form>
    </div>
  </template>
  
  