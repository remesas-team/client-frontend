<template>
	<div class="min-h-screen bg-gray-50 flex flex-col">
		<TheHeader />

		<NuxtPage />

		<TheFooter />
	</div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<style scoped></style>
