<script setup lang="ts">
defineProps<{
  columns: {
    key: string
    label: string
    sortable?: boolean
    width?: string
    align?: 'left' | 'center' | 'right'
  }[]
  selectable?: boolean
  allSelected?: boolean
}>()

defineEmits<{
  'sort': [key: string, direction: 'asc' | 'desc']
  'select-all': []
}>()
</script>

<template>
  <thead>
    <tr>
      <th v-if="selectable" class="select-column" tabindex="-1">
        <input
          type="checkbox"
          tabindex="-1"
          :checked="allSelected"
          @change="$emit('select-all')"
        />
      </th>
      <th
        v-for="column in columns"
        :key="column.key"
        tabindex="-1"
        :style="{ width: column.width, textAlign: column.align || 'left' }"
        :class="{ sortable: column.sortable }"
        @click="column.sortable && $emit('sort', column.key, 'asc')"
      >
        {{ column.label }}
        <span v-if="column.sortable" class="sort-icon">▼</span>
      </th>
    </tr>
  </thead>
</template>

<style scoped>
th {
  padding: 0.75rem;
  font-weight: 600;
  text-align: left;
  color: #374151;
  background-color: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background-color: #f3f4f6;
}

.sort-icon {
  display: inline-block;
  margin-left: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.5;
}

.select-column {
  width: 40px;
  text-align: center;
}
</style>
