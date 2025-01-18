<script setup lang="ts">
import { computed, onMounted, watch, ref, nextTick } from 'vue'
import BaseTableHeader from './BaseTableHeader.vue'
import BaseTableBody from './BaseTableBody.vue'
import BaseTableFooter from './BaseTableFooter.vue'
import IconButton from '../IconButton.vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

const props = defineProps<{
  columns: Column[]
  data: any[]
  loading?: boolean
  hoverable?: boolean
  striped?: boolean
  selectable?: boolean
  selectedRows?: any[]
  modelValue?: any
}>()

const emit = defineEmits<{
  'update:selectedRows': [rows: any[]]
  'update:modelValue': [value: any]
  'row-click': [row: any]
  'row-dblclick': [row: any]
  'add': []
  'edit': [row: any]
  'delete': [row: any]
  'refresh': []
  'print': []
  'export': []
}>()

const tableClasses = computed(() => ({
  'table-hoverable': props.hoverable,
  'table-striped': props.striped,
  'table-selectable': props.selectable
}))

const activeRow = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const activeRowRef = ref<HTMLElement | null>(null)

watch(() => activeRow.value, () => {
  nextTick(() => {
    const activeElement = document.querySelector('tr.row-active')
    if (activeElement instanceof HTMLElement) {
      activeElement.focus()
    }
  })
})

onMounted(() => {
  if (props.data.length > 0 && !activeRow.value) {
    activeRow.value = props.data[0]
  }
})

watch(() => props.data, (newData) => {
  if (newData.length > 0 && !activeRow.value) {
    activeRow.value = newData[0]
  }
}, { immediate: true })

function handleKeyDown(e: KeyboardEvent) {
  if (!props.data.length) return

  if (!['ArrowDown', 'ArrowUp', 'Enter', 'Insert'].includes(e.key)) return

  e.preventDefault()

  const currentIndex = props.data.findIndex(row => row === activeRow.value)

  switch(e.key) {
    case 'ArrowDown':
      if (currentIndex < props.data.length - 1) {
        activeRow.value = props.data[currentIndex + 1]
      }
      break
    case 'ArrowUp':
      if (currentIndex > 0) {
        activeRow.value = props.data[currentIndex - 1]
      }
      break
    case 'Enter':
      if (activeRow.value) {
        emit('edit', activeRow.value)
      }
      break
    case 'Insert':
      emit('add')
      break
  }
}

function handleRowClick(row: any) {
  activeRow.value = row
  emit('row-click', row)
}

function handleRowDblClick(row: any) {
  emit('row-dblclick', row)
  emit('edit', row)
}

function handleRowSelect(rows: any[]) {
  emit('update:selectedRows', rows)
}
</script>

<template>
  <div class="table-container">
    <div class="table-actions">
      <div class="table-actions-left">
        <IconButton
          icon="mdi:plus"
          title="Yeni"
          @click="$emit('add')"
        />
        <IconButton
          icon="mdi:pencil"
          title="Düzenle"
          :disabled="!activeRow"
          @click="$emit('edit', activeRow)"
        />
        <IconButton
          icon="mdi:delete"
          title="Sil"
          variant="danger"
          :disabled="!activeRow"
          @click="$emit('delete', activeRow)"
        />
        <IconButton
          icon="mdi:refresh"
          title="Yenile"
          @click="$emit('refresh')"
        />
      </div>
      <div class="table-actions-right">
        <IconButton
          icon="mdi:printer"
          title="Yazdır"
          disabled
          @click="$emit('print')"
        />
        <IconButton
          icon="mdi:file-export"
          title="Dışa Aktar"
          disabled
          @click="$emit('export')"
        />
        <IconButton
          icon="mdi:checkbox-multiple-marked"
          title="Seçim Modu"
          :variant="selectable ? 'primary' : 'secondary'"
          disabled
        />
      </div>
    </div>

    <div class="table-wrapper">
      <table class="table" :class="tableClasses">
        <BaseTableHeader
          :columns="columns"
          :selectable="selectable"
          :selected-rows="selectedRows"
          :data="data"
          @select="handleRowSelect"
        />

        <BaseTableBody
          ref="tableBodyRef"
          :columns="columns"
          :data="data"
          :loading="loading"
          :selectable="selectable"
          :selected-rows="selectedRows"
          :active-row="activeRow"
          @select="handleRowSelect"
          @row-click="handleRowClick"
          @row-dblclick="handleRowDblClick"
          @keydown="handleKeyDown"
        >
          <template
            v-for="(_, name) in $slots"
            :key="name"
            #[name]="slotData"
          >
            <slot :name="name" v-bind="slotData" />
          </template>
        </BaseTableBody>

        <BaseTableFooter v-if="$slots.footer">
          <slot name="footer" />
        </BaseTableFooter>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  outline: none;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.table-actions-left,
.table-actions-right {
  display: flex;
  gap: 0.5rem;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--color-bg-primary);
}

.table-hoverable :deep(tr:hover:not(thead tr)) {
  background-color: var(--color-bg-secondary);
}

.table-striped :deep(tr:nth-child(even):not(thead tr)) {
  background-color: var(--color-bg-secondary);
}

.table-selectable :deep(tr:not(thead tr)) {
  cursor: pointer;
}

:deep(tr) {
  outline: none;
}

:deep(tr.row-active) {
  background-color: rgba(var(--color-primary-rgb), 0.1) !important;
}

:deep(tr.row-active:focus) {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}
</style>
