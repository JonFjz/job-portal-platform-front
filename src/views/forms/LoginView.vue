<template>
    <div class="bg-white w-full flex items-center justify-center">
        <div class="container max-w-md bg-slate-100 p-10 rounded-lg w-fit my-16 text-gray-600">
            <div class="text-center">
                <img src="/src/assets/vueJobsLogo.svg" alt="VueJobs Logo" class="h-12 mx-auto" />
                <div class="font-display font-medium text-2xl lg:text-4xl mt-4 lg:mt-6">
                    Log in to your account
                </div>
                <div class="mt-4 text-muted lg:text-lg">
                    Enter your credentials to access your account
                </div>
            </div>
            <div class="flex gap-4 mt-8">
                <button
                    type="button"
                    class="grow h-[44px] border border-gray-300 whitespace-nowrap text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"
                        alt="LinkedIn Logo"
                        class="w-5 h-5 mr-2"
                    />with LinkedIn
                </button>
                <button
                    type="button"
                    class="grow h-[44px] border border-gray-300 whitespace-nowrap text-gray-800 px-4 rounded-[8px] flex items-center justify-center font-semibold"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                        alt="GitHub Logo"
                        class="w-5 h-5 mr-2"
                    />with GitHub
                </button>
            </div>
            <form @submit.prevent="loginUser" class="mt-8">
                <div class="form-field relative mb-7">
                    <label for="email" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Email</div>
                    </label>
                    <input
                        type="email"
                        v-model="email"
                        id="email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[50px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-lg"
                        placeholder="Your e-mail"
                    />
                </div>
                <div class="form-field relative mb-4">
                    <label for="password" class="flex items-center justify-between mb-1">
                        <div class="form-label font-medium text-sm">Password</div>
                    </label>
                    <input
                        type="password"
                        v-model="password"
                        id="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-[8px] h-[50px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black text-lg"
                        placeholder="Password"
                    />
                    <div class="text-right py-1">
                        <a href="#" class="text-sm mt-1 hover:underline">Forgot your password?</a>
                    </div>
                </div>
                <button
                    type="submit"
                    class="w-full bg-cyan-900 text-white px-6 rounded-[10px] h-[50px] text-lg mt-6 relative flex items-center justify-center"
                >
                    Log in
                    <i
                        class="fa fa-regular fa-arrow-right fa-fw ml-2 absolute right-4"
                        aria-hidden="true"
                    ></i>
                </button>
            </form>
            <div class="mt-6 text-center text-base">
                Don't have an account?
                <router-link to="/register" class="font-semibold hover:underline">Register now</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import { parseJwt } from '@/utils/token'; 

const email = ref('');
const password = ref('');
const router = useRouter();
const toast = useToast();

const loginUser = async () => {
    try {
        const response = await axios.post('https://localhost:7136/api/Auth0/login', {
            email: email.value,
            password: password.value,
        });

        console.log('API response:', response);

        if (!response.data.access_token) {
            throw new Error('Token is not present in the response');
        }

        const token = response.data.access_token;
        const decoded = parseJwt(token);

        // check if the token is valid and contains the role
        if (!decoded || !decoded['https://dev-2si34b7jockzxhln/role']) {
            throw new Error('Invalid token');
        }

        const role = decoded['https://dev-2si34b7jockzxhln/role'];
        const user = {
            name: email.value || 'User',
            role: role,
        };

        console.log('User object to be stored:', user);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('Stored user in localStorage:', localStorage.getItem('user'));

        const redirectPath = role === 'JobSeeker' ? '/jobseeker-dashboard' : '/employer-dashboard';
        router.push(redirectPath);
    } catch (error) {
        toast.error('Error logging in user');
        console.error('Error logging in user:', error);
    }
};
</script>

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
