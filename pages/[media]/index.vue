<script setup lang="ts">
definePageMeta({
  name: 'media',
})

const mediaStore = useMediaStore()
const route = useRoute()
const router = useRouter()
const itemsPerPage = ref(9)
const currentStartIndex = ref(0)
const query = ref<string>('')



onMounted(async () => {
  await mediaStore.fetchPopularMedia('movie')
  mediaStore.isLoading = false
  await fetchMediaBasedOnRoute()
  await mediaStore.fetchTopMedia('movie')
  console.log('mediatop--', mediaStore.topMedia)
  await mediaStore.searchMedia(query.value, 'movie')
  console.log('searchedMedia', mediaStore.searchedMedia)
  console.log('query', query)
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

function fetchMediaBasedOnRoute() {
  const mediaType = route.path === '/movie' ? 'movie' : 'tv'
  mediaStore.fetchPopularMedia(mediaType)
}

watch(
  () => route.path,
  () => fetchMediaBasedOnRoute(),
)
//
const visibleMedia = computed(() => {
  // birleştirilmiş medya listesi
  const listLength = mediaStore.mediaList.length
  const startIndex = currentStartIndex.value
  return [
    ...mediaStore.mediaList.slice(startIndex, startIndex + itemsPerPage.value),
    ...mediaStore.mediaList.slice(0, Math.max(0, (startIndex + itemsPerPage.value) - listLength)),
  ]
})

function scrollRight() {
  if (currentStartIndex.value + itemsPerPage.value < mediaStore.mediaList.length) {
    currentStartIndex.value++
  }
  else {
    currentStartIndex.value = 0
  }
}

function scrollLeft() {
  if (currentStartIndex.value > 0) {
    currentStartIndex.value--
  }
  else {
    currentStartIndex.value = mediaStore.mediaList.length - itemsPerPage.value
  }
}
</script>

<template>
  <NuxtLayout>
    <template #header>
      <div v-if="mediaStore.isLoading" class="z-50 bg-gray-950/75 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <Loader />
      </div>

      <div class=" p-4">
        <UInput
          v-model="query"
          icon="heroicons-magnifying-glass"
          class="shadow-lg rounded-full mx-auto mt-24 mb-8 w-40"
          type="text" placeholder="Search" style="border-radius: 22px;"
          size="xl"
        />

        <div v-show="!mediaStore.isSearch">
          <h1 class="text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-8">
            {{ route.path === '/movie' ? 'Popular Movies' : 'Popular Series' }}
          </h1>

          <div class="carousel-container">
            <UButton class="arrow left " icon="heroicons-arrow-left" size="xs" @click="scrollLeft" />
            <div class="ml-6 carousel-wrapper">
              <transition-group name="slide" tag="div" class="carousel">
                <MediaCard
                  v-for="media in visibleMedia"
                  :id="media.id"
                  :key="media.id"
                  class="carousel-item"
                  :style="{ width: '200px', height: '300px' }"
                  :name="media.title || media.name"
                  :vote-average="Math.floor(media.vote_average)"
                  :poster-path="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
                  @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
                />
              </transition-group>
            </div>
            <UButton class="arrow right" icon="heroicons-arrow-right" size="xs" @click="scrollRight" />
          </div>
        </div>
      </div>
      <div v-show="mediaStore.isSearch">
        <h1 class="text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-8">
          Results
        </h1>
        <div class="p-7 grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4 ">
          <MediaCard
            v-for="media in mediaStore.searchedMedia"
            :id="media.id"
            :key="media.id"
            :style="{ width: '200px', height: '300px' }"
            :name="media.title || media.name"
            :vote-average="Math.floor(media.vote_average)"
            :poster-path="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
            @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
          />
        </div>
      </div>
<div v-if="mediaStore.topMedia && mediaStore.topMedia.length">
      <div v-show="!mediaStore.isSearch">
        <h1 class="ml-13 mt-10 text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-8">
          {{ route.path === '/movie' ? 'Top Rated Movies' : 'Top Rated Series' }}
        </h1>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          <MediaCard
            v-for="media in mediaStore.topMedia"
            :id="media.id"
            :key="media.id"
            :style="{ width: '200px', height: '300px' }"
            :name="media.title || media.name"
            :vote-average="Math.floor(media.vote_average)"
            :poster-path="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
            @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
          />
        </div>
      </div>
      
    </div>
    <div v-else>
 <Loader />
  </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.carousel-item {
  width: 200px;
  height: 300px;

}

.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;

}

.carousel {
  display: flex;
  gap: 5px;
  transition: transform 0.6s ease-in-out;

}

.arrow {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
