<script setup lang="ts">
// Footer içeriği slot ile geleceği için props gerekmiyor
</script>

<template>
  <tfoot>
    <tr>
      <td :colspan="100">
        <slot />
      </td>
    </tr>
  </tfoot>
</template>

<style scoped>
td {
  padding: 0.75rem;
  background-color: #f9fafb;
  border-top: 2px solid #e5e7eb;
}
</style>
