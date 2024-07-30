import { useToast } from 'vue-toast-notification'

const toast = useToast()

export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailPattern.test(email)) {
        toast.error('Invalid email format')
        return false
    }
    return true
}

export const validatePassword = (password) => {
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return false
    }
    return true
}
