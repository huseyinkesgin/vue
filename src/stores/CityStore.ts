import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { City } from '@/models/City'
import { api } from '@/api/api'

export const useCityStore = defineStore('city', () => {
    const cities = ref<City[]>([])
    const loading = ref(false)
    const selectedCity = ref<City | null>(null)

    async function fetchCities() {
        loading.value = true
        try {
            cities.value = await api.getAll<City>('cities')
        } catch (error) {
            console.error('Şehirler yüklenirken hata:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    async function createCity(city: Omit<City, 'id' | 'createdAt' | 'updatedAt'>) {
        loading.value = true
        try {
            const newCity = await api.create<City>('cities', city)
            cities.value.push(newCity)
            return newCity
        } catch (error) {
            console.error('Şehir eklenirken hata:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    async function updateCity(id: number, city: Partial<City>) {
        loading.value = true
        try {
            const updatedCity = await api.update<City>('cities', id, city)
            const index = cities.value.findIndex(c => c.id === id)
            if (index !== -1) {
                cities.value[index] = updatedCity
            }
            return updatedCity
        } catch (error) {
            console.error('Şehir güncellenirken hata:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    async function deleteCity(id: number) {
        loading.value = true
        try {
            await api.delete('cities', id)
            cities.value = cities.value.filter(city => city.id !== id)
            return true
        } catch (error) {
            console.error('Şehir silinirken hata:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        cities,
        loading,
        selectedCity,
        fetchCities,
        createCity,
        updateCity,
        deleteCity
    }
})
