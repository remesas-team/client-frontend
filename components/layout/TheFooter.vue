<template>
	<footer class="flex flex-col items-center justify-center pt-4">
		<NuxtLink to="/" class="text-xl font-bold text-gray-800 my-8">
			<img src="/images/logo-remesas.svg" alt="" class="w-27 md:w-32 lg:w-45" />
		</NuxtLink>
		<div>
			<p>Enviamos más que dinero, conectamos familias.</p>
		</div>
		<div class="p-10">
			<ul class="flex gap-10">
				<li>
					<a href="https://www.instagram.com/remesascom/" class="text-gray-800 hover:text-gray-600 text-3xl">
						<UIcon
						name="i-lucide:instagram"
					/>
					</a>
				</li>
				<li>
					<a href="https://wa.me/51914034946" class="text-gray-800 hover:text-gray-600 text-3xl">
						<UIcon
						name="i-lucide:message-circle"
					/>
					</a>
				</li>
			</ul>
		</div>
	</footer>
	<!--<footer class="bg-green-dark text-white py-12">
		<div class="container mx-auto px-4">
			<div class="grid md:grid-cols-4 gap-8">
				<div>
					<h5 class="font-bold mb-4">Remesas.com</h5>
					<p class="text-gray-400 text-sm">
						Tu plataforma confiable para enviar dinero a Brasil de forma rápida y segura.
					</p>
				</div>

				<div>
					<h5 class="font-bold mb-4">Compañía</h5>
					<ul class="[&>*]:mb-2 text-gray-400 text-sm">
						<li>
							<NuxtLink
								to="#"
								class="hover:text-white"
								>Sobre nosotros</NuxtLink
							>
						</li>
						<li>
							<NuxtLink
								to="#"
								class="hover:text-white"
								>Contacto</NuxtLink
							>
						</li>
					</ul>
				</div>
				<div>
					<h5 class="font-bold mb-4">Legal</h5>
					<ul class="[&>*]:mb-2 text-gray-400 text-sm">
						<li>
							<NuxtLink
								to="#"
								class="hover:text-white"
								>Términos y condiciones</NuxtLink
							>
						</li>
						<li>
							<NuxtLink
								to="#"
								class="hover:text-white"
								>Política de privacidad</NuxtLink
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
	-->
</template>
