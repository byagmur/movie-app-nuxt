<script setup lang="ts">
const isDark = ref<boolean>(useColorMode().value === 'dark')

const isDarkIcon = computed(() => {
  return isDark.value ? 'heroicons-moon' : 'i-heroicons-sun'
})
</script>

<template>
  <UToggle
    v-model="isDark"
    :off-icon="isDarkIcon"
    :on-icon="isDarkIcon"
    size="lg"
    @click="toggleColorMode()"
  />
</template>
