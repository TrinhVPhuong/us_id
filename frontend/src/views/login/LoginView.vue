<script setup lang="ts">
import { ref, computed } from 'vue'
import AuthForm from './components/AuthForm.vue'
import AuthHeader from './components/AuthHeader.vue'
import AuthFooter from './components/AuthFooter.vue'
import SwitchAuthLink from './components/SwitchAuthLink.vue'
import type { AuthData } from '@/types/auth' // Import the interface

const currentMode = ref<'login' | 'register'>('register') // Start with register

const formData = ref({
  email: '',
  password: '',
  lastName: '',
  firstName: '',
  confirmPassword: '',
})

const headerTitle = computed(() => {
  return currentMode.value === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'
})

const formType = computed(() => {
  return currentMode.value === 'login' ? 'login' : 'register'
})

function handleAuthSubmit(data: AuthData) {
  // Use the imported interface
  console.log(`${currentMode.value} successful with data:`, data)
  // Reset form after submission (optional)
  formData.value = {
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    confirmPassword: '',
  }
}

function switchMode() {
  currentMode.value = currentMode.value === 'login' ? 'register' : 'login'
  // Clear form data when switching modes
  formData.value = {
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    confirmPassword: '',
  }
}
</script>

<template>
  <main
    class="flex items-center justify-center min-h-screen bg-gradient-to-l from-gray-500 via-neutral-400 to-500"
  >
    <div
      class="flex justify-center items-center h-full p-4 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-4xl max-w-8xl w-4/5"
    >
      <div
        class="flex h-200 w-1/2 bg-[url('@/assets/images/login_image.jpg')] bg-cover bg-center rounded-2xl"
      ></div>
      <div class="card p-6 pl-12 text-white flex flex-col items-center justify-center h-full w-1/2">
        <AuthHeader class="self-start w-full mb-2" :title="headerTitle" />
        <SwitchAuthLink :currentMode="currentMode" @switch="switchMode" class="mb-6" />
        <AuthForm :formType="formType" :formData="formData" @submit="handleAuthSubmit" />
        <AuthFooter class="mt-auto pt-4" />
      </div>
    </div>
  </main>
</template>
