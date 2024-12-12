<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: number
  posterPath: string
  voteAverage: number
  name: string | undefined
  overwiew: string
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
  <div class="border border-opacity-60 rounded-sm border-gray-300 dark:border-gray-800 shadow-lg my-3 flex items-center lg:p-4 gap-2  transition-transform transform hover:-translate-y-1">
    <img
      :src="props.posterPath"
      :alt="props.name"
      class="my-1 w-24 h-auto rounded-sm mr-4 cursor-pointer hover:shadow-xxl transition-opacity duration-200 hover:opacity-90"
    >

    <div class="flex-1">
      <div>
        <p class="inter-tight text-md font-semibold text-gray-800 dark:text-gray-300 mb-2">
          {{ props.name }}
        </p>

 
      </div>

      <p class="xl:text-md lg:text-sm md:text-md text-xs text-gray-600 dark:text-gray-400">
        {{ props.overwiew }}
      </p>

      <UButton variant="link" color="" class="transform transition  duration-300 ease-in-out dark:text-gray-100 dark:hover:text-gray-400 " @click="navigateToDetails">
        More Details
      </UButton>
    </div>
  </div>
</template>

  <style scoped>

  </style>
