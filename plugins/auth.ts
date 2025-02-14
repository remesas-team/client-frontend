export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  // Initialize auth state from cookies
  authStore.initializeFromCookies();
});