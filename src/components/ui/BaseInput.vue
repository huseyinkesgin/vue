<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <div class="form-group">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :value="modelValue"
        :type="type || 'text'"
        :placeholder="placeholder"
        :required="required"
        class="input"
        :class="{ 'input-error': error }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.label {
  width: 120px; /* Sabit genişlik */
  padding-top: 0.5rem; /* Input ile hizalamak için */
  font-weight: 500;
  color: #374151;
}

.input-wrapper {
  flex: 1;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.input-error {
  border-color: #ef4444;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ef4444;
}
</style>
