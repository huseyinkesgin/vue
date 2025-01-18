<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div class="checkbox-group">
    <div class="label-spacer"></div>
    <label class="checkbox-label">
      <input
        type="checkbox"
        :checked="modelValue"
        class="checkbox"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span v-if="label" class="label-text">{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.label-spacer {
  width: 120px; /* Label genişliği kadar boşluk */
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

.label-text {
  font-size: 0.875rem;
  color: #374151;
}
</style>
