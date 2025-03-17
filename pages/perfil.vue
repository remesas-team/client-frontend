<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<div class="max-w-3xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<h1 class="text-2xl font-bold">Configura tu perfil</h1>
				<p class="text-gray-600">Gestiona tu información personal y preferencias</p>
			</div>

			<UForm
				:state="formState"
				:schema="profileSchema"
				@submit="handleSubmit"
				class="space-y-6"
			>
				<!-- Avatar Section -->
				<ProfileAvatar v-model="formState.avatar" />

				<!-- Personal Information -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<h2 class="text-lg font-medium mb-6">Información Personal</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Name -->
						<UFormGroup label="Nombre" name="name">
							<UInput
								v-model="formState.name"
								size="lg"
								type="text"
								placeholder="Ej: Juan"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Last Name -->
						<UFormGroup label="Apellido" name="last_name">
							<UInput
								v-model="formState.last_name"
								size="lg"
								type="text"
								placeholder="Ej: Pérez"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Phone Code -->
						<UFormGroup label="Código de país" name="phone_code">
							<UInput
								v-model="formState.phone_code"
								size="lg"
								type="text"
								placeholder="Ej: +51"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Phone -->
						<UFormGroup label="Número de teléfono" name="phone">
							<UInput
								v-model="formState.phone"
								size="lg"
								type="tel"
								placeholder="Ej: 999888777"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Birth Date -->
						<UFormGroup label="Fecha de nacimiento" name="birth_date">
							<UInput
								v-model="formState.birth_date"
								type="date"
								size="lg"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Genre -->
						<UFormGroup label="Género" name="genre">
							<USelect
								v-model="formState.genre"
								:options="[
									{ label: 'Masculino', value: 'Male' },
									{ label: 'Femenino', value: 'Female' },
									{ label: 'Otro', value: 'Other' }
								]"
								size="lg"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Civil Status -->
						<UFormGroup label="Estado civil" name="civil_status">
							<USelect
								v-model="formState.civil_status"
								:options="[
									{ label: 'Soltero/a', value: 'soltero' },
									{ label: 'Casado/a', value: 'casado' },
									{ label: 'Divorciado/a', value: 'divorciado' },
									{ label: 'Viudo/a', value: 'viudo' }
								]"
								size="lg"
								class="w-full"
							/>
						</UFormGroup>
					</div>
				</div>

				<!-- Document Information -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<h2 class="text-lg font-medium mb-6">Información de Documento</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Document Type -->
						<UFormGroup label="Tipo de documento" name="doc_type_id">
							<USelect
								v-model="formState.doc_type_id"
								:options="[
									{ label: 'DNI', value: 1 },
									{ label: 'Pasaporte', value: 2 },
									{ label: 'Carnet de Extranjería', value: 3 }
								]"
								size="lg"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Document Number -->
						<UFormGroup label="Número de documento" name="doc_value">
							<UInput
								v-model="formState.doc_value"
								size="lg"
								type="number"
								placeholder="Ej: 12345678"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Address -->
						<UFormGroup label="Dirección" name="address" class="md:col-span-2">
							<UInput
								v-model="formState.address"
								size="lg"
								type="text"
								placeholder="Ej: Av. Principal 123, Distrito"
								class="w-full"
							/>
						</UFormGroup>

						<!-- District ID -->
						<UFormGroup label="Distrito" name="geo_district_id">
							<UInput
								v-model="formState.geo_district_id"
								size="lg"
								type="number"
								placeholder="Ej: 12345"
								class="w-full"
							/>
						</UFormGroup>

						<!-- Occupation -->
						<UFormGroup label="Ocupación" name="occupation_id">
							<USelect
								v-model="formState.occupation_id"
								:options="[
									{ label: 'Empleado', value: 1 },
									{ label: 'Independiente', value: 2 },
									{ label: 'Estudiante', value: 3 },
									{ label: 'Jubilado', value: 4 },
									{ label: 'Otro', value: 5 }
								]"
								size="lg"
								class="w-full"
							/>
						</UFormGroup>
					</div>
				</div>

				<!-- Compliance Information -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<h2 class="text-lg font-medium mb-6">Información de Cumplimiento</h2>

					<!-- PEP Declaration -->
					<div class="space-y-6">
						<UFormGroup label="¿Eres una Persona Expuesta Políticamente (PEP)?" name="is_pep">
							<URadio
								v-model="formState.is_pep"
								:options="[
									{ label: 'Sí', value: 1 },
									{ label: 'No', value: 0 }
								]"
							/>
						</UFormGroup>

						<UFormGroup label="¿Tienes familiares que son Personas Expuestas Políticamente?" name="is_pep_familiar">
							<URadio
								v-model="formState.is_pep_familiar"
								:options="[
									{ label: 'Sí', value: 1 },
									{ label: 'No', value: 0 }
								]"
							/>
						</UFormGroup>
					</div>
				</div>

				<!-- Terms and Conditions -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<UFormGroup name="terms_accepted">
						<UCheckbox
							v-model="formState.terms_accepted"
							name="terms_accepted"
						>
							<span class="text-sm text-gray-700">
								Declaro que toda la información proporcionada es verdadera y acepto los
								<a href="#" class="text-blue-600 hover:underline">términos y condiciones</a>
							</span>
						</UCheckbox>
					</UFormGroup>
				</div>

				<!-- Submit Button -->
				<div class="flex">
					<UButton
						type="submit"
						color="green"
						variant="solid"
						block
						size="xl"
					>
						Guardar Cambios
					</UButton>
				</div>
			</UForm>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useAuthStore } from '~/stores/auth'
import * as v from 'valibot'

const userStore = useUserStore()
const authStore = useAuthStore()
const toast = useToast()

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
  geo_district_id: v.string('El distrito es requerido'),
  occupation_id: v.number('La ocupación es requerida'),
  is_pep: v.number('Este campo es requerido'),
  is_pep_familiar: v.number('Este campo es requerido'),
  terms_accepted: v.pipe(v.boolean(), v.literal(true, 'Debes aceptar los términos y condiciones'))
}))

// Load user data on component mount
onMounted(() => {
  // Populate form with user data from auth store
  Object.assign(formState, authStore.user)
  
})

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await userStore.updateProfile(formState)
    
    if (response.success) {
      toast.add({
        title: 'Perfil actualizado',
        description: 'Tu información ha sido actualizada correctamente',
        color: 'green'
      })
    } else {
      toast.add({
        title: 'Error',
        description: response.message || 'Ha ocurrido un error al actualizar tu perfil',
        color: 'red'
      })
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    toast.add({
      title: 'Error',
      description: 'Ha ocurrido un error al actualizar tu perfil',
      color: 'red'
    })
  }
}
</script>
