import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
    const theme = useStorage<Theme>('app-theme', 'system')
    const systemDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

    // Sistem temasını dinle
    watch(
        () => theme.value,
        (newTheme) => {
            if (newTheme === 'system') {
                applyTheme(systemDark.value ? 'dark' : 'light')
            } else {
                applyTheme(newTheme)
            }
        },
        { immediate: true }
    )

    // Sistem teması değişikliğini dinle
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        systemDark.value = e.matches
        if (theme.value === 'system') {
            applyTheme(systemDark.value ? 'dark' : 'light')
        }
    })

    function applyTheme(mode: 'light' | 'dark') {
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(mode)
    }

    return {
        theme,
        systemDark,
        setTheme: (newTheme: Theme) => {
            theme.value = newTheme
        }
    }
}
