import { createRouter, createWebHistory } from 'vue-router'; 
import HomeView from '../views/HomeView.vue'; 
import ProfileView from '@/views/ProfileView.vue';
import LoginView from '@/views/forms/LoginView.vue';
import RegisterView from '@/views/forms/RegisterView.vue';
import JobDetailView from '@/views/JobDetailView.vue';
import JobsView from '@/views/JobsView.vue';
import EmployerDashboard from '@/views/EmployerDashboard.vue';
import JobseekerDashboard from '@/views/JobseekerDashboard.vue';


const routes = [
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'home' } 
    },
    {
        path: '/',
        name: 'home',
        component: HomeView 
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView 
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView, 
        meta: { requiresGuest: true } 
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView, 
        meta: { requiresGuest: true } 
    },
    {
        path: '/jobs/:id',
        name: 'job-detail',
        component: JobDetailView 
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: JobsView 
    },
    {
        path: '/jobseeker-dashboard',
        name: 'jobseeker-dashboard',
        component: JobseekerDashboard, 
        meta: { requiresAuth: true, role: 'jobseeker' } 
    },
    {
        path: '/employer-dashboard',
        name: 'employer-dashboard',
        component: EmployerDashboard, 
        meta: { requiresAuth: true, role: 'employer' } 
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Use HTML5 history mode
    routes 
});

// global navigation guard
router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user'); // retrieve user data from localStorage
    let userData = null;

    if (user) {
        try {
            userData = JSON.parse(user); 
        } catch (e) {
            console.error('Error parsing user data from localStorage', e); 
            localStorage.removeItem('user'); 
            userData = null;
        }
    }

    const isAuthenticated = !!userData; // check if the user is authenticated
    const requiresAuth = to.meta.requiresAuth; // check if the route requires authentication
    const requiresGuest = to.meta.requiresGuest; // check if the route requires the user to be a guest

    if (requiresAuth && !isAuthenticated) {
        next({ name: 'login' }); // redirect to login if authentication is required but not authenticated
    } else if (requiresAuth && isAuthenticated) {
        if (userData.role === to.meta.role) {
            next(); // proceed if the user role matches the required role
        } else {
            next({ name: 'home' }); // redirect to home if the user role does not match
        }
    } else if (requiresGuest && isAuthenticated) {
        next({ name: 'home' }); // redirect to home if already authenticated but route requires guest
    } else {
        next(); // proceed to the route if no conditions are met
    }
});

export default router;
