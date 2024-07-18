<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SubscribeForm from '@/components/SubscribeForm.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Bookmark from '../Bookmark.vue'

const route = useRoute()
const jobId = ref(route.params.id)
const jobDetails = ref(null)

const fetchJobDetails = async (id) => {
    // Replace with your actual API call
    console.log(`Fetching job details for job ID: ${id}`)
    const response = await fetch(`https://your-backend-api.com/jobs/${id}`)
    jobDetails.value = await response.json()
}

onMounted(() => {
    fetchJobDetails(jobId.value)
})
</script>
<template>
    <!-- Job ID: {{ jobId }} -->
    <div class="bg-white dark:bg-gray-800 dark:text-gray-300 text-gray-600">
        <div class="bg-slate-100 dark:bg-gray-700 dark:text-gray-300 px-4">
            <div
                class="flex flex-wrap items-center container mx-auto lg:py-0 py-2 w-full justify-between"
            >
                <div class="flex flex-row w-full justify-between py-8">
                    <div class="flex flex-col items-start md:items-center md:flex-row">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Job image"
                            class="h-12 md:h-16 lg:h-20 rounded-lg w-fit"
                        />
                        <div class="text-gray-600 dark:text-gray-300 md:pl-4">
                            <h1 class="font-semibold text-2xl md:text-4xl lg:text-5xl">
                                title of job
                            </h1>
                            <h2 class="text-xl md:text-3xl lg:text-4xl">company name</h2>
                        </div>
                    </div>
                    <!-- bookmark -->
                    <Bookmark :jobId="jobId" />
                </div>
            </div>
        </div>
        <div class="flex py-8 items-start justify-start px-4">
            <div class="flex flex-col md:flex-row container mx-auto lg:py-0 py-2 w-full">
                <div
                    class="flex flex-col w-full h-fit md:w-1/3 items-start md:items-start border-2 border-teal-800 rounded-md"
                >
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Location</h1>
                        <h2 class="text-xl">Hybrid Position</h2>
                        <h3>Specific location</h3>
                    </div>
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Work Type</h1>
                        <h2 class="text-xl">Contract</h2>
                    </div>
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Work LEvel</h1>
                        <h2 class="text-xl">Senior</h2>
                    </div>
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Salary</h1>
                        <h2 class="text-xl">XYZ per hour</h2>
                    </div>
                    <div class="p-4">
                        <h1 class="font-semibold text-2xl">Date Posted</h1>
                        <h2 class="text-xl">x days ago</h2>
                    </div>
                    <div class="flex items-center justify-center w-full">
                        <button
                            class="w-full bg-teal-800 text-white px-6 py-3 rounded-sm font-semibold"
                        >
                            Apply Now 🔗
                        </button>
                    </div>
                </div>
                <div class="pl-0 md:pl-8 w-full md:w-2/3">
                    <h1 class="text-3xl">Job Description</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam officia
                        aliquid in voluptatem adipisci nam quos excepturi accusamus, autem sit ipsam
                        eligendi totam ex eos, ad maxime optio quae porro sed quasi! Temporibus,
                        inventore ex dicta aliquam unde commodi cum soluta numquam ut distinctio.
                        Recusandae minima dicta amet harum eius voluptate sapiente doloremque
                        voluptates explicabo. Eveniet, voluptas quibusdam, ea dolores aperiam quae
                        quaerat maxime, aliquid repudiandae vel repellendus. Praesentium blanditiis,
                        eos autem iusto fugiat recusandae ducimus perferendis, pariatur voluptatum
                        explicabo, nisi soluta? Omnis quas ut dolores libero accusantium, odit, a
                        est eum illum rem beatae corrupti perspiciatis nisi aliquam repellendus cum
                        eius, quam explicabo aperiam. Optio deserunt quas tenetur fugit, provident a
                        placeat eos enim repellat exercitationem quasi modi saepe harum, porro
                        corporis qui facilis sint rerum! Est cupiditate aut neque provident pariatur
                        quidem, eveniet totam. Ea repellendus reprehenderit mollitia similique
                        aliquid harum iste quae perferendis ex tempora, eaque optio unde temporibus
                        dolorem, est fugiat accusamus! Tempore corporis saepe fuga sunt quas, aut
                        asperiores quibusdam blanditiis ipsa dolore pariatur libero qui rem
                        perspiciatis? Laborum esse, nemo facere perspiciatis, sit, qui blanditiis
                        praesentium dolorum perferendis alias placeat ipsa sint fuga explicabo
                        nostrum. Illum magni, nulla in optio itaque pariatur iste aliquam!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
