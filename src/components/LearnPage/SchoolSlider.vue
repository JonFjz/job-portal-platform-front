<script>
export default {
    data() {
        return {
            cards: [
                {
                    id: 'Vue.js Master Class 2024 Edition',
                    desc: 'Learn how to build a real-world application with Vue.js with the latest and greatest tech including the Composition API, Pinia, Vite, and more!',
                    img_url: 'https://vueschool.io/storage/media/514e83a572d4e86db2ffdc32fc51d1e6/vuejs-master-class-2024-edition.jpeg',
                    url: 'https://vueschool.io/courses/the-vuejs-3-master-class'
                },
                {
                    id: 'Vue.js 3 Fundamentals with the Composition API',
                    desc: 'Learn the fundamental concepts and get up and running with Vue.js 3 with the Composition API. Perfect if you haven\'t touched Vue before, or yo...',
                    img_url: 'https://vueschool.io/storage/media/c79100806b1bcc517afb50e981d605ed/vue-js-3-fundamentals-with-the-composition-api.jpg',
                    url: 'https://vueschool.io/courses/vue-js-fundamentals-with-the-composition-api'
                },
                {
                    id: 'Pinia: The Enjoyable Vue Store',
                    desc: 'Learn how to use Pinia for global state management in your Vue 3 applications.',
                    img_url: 'https://vueschool.io/storage/media/39ebc760d644aa4625743dfc727ff737/pinia-the-enjoyable-vue-store.jpg',
                    url: 'https://vueschool.io/courses/pinia-the-enjoyable-vue-store'
                },
                {
                    id: 'Content Sites with Astro and Vue.js',
                    desc: 'In this course, learn the basics of getting started with Astro by building a simple blog. Also, learn to integrate it with your favorite JavaScript.',
                    img_url: 'https://vueschool.io/storage/media/fbedcf3f068608ef41fac94cae9da466/astro-vue.jpg',
                    url: 'https://vueschool.io/courses/content-sites-with-astro-and-vue-js'
                },
                {
                    id: 'Common Vue.js Mistakes and How to Avoid Them',
                    desc: 'Building apps with Vue is a delight but there are common gotchas you should look out for! With this course, learn the warning signs.',
                    img_url: 'https://vueschool.io/storage/media/ba8bea0045c66cdcef7356226724a446/Common-Vue.js-Mistakes-and-How-to-Avoid-Them-02.png',
                    url: 'https://vueschool.io/courses/common-vue-js-mistakes-and-how-to-avoid-them'
                },
                {
                    id: 'Nuxt Modules: The Ultimate Guide',
                    desc: 'Master the art of Nuxt Modules in this hands-on course! From installation to crafting custom modules, you\'ll unleash the full potential of Nux.',
                    img_url: 'https://vueschool.io/storage/media/262777f632b642c7dc4b62862b12d445/How_to_Build_a_Nuxt.js_Module-02.jpg',
                    url: 'https://vueschool.io/courses/nuxt-modules-the-ultimate-guide'
                }
            ],
            innerStyles: {},
            cardWidth: '30%',
            cardMargin: 25,
            step: 0,
            transitioning: false,
            currentIndex: 0
        };
    },

    mounted() {
        this.setCardWidth();
        window.addEventListener('resize', this.setCardWidth);
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.setCardWidth);
    },

    methods: {
        handleResize() {
            this.setCardWidth();
            this.resetTranslate();
        },

        setCardWidth() {
            const containerWidth = this.$refs.carousel.offsetWidth;
            const cardsToShow = window.innerWidth < 800 ? 1 : 3;
            const totalCardWidth = containerWidth - this.cardMargin * (cardsToShow - 1);
            this.cardWidth = `${totalCardWidth / cardsToShow}px`;
            this.setStep();
        },

        setStep() {
            const totalCards = this.cards.length;
            const cardsToShow = window.innerWidth < 800 ? 1 : 3;
            if (totalCards > 0) {
                this.step = (this.$refs.carousel.offsetWidth - this.cardMargin * (cardsToShow - 1)) / cardsToShow;
            }
        },

        next() {
            if (this.transitioning || this.currentIndex >= this.cards.length - (window.innerWidth < 800 ? 1 : 3)) return;

            this.transitioning = true;
            this.currentIndex++;
            this.move();

            this.afterTransition(() => {
                this.transitioning = false;
            });
        },

        prev() {
            if (this.transitioning || this.currentIndex <= 0) return;

            this.transitioning = true;
            this.currentIndex--;
            this.move();

            this.afterTransition(() => {
                this.transitioning = false;
            });
        },

        move() {
            this.innerStyles = {
                transform: `translateX(-${(this.step + this.cardMargin) * this.currentIndex}px)`,
                transition: 'transform 0.5s ease'
            };
        },

        afterTransition(callback) {
            const listener = () => {
                callback();
                this.$refs.inner.removeEventListener('transitionend', listener);
            };
            this.$refs.inner.addEventListener('transitionend', listener);
        },

        resetTranslate() {
            this.innerStyles = {
                transform: `translateX(-${(this.step + this.cardMargin) * this.currentIndex}px)`,
                transition: 'none'
            };
        }
    }
};
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
                        <img :src="card.img_url" alt="Card image" class="w-24 h-24 p-3 object-cover rounded-[18px]" />
                        <div class="flex-1 py-2 flex flex-col justify-center text-left overflow-hidden">
                            <div class="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap">{{ card.id }}</div>
                            <div class="text-sm text-gray-500 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">{{ card.desc }}</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="flex justify-end mt-2">
            <button @click="prev" class="mr-1 inline-block px-3 py-2 text-xs cursor-pointer text-center no-underline outline-none text-gray-800 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 dark:bg-green-500 dark:text-white dark:hover:bg-green-600 dark:active:bg-green-700"><i class="fa fa-arrow-left"></i></button>
            <button @click="next" class="mr-1 inline-block px-3 py-2 text-xs cursor-pointer text-center no-underline outline-none text-gray-800 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 dark:bg-green-500 dark:text-white dark:hover:bg-green-600 dark:active:bg-green-700"><i class="fa fa-arrow-right"></i></button>
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