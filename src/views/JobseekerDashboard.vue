<script setup>
  import { ref, onMounted } from 'vue';
  import JobCard from '@/components/Jobs/JobsCard.vue';
  import { getUserId } from '@/services/authService'; 

  
  
  const userId = ref(null);
  const user = ref({
    name: '',
    email: '',
    password: ''
  });
  const applications = ref([]);
  const bookmarkedJobs = ref([]);
  const currentView = ref('settings'); // default view
  
  const fetchApplications = async () => {
    const response = await fetch(`http://localhost:3000/applications?userId=${userId.value}`);
    const data = await response.json();
    applications.value = data;
  };
  
  const fetchBookmarkedJobs = async () => {
    const response = await fetch(`http://localhost:3000/bookmarks?userId=${userId.value}`);
    const bookmarksData = await response.json();
    const jobIds = bookmarksData.map(bookmark => bookmark.jobId);
  
    if (jobIds.length > 0) {
      const jobsResponse = await fetch(`http://localhost:3000/jobs`);
      const jobsData = await jobsResponse.json();
      bookmarkedJobs.value = jobsData.filter(job => jobIds.includes(job.id));
    } else {
      bookmarkedJobs.value = [];
    }
  };
  
  const saveSettings = async () => {
    // save user settings logic // omly consoling for the moment
    console.log('User settings saved:', user.value);
  };
  
  onMounted(() => {
  userId.value = getUserId(); // get the user ID dynamically
  fetchApplications();
  fetchBookmarkedJobs();
});
  </script>
  
  <style scoped>
  /* sidebar */
  aside {
    width: 16rem;
  }
  </style>
  

<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-white h-full shadow-lg p-4">
        <h2 class="text-xl font-bold text-gray-700 mb-6">User Dashboard</h2>
        <ul class="space-y-4">
          <!-- Home link -->
          <li>
            <RouterLink to="/home" class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left">
              <svg class="w-6 h-6 fill-current text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3a1 1 0 00-1 1v2H5v9h10V6H11V4a1 1 0 00-1-1z"></path>
              </svg>
              <span>Home</span>
            </RouterLink>
          </li>
  
          <!-- Manage Jobs link -->
          <li>
            <RouterLink to="/jobs" class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left">
              <svg class="w-6 h-6 fill-current text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path>
              </svg>
              <span>Jobs</span>
            </RouterLink>
          </li>
  
          <!-- User Settings link -->
          <li>
            <button @click="currentView = 'settings'" class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left">
              <svg class="w-6 h-6 fill-current text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 6a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2H4zM4 12a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2H4zM12 6a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V8zM12 12a2 2 0 012 2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4z"></path>
              </svg>
              <span>User Settings</span>
            </button>
          </li>
          
          <!-- Bookmarks link -->
          <li>
            <button @click="currentView = 'bookmarks'" class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left">
              <svg class="w-6 h-6 fill-current text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 3a3 3 0 00-3 3v10a1 1 0 01-2 0V6a3 3 0 00-3-3H4a3 3 0 00-3 3v11a1 1 0 001 1h12a1 1 0 001-1V6a3 3 0 00-3-3h-1zM5 2a1 1 0 011 1v12a1 1 0 01-2 0V3a1 1 0 011-1h2zm6 0a1 1 0 011 1v12a1 1 0 01-2 0V3a1 1 0 011-1h2z"></path>
              </svg>
              <span>Bookmarks</span>
            </button>
          </li>
  
          <!-- Applications link -->
          <li>
            <button @click="currentView = 'applications'" class="text-gray-700 hover:text-teal-600 flex items-center space-x-2 p-2 rounded-md transition-colors w-full text-left">
              <svg class="w-6 h-6 fill-current text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3zM1 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V5zm2 6h12v2H3v-2zm0-4h12v2H3V7z"></path>
              </svg>
              <span>Applications</span>
            </button>
          </li>
        </ul>
      </aside>
  
      <!-- Main content -->
      <main class="flex-1 p-6 bg-gray-100">
        <!-- Conditional views based on currentView -->
        <div v-if="currentView === 'settings'" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">User Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-600">Name:</label>
              <input type="text" v-model="user.name" class="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <div>
              <label class="block text-gray-600">Email:</label>
              <input type="email" v-model="user.email" class="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <div>
              <label class="block text-gray-600">Password:</label>
              <input type="password" v-model="user.password" class="border border-gray-300 p-2 rounded-md w-full" />
            </div>
            <button @click="saveSettings" class="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors">Save Changes</button>
          </div>
        </div>
  
        <div v-if="currentView === 'bookmarks'" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Bookmarked Jobs</h2>
          <div v-if="bookmarkedJobs.length === 0" class="text-gray-500">No bookmarked jobs found.</div>
          <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobCard v-for="job in bookmarkedJobs" :key="job.id" :job="job" />
          </div>
        </div>
  
        <div v-if="currentView === 'applications'" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Job Applications</h2>
          <div v-if="applications.length === 0" class="text-gray-500">No applications found.</div>
          <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobCard v-for="job in applications" :key="job.id" :job="job" />
          </div>
        </div>
      </main>
    </div>
  </template>
  
  
  