<script setup lang="ts">
defineProps<{
  modelValue: string | number
  value: string | number
  label?: string
  name: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <label :class="['radio-label', size ? `radio-${size}` : 'radio-md']">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      class="radio-input"
      @change="$emit('update:modelValue', value)"
    />
    <span class="radio-control"></span>
    <span v-if="label" class="radio-text">{{ label }}</span>
  </label>
</template>

<style scoped>
.radio-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1rem;
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-control {
  position: relative;
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  margin-right: 0.5rem;
  transition: all 0.2s;
}

.radio-control::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 0.625rem;
  height: 0.625rem;
  background-color: #3b82f6;
  border-radius: 50%;
  transition: transform 0.2s;
}

.radio-input:checked + .radio-control {
  border-color: #3b82f6;
}

.radio-input:checked + .radio-control::after {
  transform: translate(-50%, -50%) scale(1);
}

.radio-input:focus + .radio-control {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.radio-input:disabled + .radio-control {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  cursor: not-allowed;
}

.radio-text {
  font-size: 0.875rem;
  color: #374151;
}

/* Size variants */
.radio-sm .radio-control {
  width: 1rem;
  height: 1rem;
}

.radio-sm .radio-control::after {
  width: 0.5rem;
  height: 0.5rem;
}

.radio-lg .radio-control {
  width: 1.5rem;
  height: 1.5rem;
}

.radio-lg .radio-control::after {
  width: 0.75rem;
  height: 0.75rem;
}

.radio-input:disabled ~ .radio-text {
  color: #9ca3af;
}
</style>
