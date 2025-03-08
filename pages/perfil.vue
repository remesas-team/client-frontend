<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<div class="max-w-3xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<h1 class="text-2xl font-bold">Configura tu perfil</h1>
				<p class="text-gray-600">Gestiona tu información personal y preferencias</p>
			</div>

			<form
				class="space-y-6"
				@submit.prevent="saveProfile"
			>
				<!-- Avatar Section
        <ProfileAvatar v-model="avatar"/> -->

				<!-- Personal Information -->
				<ProfilePersonalInfo ref="personalInfo" />

				<!-- Document Information -->
				<ProfileDocumentInfo ref="documentInfo" />

				<!-- Compliance Information -->
				<ProfileComplianceInfo ref="complianceInfo" />

				<!-- Terms and Conditions -->
				<div class="bg-white rounded-xl shadow-lg p-6">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								v-model="termsAccepted"
								type="checkbox"
								required
								class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
							/>
						</div>
						<div class="ml-3">
							<label class="text-sm text-gray-700">
								Declaro que toda la información proporcionada es verdadera y acepto los
								<a
									href="#"
									class="text-blue-600 hover:underline"
									>términos y condiciones</a
								>
							</label>
						</div>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="flex">
					<button
						type="submit"
						class="w-full bg-green-grass text-white px-8 py-3 rounded-lg hover:bg-green-dark transition-colors text-lg font-medium"
					>
						Guardar Cambios
					</button>
				</div>
			</form>
		</div>
	</main>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

const avatar = ref<string | null>(null)
const termsAccepted = ref(false)

const personalInfo = ref(null)
const documentInfo = ref(null)
const complianceInfo = ref(null)

const saveProfile = () => {
	// Get form data from all components
	const profileData = {
		...personalInfo.value?.form,
		...documentInfo.value?.form,
		...complianceInfo.value?.form,
	}

	console.log('Profile data to save:', profileData)
	// Here you would implement the API call to save the profile
}
</script>
