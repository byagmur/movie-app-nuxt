<script setup lang="ts">
const isDark = ref<boolean>(useColorMode().value === 'dark')
const router = useRouter()

</script>

<template>
  <div class="top-0 z-10 w-full  text-white ">
    <div class="fixed z-50 bg-transparent flex w-full items-center gap-5 py-5 px-10 justify-between">
      <div class="flex items-center">
        <UButton
        class="bg-transparent cursor-pointer transition  duration-300 ease-in-out inter-tight text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400"
        @click="$router.back"
        size="xl"
        icon="i-heroicons-arrow-left"
        color="transparent"
      >Back</UButton>
      </div>
    </div>
  </div>
  <slot name="detail" />
</template>
