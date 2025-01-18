<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import BaseButton from './BaseButton.vue'

const { theme, setTheme } = useTheme()

const themes = [
    { value: 'light', label: 'Açık', icon: '☀️' },
    { value: 'dark', label: 'Koyu', icon: '🌙' },
    { value: 'system', label: 'Sistem', icon: '💻' }
] as const
</script>

<template>
    <div class="theme-selector">
        <BaseButton
            v-for="t in themes"
            :key="t.value"
            :variant="theme === t.value ? 'primary' : 'secondary'"
            class="theme-button"
            @click="setTheme(t.value)"
        >
            <span class="theme-icon">{{ t.icon }}</span>
            <span class="theme-label">{{ t.label }}</span>
        </BaseButton>
    </div>
</template>

<style scoped>
.theme-selector {
    display: flex;
    gap: 0.5rem;
}

.theme-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.theme-icon {
    font-size: 1.25rem;
}
</style>
