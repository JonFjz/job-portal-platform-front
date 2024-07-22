<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const user = ref(null);
const dropdownVisible = ref(false);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  console.log('Stored user:', storedUser); 

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
      console.log('User on mount:', user.value); 
    } catch (error) {
      console.error('Error parsing stored user:', error);
    }
  }
});

const username = computed(() => (user.value ? user.value.name : 'Guest')); // Updated property
const isAuthenticated = computed(() => !!user.value);
const dashboardLink = computed(() => {
  if (user.value) {
    console.log('Determining dashboard link for role:', user.value.role); // Debug log
    return user.value.role === 'jobseeker' ? '/jobseeker-dashboard' : '/employer-dashboard';
  }
  return '/';
});

const router = useRouter();

const logout = () => {
  localStorage.removeItem('user');
  user.value = null;
  router.push('/login');
};

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};
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
        <div v-show="dropdownVisible" class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          <div class="py-1">
            <RouterLink
              :to="dashboardLink"
              class="text-gray-600 flex justify-between w-full px-4 py-2 text-lg leading-5 text-left hover:bg-gray-300"
            >
              User Dashboard
            </RouterLink>
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

<style scoped>
</style>
