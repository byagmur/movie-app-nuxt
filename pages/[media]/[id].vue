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
})
</script>

<template>
  <NuxtLayout>
    <template #detail>
      <!-- <div class="fixed top-0 z-10 w-full dark:bg-neutral-900 text-white">
        <div class=" relative flex  items-center text-white lg:mt-24">
          <div class=" container mx-auto flex flex-col-reverse lg:flex-row items-center h-full">
            <div class="ml-14 lg:w-1/2 space-y-4 px-6">
              <h1 v-if=" mediaStore.mediaDetails" class="inter-tight dark:text-gray-200 text-gray-700 text-4xl font-bold">
                {{ mediaStore.mediaDetails?.title }}
              </h1>
              <div class="ml-2 flex items-center space-x-2">
                <span class="text-yellow-400 text-lg"> ★ </span>
                <span class="inter-tight dark:text-gray-300 text-gray-800 text-sm">
                  {{ mediaStore.mediaDetails?.vote_average }} ·
                  {{ mediaStore.mediaDetails?.popularity }} Reviews ·
                  {{ mediaStore.mediaDetails?.release_date?.substring(0, 4) }} ·
                  {{ Math.floor(mediaStore.mediaDetails?.runtime / 60) }}h
                  {{ mediaStore.mediaDetails?.runtime % 60 }}min </span>
              </div>
              <p class="inter-tight text-gray-700 dark:text-gray-300 text-lg">
                {{ mediaStore.mediaDetails?.overview }}
              </p>
              <button class="flex items-center text-lg text-gray-400 mt-4">
                <span class="inter-tight transition transform  hover:text-gray-300">Watch Trailer</span>
              </button>
            </div>
            <div class="sm:w-10/12 w-3/12">
              <img :src="mediaStore.baseUrlImg + mediaStore.mediaDetails?.poster_path" :alt="mediaStore.mediaDetails?.name" class=" m-10 rounded-sm  shadow-2xl">
            </div>
          </div>
        </div>
      </div> -->
      <div class="relative h-screen ">
        <img
          :src="`https://image.tmdb.org/t/p/w1280${mediaStore.mediaDetails?.backdrop_path}`"
          :alt="mediaStore.mediaDetails?.title"
          class="absolute inset-0 h-full w-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

        <div class="lg:ml-10 lg:w-1/2 absolute inset-0 flex flex-col justify-center text-white px-6 space-y-4 z-10">
          <h1 v-if="mediaStore.mediaDetails" class="text-4xl font-bold">
            {{  }}
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
          <p class="text-lg">
            {{ mediaStore.mediaDetails?.overview }}
          </p>
          <button class="flex justify-start ml-2 mt-4 text-lg text-gray-400 hover:text-gray-300">
            Watch Trailer
          </button>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
