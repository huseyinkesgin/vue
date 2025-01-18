<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Sayfa bulunamadı</p>
    <BaseButton @click="router.push('/')">
      Ana Sayfaya Dön
    </BaseButton>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
}

h1 {
  font-size: 6rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  color: #64748b;
  margin-bottom: 2rem;
}
</style>
