<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
    icon: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    disabled?: boolean
}>()

const sizeMap = {
    sm: '16px',
    md: '20px',
    lg: '24px'
}

defineEmits<{
    'click': [event: MouseEvent]
}>()
</script>

<template>
    <button
        class="icon-button"
        :class="[
            `icon-button-${variant || 'primary'}`,
            `icon-button-${size || 'md'}`
        ]"
        :disabled="disabled"
        @click="$emit('click', $event)"
    >
        <Icon
            :icon="icon"
            :width="sizeMap[size || 'md']"
            :height="sizeMap[size || 'md']"
        />
    </button>
</template>

<style scoped>
.icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}

.icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Size variants */
.icon-button-sm {
    padding: 0.375rem;
}

.icon-button-md {
    padding: 0.5rem;
}

.icon-button-lg {
    padding: 0.625rem;
}

/* Color variants */
.icon-button-primary {
    background-color: var(--color-primary);
    color: white;
}

.icon-button-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
}

.icon-button-secondary {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
}

.icon-button-secondary:hover:not(:disabled) {
    background-color: var(--color-border);
}

.icon-button-danger {
    background-color: var(--color-error);
    color: white;
}

.icon-button-danger:hover:not(:disabled) {
    opacity: 0.9;
}

.icon-button-ghost {
    background-color: transparent;
    color: var(--color-text-primary);
}

.icon-button-ghost:hover:not(:disabled) {
    background-color: var(--color-bg-secondary);
}
</style>
