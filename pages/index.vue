<template>
	<main class="container mx-auto py-6 overflow-hidden">
		<!-- Hero Section -->
		<div
			class="flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:min-h-[calc(100vh-120px)] mt-8">
			<div class="w-full md:w-1/2 justify-center text-center items-center md:items-left md:text-left">
				<span class="bg-green-grass text-white rounded-2xl px-4 py-2 text-sm mb-3 text-nowrap lg:text-lg">
					<strong class="hidden sm:inline">🎁 Regalo:</strong> Cupón 1er envío gratis
					<a href="#" class="text-[#93f8f4] font-bold ml-1" @click="applyCoupon(couponName)">{{ couponName }}</a></span>
				<h1 class="text-3xl md:text-5xl xl:text-7xl font-bold leading-tight mt-5">
					Envía dinero a cualquier parte del Perú y Brasil
				</h1>
				<p class="mt-4 text-gray-600 text-lg xl:text-2xl">Recibe el dinero el mismo día con el mejor tipo de
					cambio.</p>
			</div>
			<div class="w-full md:w-1/2">
				<RemittanceCalculator :set-coupon="coupon" />
			</div>
		</div>
		<div class="px-2 md:px-5">
			<h1 class="text-center text-2xl font-bold mb-8 font-rebond max-w-[600px] mx-auto lg:text-4xl">
				La forma más simple de <span class="text-green-600">enviar dinero</span> entre Perú y Brasil
			</h1>
			<div class="lg:flex items-center gap-10">
				<section class="py-6 md:py-12 lg:w-[50%]">
					<div class="container mx-auto px-4">
						<div class="flex justify-between border-b mb-12 md:text-xl">
							<button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
							'pb-2 px-4 transition-colors font-rebond w-[50%]',
							activeTab === tab.id
								? 'border-b-2 border-green-600 font-semibold text-green-600'
								: 'text-gray-500'
						]">
								{{ tab.label }}
							</button>
						</div>
	
						<!-- Contenido del tab Enviar -->
						<div v-if="activeTab === 'enviar'" class="max-w-2xl mx-auto">
							<div class="space-y-8">
								<div v-for="(step, index) in enviarSteps" :key="index" class="flex gap-4">
									<div class="text-3xl flex-shrink-0">{{ step.icon }}</div>
									<div>
										<h3 class="font-semibold text-lg mb-1 font-rebond">{{ step.title }}</h3>
										<p class="text-gray-600">{{ step.description }}</p>
									</div>
								</div>
							</div>
						</div>
	
						<!-- Contenido del tab Recibir -->
						<div v-if="activeTab === 'recibir'" class="max-w-2xl mx-auto">
							<div class="space-y-8">
								<div v-for="(step, index) in recibirSteps" :key="index" class="flex gap-4">
									<div class="text-3xl flex-shrink-0">{{ step.icon }}</div>
									<div>
										<h3 class="font-semibold text-lg mb-1 font-rebond">{{ step.title }}</h3>
										<p class="text-gray-600">{{ step.description }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<TestimonialSlider />
			</div>
			<div class="logos w-full mb-10">
				<LogoSlider />
			</div>
			<FeaturesSection />
			<!--<TrustSection />-->
		</div>
	</main>
</template>

<script setup lang="ts">
import { useRemittanceStore } from '~/stores/remittance'
const remittanceStore = useRemittanceStore()

definePageMeta({
	auth: false,
})

// Get the query parameter 'c' and set default value
const route = useRoute()
const couponName = ref(route.query.c?.toString().toUpperCase() || 'WELCOME100')
const coupon = ref(couponName.value)

// Update applyCoupon to accept a parameter
const applyCoupon = (code: string) => {
	remittanceStore.coupon = code
}


const activeTab = ref('enviar');

const tabs = [
  { id: 'enviar', label: 'Cómo enviar dinero' },
  { id: 'recibir', label: 'Cómo se recibe' }
];

const enviarSteps = [
  {
    icon: '🧮',
    title: 'Cotiza tu remesa usando la calculadora',
    description: 'No dejamos nada a la imaginación, revisa los detalles de tu operación'
  },
  {
    icon: '⚙️',
    title: 'Configura tu cuenta de Remesas.com',
    description: 'Garantizamos tus envíos al cumplir con regulación de ambos países'
  },
  {
    icon: '📝',
    title: 'Registra los datos del destinatario',
    description: 'Es preciso para evitar contratiempos. Si algo sale mal, te regresaremos el dinero'
  },
  {
    icon: '🏦',
    title: 'Deposita a la cuenta indicada',
    description: 'Es una transferencia local, así que no asumirás costos extras'
  }
];

const recibirSteps = [
  {
    icon: '📱',
    title: 'Recibe notificación del envío',
    description: 'Te avisaremos cuando el dinero esté en camino'
  },
  {
    icon: '🔍',
    title: 'Monitorea el estado en tiempo real',
    description: 'Sigue el proceso de tu dinero paso a paso'
  },
  {
    icon: '💳',
    title: 'Recibe en tu cuenta bancaria',
    description: 'El dinero llega directamente a tu cuenta en reales'
  }
];
</script>
