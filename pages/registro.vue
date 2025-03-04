ntra<template>
  <main class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold">Crear cuenta</h1>
          <p class="text-gray-600 mt-2">Únete a nuestra plataforma de envíos</p>
        </div>

        <UForm :state="form" @submit="handleRegister" @error="handleError" class="space-y-6" :schema="v.safeParser(schemaRemittance)">
          <div class="space-y-4">
            <div>
              <UFormField label="Nombre completo" name="name">
                <UInput v-model="form.name" placeholder="Nombre" size="xl" class="w-full"  />
              </UFormField>
            </div>

            <div>
              <UFormField label="Apellido completo" name="last_name">
                <UInput v-model="form.last_name" placeholder="Apellido completo" size="xl" class="w-full" />
              </UFormField>
            </div>

            <div>
              <UFormField label="Correo electrónico" name="email">
                <UInput v-model="form.email" type="email"  placeholder="Correo electrónico" size="xl" class="w-full" />
              </UFormField>
            </div>
            <div>
              <UFormField label="Ocupación" name="occupation_id">
                <USelectMenu v-model="form.occupation_id" value-key="value" :items="sourcesStore.occupations" placeholder="selecciona.." size="xl" class="w-full" />
              </UFormField>
            </div>
            
            <div class="flex gap-2">
              <UFormField label="Código" name="phone_code" class="w-24">
                <USelect v-model="form.phone_code" :items="[{ label: '+51', value: '+51' }]" placeholder="+1" size="xl" />
              </UFormField>

              <UFormField label="Teléfono" name="phone" class="w-full">
                <UInput v-model="form.phone" type="number"  placeholder="Número de celular" size="xl" class="w-full" />
              </UFormField>
            </div>

            <div class="flex gap-2">
              <UFormField label="Tipo doc." name="doc_type_id" class="w-[35%]">
                <USelect v-model="form.doc_type_id" :items="[{ label: 'DNI', value: 1 }]" placeholder="Tipo de documento" size="xl" class="w-full" />
              </UFormField>
              <UFormField label="Número de documento" name="doc_value" class="w-full">
                <UInput v-model="form.doc_value"  placeholder="Número de documento" size="xl" class="w-full" />
              </UFormField>
            </div>


            <div>
              <UFormField label="Género" name="genre">
                <URadioGroup v-model="form.genre" :items="[
                  { label: 'Hombre', value: 'hombre' },
                  { label: 'Mujer', value: 'mujer' }
                ]" class="flex gap-4" size="xl" />
              </UFormField>
            </div>

            <div>
              <UFormField label="Fecha de nacimiento" name="birth_date">
                <UInput v-model="form.birth_date" type="date"  size="xl" class="w-full" />
              </UFormField>
            </div>

            <div>
              <UFormField label="Contraseña" name="password">
                <UInput v-model="form.password" placeholder="Contraseña" size="xl" class="w-full"
                    :type="showPassword ? 'text' : 'password'"
                    :ui="{ trailing: 'pe-1' }"
                  >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                      :aria-pressed="showPassword"
                      aria-controls="password"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </UInput>
              </UFormField>
            </div>
            
            <div>
              <UFormField label="Confirmar contraseña" name="password_confirmation">
                <UInput v-model="form.password_confirmation" placeholder="Contraseña" size="xl" class="w-full"
                    :type="showPasswordConfirmation ? 'text' : 'password'"
                    :ui="{ trailing: 'pe-1' }"
                  >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      :icon="showPasswordConfirmation ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      :aria-label="showPasswordConfirmation ? 'Hide password' : 'Show password'"
                      :aria-pressed="showPasswordConfirmation"
                      aria-controls="password"
                      @click="showPasswordConfirmation = !showPasswordConfirmation"
                    />
                  </template>
                </UInput>
              </UFormField>
            </div>

            <div>
              <UFormField name="acceptTerms">
                <UCheckbox v-model="form.acceptTerms" 
                  label="Acepto los términos y condiciones y la política de privacidad">
                  <template #label>
                    <span class="text-sm text-gray-700">
                      Acepto los
                      <a href="#" class="text-blue-600 hover:underline">términos y condiciones</a>
                      y la
                      <a href="#" class="text-blue-600 hover:underline">política de privacidad</a>
                    </span>
                  </template>
                </UCheckbox>
              </UFormField>
            </div>
          </div>
          <div v-for="(index, field) in validationErrors">
            <UAlert
              v-for="error in index"
              icon="i-heroicons-command-line"
              color="error"
              variant="soft"
              title="Error"
              :description="error"
            />
          </div>
          <UButton type="submit" size="xl" color="primary" block :loading="isLoading"
            class="w-full text-lg font-medium h-14 bg-green-dark text-center hover:bg-green-grass hover:cursor-pointer">
            {{ isLoading ? 'Registrando...' : 'Crear cuenta' }}
          </UButton>
        </UForm>
        <p class="text-center text-sm text-gray-600 mt-5">
          ¿Ya tienes una cuenta?
          <NuxtLink to="/login" class="text-blue-600 hover:underline font-medium">
            Iniciar sesión
          </NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useSourcesStore } from '~/stores/sources'
import * as v from 'valibot';

const { $auth } = useNuxtApp();
const router = useRouter();
const authStore = useAuthStore();
const sourcesStore = useSourcesStore()
const isLoading = ref(false);
const errorMessage = ref('');
const validationErrors = ref<Record<string, string[]>>({});
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)

definePageMeta({
  auth: 'guest',
})


onMounted(async () => {
  await sourcesStore.fetchOccupations()
  await sourcesStore.fetchGenders()
})



const form = reactive({
  name: null,
  last_name: null,
  email: null,
  phone_code: null,
  phone: null,
  doc_type_id: null,
  doc_value: null,
  is_pep: false,
  is_pep_familiar: false,
  occupation_id: null,
  genre: 'hombre',
  birth_date: '1993-07-04',
  civil_status: 'soltero',
  address: '123 Main Street, Springfield',
  geo_district_id: 10,
  password_confirmation: null,
  password: null,
  acceptTerms: null
});

const schemaRemittance = v.object({
  name: v.string('Required'),
  last_name: v.string('Required'),
  email: v.string('Required'),
  phone_code: v.string('Required'),
  phone: v.number('Required'),
  doc_type_id: v.number('Required'),
  doc_value: v.string('Required'),
  //is_pep: v.string('Required'),
  //is_pep_familiar: v.string('Required'),
  occupation_id: v.number('Required'),
  genre: v.string('Required'),
  birth_date: v.string('Required'),
  //civil_status: v.string('Required'),
  //address: v.string('Required'),
  password: v.string('Required'),
  password_confirmation: v.string('Required'),
  acceptTerms: v.pipe(v.boolean(), v.literal(true, "Este campo es obligatorio")),
})

const handleRegister = async () => {

  if (form.password !== form.password_confirmation) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }

  isLoading.value = true;

  console.log(form);

  const registerData = {
    name: form.name,
    last_name: form.last_name,
    email: form.email,
    phone_code: form.phone_code,
    phone: parseInt(form.phone),
    doc_type_id: form.doc_type_id,
    doc_value: form.doc_value,
    is_pep: form.is_pep,
    is_pep_familiar: form.is_pep_familiar,
    occupation_id: form.occupation_id,
    genre: form.genre,
    birth_date: form.birth_date,
    civil_status: form.civil_status,
    address: form.address,
    geo_district_id: form.geo_district_id,
    password: form.password,
    password_confirmation: form.password_confirmation

  };
  
  const response = await authStore.registerUser(registerData)

  console.log('response', response)

  // Handle unsuccessful registration
  if (!response.success) {
    // Reset loading state
    isLoading.value = false; 
    // Set validation errors if they exist
    if (response.errors) {
      validationErrors.value = response.errors;
      errorMessage.value = response.message;
    }
    return;
  }
  const mixpanel = useMixpanel();

  mixpanel.people.set({
      $email: response.data.email,
      $first_name: response.data.name,
      $last_name: response.data.last_name,
      $phone: response.data.phone,
    })

  $auth.setToken(response.data.access_token);
  authStore.user = response.data.user;


  const redirect = useCookie('auth.prod.remesas.redirect');
  if (redirect.value) {
    router.push(redirect.value);
  } else {
    router.push('/');
  }

};

const handleError = async (error) => {
  console.log('handleError', error)
}




</script>
