import { ref } from 'vue'

interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
    function show(message: string, type: Toast['type'] = 'info', duration = 3000) {
        const id = nextId++
        const toast: Toast = {
            id,
            message,
            type,
            duration
        }

        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => {
                remove(id)
            }, duration)
        }
    }

    function remove(id: number) {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index > -1) {
            toasts.value.splice(index, 1)
        }
    }

    return {
        toasts,
        show,
        remove
    }
}
