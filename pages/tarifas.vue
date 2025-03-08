<template>
	<main class="container mx-auto px-4 py-12">
		<h1 class="text-4xl font-bold mb-8 text-center">Tarifas y Comisiones</h1>
		<div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
			<p class="text-gray-600 mb-8 text-center">Conoce nuestras tarifas transparentes sin costos ocultos</p>

			<div class="[&>*]:mb-6">
				<div class="border-b pb-4">
					<h2 class="text-xl font-semibold mb-2">Envíos a Brasil</h2>
					<p class="text-gray-600">Tarifa fija de 20 USD por transferencia</p>
				</div>

				<div class="border-b pb-4">
					<h2 class="text-xl font-semibold mb-2">Tipo de cambio</h2>
					<p class="text-gray-600">Utilizamos el tipo de cambio del mercado en tiempo real</p>
				</div>

				<div>
					<h2 class="text-xl font-semibold mb-2">Sin costos adicionales</h2>
					<p class="text-gray-600">No hay cargos ocultos ni comisiones extras</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	auth: false,
})
</script>
