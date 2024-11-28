<script setup lang="ts">
// import { provide } from 'vue'

// const options = [
//   { label: 'Movie', value: 'movie' },
//   { label: 'Tv', value: 'tv' },
// ]

const router = useRouter()
const isOpen = ref(false)
const mediaStore = useMediaStore()
const selectedGenre = ref(16)

const selectedParam = ref<'movie' | 'tv'>((router.currentRoute.value.params.media as 'movie' | 'tv'))

onMounted(async () => {
  await mediaStore.fetchGenres(selectedParam.value)
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
</script>

<template>
  <div class="top-0 z-10 w-full inter-tight text-white ">
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
        <div>
          <UButton  size="xl" class="mr-1" icon="heroicons-magnifying-glass" variant="link" color="white" 
          @click="isOpen = true" />
          <UModal v-model="isOpen" />
        </div>

        <!-- <UButton icon="heroicons-magnifying-glass"
        variant="link" size="xl" color="white" class="dark:text-white text-gray-900 dark:hover:bg-gray-800  hover:bg-gray-200"/> -->

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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');

.inter-tight {
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 0.3px;
}

.public-sans {
  font-family: "Public Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
}
</style>
