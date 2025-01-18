<script setup lang="ts">
import { ref } from 'vue'
import MainSidebar from './MainSidebar.vue'
import MainHeader from './MainHeader.vue'

const isSidebarCollapsed = ref(false)
</script>

<template>
  <div class="layout">
    <MainSidebar
      v-model:collapsed="isSidebarCollapsed"
      class="layout-sidebar"
    />

    <div class="layout-main">
      <MainHeader
        class="layout-header"
        @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed"
      />

      <main class="layout-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.layout-sidebar {
  flex-shrink: 0;
  background-color: #1e293b;
  transition: width 0.3s;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.layout-header {
  flex-shrink: 0;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
}

.layout-content {
  flex: 1;
  overflow: auto;
  background-color: #f1f5f9;
}
</style>
