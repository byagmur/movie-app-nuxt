<script setup lang="ts">
const isDark = ref<boolean>(useColorMode().value === 'dark')

function goBack() {
  window.history.back()
}
</script>

<template>
  <div class="  flex flex-row-reverse w-full shadow-lg  items-center justify-start gap-5 py-4 px-10">
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
  </div>
  <slot name="detail" />
</template>
