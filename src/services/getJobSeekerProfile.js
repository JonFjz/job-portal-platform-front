import axios from 'axios'

export const getJobSeekerProfile = async () => {
    console.log('Fetching job seeker profile...')
    console.log('Fetching job seeker profile...')
    console.log('Fetching job seeker profile...')
    console.log('Fetching job seeker profile...')
    console.log('Fetching job seeker profile...')
    console.log('Fetching job seeker profile...')
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: '*/*'
        }
    }
    try {
        const response = await axios.get('https://localhost:7163/api/JobSeekers/profile', config)
        console.log('Job seeker profile:', response.data)
        console.log('Job seeker profile:', response.data)
        console.log('Job seeker profile:', response.data)
        console.log('Job seeker profile:', response.data)
        console.log('Job seeker profile:', response.data)
        return response.data // Return the data from the response
    } catch (error) {
        console.error('Error fetching job seeker profile:', error)
        throw error // Optionally rethrow the error to handle it in the calling function
    }
}
