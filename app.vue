<script setup lang="ts">
useHead({
  title: 'Homepage | WebSite ',
  meta: [
    { name: 'description', content: 'Açıklama' },
    { name: 'keywords', content: 'homepage, nuxt, seo' },
  ],
})

useSeoMeta({
  title: '...',
  description: 'This is my site, let me tell you all about it.',

})

const router = useRouter()
</script>

<template>
  <NuxtPage />
</template>
