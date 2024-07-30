import { useToast } from 'vue-toast-notification'

const toast = useToast()

export const validateName = (name) => {
    if (name.trim() === '') {
        toast.error('Name cannot be empty')
        return false
    }
    return true
}

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

export const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }
    return true
}

export const validateTermsAgreed = (termsAgreed) => {
    if (!termsAgreed) {
        toast.error('You must agree to the terms of use')
        return false
    }
    return true
}
