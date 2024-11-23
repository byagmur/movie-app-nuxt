<script setup lang="ts">
// import { provide } from 'vue'

const options = [
  { label: 'Movie', value: 'movie' },
  { label: 'Tv', value: 'tv' },
]

const router = useRouter()
const selected = ref()
const mediaStore = useMediaStore()

const selectedParam = ref<'movie' | 'tv'>((router.currentRoute.value.params.media as 'movie' | 'tv'))

onMounted(async () => {
  await mediaStore.fetchGenres(selected)
})

// watch(() => selected.value, (newSelected) => {
//   if (newSelected) {
//     router.push({
//       name: 'media',
//       params: {
//         media: selected.value,
//       },
//     },
//     )
//   }
// })
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

const isDark = ref<boolean>(useColorMode().value === 'dark')

// const formattedValue = computed (() => {
//   return selected.value.charAt(0).toUpperCase() + selected.value.slice(1)
// })

// provide('selectedMedia', 'selected')
</script>

<template>
  <div class="top-0 z-10 w-full dark:bg-neutral-900 text-white shadow-xl">
    <div class="fixed z-50 bg-gray-100 dark:bg-neutral-900 flex w-full shadow-lg items-center gap-5 py-5 px-10 justify-between">
      <div class="flex items-center">
        <URadioGroup
          v-model="selectedParam"
          size="xl"
          :options="options"
          class=" gap-4 w-22 border-none"
          orientation="horizontal"
        />
      </div>

      <div class="flex items-center">
        <UToggle
          v-model="isDark"
          off-icon="i-heroicons-sun"
          on-icon="i-heroicons-moon"
          size="lg"
          @click="toggleColorMode()"
        />
      </div>
    </div>

    <slot name="header" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.uradio-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.inter-tight {
  font-family: "Inter Tight", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 0.3px;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 25px;
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
}

.switch-label {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--dark);
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid var(--dark);
}

.checkbox {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: 0.3s;
}

.checkbox:checked~.slider {
  background-color: var(--light);
}

.slider::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: inset 8px -2px 0px 0px var(--light);
  background-color: var(--dark);
  transition: 0.3s;
}

.checkbox:checked~.slider::before {
  transform: translateX(20px);
  background-color: var(--dark);
  box-shadow: none;
}
</style>
