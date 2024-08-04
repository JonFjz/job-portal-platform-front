import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JobAlertView from '@/views/JobAlertView.vue'
import HireDevView from '@/views/HireDevView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/forms/LoginView.vue'
import RegisterView from '@/views/forms/RegisterView.vue'
import JobDetailView from '@/views/JobDetailView.vue'
import JobsView from '@/views/JobsView.vue'
import EmployerDashboard from '@/views/EmployerDashboard.vue'
import JobseekerDashboard from '@/views/JobseekerDashboard.vue'
import LearnView from '@/views/LearnView.vue'
import { parseJwt } from '@/utils/token'; 

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
        path: '/job-alert',
        name: 'job-alert',
        component: JobAlertView
    },
    {
        path: '/hire-dev',
        name: 'hire-dev',
        component: HireDevView
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
        meta: { requiresAuth: true, role: 'JobSeeker' }
    },
    {
        path: '/employer-dashboard',
        name: 'employer-dashboard',
        component: EmployerDashboard,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/learn',
        name: 'learn',
        component: LearnView,
        meta: { requiresAuth: true, role: 'Employer' }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), 
    routes
})

// global navigation guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    let decodedToken = null

    // if a token exists, attempt to decode it
    if (token) {
        decodedToken = parseJwt(token)
       // if it fails, remove the token from localStorage

        if (!decodedToken) {
            localStorage.removeItem('token')
        }
    }
   // control if the user is authenticated based on the presence of a decoded token
    const isAuthenticated = !!decodedToken
    const requiresAuth = to.meta.requiresAuth
    const requiresGuest = to.meta.requiresGuest

    if (requiresAuth && !isAuthenticated) {
        next({ name: 'login' })
    } else if (requiresAuth && isAuthenticated) {
        if (decodedToken['https://dev-2si34b7jockzxhln/role'] === to.meta.role) {
            next()
        } else {
            next({ name: 'home' })
        }
    } else if (requiresGuest && isAuthenticated) {
        next({ name: 'home' })
    } else {
        next()
    }
})

export default router
