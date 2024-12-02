<script setup>
import { Navigation, Pagination, Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { defineProps } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/virtual'

const slidesPerView = ref(8)
const spaceBetween = ref(0)
const mediaStore = useMediaStore()

function updateSlidesPerView() {
  const width = window.innerWidth
  if (width >= 1500) {
    slidesPerView.value = 10
  }
  else if (width >= 1145) {
    slidesPerView.value = 6
    spaceBetween.value = 10
  }
  else if (width >= 1000) {
    slidesPerView.value = 5
    spaceBetween.value = 10
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
    spaceBetween.value = 10
  }
  else if (width >= 300) {
    slidesPerView.value = 2
    spaceBetween.value = 30
  }
}

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})
</script>

<template>
  <Swiper
    :modules="[Pagination, Navigation, Virtual]"
    :slides-per-view="slidesPerView"
    :centered-slides="false"
    :space-between="spaceBetween"
    :navigation="true"
    :virtual="true"
  >
    <SwiperSlide

      v-for="person in mediaStore.peopleList"
      :key="person.id"
      class="mx-5 flex flex-col items-center text-center"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w200/${person.profile_path}`"
        class="transition-transform transform hover:-translate-y-1 w-44 h-44 rounded-full object-cover"
        :alt="person.name"
      >

      <p class="mt-2 font-medium text-sm">
        {{ person.name }}
      </p>
      <p v-if="person.name !== person.original_name" class="mt-2 font-medium text-sm">
        {{ person.original_name }}
      </p>
    </SwiperSlide>
  </Swiper>
</template>

<style>
.swiper {
  width: 100%;
  height: 420px;
margin: 20px 0 -30px 0;
}

.swiper-button-next,
.swiper-button-prev {
  color: #fff ;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 2.5rem;
font-weight: bold;
margin-bottom: 80px;
}

@media (max-width: 900px) {
  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 230px;
  }
}
</style>
