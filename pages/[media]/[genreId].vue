<script setup>
definePageMeta({
  name: 'genre',
  layout: 'details'
})

const route = useRoute()
const router = useRouter()
const mediaStore = useMediaStore()
const page = ref(1)
const genreId = route.params.genreId

onMounted(async () => {
  await mediaStore.fetchGenresById(mediaStore.mediaType, genreId,1)
})

function handlePageChange(newPage) {
  page.value = newPage
  mediaStore.fetchGenresById(mediaStore.mediaType, genreId,page.value)
}
</script>

<template>
  <NuxtLayout>
    <template #detail>
      <div class="p-24">
      <div class="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 lg:ml-6 lg:mr-6">
      <MediaCard
        v-for="media in mediaStore.mediaListByGenre"
        :key="media.id"
        class=""
        :style="{ width: '200px', height: '300px' }"
        :name="media.title || media.name"
        :vote-average="Math.floor(media.vote_average)"
        :poster-path="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
        @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
      />
    </div>
     <UPagination
            v-model="page"
            size="sm"
            :total="500"
            show-last
            show-first
            class=" mx-auto mt-12 p-6"
            @update:model-value="handlePageChange"
          />
  </div>
 
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>
