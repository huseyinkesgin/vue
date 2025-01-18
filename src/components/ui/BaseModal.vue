<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import BaseButton from './BaseButton.vue'
import IconButton from './IconButton.vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  persistent?: boolean
  hideClose?: boolean
  zIndex?: number
  editMode?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'save': []
  'reset': []
  'delete': []
}>()

const modalRef = ref<HTMLElement | null>(null)
const codeInputRef = ref<HTMLElement | null>(null)

// ESC tuşu ile kapatma
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape)
    nextTick(() => {
      const firstInput = modalRef.value?.querySelector('input')
      if (firstInput) {
        firstInput.focus()
      }
    })
  } else {
    document.removeEventListener('keydown', handleEscape)
  }
})

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && !props.persistent) {
    closeModal()
  }
}

function closeModal() {
  emit('update:modelValue', false)
  emit('close')
}

// Modal dışına tıklama ile kapatma
function handleOutsideClick(e: MouseEvent) {
  if (modalRef.value && !modalRef.value.contains(e.target as Node) && !props.persistent) {
    closeModal()
  }
}

// Tab döngüsünü yönet
function handleTab(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    const focusableElements = modalRef.value?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) || []

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }
}

// Klavye kısayollarını yönet
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    const focusableElements = modalRef.value?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) || []

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }
}

// Ctrl+S handler'ı
function handleCtrlS(e: KeyboardEvent) {
  if (props.modelValue && e.key.toLowerCase() === 's' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    emit('save')
  }
}

// Event listener'ları yönet
onMounted(() => {
  // Global olarak event listener ekle
  document.addEventListener('keydown', handleCtrlS)
})

onUnmounted(() => {
  // Component unmount olduğunda event listener'ı kaldır
  document.removeEventListener('keydown', handleCtrlS)
})
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="modelValue"
        class="modal-backdrop"
        :style="{ zIndex: zIndex || 1000 }"
        @click="handleOutsideClick"
      >
        <transition name="modal-pop">
          <div
            v-if="modelValue"
            ref="modalRef"
            class="modal"
            :class="`modal-${size || 'md'}`"
            @keydown="handleKeyDown"
            @click.stop
          >
            <div class="modal-header">
              <h3 class="modal-title">{{ title }}</h3>
              <div class="modal-actions">
                <IconButton
                  icon="mdi:content-save"
                  variant="primary"
                  title="Kaydet"
                  @click="$emit('save')"
                />
                <IconButton
                  icon="mdi:refresh"
                  variant="secondary"
                  title="Temizle"
                  @click="$emit('reset')"
                />
                <IconButton
                  v-if="editMode"
                  icon="mdi:delete"
                  variant="danger"
                  title="Sil"
                  @click="$emit('delete')"
                />
                <IconButton
                  icon="mdi:close"
                  variant="secondary"
                  title="Kapat"
                  @click="closeModal"
                />
              </div>
            </div>

            <div class="modal-content">
              <slot :codeInputRef="codeInputRef" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal {
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Modal sizes */
.modal-sm { width: 300px; }
.modal-md { width: 500px; }
.modal-lg { width: 800px; }
.modal-xl { width: 1140px; }
.modal-full { width: 90vw; }

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
}

:deep(input:focus),
:deep(select:focus),
:deep(textarea:focus) {
  background-color: #fff8dc !important;
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}
</style>
