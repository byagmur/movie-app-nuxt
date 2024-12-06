<script setup lang="ts">
import type { Genre } from '~/types'

const router = useRouter()


const mediaStore = useMediaStore()
const selectedGenre = ref()
const selectedParam = ref((router.currentRoute.value.params.media as 'movie' | 'tv'))

onMounted(async () => {
  await mediaStore.fetchGenres(selectedParam.value)
  // console.log('selectedParam value--', selectedParam.value) // movie
  // console.log('secilen tur--', selectedGenre.value) // ?? neden undefined ?
})

watch(selectedParam, async (newValue) => {
  if (newValue) {
    router.push({
      name: 'media',
      params: { media: newValue },
    })
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
<ButtonSearch />

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
