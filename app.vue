<template>
	<UApp>
		<NuxtLayout>
			<NuxtLoadingIndicator :height="1" />

			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>

<script setup lang="ts">
import { trackPage } from '~/tracking/events/pagesEvents'
import { trackIdentify } from '~/tracking/events/authEvents'
import { trackExample } from '~/tracking/events/exampleEvents'

const route = useRoute()

useSeoMeta({
	title: 'Remesas.com',
	description: 'Envíos de dinero a todo Perú y Brasil',
	ogTitle: 'Remesas.com',
	ogDescription: 'Envíos de dinero a todo Perú y Brasil',
	ogImage: 'https://remesas.com/thumbnail.png',
})

useHead({
	htmlAttrs: {
		lang: 'en',
	},
	link: [
		{
			rel: 'icon',
			type: 'image/png',
			href: 'https://remesas.com/favicon.png',
		},
	],
	script: [
		{
			children: `window.WTT_API = {
				config: {
					token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiIyOTU3MDI2My0yY2EwLTQxNmQtYWI1ZC0zNmJlMzUxYjcxOGMiLCJjb25uZWN0aW9uSWQiOiJhYjg5ZTFmZi1lYTYwLTQ1YzEtODM1Zi1iMjBhODI4YzdhYjkiLCJpYXQiOjE3NDIyNzM1MDR9.uKSkLMH9XNCHup3f606NCwtE1BjLsaEDsO1dR63eFGg",
					title: "¡Bienvenido al soporte!",
					subtitle: "¿Cómo podemos ayudar?",
					position: "right",
					initialMessages: ["Hola, ¿cómo podemos ayudarte?"],
					toggleButtonEnabled: true,
					toggleButtonBgColor: "#42a5f5",
					isAudioEnabled: false
				}
			};`,
		},
		{
			src: 'https://public.whaticket.com/widget/production/wtt-widget-default.js',
			async: true,
			crossorigin: '*'
		}
	]
})

onMounted(() => {
	trackIdentify()
	trackPage()
	trackExample()
})

watch(
	() => route.fullPath,
	() => {
		trackPage()
	},
)
</script>
