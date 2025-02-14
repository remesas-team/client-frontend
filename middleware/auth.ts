export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  
  // Public pages that don't require authentication
  const publicPages = ['/login', '/registro'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.isAuthenticated) {
    return navigateTo('/login');
  }

  if (authStore.isAuthenticated && publicPages.includes(to.path)) {
    return navigateTo('/perfil');
  }
});