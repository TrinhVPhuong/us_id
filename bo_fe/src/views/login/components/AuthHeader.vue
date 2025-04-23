<template>
  <header class="mb-6 text-white">
    <h1 class="text-3xl font-bold">{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
