import { ref, computed } from 'vue'

interface ValidationRule {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: any) => boolean | string
}

interface ValidationRules {
    [key: string]: ValidationRule
}

export function useValidation(rules: ValidationRules) {
    const errors = ref<Record<string, string>>({})
    const isValid = computed(() => Object.keys(errors.value).length === 0)

    function validate(data: any): boolean {
        errors.value = {}
        let isValid = true

        Object.entries(rules).forEach(([field, rule]) => {
            const value = data[field]

            // Required kontrolü
            if (rule.required && !value) {
                errors.value[field] = 'Bu alan zorunludur'
                isValid = false
                return
            }

            if (value) {
                // Min length kontrolü
                if (rule.minLength && value.length < rule.minLength) {
                    errors.value[field] = `En az ${rule.minLength} karakter olmalıdır`
                    isValid = false
                    return
                }

                // Max length kontrolü
                if (rule.maxLength && value.length > rule.maxLength) {
                    errors.value[field] = `En fazla ${rule.maxLength} karakter olmalıdır`
                    isValid = false
                    return
                }

                // Pattern kontrolü
                if (rule.pattern && !rule.pattern.test(value)) {
                    errors.value[field] = 'Geçersiz format'
                    isValid = false
                    return
                }

                // Özel kontrol
                if (rule.custom) {
                    const result = rule.custom(value)
                    if (typeof result === 'string') {
                        errors.value[field] = result
                        isValid = false
                    } else if (!result) {
                        errors.value[field] = 'Geçersiz değer'
                        isValid = false
                    }
                }
            }
        })

        return isValid
    }

    return {
        errors,
        isValid,
        validate
    }
}
