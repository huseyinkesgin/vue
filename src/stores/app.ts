import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const globalLoading = ref(false)
    const loadingTasks = ref(new Set<string>())

    function startLoading(taskId?: string) {
        if (taskId) {
            loadingTasks.value.add(taskId)
        }
        globalLoading.value = true
    }

    function stopLoading(taskId?: string) {
        if (taskId) {
            loadingTasks.value.delete(taskId)
        }
        if (!taskId || loadingTasks.value.size === 0) {
            globalLoading.value = false
        }
    }

    return {
        globalLoading,
        loadingTasks,
        startLoading,
        stopLoading
    }
})
