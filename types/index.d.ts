import type {$Fetch} from "nitropack";

interface PluginsInjections {
	$api: $Fetch
}

declare module '#app' {
	interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
	interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties extends PluginsInjections {}
}

declare global {
	interface Window {
		// analytics: any
	}
}
