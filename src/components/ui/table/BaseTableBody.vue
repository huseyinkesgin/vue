<script setup lang="ts">
import { computed } from 'vue'

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
    selectable?: boolean
    selectedRows?: any[]
    activeRow?: any
}>()

const emit = defineEmits<{
    'select': [rows: any[]]
    'row-click': [row: any]
    'row-dblclick': [row: any]
    'keydown': [event: KeyboardEvent]
}>()

function isSelected(row: any) {
    return props.selectedRows?.some(selectedRow => selectedRow.id === row.id)
}

function toggleSelect(row: any) {
    if (!props.selectedRows) return

    const newSelectedRows = isSelected(row)
        ? props.selectedRows.filter(r => r.id !== row.id)
        : [...props.selectedRows, row]

    emit('select', newSelectedRows)
}

function isActive(row: any) {
    return props.activeRow?.id === row?.id
}
</script>

<template>
    <tbody>
        <tr v-if="loading">
            <td :colspan="columns.length + (selectable ? 1 : 0)" class="loading-cell">
                Yükleniyor...
            </td>
        </tr>
        <tr v-else-if="!data.length">
            <td :colspan="columns.length + (selectable ? 1 : 0)" class="empty-cell">
                Veri bulunamadı
            </td>
        </tr>
        <template v-else>
            <tr
                v-for="row in data"
                :key="row.id"
                :class="{ 'row-active': isActive(row) }"
                tabindex="0"
                @click="emit('row-click', row)"
                @dblclick="emit('row-dblclick', row)"
                @keydown="$emit('keydown', $event)"
            >
                <td v-if="selectable" class="checkbox-cell">
                    <input
                        type="checkbox"
                        tabindex="-1"
                        :checked="isSelected(row)"
                        @click.stop="toggleSelect(row)"
                    >
                </td>
                <td
                    v-for="column in columns"
                    :key="column.key"
                    :style="{ textAlign: column.align }"
                >
                    <slot
                        :name="`column-${column.key}`"
                        :row="row"
                        :column="column"
                    >
                        {{ row[column.key] }}
                    </slot>
                </td>
            </tr>
        </template>
    </tbody>
</template>

<style scoped>
.loading-cell,
.empty-cell {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-secondary);
}

.checkbox-cell {
    width: 40px;
    text-align: center;
    padding: 0.75rem;
}

td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-border);
}

tr.row-active {
    background-color: var(--color-primary-light);
}

tr.row-active:hover {
    background-color: var(--color-primary-light) !important;
}
</style>
