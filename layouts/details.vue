<script setup lang="ts">
const isDark = ref<boolean>(useColorMode().value === 'dark')

function goBack() {
  window.history.back()
}
</script>

<template>
  <!-- <div class=" bg-red flex flex-row-reverse w-full shadow-lg  items-center justify-start gap-5 py-4 px-10">
    <UToggle
      v-model="isDark"
      off-icon="i-heroicons-sun"
      on-icon="i-heroicons-moon"
      size="xl"
      @click="toggleColorMode()"
    />

    <div class="flex mt-1 space-x-4 ">
      <UButton
        class="bg-transparent cursor-pointer transition  duration-300 ease-in-out inter-tight text-gray-600 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400"
        @click="goBack"
        size="xl"
        icon="i-heroicons-arrow-left"
      />
    </div>
  </div> -->
  <div class="top-0 z-10 w-full  text-white ">
    <div class="fixed z-50 bg-gray-100 dark:bg-neutral-900 flex w-full shadow-lg items-center gap-5 py-5 px-10 justify-between">
      <div class="flex items-center">
        <UButton
        class="bg-transparent cursor-pointer transition  duration-300 ease-in-out inter-tight text-gray-600 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400"
        @click="goBack"
        size="xl"
        icon="i-heroicons-arrow-left"
        color="transparent"
      >Back</UButton>
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
  </div>
  <slot name="detail" />
</template>
