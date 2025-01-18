<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import BaseButton from '@/components/ui/BaseButton.vue'
import ThemeSelector from '@/components/ui/ThemeSelector.vue'

defineEmits<{
  'toggle-sidebar': []
}>()

const appStore = useAppStore()
</script>

<template>
  <header class="header">
    <div class="header-left">
      <BaseButton
        variant="secondary"
        class="menu-button"
        @click="$emit('toggle-sidebar')"
      >
        ☰
      </BaseButton>
    </div>

    <div class="header-right">
      <ThemeSelector />
      <BaseButton variant="secondary">
        Profil
      </BaseButton>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-button {
  padding: 0.5rem;
  font-size: 1.25rem;
}
</style>
