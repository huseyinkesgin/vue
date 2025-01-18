<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@prisma/client'

const users = ref<User[]>([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Veri yüklenirken hata:', error)
  }
})
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
