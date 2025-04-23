<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import FormInput from '@/components/common/FormInput.vue'
import AppButton from '@/components/AppButton.vue'
import type { AuthData } from '@/types/auth' // Import AuthData

const props = defineProps<{
  formType: 'login' | 'register'
  formData: AuthData
}>()

const emit = defineEmits(['submit'])

// Use reactive for local form state, initialized from props
const localFormData = reactive<AuthData>({ ...props.formData })
const errors = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
  general: '',
})
const isLoading = ref(false)

// Watch for changes in props.formData and update localFormData
// This is important if the parent component resets the form
watch(
  () => props.formData,
  (newFormData) => {
    Object.assign(localFormData, newFormData)
    // Reset errors when form data changes (e.g., switching modes)
    Object.keys(errors.value).forEach((key) => {
      errors.value[key as keyof typeof errors.value] = ''
    })
  },
  { deep: true },
)

const isLoginMode = computed(() => props.formType === 'login')

function validateForm() {
  let isValid = true
  errors.value = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    general: '',
  } // Reset errors

  // Email validation (always required)
  if (!localFormData.email?.trim()) {
    errors.value.email = 'Email là bắt buộc'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email)) {
    errors.value.email = 'Định dạng email không hợp lệ'
    isValid = false
  }

  // Password validation (always required)
  if (!localFormData.password?.trim()) {
    errors.value.password = 'Mật khẩu là bắt buộc'
    isValid = false
  }

  // Register-specific validation
  if (!isLoginMode.value) {
    if (!localFormData.firstName?.trim()) {
      errors.value.firstName = 'Tên là bắt buộc'
      isValid = false
    }
    if (!localFormData.lastName?.trim()) {
      errors.value.lastName = 'Họ và tên đệm là bắt buộc'
      isValid = false
    }
    if (!localFormData.confirmPassword?.trim()) {
      errors.value.confirmPassword = 'Xác nhận mật khẩu là bắt buộc'
      isValid = false
    } else if (localFormData.password !== localFormData.confirmPassword) {
      errors.value.confirmPassword = 'Mật khẩu xác nhận không khớp'
      isValid = false
    }
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) return
  isLoading.value = true
  errors.value.general = '' // Clear general error
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Emit only the relevant fields based on the mode
    const dataToEmit: AuthData = {
      email: localFormData.email,
      password: localFormData.password,
    }
    if (!isLoginMode.value) {
      dataToEmit.firstName = localFormData.firstName
      dataToEmit.lastName = localFormData.lastName
    }
    emit('submit', dataToEmit)
  } catch (err) {
    console.error('Auth error:', err)
    errors.value.general = isLoginMode.value
      ? 'Đăng nhập thất bại. Vui lòng thử lại.'
      : 'Đăng ký thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

// Mock social login handler
function handleSocialLogin(provider: string) {
  console.log(`Attempting login with ${provider}...`)
  // Here you would typically initiate the OAuth flow
  alert(`Đăng nhập với ${provider} (mock)`)
}
</script>

<template>
  <form class="w-full flex flex-col" @submit.prevent="handleSubmit">
    <!-- Register Fields -->
    <template v-if="!isLoginMode">
      <div class="flex gap-4 mb-4 w-full">
        <FormInput
          type="text"
          placeholder="Họ và tên đệm"
          v-model="localFormData.lastName"
          :error="errors.lastName"
          @update:modelValue="errors.lastName = ''"
        />
        <FormInput
          type="text"
          placeholder="Tên"
          v-model="localFormData.firstName"
          :error="errors.firstName"
          @update:modelValue="errors.firstName = ''"
        />
      </div>
    </template>

    <!-- Common Fields -->
    <div class="mb-4 w-full">
      <FormInput
        type="email"
        placeholder="Email"
        v-model="localFormData.email"
        :error="errors.email"
        @update:modelValue="errors.email = ''"
      />
    </div>
    <div class="mb-4 w-full">
      <FormInput
        type="password"
        placeholder="Mật khẩu"
        v-model="localFormData.password"
        :error="errors.password"
        @update:modelValue="errors.password = ''"
      />
    </div>

    <!-- Register Confirm Password -->
    <template v-if="!isLoginMode">
      <div class="mb-4 w-full">
        <FormInput
          type="password"
          placeholder="Xác nhận mật khẩu"
          v-model="localFormData.confirmPassword"
          :error="errors.confirmPassword"
          @update:modelValue="errors.confirmPassword = ''"
        />
      </div>
    </template>

    <!-- Loading and General Error -->
    <div v-if="isLoading" class="flex justify-center mb-4">
      <span class="loading loading-spinner loading-md text-white"></span>
    </div>
    <p v-if="errors.general" class="text-red-500 text-sm text-center mb-4" aria-live="polite">
      {{ errors.general }}
    </p>

    <!-- Submit Button -->
    <AppButton
      :label="isLoading ? 'Đang xử lý...' : isLoginMode ? 'Đăng nhập' : 'Đăng ký'"
      :disabled="isLoading"
      type="submit"
      variant="primary"
      class="btn w-full h-12 mt-4"
    />

    <!-- Social Login Buttons (Login Mode Only) -->
    <template v-if="isLoginMode">
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-600"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-neutral-800 text-gray-400"> Hoặc tiếp tục với </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <button
          type="button"
          @click="handleSocialLogin('Google')"
          class="inline-flex w-full justify-center items-center rounded-md border border-gray-600 bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition"
        >
          <!-- Add Google Icon here -->
          <svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.14 6.737 9.488.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.201 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z"
              clip-rule="evenodd"
            />
            <!-- Placeholder Icon - Replace with actual Google Icon SVG -->
          </svg>
          Google
        </button>
        <button
          type="button"
          @click="handleSocialLogin('Facebook')"
          class="inline-flex w-full justify-center items-center rounded-md border border-gray-600 bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition"
        >
          <!-- Add Facebook Icon here -->
          <svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
              clip-rule="evenodd"
            />
            <!-- Placeholder Icon - Replace with actual Facebook Icon SVG -->
          </svg>
          Facebook
        </button>
      </div>
    </template>
  </form>
</template>
