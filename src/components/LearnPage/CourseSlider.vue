<script>
import axios from 'axios'

export default {
    data() {
        return {
            cards: [],
            innerStyles: {},
            cardWidth: '30%',
            cardMargin: 25,
            step: 0,
            transitioning: false,
            currentIndex: 0
        }
    },

    mounted() {
        this.setCardWidth()
        window.addEventListener('resize', this.setCardWidth)
        this.fetchUdemyCourses()
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.setCardWidth)
    },

    methods: {
        handleResize() {
            this.setCardWidth()
            this.resetTranslate()
        },

        setCardWidth() {
            const containerWidth = this.$refs.carousel.offsetWidth
            const cardsToShow = window.innerWidth < 800 ? 1 : 3
            const totalCardWidth = containerWidth - this.cardMargin * (cardsToShow - 1)
            this.cardWidth = `${totalCardWidth / cardsToShow}px`
            this.setStep()
        },

        setStep() {
            const totalCards = this.cards.length
            const cardsToShow = window.innerWidth < 800 ? 1 : 3
            if (totalCards > 0) {
                this.step =
                    (this.$refs.carousel.offsetWidth - this.cardMargin * (cardsToShow - 1)) /
                    cardsToShow
            }
        },

        next() {
            if (
                this.transitioning ||
                this.currentIndex >= this.cards.length - (window.innerWidth < 800 ? 1 : 3)
            )
                return

            this.transitioning = true
            this.currentIndex++
            this.move()

            this.afterTransition(() => {
                this.transitioning = false
            })
        },

        prev() {
            if (this.transitioning || this.currentIndex <= 0) return

            this.transitioning = true
            this.currentIndex--
            this.move()

            this.afterTransition(() => {
                this.transitioning = false
            })
        },

        move() {
            this.innerStyles = {
                transform: `translateX(-${(this.step + this.cardMargin) * this.currentIndex}px)`,
                transition: 'transform 0.5s ease'
            }
        },

        afterTransition(callback) {
            const listener = () => {
                callback()
                this.$refs.inner.removeEventListener('transitionend', listener)
            }
            this.$refs.inner.addEventListener('transitionend', listener)
        },

        resetTranslate() {
            this.innerStyles = {
                transform: `translateX(-${(this.step + this.cardMargin) * this.currentIndex}px)`,
                transition: 'none'
            }
        },
        
        async fetchUdemyCourses() {
    try {
        const response = await axios.get('/courses.json');
        this.cards = response.data.results.map((course) => ({
            id: course.title,
            img_url: course.image_240x135,
            desc: course.headline,
            url: `https://www.udemy.com${course.url}`
        }));
        this.setStep();
        this.resetTranslate();
    } catch (error) {
        console.error('Failed to fetch Udemy courses:', error);
    }
}
    }
}
</script>

<template>
    <!-- Add icon library -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <div>
        <div class="carousel" ref="carousel">
            <div class="inner" ref="inner" :style="innerStyles">
                <a
                    v-for="card in cards"
                    :key="card.id"
                    :href="card.url"
                    class="mr-6 inline-flex items-start justify-start relative h-24 bg-gray-100 rounded-lg overflow-hidden dark:border-y-2 dark:border-green-500 dark:text-gray-300 dark:bg-gray-700"
                    :style="{ width: cardWidth }"
                    target="_blank"
                >
                    <div class="flex items-center h-full w-full">
                        <img
                            :src="card.img_url"
                            alt="Card image"
                            class="w-24 h-24 p-3 object-cover rounded-[18px]"
                        />
                        <div
                            class="flex-1 py-2 flex flex-col justify-center text-left overflow-hidden"
                        >
                            <div
                                class="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                                {{ card.id }}
                            </div>
                            <div
                                class="text-sm text-gray-500 mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                                {{ card.desc }}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="flex justify-end mt-2">
            <button
                @click="prev"
                class="mr-1 inline-block px-3 py-2 text-xs cursor-pointer text-center no-underline outline-none text-gray-800 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 dark:bg-green-500 dark:text-white dark:hover:bg-green-600 dark:active:bg-green-700"
            >
                <i class="fa fa-arrow-left"></i>
            </button>
            <button
                @click="next"
                class="mr-1 inline-block px-3 py-2 text-xs cursor-pointer text-center no-underline outline-none text-gray-800 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 dark:bg-green-500 dark:text-white dark:hover:bg-green-600 dark:active:bg-green-700"
            >
                <i class="fa fa-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<style>
.carousel {
    width: 100%;
    overflow: hidden;
}

.inner {
    transition: transform 0.2s;
    white-space: nowrap;
}
</style>