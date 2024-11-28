<script>
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/virtual'

// import Swiper core and required modules
import { Navigation, Pagination, Virtual } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    // Create array with 500 slides
    const slides = ref(
      Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`),
    )
    let swiperRef = null
    let appendNumber = 500
    let prependNumber = 1

    const setSwiperRef = (swiper) => {
      swiperRef = swiper
    }
    const slideTo = (index) => {
      swiperRef.slideTo(index - 1, 0)
    }
    const append = () => {
      slides.value = [...slides.value, `Slide ${++appendNumber}`]
    }
    const prepend = () => {
      slides.value = [
        `Slide ${prependNumber - 2}`,
        `Slide ${prependNumber - 1}`,
        ...slides.value,
      ]
      prependNumber -= 2
      swiperRef.slideTo(swiperRef.activeIndex + 2, 0)
    }
    return {
      slides,
      swiperRef: null,
      appendNumber,
      prependNumber,
      setSwiperRef,
      slideTo,
      append,
      prepend,
      modules: [Pagination, Navigation, Virtual],
    }
  },
}
</script>

<template>
  <div>
    <Swiper
      :modules="modules"
      :slides-per-view="3"
      :centered-slides="true"
      :space-between="30"
      :pagination="{
        type: 'fraction',
      }"
      :navigation="true"
      :virtual="true"
      class="mySwiper"
      @swiper="setSwiperRef"
    >
      <SwiperSlide
        v-for="(slideContent, index) in slides"
        :key="index"
        :virtual-index="index"
      >
        {{ slideContent }}
      </SwiperSlide>
    </Swiper>
    <p class="append-buttons">
      <button class="prepend-2-slides" @click="prepend()">
        Prepend 2 Slides
      </button>
      <button class="prepend-slide" @click="slideTo(1)">
        Slide 1
      </button>
      <button class="slide-250" @click="slideTo(250)">
        Slide 250
      </button>
      <button class="slide-500" @click="slideTo(500)">
        Slide 500
      </button>
      <button class="append-slides" @click="append()">
        Append Slide
      </button>
    </p>
  </div>
</template>

<style >


.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin: 20px auto;
}
.append-buttons {
  text-align: center;
  margin-top: 20px;
}

.append-buttons button {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #007aff;
  color: #007aff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  margin: 0 10px;
  font-size: 13px;
}

</style>