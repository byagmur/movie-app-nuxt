<script setup>
definePageMeta({
  name: 'genre',
  layout: 'details',
})

const route = useRoute()
const router = useRouter()
const mediaStore = useMediaStore()
const page = ref(1)
const genreId = route.params.genre

onMounted(async () => {
  await mediaStore.fetchGenresById(mediaStore.mediaType, genreId, 1)
})

function handlePageChange(newPage) {
  page.value = newPage
  mediaStore.fetchGenresById(mediaStore.mediaType, genreId, page.value)
}
</script>

<template>
  <NuxtLayout>
    <template #detail>
      <div class=" lg:pt-20 mx-auto lg:p-12">
        <div class=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10 sm:gap-12  gap-2 lg:ml-2 lg:mr-10">
          <MediaCard
            v-for="media in mediaStore.mediaListByGenre"
            :key="media.id"
            :style="{ width: '190px', height: '300px' }"
            :name="media.title || media.name"
            :vote-average="Math.floor(media.vote_average)"
            :poster-path="getImage(media.poster_path,500)"
            @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
          />
          
        </div>
        <UPagination
          v-model="page"
          size="sm"
          :total="500"
          show-last
          show-first
          class=" flex justify-center items-center mx-auto mt-12 p-2"
          @update:model-value="handlePageChange"
        />
      </div>
      
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>
