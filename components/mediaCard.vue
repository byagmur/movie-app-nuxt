<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: number
  posterPath: string
  voteAverage: number
  name: string
}>()

const router = useRouter()

function navigateToDetails() {
  router.push({
    name: 'mediaDetails',
    params: {
      id: props.id,
    },
  })
}
</script>

<template>
  
  <div class=" items-center p-4 rounded-lg transition-transform transform hover:-translate-y-1 ">
    <div class="h-8 z-10 absolute top-2 right-2 bg-neutral-900 bg-opacity-75 text-yellow-300 text-xs font-semibold rounded-full px-2 py-1 flex items-center">
      <span class="mr-1">{{ props.voteAverage }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
        <path fill="currentColor" d="m3.1 11.3l3.6 3.3l-1 4.6c-.1.6.1 1.2.6 1.5c.2.2.5.3.8.3c.2 0 .4 0 .6-.1c0 0 .1 0 .1-.1l4.1-2.3l4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1c.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7l.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5l-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1s-1 .3-1.3.8c0 0 0 .1-.1.1L8.7 8.2L4 8.7h-.1c-.5.1-1 .5-1.2 1c-.1.6 0 1.2.4 1.6" />
      </svg>
    </div>

    <img
      :src="props.posterPath"
      :alt="props.name"
      class="cursor-pointer hover:shadow-lg rounded-sm h-auto mb-3 transition-opacity duration-200 hover:opacity-90"
      @click="navigateToDetails"
    >
    <p class="inter-tight text-sm movie-title text-center text-gray-800 dark:text-gray-300 mt-2">
      {{ props.name }}
    </p>
  </div>
</template>

  <style scoped>

  </style>
