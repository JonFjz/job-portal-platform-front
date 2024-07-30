<script>
export default {
    data() {
        return {
            cards: [
                {
                    id: 1,
                    title: 'Hello',
                    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    img_url:
                        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
                },
                {
                    id: 2,
                    img_url:
                        'https://images.unsplash.com/photo-1527455505333-9d3ac7adf523?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Zml2ZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
                },
                {
                    id: 3,
                    img_url:
                        'https://images.unsplash.com/photo-1597976618063-810eb50c84fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dGFtfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'
                },
                {
                    id: 4,
                    img_url:
                        'https://images.unsplash.com/photo-1597976618063-810eb50c84fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dGFtfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'
                },
                {
                    id: 5,
                    img_url:
                        'https://images.unsplash.com/photo-1597976618063-810eb50c84fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dGFtfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'
                },
                {
                    id: 6,
                    img_url:
                        'https://images.unsplash.com/photo-1597976618063-810eb50c84fb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dGFtfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'
                }
            ],
            innerStyles: {},
            cardWidth: '30%',
            step: '',
            transitioning: false
        }
    },

    mounted() {
        this.setCardWidth()
        window.addEventListener('resize', this.setCardWidth)
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.setCardWidth)
    },

    methods: {
        setCardWidth() {
            const containerWidth = this.$refs.carousel.offsetWidth
            const cardMargin = 25 // margin-right of the card in px
            const totalMargins = 2 * cardMargin
            const totalCardWidth = containerWidth - totalMargins
            this.cardWidth = `${totalCardWidth / 3}px`
            this.setStep()
            this.resetTranslate()
        },

        setStep() {
            const innerWidth = this.$refs.inner.scrollWidth
            const totalCards = this.cards.length
            this.step = `${innerWidth / totalCards}px`
        },

        next() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveLeft()

            this.afterTransition(() => {
                const card = this.cards.shift()
                this.cards.push(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        prev() {
            if (this.transitioning) return

            this.transitioning = true

            this.moveRight()

            this.afterTransition(() => {
                const card = this.cards.pop()
                this.cards.unshift(card)
                this.resetTranslate()
                this.transitioning = false
            })
        },

        moveLeft() {
            this.innerStyles = {
                transform: `translateX(-${this.step})`
            }
        },

        moveRight() {
            this.innerStyles = {
                transform: `translateX(${this.step})`
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
                transition: 'none'
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
                <div
                    class="card"
                    v-for="card in cards"
                    :key="card.id"
                    :style="{ width: cardWidth }"
                >
                    <div class="card-content">
                        <img :src="card.img_url" alt="Card image" class="card-image" />
                        <div class="card-text">
                            <div class="card-title">{{ card.id }}</div>
                            <div class="card-desc">{{ card.desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button @click="prev" class="btn"><i class="fa fa-arrow-left"></i></button>
            <button @click="next" class="btn"><i class="fa fa-arrow-right"></i></button>
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

.card {
    margin-right: 25px;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    height: 100px;
    background-color: #f4f4f4;
    border-radius: 10px;
    overflow: hidden; /* Ensure content doesn't overflow */
}

.card-content {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
}

.card-image {
    width: 100px;
    height: 100px;
    padding: 10px;
    object-fit: cover;
    border-radius: 15px;
}

.card-text {
    flex: 1;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    overflow: hidden; /* Hide overflowing text */
}

.card-title {
    font-size: 1.25em;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis; /* Add ellipsis for overflowing text */
    white-space: nowrap; /* Prevent text from wrapping */
}

.card-desc {
    font-size: 0.875em; /* Smaller font size for description */
    color: #6c757d;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

button {
    margin-right: 5px;
}

.btn {
    display: inline-block;
    padding: 10px 15px;
    font-size: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #39b1bd;
    border: none;
    border-radius: 4px;
}
</style>
