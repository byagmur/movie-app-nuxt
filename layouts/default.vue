<script setup lang="ts">
const router = useRouter()
const isOpen = ref(false)
const mediaStore = useMediaStore()
const selectedGenre = ref(16)
const query = ref<string>('')
const selectedParam = ref<'movie' | 'tv'>((router.currentRoute.value.params.media as 'movie' | 'tv'))

onMounted(async () => {
  await mediaStore.fetchGenres(selectedParam.value)
  await mediaStore.searchMedia(query.value, selectedParam)
  // console.log('selectedParam value--', selectedParam.value) // movie
  // console.log('secilen tur--', selectedGenre.value) // ?? neden undefined ?
})

const mappedGenres = computed(() =>
  mediaStore.genreList?.map(genre => ({
    label: genre.name,
    value: genre.id,
  })) || [],
)

watch(selectedParam, (newValue) => {
  if (newValue) {
    router.push({
      name: 'media',
      params: {
        media: newValue,
      },
    })
  }
})

watch(query, (newQuery) => {
  if (newQuery) {
    mediaStore.searchMedia(newQuery, 'movie')
  }
  else {
    mediaStore.searchedMedia = []
    mediaStore.isSearch = false
  }
})

function handlePageChange(newPage) {
  mediaStore.searchPage = newPage
  mediaStore.searchMedia(query.value, mediaStore.mediaType)
}

</script>

<template>
  <div class=" top-0 z-10 w-full inter-tight text-white overflow-x-hidden">
    <div class="fixed z-50 bg-gray-100 dark:bg-neutral-900 flex w-full shadow-lg items-center gap-5 py-5 px-10 justify-between">
      <div class="p-1 lg:gap-7 w-full flex items-center">
        <!-- <URadioGroup
          v-model="selectedParam"
          size="xl"
          :options="options"
          orientation="horizontal"
        /> -->

        <UButton
          label="Movie"
          color="gray"
          class="md:text-base"
          variant="link"
          :class="{ 'text-gray-800': selectedParam === 'movie' }"
          @click="selectedParam = 'movie'"
        />

        <UButton
          label="TV"
          color="gray"
          class="md:text-base"
          variant="link"
          :class="{ 'text-gray-800': selectedParam === 'tv' }"
          @click="selectedParam = 'tv'"
        />

        <UButton
          label="Peoples"
          color="gray"
          class="md:text-base"
          variant="link"
        />

        <!-- <USelectMenu v-model="selectedGenre" value-attribute="value" class=" sm:w-32 flex items-center  w-16" :options="mappedGenres" /> -->
      </div>

      <div class="flex items-center lg:mr-5">
        <UButton
          size="xl" class=" mr-1 dark:hover:bg-gray-800 hover:bg-gray-200" icon="heroicons-magnifying-glass" variant="link" color="black"
          @click="isOpen = true"
        />

        <UModal
          v-model="isOpen"

          :overlay="true" :ui="{ width: 'w-full lg:max-w-7xl  sm:max-w-3xl' }"
        >
          <div>
            <div class="p-3">
              <!-- <UButton size="xl" class="hover:text-gray-400items-center justify-end " icon="heroicons-x-mark" variant="link" color="white" @click="isOpen = false" /> -->

              <UInput
                v-model="query"
                icon="heroicons-magnifying-glass"
                class="shadow-lg my-3 rounded-full mx-auto w-44"
                type="text" placeholder="Search" style="border-radius: 22px;"
                size="xl"
              />
            </div>

            <div v-show="mediaStore.isSearch" class="mr-10 ">
              <h1 class="text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-10">
                Results
              </h1>
              <div class="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:ml-6 lg:mr-6">
                <MediaCard
                  v-for="media in mediaStore.searchedMedia"
                  :id="media.id"
                  :key="media.id"
                  :style="{ width: '190px', height: '300px' }"
                  :name="media.title || media.name"
                  :vote-average="Math.floor(media.vote_average)"
                  :poster-path="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
                  @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
                />
              </div>
            </div>
          </div>

          <UPagination
            v-if="query"
            v-model="mediaStore.searchPage"
            size="sm"
            :total="mediaStore.totalPages"
            show-last
            show-first
            class="mx-auto p-10"
            @update:model-value="handlePageChange"
          />
        </UModal>

        <UButton
          icon="heroicons-bell"
          variant="link" size="xl" color="white" class="dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-200"
        />

        <UButton
          icon="heroicons-user-circle"
          variant="link" size="xl" color="white" class="dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-200 mr-1"
        />
        <ChangeTeheToggle />
      </div>
    </div>

    <slot name="header" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');

.inter-tight {
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 0.3px;
}
</style>
