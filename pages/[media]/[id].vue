<script setup lang="ts">
import { useMediaStore } from '~/stores/media'

definePageMeta({
  name: 'mediaDetails',
  layout: 'details',
})
const route = useRoute()
const mediaStore = useMediaStore()

const mediaId = Number.parseInt(route.params.id as string)
onMounted(async () => {
  await mediaStore.fetchMediaDetails(mediaStore.mediaType, mediaId)
  mediaStore.isLoading = false
  await mediaStore.fetchTrailer(mediaId)
  await mediaStore.fetchTrailer(mediaStore.mediaType, mediaId)
  console.log('trailer', mediaStore.trailers)
})

function watchTrailer() {
  const trailerKey = mediaStore.trailers.keys
  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`
  console.log('--trailer', trailerKey)
}
</script>

<template>
  <NuxtLayout>
    <template #detail>
      <div class="relative h-screen ">
        <img
          :src="`https://image.tmdb.org/t/p/w1280${mediaStore.mediaDetails?.backdrop_path}`"
          :alt="mediaStore.mediaDetails?.title"
          class="absolute inset-0 h-full w-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/85 to-transparent transition-background duration-500 ease-in-out" />

        <div class="sm:w-1/2 lg:ml-10 lg:w-1/2 absolute inset-0 flex flex-col justify-center text-white px-6 space-y-4 z-10">
          <h1 v-if="mediaStore.mediaDetails" class="text-4xl font-bold">
            {{ mediaStore.mediaDetails?.title }}
            {{ mediaStore.mediaDetails?.name }}
          </h1>
          <div class="flex items-center space-x-2">
            <span class="text-yellow-400 text-lg">★</span>
            <span class="text-sm">

              {{ mediaStore.mediaDetails?.vote_average }} ·
              {{ mediaStore.mediaDetails?.popularity }} Reviews ·
              {{ mediaStore.mediaDetails?.release_date?.substring(0, 4) }} ·
              {{ Math.floor(mediaStore.mediaDetails?.runtime / 60) }}h
              {{ mediaStore.mediaDetails?.runtime % 60 }}min
            </span>
          </div>
          <p class="sm:text-md lg:text-lg">
            {{ mediaStore.mediaDetails?.overview }}
          </p>
          <UButton variant="link" color="white" class=" flex justify-start ml-2 mt-4 text-md text-gray-400 hover:text-gray-300" @click="'https://www.youtube.com/watch?v=${}'">
            Watch Trailer
          </UButton>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
