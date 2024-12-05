<script setup>
import { Navigation, Pagination, Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { defineProps } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/virtual'

const props = defineProps({
  mediaList: {
    type: Array,
    required: true,
  },
})
const colorMode = useColorMode()
const slidesPerView = ref(8)
const spaceBetween = ref(-50)

function updateSlidesPerView() {
  const width = window.innerWidth
  if (width >= 1500) {
    slidesPerView.value = 9
  }
  else if (width >= 1300) {
    slidesPerView.value = 7
  }
  else if (width >= 1045) {
    slidesPerView.value = 5
    spaceBetween.value = -20
  }
  else if (width >= 992) {
    slidesPerView.value = 5
    spaceBetween.value = 10
  }
  else if (width >= 792) {
    slidesPerView.value = 5
    spaceBetween.value = 10
  }
  else if (width >= 668) {
    slidesPerView.value = 4
  }
  else if (width >= 476) {
    slidesPerView.value = 3
    spaceBetween.value = 0
  }
  else if (width >= 300) {
    slidesPerView.value = 2
    spaceBetween.value = -35
  }
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})
</script>

<template>
  
  <!-- <Swiper
    :modules="[Pagination, Navigation, Virtual]"
    :class="{ dark: colorMode.value === 'dark', light: colorMode.value === 'light' }"
    :slides-per-view="slidesPerView"
    :centered-slides="false"
    :space-between="spaceBetween"
    :navigation="true"
    :virtual="true"
  >
   -->
   <Swiper
    :modules="[Pagination, Navigation, Virtual]"
    :slides-per-view="slidesPerView"
    :centered-slides="false"
    :space-between="spaceBetween"
    :navigation="true"
    :virtual="true"
 
  >
  <SwiperSlide
      v-for="(media, index) in props.mediaList"
    :key="media.id"
    :virtual-index="index"
  >
    <MediaCard
      :id="media.id"
      :name="media.title || media.name"
      :vote-average="Math.floor(media.vote_average)"
      :poster-path="getImage(media.poster_path,500)"
      :style="{ width: '200px', height: '300px' }"
      class="carousel mx-8 px-7 lg:px-1 "
    />
    </SwiperSlide>
  </Swiper>
</template>

<style>

.swiper {
  width: 100%;
  height: 400px;
margin: 20px 0 -30px 0;
}

.swiper-button-next,
.swiper-button-prev {
  color: #fff ;

}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 2.5rem;
}

@media (max-width: 900px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 2rem;
    margin-bottom:150px;
  }
}


.dark .swiper-button-next,
.dark .swiper-button-prev {
  color: #fff; 
}

.light .swiper-button-next,
.light .swiper-button-prev {
  color: #2a272a; 
}

</style>
