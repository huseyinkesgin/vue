<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import BaseTable from '@/components/ui/table/BaseTable.vue'
import IconButton from '@/components/ui/IconButton.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import CityModal from './CityModal.vue'
import { useCityStore } from '@/stores/CityStore'
import { useToast } from '@/composables/useToast'
import { useAppStore } from '@/stores/app'
import { City } from '@/models/City'
import { CITY_TABLE_COLUMNS } from './constants'

const cityStore = useCityStore()
const toast = useToast()
const appStore = useAppStore()

const showModal = ref(false)
const editMode = ref(false)
const selectedCity = ref<City | null>(null)
const showDeleteDialog = ref(false)
const cityToDelete = ref<City | null>(null)

const tableData = ref<City[]>([])
const selectedRows = ref<City[]>([])
const activeRow = ref<City | null>(null)

watch(() => cityStore.cities, (newData) => {
    tableData.value = [...newData]
    if (newData.length > 0 && !activeRow.value) {
        activeRow.value = newData[0]
    }
}, { immediate: true, deep: true })

function handleAdd() {
    editMode.value = false
    selectedCity.value = null
    showModal.value = true
}

function handleEdit(city: City) {
    editMode.value = true
    selectedCity.value = city
    showModal.value = true
}

async function handleDelete(city: City) {
    cityToDelete.value = city
    showDeleteDialog.value = true
}

async function confirmDelete() {
    if (!cityToDelete.value) return

    const cityId = cityToDelete.value.id
    try {
        appStore.startLoading(`deleteCity-${cityId}`)
        await cityStore.deleteCity(cityId)
        toast.show('Şehir başarıyla silindi', 'success')
        await cityStore.fetchCities()
    } catch (error) {
        if (error instanceof Error) {
            toast.show(error.message, 'error')
        } else {
            toast.show('Şehir silinirken hata oluştu', 'error')
        }
    } finally {
        appStore.stopLoading(`deleteCity-${cityId}`)
        showDeleteDialog.value = false
        cityToDelete.value = null
    }
}

async function handleSave(cityData: Partial<City>) {
    try {
        appStore.startLoading('saveCity')
        let savedCity: City | undefined

        if (editMode.value && cityData.id) {
            savedCity = await cityStore.updateCity(cityData.id, cityData)
            toast.show('Şehir başarıyla güncellendi', 'success')
        } else {
            savedCity = await cityStore.createCity(cityData)
            toast.show('Şehir başarıyla eklendi', 'success')
        }

        showModal.value = false
        await cityStore.fetchCities()

        // Kaydedilen şehri bul ve aktif yap
        nextTick(() => {
            const updatedCity = cityStore.cities.find(c => c.code === cityData.code)
            if (updatedCity) {
                activeRow.value = updatedCity // Aktif satırı güncelle
                const activeElement = document.querySelector('tr.row-active')
                if (activeElement instanceof HTMLElement) {
                    activeElement.focus()
                }
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            toast.show(error.message, 'error')
        } else {
            toast.show('İşlem sırasında hata oluştu', 'error')
        }
    } finally {
        appStore.stopLoading('saveCity')
    }
}

watch(() => showModal.value, (newVal) => {
    if (!newVal && activeRow.value) {
        nextTick(() => {
            const activeElement = document.querySelector('tr.row-active')
            if (activeElement instanceof HTMLElement) {
                activeElement.focus()
            }
        })
    }
})

onMounted(async () => {
    await cityStore.fetchCities()
    if (tableData.value.length > 0) {
        activeRow.value = tableData.value[0]
    }
})
</script>

<template>
    <div>
        <BaseTable
            :columns="CITY_TABLE_COLUMNS"
            :data="tableData"
            :loading="cityStore.loading"
            hoverable
            striped
            selectable
            v-model:selectedRows="selectedRows"
            v-model="activeRow"
            @add="handleAdd"
            @edit="handleEdit"
            @delete="handleDelete"
            @refresh="cityStore.fetchCities"
            @row-dblclick="handleEdit"
        >
            <!-- İsActive sütunu için özel render -->
            <template #column-isActive="{ row }">
                <span
                    class="status-badge"
                    :class="row.isActive ? 'status-active' : 'status-inactive'"
                >
                    {{ row.isActive ? 'Aktif' : 'Pasif' }}
                </span>
            </template>

            <!-- Tablo footer'ı -->
            <template #footer>
                <div class="table-footer">
                    <div>{{ selectedRows.length }} şehir seçildi</div>
                    <div>Toplam {{ tableData.length }} şehir</div>
                </div>
            </template>
        </BaseTable>

        <CityModal
            v-model:show="showModal"
            :edit-mode="editMode"
            :city-data="selectedCity"
            @save="handleSave"
        />

        <BaseDialog
            v-model="showDeleteDialog"
            title="Şehir Silme"
            :message="`'${cityToDelete?.name}' şehrini silmek istediğinize emin misiniz?`"
            @confirm="confirmDelete"
        />
    </div>
</template>

<style scoped>
.status-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-active {
    background-color: var(--color-success);
    color: white;
}

.status-inactive {
    background-color: var(--color-error);
    color: white;
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.table-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
}
</style>
