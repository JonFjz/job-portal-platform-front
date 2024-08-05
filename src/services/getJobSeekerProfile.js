import axios from 'axios'

export const getJobSeekerProfile = async () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    }
    try {
        const response = await axios.get(
            'http://34.159.188.181:8080/api/JobSeekers/profile',
            config
        )
        return response.data // Return the data from the response
    } catch (error) {
        console.error('Error fetching job seeker profile:', error)
        throw error // Optionally rethrow the error to handle it in the calling function
    }
}
