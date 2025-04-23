<template>
  <div class="text-left w-full">
    <button
      type="button"
      class="px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer"
      @click="onSwitch"
    >
      <!-- Added cursor-pointer class above -->
      <span v-if="currentMode === 'register'" class="mr-1">←</span>
      {{
        currentMode === 'login' ? 'Chưa có tài khoản? Tạo tài khoản' : 'Đã có tài khoản? Đăng nhập'
      }}
      <span v-if="currentMode === 'login'" class="ml-1">→</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  currentMode: {
    type: String as () => 'login' | 'register', // More specific type
    required: true,
  },
})

const emit = defineEmits(['switch'])

function onSwitch() {
  emit('switch')
}
</script>
