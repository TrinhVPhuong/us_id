<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
})

const buttonClass = computed(() => {
  return props.variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'
})
</script>

<template>
  <button :type="type" :class="buttonClass">
    {{ label }}
  </button>
</template>
