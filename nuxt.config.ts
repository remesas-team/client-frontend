// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	sourcemap: true,
	modules: ['@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/eslint'],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL || 'https://remesas.com',
			apiBase: process.env.API_BASE || 'https://test-api.remesas.com/api',
			auth: {
				name_cookie_token: process.env.NUXT_AUTH_COOKIE_TOKEN || 'auth.localhost.remesas.token',
				name_cookie_redirect: process.env.NUXT_AUTH_COOKIE_REDIRECT || 'auth.localhost.remesas.redirect',
				name_cookie_domain: process.env.NUXT_AUTH_COOKIE_DOMAIN || 'localhost',
				max_age: Number(process.env.NUXT_AUTH_COOKIE_MAX_AGE) || 60 * 60 * 24 * 365, // un año de expiración
			},
			data_integration_platform: {
				enabled: true,
				url: 'https://remesashouctyr.dataplane.rudderstack.com',
				key: '2trwxpV2ixZiJzf1SIFsQF0lX55',
			},
		},
	},
	app: {
		head: {
			script: [],
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
				},
			],
		},
	},
	ui: {
		colorMode: false,
	},
})
