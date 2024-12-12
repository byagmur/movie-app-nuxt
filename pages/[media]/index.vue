<script setup lang="ts">
definePageMeta({
  name: 'media',
})

const mediaStore = useMediaStore()
const route = useRoute()

onMounted(async () => {
  mediaStore.mediaDetails = undefined
  mediaStore.isLoading = false
  await fetchMediaBasedOnRoute()
  await mediaStore.fetchPeopleList()
})

async function fetchMediaBasedOnRoute() {
  const mediaType = route.path === '/movie' ? 'movie' : 'tv'
  await mediaStore.fetchPopularMedia(mediaType)
  await mediaStore.fetchTopMedia(mediaType)
}

watch(
  () => route.path,
  () => fetchMediaBasedOnRoute(),
)
</script>

<template>
  <NuxtLayout>
    <template #header>
      <div v-if="mediaStore.isLoading" class=" z-50 bg-gray-900 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <Loader />
      </div>

      <div class="p-4 overflow-y-hidden">
        <!-- <UInput
          v-model="query"
          icon="heroicons-magnifying-glass"
          class="shadow-lg rounded-full mx-auto mt-24 mb-8 w-40"
          type="text" placeholder="Search" style="border-radius: 22px;"
          size="xl"
        />  -->

        <div class="mt-24 ">
          <h1 class="text-center sm:text-left text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-4">
            {{ route.path === '/movie' ? 'Popular Movies' : 'Popular Series' }}
          </h1>

          <MediaCarousel :media-list="mediaStore.mediaList" />
        </div>

        <div class="">
          <h1 class="text-center sm:text-left text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-4">
            {{ route.path === '/movie' ? 'Top Rated Movies' : 'Top Rated Series' }}
          </h1>
          <MediaCarousel :media-list="mediaStore.topMedia" />
        </div>

        <div>
          <h1 class="text-center sm:text-left text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-4">
            Actors
          </h1>
          <PeopleCarousel />
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
</style>
