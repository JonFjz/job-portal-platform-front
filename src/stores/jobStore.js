import { defineStore } from 'pinia'
import axios from 'axios'

export const useJobStore = defineStore('jobStore', {
    state: () => ({
        jobs: []
    }),
    actions: {
        // fetching all jobs from the server
        async fetchJobs() {
            try {
                const response = await axios.get('http://localhost:3000/jobs')
                this.jobs = response.data // update the state with fetched jobs
            } catch (error) {
                console.error('Failed to fetch jobs:', error)
            }
        },
        // add a new job to the server and update the state
        async addJob(job) {
            try {
                const response = await axios.post('http://localhost:3000/jobs', job)
                this.jobs.push(response.data) // add the new job to the state
            } catch (error) {
                console.error('Failed to add job:', error)
            }
        },
        async editJob(job) {
            try {
                const response = await axios.put(`http://localhost:3000/jobs/${job.id}`, job)
                const index = this.jobs.findIndex((j) => j.id === job.id) // find the index of the job to update
                if (index !== -1) {
                    this.jobs[index] = response.data // update
                }
            } catch (error) {
                console.error('Failed to edit job:', error) // Log error if editing fails
            }
        },
        async removeJob(id) {
            try {
                await axios.delete(`http://localhost:3000/jobs/${id}`)
                this.jobs = this.jobs.filter((job) => job.id !== id)
            } catch (error) {
                console.error('Failed to remove job:', error)
            }
        }
    }
})
