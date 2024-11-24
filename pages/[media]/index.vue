<script setup lang="ts">
definePageMeta({
  name: 'media',
})

const mediaStore = useMediaStore()
const route = useRoute()
const router = useRouter()
const itemsPerPage = ref(7)
const currentStartIndex = ref(0)
// const width = window.innerWidth

onMounted(async () => {
  await mediaStore.fetchPopularMedia('movie')
  mediaStore.isLoading = false
  await fetchMediaBasedOnRoute()
  
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

// function updateItemsPerPage() {
//   const width = window.innerWidth

//   if (width >= 1024) {
//     itemsPerPage.value = 8
//   }
//   else if (width >= 768) {
//     itemsPerPage.value = 6
//   }
//   else if (width >= 640) {
//     itemsPerPage.value = 4
//   }
//   else {
//     itemsPerPage.value = 2
//   }
// }

// window.addEventListener('resize', updateItemsPerPage)
// resize olayi ile pencere boyutu dinlenir
// pencerenin boyutu degistiginde  updateItemsPerPage fonksiyonu tetiklenir
</script>

<template>
  <NuxtLayout>
    <template #header>
      <div v-if="mediaStore.isLoading" class="z-50 bg-gray-950/75 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <Loader />
      </div>
      <div class="overflow-y-auto p-4">
        <form class="form mx-auto m-4 mt-24 mb-8 ">
          <label for="search" class="shadow-xl rounded-3xl">
            <input id="search" class="input" type="text" required="" placeholder="Search movie">
            <div class="fancy-bg" />
            <div class="search">
              <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                </g>
              </svg>
            </div>
            <button class="close-btn" type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </label>
        </form>

        <div>
          <h1 class="text-gray-800 dark:text-gray-200 inter-tight text-lg font-bold ml-8">
            {{ route.path === '/movie' ? 'Popular Movies' : 'Popular Series' }}
          </h1>

          <!-- <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 gap-4"> -->
          <div class="carousel-container">
            <UButton class="arrow left" icon="heroicons-arrow-left" size="xs" @click="scrollLeft" />
            <div class="ml-9 carousel-wrapper">
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
      <!-- </div> -->
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
  transition: transform 0.6s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.form {
  --input-text-color: #ffffff50;
  --input-bg-color: #ffffff18 ;
  --focus-input-bg-color: transparent;
  --text-color: #949faa;
  --active-color: rgb(170, 170, 170);
  --width-of-input: 200px;
  --inline-padding-of-input: 1.2em;
  --gap: 0.9rem;
}

.form {
  font-size: 0.9rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: var(--width-of-input);
  position: relative;
  isolation: isolate;
}

.fancy-bg {
  position: absolute;
  width: 100%;
  inset: 0;
  background: var(--input-bg-color);
  border-radius: 30px;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

label {
  width: 100%;
  padding: 0.8em;
  height: 40px;
  padding-inline: var(--inline-padding-of-input);
  display: flex;
  align-items: center;
}

.search,.close-btn {
  position: absolute;
}

.search {
  fill: var(--text-color);
  left: var(--inline-padding-of-input);
}

svg {
  width: 17px;
  display: block;
}

.close-btn {
  border: none;
  right: var(--inline-padding-of-input);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0.1em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--active-color);
  opacity: 0;
  visibility: hidden;
}

.input {
  color: var(--input-text-color);
  width: 100%;
  margin-inline: min(2em,calc(var(--inline-padding-of-input) + var(--gap)));
  background: none;
  border: none;
}

.input:focus {
  outline: none;
}

.input::placeholder {
  color: var(--text-color)
}

.input:focus ~ .fancy-bg {
  border: 1px solid var(--active-color);
  background: var(--focus-input-bg-color);
}

.input:focus ~ .search {
  fill: var(--active-color);
}

.input:valid ~ .close-btn {
  opacity: 1;
  visibility: visible;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
  -webkit-transition-delay: 9999s;
}
</style>
