<script setup lang="ts">
onMounted(() => {
  useRouter().push({
    name: 'media',
    params: {
      media: 'movie',
    },
  })
})
</script>

<template>
  <NuxtLayout />
</template>
