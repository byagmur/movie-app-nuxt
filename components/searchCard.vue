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
  <div class="flex items-center p-4 rounded-lg transition-transform transform hover:-translate-y-1">
    <img
      :src="props.posterPath"
      :alt="props.name"
      class="w-32 h-auto rounded-sm mr-4 cursor-pointer hover:shadow-lg transition-opacity duration-200 hover:opacity-90"
    >

    <div class="flex-1">
      <div>
        <p class="inter-tight text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">
          {{ props.name }}
        </p>

        
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ props.overwiew }}
      </p>

      <UButton variant="link" color="transparent" class="transform transition  duration-300 ease-in-out dark:text-gray-100 dark:hover:text-gray-400 " @click="navigateToDetails">
        More Details
      </UButton>
    </div>
  </div>
</template>

  <style scoped>

  </style>
