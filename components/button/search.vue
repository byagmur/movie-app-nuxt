<script setup>
const mediaStore = useMediaStore()
const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const selectedParam = ref((router.currentRoute.value.params.media))


onMounted(async () => {
  await mediaStore.searchMedia(query.value, selectedParam.value)
})

watch(selectedParam, async (newValue) => {
  if (newValue) {
    router.push({
      name: 'media',
      params: { media: newValue },
    })

    if (query.value) {
      await mediaStore.searchMedia(query.value, newValue)
    }
    else {
      mediaStore.searchedMedia = []
      mediaStore.isSearch = false
    }
  }
})

watch(query, async (newQuery) => {
  if (newQuery) {
    await mediaStore.searchMedia(newQuery, selectedParam.value)
  }
  else {
    mediaStore.searchedMedia = []
    mediaStore.isSearch = false
  }
})

function handlePageChange(newPage) {
  mediaStore.searchPage = newPage
  mediaStore.searchMedia(query, mediaStore.mediaType)
}
</script>

<template>
  <UButton
    size="xl" class=" mr-1 dark:hover:bg-gray-800 hover:bg-gray-200" icon="heroicons-magnifying-glass" variant="link" color="black"
    @click="isOpen = true"
  />

  <UModal
    v-model="isOpen"
    :overlay="true"
    :ui="{ container: 'animation-allt duration-100 delay-100 ', width: 'w-full lg:max-w-7xl  sm:max-w-3xl' }"
  >
    <!-- <UModal
          v-model="isOpen"
          :overlay="true"
          :ui="{ width: query.value.length > 0 ? 'w-full lg:max-w-7xl' : 'w-full sm:max-w-3xl'}"
        > -->

    <div>
      <div class="p-3">
        <!-- <UButton size="xl" class="hover:text-gray-400items-center justify-end " icon="heroicons-x-mark" variant="link" color="white" @click="isOpen = false" /> -->

        <UInput
          v-model="query"
          icon="heroicons-magnifying-glass"
          class="shadow-lg my-3 rounded-full mx-auto w-8/12"
          type="text" placeholder="Search" style="border-radius: 22px;"
          size="xl"
        />
      </div>

      <div v-show="mediaStore.isSearch" class="mr-10 ">
        <h1 class="text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-10">
          Results
        </h1>
        <div class="p-12">
          <!-- ---------- -->
          <SearchCard
            v-for="media in mediaStore.searchedMedia"
            :id="media.id"
            :key="media.id"

            :name="media.title || media.name"
            :vote-average="Math.floor(media.vote_average)"
            :poster-path="getImage(media.poster_path, 500)"
            @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
            :overwiew="media.overview"
          />
          
        </div>
      </div>
    </div>

    <UPagination
      v-if="(query && query.length > 1)"
      v-model="mediaStore.searchPage"
      size="sm"
      :total="200"
      show-last
      show-first
      class="mx-auto p-10"
      @update:model-value="handlePageChange"
    />
  </UModal>
</template>
