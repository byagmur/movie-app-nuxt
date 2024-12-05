<!-- eslint-disable no-console -->
<script setup lang="ts">
definePageMeta({
  name: 'mediaDetails',
  layout: 'details',
})
const route = useRoute()
const mediaStore = useMediaStore()

// const asd = computed(() => {
//   const date = new Date()
//   const day = date.getTime()
//   const month = date.getMonth() + 1
//   const year = date.getFullYear()
//   return `${day} - ${month} - ${year}`
// })

const mediaId = Number.parseInt(route.params.id as string)
onMounted(async () => {
  await mediaStore.fetchMediaDetails(mediaStore.mediaType, mediaId)
  await mediaStore.fetchTrailer(mediaStore.mediaType, mediaId)
  mediaStore.isLoading = false
  // console.log('trailer-------', mediaStore.trailers)
  // console.log('trailers[0]', mediaStore.trailers)
})
</script>

<template>
  <NuxtLayout>
    <template #detail>
      <div v-if="mediaStore.isLoading" class=" z-50 bg-gray-900 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <Loader />
      </div>

      <div class="relative h-screen ">
        <img
          :src="getImage(mediaStore.mediaDetails?.backdrop_path , 1280)"
          :alt="mediaStore.mediaDetails?.title"
          class="absolute inset-0 h-full w-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/85 to-transparent transition-background duration-500 ease-in-out" />

        <div class="sm:w-1/2 lg:ml-10 lg:w-1/2 absolute inset-0 flex flex-col justify-center text-white px-6 space-y-4 z-10">
          <h1 v-if="mediaStore.mediaDetails" class=" text-2xl lg:text-4xl font-bold">
            {{ mediaStore.mediaDetails?.title }}
            {{ mediaStore.mediaDetails?.name }}
          </h1>
          <div class="flex items-center space-x-2 ">
            <span class="text-yellow-400 text-lg">★</span>
            <span class="text-sm">

              {{ mediaStore.mediaDetails?.vote_average }} ·
              {{ mediaStore.mediaDetails?.popularity }} Reviews ·
              {{ mediaStore.mediaDetails?.release_date?.substring(0, 4) }} ·
              {{ typeof mediaStore.mediaDetails?.runtime === 'number' ? Math.floor(mediaStore.mediaDetails?.runtime / 60) : '' }}h
              {{ typeof mediaStore.mediaDetails?.runtime === 'number' ? mediaStore.mediaDetails?.runtime % 60 : '' }}min
            </span>
          </div>

          <p class="sm:text-md lg:text-lg">
            {{ mediaStore.mediaDetails?.overview }}
          </p>

          <div class="ml-5">
            <h1 class="text-xl p-3 font-bold">
              Videos
            </h1>
            <div class=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-1">
              <div
                v-for="video in mediaStore.trailers"
                :key="video.id"
              >
                <img
                  class="w-32 md:w-44 lg:w-44"
                  :src="`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`"
                  :alt="video.name"
                >

                <h3 class="inter-tight  lg:text-base text-xs">
                  {{ video.name }}
                </h3>

                <a
                  :href="`https://www.youtube.com/watch?v=${video.key}`"
                  target="_blank"
                  class=" mt-4 transition  duration-300 ease-in-out inter-tight text-gray-400  lg:text-md md:text-sm sm:text-xs  hover:text-gray-500"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.6s, transform 0.6s;
}

.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
