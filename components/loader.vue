<script>
</script>

<template>
<div class="loader"></div>
</template>

<style scoped>

.loader {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-sizing: border-box;
  border-top: 8px solid #fff;
  border-left: 8px solid #fff;
  border-right: 8px solid #ff00;
  animation: loader .7s infinite linear;
}

@keyframes loader {
  to {
    transform: rotate(360deg);
  }
}
</style>