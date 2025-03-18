<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<div class="max-w-3xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<h1 class="text-2xl font-bold">Tu perfil</h1>
				<p class="text-gray-600">Asegúrate de que todos los datos sean correctos</p>
			</div>

			<UForm
				:state="formState"
				:schema="profileSchema"
				@submit="handleSubmit"
				class="space-y-6"
			>
				<!-- Avatar Section 
				<ProfileAvatar v-model="formState.avatar" /> -->
				<!-- Personal Information -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<h2 class="text-lg font-medium mb-6">Información Personal</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Name -->
						<UFormField label="Nombre" name="name">
							<UInput
								v-model="formState.name"
								size="lg"
								type="text"
								placeholder="Ej: Juan"
								class="w-full"
							/>
						</UFormField>

						<!-- Last Name -->
						<UFormField label="Apellido" name="last_name">
							<UInput
								v-model="formState.last_name"
								size="lg"
								type="text"
								placeholder="Ej: Pérez"
								class="w-full"
							/>
						</UFormField>

						<!-- Phone Number -->
						<UFormField label="Número de teléfono" name="phone" class="md:col-span-2">
							<div class="flex">
								<UInput
									v-model="formState.phone_code"
									size="lg"
									type="text"
									placeholder="+51"
									class="w-24 rounded-r-none"
								/>
								<UInput
									v-model="formState.phone"
									size="lg"
									type="tel"
									placeholder="999888777"
									class="flex-1 rounded-l-none"
								/>
							</div>
						</UFormField>

						<!-- Birth Date -->
						<UFormField label="Fecha de nacimiento" name="birth_date">
							<UInput
								:model-value="formatDate(formState.birth_date)"
								@update:model-value="formState.birth_date = $event"
								type="date"
								size="lg"
								class="w-full"
							/>
						</UFormField>

						<!-- Genre -->
						<UFormField label="Género" name="genre">
							<USelect
								v-model="formState.genre"
								:items="[
									{ label: 'Hombre', value: 'hombre' },
									{ label: 'Mujer', value: 'mujer' },
									{ label: 'Otro', value: 'LGBTQ+' }
								]"
								size="lg"
								class="w-full"
							/>
						</UFormField>

						<!-- Civil Status -->
						<UFormField label="Estado civil" name="civil_status">
							<USelect
								v-model="formState.civil_status"
								:items="[
									{ label: 'Soltero/a', value: 'soltero' },
									{ label: 'Casado/a', value: 'casado' },
									{ label: 'Divorciado/a', value: 'divorciado' },
									{ label: 'Viudo/a', value: 'viudo' }
								]"
								size="lg"
								class="w-full"
							/>
						</UFormField>
					</div>
				</div>

				<!-- Document Information -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<h2 class="text-lg font-medium mb-6">Información de Documento</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Document Type -->
						<UFormField label="Tipo de documento" name="doc_type_id">
							<USelect
								v-model="formState.doc_type_id"
								:items="doc_types"
								size="lg"
								class="w-full"
							/>
						</UFormField>

						<!-- Document Number -->
						<UFormField label="Número de documento" name="doc_value">
							<UInput
								v-model="formState.doc_value"
								size="lg"
								type="number"
								placeholder="Ej: 12345678"
								class="w-full"
							/>
						</UFormField>

						<!-- Address -->
						<UFormField label="Dirección" name="address" class="md:col-span-2">
							<UInput
								v-model="formState.address"
								size="lg"
								type="text"
								placeholder="Ej: Av. Principal 123, Distrito"
								class="w-full"
							/>
						</UFormField>

						<!-- Occupation -->
						<UFormField label="Ocupación" name="occupation_id">
							<USelectMenu
								v-model="formState.occupation_id"
								:items="occupations"
								size="lg"
								value-key="value"
								class="w-full"
							/>
						</UFormField>

					</div>
				</div>

				<!-- Compliance Information -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<h2 class="text-lg font-medium mb-6">Información de Cumplimiento</h2>

					<!-- PEP Declaration -->
					<div class="space-y-6">
						<label>¿Eres una Persona Expuesta Políticamente (PEP)?</label>
						<URadioGroup v-model="formState.is_pep" :items="[
									{ label: 'Sí', value: 1 },
									{ label: 'No', value: 0 }
								]" />
						<!-- PEP Family Declaration -->
						<label for="">¿Tienes familiares que son Personas Expuestas Políticamente?</label>
						<URadioGroup v-model="formState.is_pep_familiar" :items="[
									{ label: 'Sí', value: 1 },
									{ label: 'No', value: 0 }
								]" />
					</div>
				</div>


				<!-- Submit Button -->
				<div class="flex">
					<UButton
						type="submit"
						size="xl"
						color="primary"
						block
						:loading="isLoading"
						class="w-full text-lg font-medium h-14 bg-green-dark text-center hover:bg-green-grass hover:cursor-pointer"
					>
						{{ isLoading ? 'Guardando...' : 'Actualizar información' }}
					</UButton>
				</div>
			</UForm>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useAuthStore } from '~/stores/auth'
import { useSourcesStore } from '~/stores/sources'

import * as v from 'valibot'

const userStore = useUserStore()
const authStore = useAuthStore()
const sourcesStore = useSourcesStore()
const toast = useToast()
const doc_types = ref([])
const occupations = ref([])
const isLoading = ref(false)

// Form state with all profile fields
const formState = reactive({
  name: '',
  last_name: '',
  phone_code: '',
  phone: '',
  birth_date: '',
  genre: '',
  civil_status: '',
  doc_type_id: null,
  doc_value: '',
  address: '',
  geo_district_id: '',
  occupation_id: null,
  is_pep: 0,
  is_pep_familiar: 0,
  terms_accepted: false,
  avatar: null
})

// Validation schema using Valibot
const profileSchema = v.safeParser(v.object({
  name: v.string('El nombre es requerido'),
  last_name: v.string('El apellido es requerido'),
  phone_code: v.string('El código de país es requerido'),
  phone: v.string('El número de teléfono es requerido'),
  birth_date: v.string('La fecha de nacimiento es requerida'),
  genre: v.string('El género es requerido'),
  civil_status: v.string('El estado civil es requerido'),
  doc_type_id: v.number('El tipo de documento es requerido'),
  doc_value: v.string('El número de documento es requerido'),
  address: v.string('La dirección es requerida'),
  occupation_id: v.number('La ocupación es requerida'),
  is_pep: v.number('Este campo es requerido'),
  is_pep_familiar: v.number('Este campo es requerido'),
}))

// Load user data on component mount
onMounted(() => {
  // Populate form with user data from auth store
  Object.assign(formState, authStore.user)
  getDocTypes()
  getOccupations()
  console.log(authStore.user)
})

// Format date to dd/mm/yyyy for display
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  // If it's already in yyyy-mm-dd format (for the input type="date")
  // we can return it as is since the input will handle display
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString
  }
  
  // Otherwise format it
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '' // Invalid date
  
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  
  return `${year}-${month}-${day}` // Format for input type="date"
}

const getDocTypes = async () => {
	const docTypes = await sourcesStore.fetchDocTypes()
	console.log(docTypes);
	doc_types.value = docTypes.data.map(item => {
		return {
			label: item.code + ' - ' + item.description,
			value: item.id
		}
	})
}

const getOccupations = async () => {
	const occupationsRequest = await sourcesStore.fetchOccupations()
	occupations.value = occupationsRequest.data ? occupationsRequest.data : occupationsRequest
}

// Handle form submission
const handleSubmit = async () => {
	isLoading.value = true;
  try {
    const response = await userStore.updateProfile(formState)
    
    if (response.success) {
      toast.add({
        title: 'Perfil actualizado',
        description: 'Tu información ha sido actualizada correctamente',
        color: 'green'
      })
	  isLoading.value = false
    } else {
      toast.add({
        title: 'Error',
        description: response.message || 'Ha ocurrido un error al actualizar tu perfil',
        color: 'red'
      })
	  isLoading.value = false
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.add({
      title: 'Error',
      description: 'Ha ocurrido un error al actualizar tu perfil',
      color: 'red'
    })
	isLoading.value = false
  }
}
</script>
