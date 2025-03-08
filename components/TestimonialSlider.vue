<template>
	<section
		class="relative overflow-hidden"
		aria-label="Carrusel de testimonios"
	>
		<div class="max-w-6xl mx-auto px-4">
			<div class="grid grid-cols-12 gap-4 md:gap-8 items-center">
				<!-- Title and Controls Column -->
				<div class="col-span-5">
					<h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-8">Sientete cerca de los tuyos</h2>
					<p class="mb-8">La forma de poder cuidarlos anque estés lejos de casa.</p>

					<div class="flex gap-2 md:gap-4">
						<button
							class="bg-gray-100 p-2 md:p-4 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Anterior testimonio"
							@click="prevSlide"
						>
							<svg
								class="w-4 h-4 md:w-6 md:h-6 text-gray-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							class="bg-gray-100 p-2 md:p-4 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Siguiente testimonio"
							@click="nextSlide"
						>
							<svg
								class="w-4 h-4 md:w-6 md:h-6 text-gray-800"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>

				<!-- Slider Column -->
				<div class="col-span-7">
					<div
						class="overflow-hidden rounded-xl"
						@mouseenter="pauseAutoplay"
						@mouseleave="resumeAutoplay"
					>
						<div
							class="flex transition-transform duration-500 ease-in-out"
							:style="{ transform: `translateX(-${currentSlide * 100}%)` }"
						>
							<div
								v-for="(slide, index) in slides"
								:key="index"
								class="w-full md:w-1/2 flex-shrink-0 px-2"
							>
								<div class="relative h-[300px] md:h-[500px] overflow-hidden rounded-xl">
									<img
										:src="slide.image"
										:alt="slide.imageAlt"
										class="absolute inset-0 w-full h-full object-cover"
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
									<div class="absolute bottom-0 left-0 p-4 md:p-8 w-full">
										<blockquote class="[&>*]:mb-4 md:[&>*]:mb-4">
											<p class="text-base md:text-xl text-white font-serif">"{{ slide.testimonial }}"</p>
											<footer class="text-white/80">
												<cite class="font-medium block text-sm md:text-lg">{{ slide.author }}</cite>
												<span class="text-xs md:text-sm">{{ slide.location }}</span>
											</footer>
										</blockquote>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Slide Indicators -->
					<div class="flex justify-center space-x-1 md:space-x-2 mt-2 md:mt-4">
						<button
							v-for="(_, index) in slides"
							:key="index"
							:class="[
								'w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
								currentSlide === index ? 'bg-blue-600 w-3 md:w-4' : 'bg-gray-400 hover:bg-gray-600',
							]"
							:aria-label="`Ir al testimonio ${index + 1}`"
							:aria-current="currentSlide === index"
							@click="goToSlide(index)"
						></button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
interface Slide {
	image: string
	imageAlt: string
	testimonial: string
	author: string
	location: string
}

const slides = ref<Slide[]>([
	{
		image: '/images/historia1.png',
		imageAlt: 'Familia feliz reunida en la sala de estar',
		testimonial: '',
		author: 'Gabriel Rodrigues',
		location: 'São Paulo, Brasil',
	},
	{
		image: '/images/seño1.png',
		imageAlt: 'Madre e hija compartiendo un momento especial',
		testimonial: 'Gracias a remesas.com puedo mantener a mi familia en Brasil sin preocupaciones.',
		author: 'Carlos Santos',
		location: 'Rio de Janeiro, Brasil',
	},
	{
		image: '/images/historia4.png',
		imageAlt: 'Familia celebrando juntos',
		testimonial:
			'Me encanta la transparencia y la rapidez del servicio. Ahora puedo ayudar a mi familia sin complicaciones.',
		author: 'Marina Costa',
		location: 'Florianópolis, Brasil',
	},
])

const currentSlide = ref(0)
const autoplayInterval = ref<number | null>(null)
const AUTOPLAY_DELAY = 5000

const nextSlide = () => {
	currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
	currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
	currentSlide.value = index
}

const startAutoplay = () => {
	autoplayInterval.value = window.setInterval(nextSlide, AUTOPLAY_DELAY)
}

const pauseAutoplay = () => {
	if (autoplayInterval.value) {
		clearInterval(autoplayInterval.value)
		autoplayInterval.value = null
	}
}

const resumeAutoplay = () => {
	pauseAutoplay() // Clear any existing interval
	startAutoplay()
}

// Start autoplay on mount
onMounted(() => {
	startAutoplay()
})

// Clean up on unmount
onUnmounted(() => {
	pauseAutoplay()
})

// Handle visibility change
onMounted(() => {
	const handleVisibilityChange = () => {
		if (document.hidden) {
			pauseAutoplay()
		} else {
			resumeAutoplay()
		}
	}

	document.addEventListener('visibilitychange', handleVisibilityChange)

	onUnmounted(() => {
		document.removeEventListener('visibilitychange', handleVisibilityChange)
	})
})
</script>
