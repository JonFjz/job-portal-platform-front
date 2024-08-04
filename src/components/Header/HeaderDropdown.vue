<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const dropdownVisible = ref(false)

onMounted(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
        try {
            user.value = JSON.parse(storedUser)
        } catch (error) {
            console.error('Error parsing stored user:', error)
        }
    }
})

const username = computed(() => (user.value ? user.value.name : 'Guest'))
const isAuthenticated = computed(() => !!user.value)
const dashboardLink = computed(() => {
    if (user.value) {
        console.log('User Role:', user.value.role)
        return user.value.role === 'JobSeeker' ? '/jobseeker-dashboard/' : '/employer-dashboard/'
    }
    return '/'
})

const router = useRouter()

const logout = () => {
    console.log('Logging out')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    user.value = null
    dropdownVisible.value = false
    router.push('/login')
}

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value
}

const navigateToDashboard = () => {
    console.log('Navigating to:', dashboardLink.value)
    router.push(dashboardLink.value).catch((err) => console.error('Navigation Error:', err))
    dropdownVisible.value = false
}
</script>

<template>
    <nav>
        <div class="flex items-center justify-between">
            <div v-if="isAuthenticated" class="relative inline-block text-left dropdown">
                <span class="rounded-md shadow-sm">
                    <button
                        class="h-full inline-flex justify-center w-full px-4 py-2 text-xl font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-gray active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        @click="toggleDropdown"
                    >
                        <span>{{ username }}</span>
                        <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </span>
                <div
                    v-if="dropdownVisible"
                    class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                    <div class="py-1">
                        <button
                            @click="navigateToDashboard"
                            class="text-gray-600 flex justify-between w-full px-4 py-2 text-lg leading-5 text-left hover:bg-gray-300"
                        >
                            User Dashboard
                        </button>
                    </div>
                    <div class="py-1">
                        <a
                            href="#"
                            class="text-red-400 flex justify-between w-full px-4 py-2 text-lg leading-5 text-left hover:bg-gray-300"
                            @click.prevent="logout"
                        >
                            Log Out
                        </a>
                    </div>
                </div>
            </div>
            <div v-else>
                <RouterLink to="/login">Login</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
