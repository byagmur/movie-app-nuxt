<script setup lang="ts">
import type { Genre } from '~/types'

const router = useRouter()
const isOpen = ref(false)

const mediaStore = useMediaStore()
const selectedGenre = ref()
const query = ref<string>('')
const selectedParam = ref((router.currentRoute.value.params.media as 'movie' | 'tv'))

onMounted(async () => {
  await mediaStore.fetchGenres(selectedParam.value)
  await mediaStore.searchMedia(query.value, selectedParam.value)
  // console.log('selectedParam value--', selectedParam.value) // movie
  // console.log('secilen tur--', selectedGenre.value) // ?? neden undefined ?
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

function selectGenre(genre: Genre) {
  if (genre && genre.id) {
    selectedGenre.value = genre.id
    console.log('Selected genre ----', selectedGenre.value)

    router.push({
      name: 'genre',
      params: { genre: selectedGenre.value },
    })
  }
  else {
    console.warn('Genre is invalid or missing id')
  }
}

watch(query, async (newQuery) => {
  if (newQuery) {
    await mediaStore.searchMedia(newQuery, selectedParam.value)
  }
  else {
    mediaStore.searchedMedia = []
    mediaStore.isSearch = false
  }
})

function handlePageChange(newPage: number) {
  mediaStore.searchPage = newPage
  mediaStore.searchMedia(query.value, mediaStore.mediaType)
}
</script>

<template>
  <div class=" top-0 z-10 w-full inter-tight text-white overflow-x-hidden">
    <div class="fixed z-50 bg-gray-100 dark:bg-neutral-900 flex w-full shadow-lg items-center gap-5 py-5 px-10 justify-between">
      <div class="p-1 lg:gap-7 w-full flex items-center">
        <UPopover mode="hover">
          <UButton
            label="Movie"
            color="gray"
            class="transition duration-700 ease-in-out lg:ml-2 md:text-base lg:text-lg"
            variant="link"
            :class="{ 'text-gray-800': selectedParam === 'movie' }"
            @mouseover="selectedParam = 'movie'"
          />
          <template #panel>
            <div class="p-4">
              <div v-if="mediaStore.genreList.length > 0">
                <ul>
                  <li
                    v-for="genre in mediaStore.genreList"
                    :key="genre.id"
                    class="dark:text-gray-200 text-gray-800 text-lg hover:text-gray-400 dark:hover:text-gray-400 cursor-pointer "
                    @click="selectGenre(genre)"
                  >
                    {{ genre.name }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <p>No genres available</p>
              </div>
            </div>
          </template>
        </UPopover>

        <UPopover mode="hover">
          <UButton
            label="TV"
            color="gray"
            class="transition duration-700 ease-in-out md:text-base lg:text-lg"
            variant="link"
            :class="{ 'text-gray-800': selectedParam === 'tv' }"
            @mouseover="selectedParam = 'tv'"
          />
          <template #panel>
            <div class="p-4">
              <div v-if="mediaStore.genreList.length > 0">
                <ul>
                  <li
                    v-for="genre in mediaStore.genreList"
                    :key="genre.id"
                    class="dark:text-gray-200 text-gray-800 text-lg hover:text-gray-400 dark:hover:text-gray-400 cursor-pointer"
                    @click="selectGenre(genre)"
                  >
                    {{ genre.name }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <p>No genres available</p>
              </div>
            </div>
          </template>
        </UPopover>

        <!-- <USelectMenu v-model="selectedGenre" value-attribute="value" class=" sm:w-32 flex items-center  w-16" :options="mappedGenres" /> -->
      </div>

      <div class="flex items-center lg:mr-5">
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
              <div class="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:ml-6 lg:mr-6">
                <MediaCard
                  v-for="media in mediaStore.searchedMedia"
                  :id="media.id"
                  :key="media.id"
                  :style="{ width: '190px', height: '300px' }"
                  :name="media.title || media.name"
                  :vote-average="Math.floor(media.vote_average)"
                  :poster-path="getImage(media.poster_path,500)"
                  @click="router.push({ name: 'mediaDetails', params: { id: media.id } })"
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

        <UButton
          icon="heroicons-bell"
          variant="link" size="xl" color="white" class="dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-200"
        />

        <UButton
          icon="heroicons-user-circle"
          variant="link" size="xl" color="white" class="dark:text-white text-gray-900 dark:hover:bg-gray-800 hover:bg-gray-200 mr-1"
        />
        <ChangeThemeToggle />
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
