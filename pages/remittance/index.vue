<template>
  <main class="flex-1 container mx-auto px-4 py-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Mis Remesas</h1>
        <p class="text-gray-600 mt-2">Historial de todas tus transacciones</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 gap-4">
          <!-- Date Range -->
          <UPopover>
            <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
              <template v-if="dateRange.start">
                <template v-if="dateRange.end">
                  {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }} - {{ df.format(dateRange.end.toDate(getLocalTimeZone())) }}
                </template>
                <template v-else>
                  {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
                </template>
              </template>
              <template v-else>
                Seleccionar fechas
              </template>
            </UButton>

            <template #content>
              <UCalendar v-model="dateRange" class="p-2" :number-of-months="2" range />
            </template>
          </UPopover>
        </div>
      </div>

      <!-- Remittance List -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Estado</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Monto Enviado</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Monto a Recibir</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Destinatario</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Fecha</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="operation in operations" :key="operation.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-900">#{{ operation.id }}</td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-green-100 text-green-800': operation.status_id === 2,
                      'bg-yellow-100 text-yellow-800': operation.status_id === 1,
                      'bg-gray-100 text-gray-800': operation.status_id === 3
                    }"
                  >
                    {{ getStatusText(operation.status_id) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  USD {{ operation.source_amount_to_send }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  PEN {{ operation.destination_amount }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ operation.destination_user_account_id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ formatDate(operation.created_at) }}</td>
                <td class="px-6 py-4 text-sm">
                  <UButton
                    color="gray"
                    variant="ghost"
                    :to="`/remittance/${operation.id}`"
                    icon="i-heroicons-eye"
                  >
                    Ver detalles
                  </UButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <UButton
              color="gray"
              variant="ghost"
              :disabled="currentPage === 1"
            >
              Anterior
            </UButton>
            <UButton
              color="gray"
              variant="ghost"
              :disabled="currentPage === totalPages"
            >
              Siguiente
            </UButton>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Mostrando
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                a
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
                de
                <span class="font-medium">{{ totalItems }}</span>
                resultados
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <UPagination
                  v-model="currentPage"
                  :total="totalItems"
                  :page-size="itemsPerPage"
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { operationsRepository } from '~/repositories/v1/platform/operationsRepository';


// Date formatter setup
const df = new DateFormatter('es-ES', {
  dateStyle: 'medium'
});

// Reactive state
const dateRange = shallowRef({
  start: null,
  end: null
});

const currentPage = ref(1);
const itemsPerPage = 10;
const operations = ref<Operation[]>([]);
const loading = ref(true);

// Fetch operations
const fetchOperations = async () => {
  loading.value = true;
  try {
    const response = await operationsRepository().getOperations();
    if (response?.success) {
      operations.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching operations:', error);
  } finally {
    loading.value = false;
  }
};

// Initial fetch
onMounted(() => {
  fetchOperations();
});

const totalItems = computed(() => operations.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// Sample data
const sampleRemittances = [
  {
    id: '1001',
    status: 'completed',
    source_amount: 1000.00,
    source_currency_symbol: 'USD',
    destination_amount: 3650.00,
    destination_currency_symbol: 'PEN',
    recipient_name: 'Juan Pérez',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '1002',
    status: 'in_progress',
    source_amount: 500.00,
    source_currency_symbol: 'USD',
    destination_amount: 1825.00,
    destination_currency_symbol: 'PEN',
    recipient_name: 'María García',
    created_at: '2024-01-14T15:45:00Z'
  },
  {
    id: '1003',
    status: 'pending',
    source_amount: 750.00,
    source_currency_symbol: 'USD',
    destination_amount: 2737.50,
    destination_currency_symbol: 'PEN',
    recipient_name: 'Carlos Rodriguez',
    created_at: '2024-01-14T09:15:00Z'
  },
  {
    id: '1004',
    status: 'completed',
    source_amount: 2000.00,
    source_currency_symbol: 'USD',
    destination_amount: 7300.00,
    destination_currency_symbol: 'PEN',
    recipient_name: 'Ana Torres',
    created_at: '2024-01-13T16:20:00Z'
  },
  {
    id: '1005',
    status: 'completed',
    source_amount: 1500.00,
    source_currency_symbol: 'USD',
    destination_amount: 5475.00,
    destination_currency_symbol: 'PEN',
    recipient_name: 'Luis Mendoza',
    created_at: '2024-01-13T11:10:00Z'
  }
];

// Format date helper
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get status text helper
const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    completed: 'Completada',
    in_progress: 'En proceso',
    pending: 'Pendiente'
  };
  return statusMap[status] || status;
};
</script>