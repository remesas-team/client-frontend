<template>
	<section class="mb-16 mt-8 lg:mt-0">
		<section class="bg-gray-50 py-16">
			<div class="container mx-auto ">
				<h2 class="text-center text-2xl font-bold mb-3 font-rebond lg:text-4xl" >
					Tus transacciones <span class="text-green-600">llegan el mismo día</span>
				</h2>
				<p class="text-center text-gray-600 max-w-2xl mx-auto mb-12">
					El sistema de remesas.com es un mecanismo seguro de envío de dinero que a través de una red de
					partners en Perú y Brasil logra que el proceso de envío sea rápido y seguro.
				</p>
				<div class="md:w-[500px] mx-auto">
					<img src="/public/images/mismodia.png" alt="" class="w-full">
				</div>
			</div>
		</section>

		<div class="flex justify-between items-start gap-4 md:gap-8 mb-12 bg-white rounded-lg shadow-sm p-4 md:p-6 lg:hidden">
			<div class="flex flex-col md:flex-row items-center gap-2 md:gap-3 flex-1 text-center md:text-left">
				<div
					class="w-8 h-8 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
					<svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<span class="text-xs md:text-sm font-medium">Cotiza y envía con la mejor tasa del mercado</span>
			</div>

			<div class="hidden md:block w-px h-16 bg-gray-200 self-center"></div>

			<div class="flex flex-col md:flex-row items-center gap-2 md:gap-3 flex-1 text-center md:text-left">
				<div
					class="w-8 h-8 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
					<svg class="w-5 h-5 md:w-6 md:h-6 text-gray-700" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<span class="text-xs md:text-sm font-medium">Nuestro volúmen de operaciones superan los 10MM</span>
			</div>

			<div class="hidden md:block w-px h-16 bg-gray-200 self-center"></div>

			<div class="flex flex-col md:flex-row items-center gap-2 md:gap-3 flex-1 text-center md:text-left">
				<div
					class="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
					<svg class="w-4 h-4 md:w-5 md:h-5 text-gray-700" viewBox="0 0 24 24" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</div>
				<span class="text-xs md:text-sm font-medium">Soporte y atención al cliente 24/7</span>
			</div>
		</div>
		<section class="bg-gray-50 py-16">
			<div class="container mx-auto px-4">
				<h2 class="text-center text-2xl font-bold mb-3 font-rebond lg:text-4xl max-w-[600px] mx-auto">
					Mantente informado sobre el <span class="text-green-600">status de tu envío</span>
				</h2>
				<p class="text-center text-gray-600 max-w-2xl mx-auto mb-12">
					No te estreses, que no te pregunten cada 5min a qué hora llega el depósito...
					Comparte con tu destinatario un link de Tracking del envío.
				</p>
				<div class="max-w-[400px] mx-auto relative">
					<img src="/public/images/tracking.png" alt="" class="w-full relative z-1">
					<img src="/public/images/fondo.png" alt="" class="w-[calc(200vw)] max-w-[unset] left-[-255%] top-[50px] top-0 absolute z-0">
				</div>
			</div>
		</section>

	</section>
</template>

<script setup>
// Los componentes se importarán automáticamente gracias a la configuración de Nuxt
</script>
