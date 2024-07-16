import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/forms/LoginView.vue'
import RegisterView from '@/views/forms/RegisterView.vue'
import JobDetailView from '@/views/JobDetailView.vue' // Import JobDetailView

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
            component: LoginView
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/jobs/:company-:title',
            name: 'job-detail',
            component: JobDetailView,
            props: (route) => ({ company: route.params.company, title: route.params.title })
        },
        {
            path: '/:catchAll(.*)',
            redirect: { name: 'home' }
        }
    ]
})

export default router
