<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number
  error?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="textarea-group">
    <label v-if="label" class="textarea-label">
      {{ label }}
    </label>
    <div class="textarea-wrapper">
      <textarea
        class="textarea"
        :class="{ 'textarea-error': error }"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      />
      <span v-if="error" class="textarea-error-message">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.textarea-group {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.textarea-label {
  width: 120px;
  padding-top: 0.5rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.textarea-wrapper {
  flex: 1;
}

.textarea {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: 0.875rem;
  resize: vertical;
  min-height: 80px;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-hover);
}

.textarea:disabled {
  background-color: var(--color-bg-secondary);
  cursor: not-allowed;
}

.textarea-error {
  border-color: var(--color-error);
}

.textarea-error:focus {
  box-shadow: 0 0 0 2px var(--color-error);
}

.textarea-error-message {
  font-size: 0.75rem;
  color: var(--color-error);
}
</style>
