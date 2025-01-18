<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="button"
    :class="[`button-${variant || 'primary'}`]"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.button-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.button-secondary {
  background-color: #9ca3af;
  color: white;
  border: none;
}

.button-secondary:hover:not(:disabled) {
  background-color: #6b7280;
}

.button-danger {
  background-color: #ef4444;
  color: white;
  border: none;
}

.button-danger:hover:not(:disabled) {
  background-color: #dc2626;
}
</style>
