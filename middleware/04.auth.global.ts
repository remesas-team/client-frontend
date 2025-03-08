export default defineNuxtRouteMiddleware(async (to) => {
	const { $config, $auth } = useNuxtApp()
	const { path, meta, fullPath } = to
	console.log('define')
	if (path === '/logout') return

	const authCookieToken = useCookie($config.public.auth.name_cookie_token, {
		domain: $config.public.auth.name_cookie_domain,
	})

	// Si no hay token
	if (!authCookieToken.value) {
		if (meta.auth !== 'guest') {
			const cookieRedirect = useCookie($config.public.auth.name_cookie_redirect, {
				domain: $config.public.auth.name_cookie_domain,
			})
			cookieRedirect.value = fullPath
		}

		if (meta.auth === 'guest' || meta.auth === false) return

		console.log($config.public.auth.name_cookie_redirect)

		return navigateTo(`/login`)
	}

	// Guardamos el token en el store
	$auth.setToken(authCookieToken.value)

	if ($auth.user === null) {
		const { success } = await $auth.fetchMe()

		// Si falla mandamos al login
		if (!success) {
			$auth.removeToken()
			return navigateTo(`/login`)
		}
	}
	// Si son rutas guest redirigimos al home
	if (meta.auth === 'guest') {
		return navigateTo(`/`)
	}
})
