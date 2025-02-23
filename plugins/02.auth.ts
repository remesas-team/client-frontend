import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(({ provide }) => {
  const $auth = useAuthStore()
  provide('auth', $auth)
})
