<script setup lang="ts">
// import { provide } from 'vue'

const options = ['movie', 'tv']
const router = useRouter()
const movieStore = useMovieStore()

const selectedParam = ref<'movie' | 'tv'>()

watch(() => movieStore.selected, (newSelected) => {
  if (newSelected) {
    router.push({
      name: 'media',
      params: {
        media: movieStore.selected,
      },
    },

    )
  }
})

// provide('selectedMedia', 'selected')
</script>

<template>
  <nav class="fixed top-0 z-10 w-full bg-gray-100 dark:bg-neutral-900 text-white shadow-xl">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-row-reverse  items-center h-16">
        <div class="flex ml-8 mr-5 mt-1 space-x-4">
          <div class="toggle-switch">
            <label class="switch-label" @click="toggleColorMode()">
              <input type="checkbox" class="checkbox" :checked="isDarkMode" @change="toggleColorMode">
              <span class="slider" />
            </label>
          </div>
        </div>

        <div class="flex mt-1 ml-6 space-x-4 ">
          <USelectMenu
            v-model="selectedParam" color="gray" size="md" placeholder="" :options="options" class="w-20"
            @update:model-value="(nw) => router.push({
              name: 'media',
              params: {
                media: nw,
              },
            })"
          />
        </div>
      </div>
    </div>
  </nav>

  <slot name="header" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
