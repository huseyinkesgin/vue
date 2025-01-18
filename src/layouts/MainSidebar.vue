<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const router = useRouter()
const route = useRoute()

const menuItems = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    icon: 'mdi:view-dashboard',
    path: '/'
  },
  {
    name: 'cities',
    label: 'Şehirler',
    icon: 'mdi:city',
    path: '/cities'
  }
]

const sidebarWidth = computed(() => props.collapsed ? '64px' : '240px')

const isActive = (path: string) => route.path === path
</script>

<template>
  <aside
    class="sidebar"
    :style="{ width: sidebarWidth }"
  >
    <div class="logo">
      <span v-if="!collapsed">Admin Panel</span>
      <span v-else>AP</span>
    </div>

    <nav class="menu">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="menu-item"
        :class="{ active: isActive(item.path) }"
      >
        <Icon :icon="item.icon" class="menu-icon" />
        <span v-if="!collapsed" class="menu-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="collapse-button" @click="$emit('update:collapsed', !collapsed)">
      {{ collapsed ? '→' : '←' }}
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  border-bottom: 1px solid #2d3a4f;
}

.menu {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 0.375rem;
  white-space: nowrap;
  overflow: hidden;
}

.menu-item:hover {
  background-color: #2d3a4f;
  color: white;
}

.menu-item.active {
  background-color: #3b82f6;
  color: white;
}

.menu-icon {
  flex-shrink: 0;
  font-size: 1.25rem;
}

.collapse-button {
  padding: 1rem;
  color: #94a3b8;
  cursor: pointer;
  text-align: center;
}

.collapse-button:hover {
  color: white;
}
</style>
