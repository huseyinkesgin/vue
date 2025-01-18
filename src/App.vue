<script setup lang="ts">
import ToastContainer from './components/ui/ToastContainer.vue'
import LoadingOverlay from './components/ui/LoadingOverlay.vue'
</script>

<template>
  <ToastContainer />
  <LoadingOverlay />
  <RouterView />
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
