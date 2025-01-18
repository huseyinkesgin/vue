<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{
    modelValue: boolean
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'confirm': []
    'cancel': []
}>()

function handleConfirm() {
    emit('update:modelValue', false)  // Önce dialog'u kapat
    emit('confirm')                   // Sonra confirm eventi emit et
}

function handleCancel() {
    emit('update:modelValue', false)  // Önce dialog'u kapat
    emit('cancel')                    // Sonra cancel eventi emit et
}
</script>

<template>
    <Teleport to="body">
        <transition name="dialog-fade">
            <div v-if="modelValue" class="dialog-backdrop">
                <transition name="dialog-pop">
                    <div v-if="modelValue" class="dialog">
                        <div class="dialog-content">
                            <div v-if="title" class="dialog-title">
                                {{ title }}
                            </div>
                            <div class="dialog-message">
                                {{ message }}
                            </div>
                            <div class="dialog-actions">
                                <BaseButton
                                    variant="secondary"
                                    @click="handleCancel"
                                >
                                    {{ cancelText || 'İptal' }}
                                </BaseButton>
                                <BaseButton
                                    variant="danger"
                                    @click="handleConfirm"
                                >
                                    {{ confirmText || 'Sil' }}
                                </BaseButton>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.dialog-content {
    background: white;
    padding: 1.5rem;
    margin: 0.5rem;
}

.dialog-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
}

.dialog-message {
    color: var(--color-text-primary);
    margin-bottom: 1.5rem;
}

.dialog-actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
}

/* Backdrop fade transition */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
    transition: opacity 0.2s;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    opacity: 0;
}

/* Dialog pop transition */
.dialog-pop-enter-active,
.dialog-pop-leave-active {
    transition: all 0.3s;
}

.dialog-pop-enter-from,
.dialog-pop-leave-to {
    transform: translate(-50%, -40%);
    opacity: 0;
}
</style>
