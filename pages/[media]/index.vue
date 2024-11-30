<script setup lang="ts">
definePageMeta({
  name: 'media',
})

const mediaStore = useMediaStore()
const route = useRoute()
const router = useRouter()
const mediaType: ComputedRef<'movie' | 'tv'> = computed(() => (router.currentRoute.value.params.media as 'movie' | 'tv'))

onMounted(async () => {
  await mediaStore.fetchPopularMedia('movie')
  mediaStore.isLoading = false
  await fetchMediaBasedOnRoute()
  await mediaStore.fetchTopMedia(mediaType.value)
  await mediaStore.fetchPeopleList()
})

function fetchMediaBasedOnRoute() {
  const mediaType = route.path === '/movie' ? 'movie' : 'tv'
  mediaStore.fetchPopularMedia(mediaType)
}

watch(
  () => route.path,
  () => fetchMediaBasedOnRoute(),
)
</script>

<template>
  <NuxtLayout>
    <template #header>
      <div v-if="mediaStore.isLoading" class="z-50 bg-gray-900 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <Loader />
      </div>

      <div class="p-4">
        <!-- <UInput
          v-model="query"
          icon="heroicons-magnifying-glass"
          class="shadow-lg rounded-full mx-auto mt-24 mb-8 w-40"
          type="text" placeholder="Search" style="border-radius: 22px;"
          size="xl"
        />  -->

        <div class="mt-24">
          <h1 class="text-center sm:text-left text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-4">
            {{ route.path === '/movie' ? 'Popular Movies' : 'Popular Series' }}
          </h1>
          <MediaCarousel :media-list="mediaStore.mediaList"/>
        </div>

        <div class="">
          <h1 class="text-center sm:text-left text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-4">
            {{ route.path === '/movie' ? 'Top Rated Movies' : 'Top Rated Series' }}
          </h1>
          <MediaCarousel :media-list="mediaStore.topMedia" />
        </div>

        <div>
          <h1 class="text-center sm:text-left text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-4">
            Peoples
          </h1>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            <div
              v-for="person in mediaStore.peopleList"
              :key="person.id"
              class="flex flex-col items-center text-center"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w200/${person.profile_path}`"
                class="transition-transform transform hover:-translate-y-1 w-44 h-44 rounded-full object-cover"
                :alt="person.name"
              >

              <p class="mt-2 font-medium text-sm">{{ person.name }}</p> 
              <p v-if="person.name != person.original_name" class="mt-2 font-medium text-sm">{{ person.original_name }}</p>
            </div>
          </div>
        </div>
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
