<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<!-- Header Section -->
		<div class="mb-8">
			<h1 class="text-2xl font-bold mb-2">Mis Transferencias</h1>
			<p class="text-gray-600">Historial de todas tus operaciones</p>
		</div>

		<!-- Stats Overview
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="text-sm text-gray-600 mb-1">Total enviado (30 días)</div>
        <div class="text-2xl font-bold">$12,450</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="text-sm text-gray-600 mb-1">Transferencias completadas</div>
        <div class="text-2xl font-bold text-green-600">24</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="text-sm text-gray-600 mb-1">En proceso</div>
        <div class="text-2xl font-bold text-yellow-600">2</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <div class="text-sm text-gray-600 mb-1">Ahorro en comisiones</div>
        <div class="text-2xl font-bold text-blue-600">$345</div>
      </div>
    </div> -->
		<!-- Transfers List -->
		<div class="bg-white rounded-lg shadow-sm overflow-hidden">
			<!-- Filters -->
			<div class="p-4 border-b border-gray-200">
				<div class="flex flex-wrap gap-4">
					<select
						v-model="filters.status"
						class="rounded-lg border-gray-300 text-sm"
					>
						<option value="">Todos los estados</option>
						<option value="completed">Completadas</option>
						<option value="in_progress">En proceso</option>
						<option value="pending">Pendientes</option>
					</select>

					<select
						v-model="filters.timeRange"
						class="rounded-lg border-gray-300 text-sm"
					>
						<option value="7">Últimos 7 días</option>
						<option value="30">Últimos 30 días</option>
						<option value="90">Últimos 3 meses</option>
						<option value="365">Último año</option>
					</select>
				</div>
			</div>

			<!-- Table -->
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Destinatario
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tiempo estimado
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						<tr
							v-for="transfer in filteredTransfers"
							:key="transfer.id"
							class="hover:bg-gray-50"
						>
							<td class="px-4 py-4 text-sm font-medium text-gray-900">#{{ transfer.id }}</td>
							<td class="px-4 py-4 text-sm text-gray-600">
								{{ formatDate(transfer.date) }}
							</td>
							<td class="px-4 py-4">
								<div class="text-sm font-medium text-gray-900">{{ transfer.recipient }}</div>
								<div class="text-sm text-gray-600">{{ transfer.bank }}</div>
							</td>
							<td class="px-4 py-4">
								<div class="text-sm font-medium text-gray-900">{{ transfer.amount }} {{ transfer.currency }}</div>
								<div class="text-sm text-gray-600">{{ transfer.exchangeRate }} BRL</div>
							</td>
							<td class="px-4 py-4">
								<span
									class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
									:class="{
										'bg-green-100 text-green-800': transfer.status === 'completed',
										'bg-yellow-100 text-yellow-800': transfer.status === 'in_progress',
										'bg-gray-100 text-gray-800': transfer.status === 'pending',
									}"
								>
									{{ getStatusText(transfer.status) }}
								</span>
							</td>
							<td class="px-4 py-4 text-sm text-gray-600">
								{{ transfer.estimatedTime }}
							</td>
							<td class="px-4 py-4 text-sm">
								<NuxtLink
									:to="`/tracking/${transfer.id}`"
									class="text-blue-600 hover:text-blue-900"
								>
									Ver detalles
								</NuxtLink>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Empty State -->
			<div
				v-if="filteredTransfers.length === 0"
				class="p-8 text-center"
			>
				<div class="text-gray-500">No se encontraron transferencias</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { operationsRepository } from '~/repositories/v1/platform/operationsRepository'
const loading = ref(true)

const operations = ref([])

const fetchOperations = async () => {
	loading.value = true
	try {
		const response = await operationsRepository().getOperations()
		if (response?.success) {
			operations.value = response.data
		}
	} catch (error) {
		console.error('Error fetching operations:', error)
	} finally {
		loading.value = false
	}
}

// Initial fetch
onMounted(() => {
	fetchOperations()
})

interface Transfer {
	id: string
	date: Date
	recipient: string
	bank: string
	amount: number
	currency: string
	exchangeRate: number
	status: 'completed' | 'in_progress' | 'pending'
	estimatedTime: string
}

const filters = reactive({
	status: '',
	timeRange: '30',
})

// Mock data
const transfers = ref<Transfer[]>([
	{
		id: '74112',
		date: new Date('2024-02-12T13:40:00'),
		recipient: 'Ana Silva',
		bank: 'Banco do Brasil',
		amount: 300,
		currency: 'USD',
		exchangeRate: 3300,
		status: 'in_progress',
		estimatedTime: '2-3 horas',
	},
	{
		id: '74111',
		date: new Date('2024-02-12T10:15:00'),
		recipient: 'Carlos Santos',
		bank: 'Bradesco',
		amount: 500,
		currency: 'USD',
		exchangeRate: 5500,
		status: 'completed',
		estimatedTime: 'Completado',
	},
	{
		id: '74110',
		date: new Date('2024-02-11T15:20:00'),
		recipient: 'Marina Costa',
		bank: 'Itaú',
		amount: 200,
		currency: 'USD',
		exchangeRate: 2200,
		status: 'completed',
		estimatedTime: 'Completado',
	},
	{
		id: '74109',
		date: new Date('2024-02-11T09:45:00'),
		recipient: 'Pedro Oliveira',
		bank: 'Caixa',
		amount: 1000,
		currency: 'USD',
		exchangeRate: 11000,
		status: 'pending',
		estimatedTime: 'Pendiente de pago',
	},
])

const filteredTransfers = computed(() => {
	return transfers.value.filter((transfer) => {
		// Filter by status
		if (filters.status && transfer.status !== filters.status) {
			return false
		}

		// Filter by date range
		const daysAgo = new Date()
		daysAgo.setDate(daysAgo.getDate() - parseInt(filters.timeRange))
		if (transfer.date < daysAgo) {
			return false
		}

		return true
	})
})

const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat('es', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(date)
}

const getStatusText = (status: string) => {
	switch (status) {
		case 'completed':
			return 'Completada'
		case 'in_progress':
			return 'En proceso'
		case 'pending':
			return 'Pendiente'
		default:
			return status
	}
}
</script>
