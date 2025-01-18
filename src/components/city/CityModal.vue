<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import type { City } from '@/models/City'

const props = defineProps<{
  show: boolean
  editMode: boolean
  cityData?: City
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  'save': [data: Partial<City>]
  'delete': [city: City]
}>()

const formData = ref({
  code: '',
  name: '',
  description: '',
  isActive: true
})

const statusOptions = [
  { value: true, label: 'Aktif' },
  { value: false, label: 'Pasif' }
]

watch(() => props.cityData, (newData) => {
  if (newData) {
    formData.value = {
      code: newData.code,
      name: newData.name,
      description: newData.description || '',
      isActive: newData.isActive
    }
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  formData.value = {
    code: '',
    name: '',
    description: '',
    isActive: true
  }
}

function handleSave() {
  emit('save', {
    ...formData.value,
    id: props.cityData?.id
  })
}
</script>

<template>
  <BaseModal
    :model-value="show"
    :title="editMode ? 'Şehir Düzenle' : 'Yeni Şehir'"
    size="md"
    :edit-mode="editMode"
    @update:model-value="$emit('update:show', $event)"
    @save="handleSave"
    @reset="resetForm"
    @delete="cityData && $emit('delete', cityData)"
  >
    <template #default="{ codeInputRef }">
      <form @submit.prevent="handleSave" class="city-form">
        <BaseInput
          ref="codeInputRef"
          v-model="formData.code"
          label="Kod"
          required

        />

        <BaseInput
          v-model="formData.name"
          label="Şehir Adı"
          required
        />

        <BaseSelect
          v-model="formData.isActive"
          label="Durum"
          :options="statusOptions"
        />

        <BaseTextarea
          v-model="formData.description"
          label="Açıklama"
          :rows="3"
        />
      </form>
    </template>
  </BaseModal>
</template>

<style scoped>
.city-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}
</style>
