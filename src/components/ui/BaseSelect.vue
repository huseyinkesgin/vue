<script setup lang="ts">
interface Option {
  value: string | number | boolean
  label: string
}

defineProps<{
  modelValue: string | number | boolean
  label?: string
  options: Option[]
  placeholder?: string
  required?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number | boolean]
}>()
</script>

<template>
  <div class="select-group">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="select-wrapper">
      <select
        :value="modelValue"
        :required="required"
        class="select"
        :class="{ 'select-error': error }"
        @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="String(option.value)"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.select-group {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.label {
  width: 120px;
  padding-top: 0.5rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.select-wrapper {
  flex: 1;
  position: relative;
}

.select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 0.875rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.select-error {
  border-color: var(--color-error);
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-error);
}
</style>
