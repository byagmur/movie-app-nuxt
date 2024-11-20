<script setup lang="ts">
import { useMovieStore } from '~/stores/media'

definePageMeta({
  name: 'moveDetails',
})
const route = useRoute()
const movieStore = useMovieStore()

const movieId = Number.parseInt(route.params.id as string)
onMounted(async () => {
  await movieStore.fetchMovieDetails(movieId)
  movieStore.isLoading = false
  await movieStore.fetchTrailer(movieId)
})
</script>

<template>
    <nav class=" bg-black-900 text-white shadow-xl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-row-reverse  items-center h-16">
        <div class="flex ml-8 mr-5 mt-1 space-x-4">
          <div class="toggle-switch">
            <label class="switch-label" @click="toggleColorMode()">
              <input type="checkbox" class="checkbox" :checked="isDarkMode" @change="toggleColorMode">
              <span class="slider" />
            </label>
          </div>
        </div>

        <div class="flex mt-1 space-x-4 ">
          <NuxtLink to="/" class="transition  duration-300 ease-in-out inter-tight text-md text-black dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.4em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1" />
            </svg>
          </NuxtLink>
        </div>

        
      </div>
    </div>
  </nav>

    <div class=" relative flex  items-center text-white lg:mt-24">
      <div class=" container mx-auto flex flex-col-reverse lg:flex-row items-center h-full">
        <div class="ml-14 lg:w-1/2 space-y-4 px-6">
          <h1 v-if="movieStore.movieDetails" class="inter-tight dark:text-gray-200 text-gray-700 text-4xl font-bold">
            {{ movieStore.movieDetails?.title }}
          </h1>
          <div class="ml-2 flex items-center space-x-2">
            <span class="text-yellow-400 text-lg"> ★ </span>
            <span class="inter-tight dark:text-gray-300 text-gray-800 text-sm">
              {{ movieStore.movieDetails?.vote_average }} ·
              {{ movieStore.movieDetails?.popularity }} Reviews ·
              {{ movieStore.movieDetails?.release_date.substring(0, 4) }} ·
              {{ Math.floor(movieStore.movieDetails?.runtime / 60) }}h
              {{ movieStore.movieDetails?.runtime % 60 }}min </span>
          </div>
          <p class="inter-tight text-gray-700 dark:text-gray-300 text-lg">
            {{ movieStore.movieDetails?.overview }}
          </p>
          <button class="flex items-center text-lg text-gray-400 mt-4">
            <span class="inter-tight transition transform  hover:text-gray-300">Watch Trailer</span>
          </button>
        </div>
        <div class="w-5/12">
          <img :src="movieStore.baseUrlImg + movieStore.movieDetails?.backdrop_path" :alt="movieStore.movieDetails?.name" class="rounded-sm w-full  shadow-2xl">
        </div>
      </div>
    </div>

</template>
