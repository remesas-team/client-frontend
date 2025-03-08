<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
    <div class="bg-gray-100 py-2 px-4 flex items-center justify-center gap-2">
      <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182l.328-.588z"/>
      </svg>
      <span class="text-sm font-medium text-gray-600">Servicio de remesas garantizado</span>
    </div>

    <div class="p-8 py-6 text-center">
      <h3 class="text-xl font-medium mb-2">Tus remesas</h3>
      <p class="text-4xl font-bold mb-2">El mismo día</p>
      <p class="text-gray-600 mb-8">Trabajamos con los bancos más grandes de Perú y Brasil</p>

      <!-- Bank Logos -->
      <div class="[&>*]:mb-6">
        <!-- Brazilian Banks -->
        <div class="grid grid-cols-4 gap-4">
          <div class="flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg/2560px-Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg.png" 
              alt="PIX"
              class="h-8 object-contain"
            />
          </div>
          <div class="flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Bradesco_logo.svg/2560px-Banco_Bradesco_logo.svg.png" 
              alt="Bradesco"
              class="h-8 object-contain"
            />
          </div>
          <div class="flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Banco_do_Brasil_logo.svg/2560px-Banco_do_Brasil_logo.svg.png" 
              alt="Banco do Brasil"
              class="h-8 object-contain"
            />
          </div>
          <div class="flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png" 
              alt="Caixa"
              class="h-8 object-contain"
            />
          </div>
        </div>

        <!-- Peruvian Banks -->
        <div class="grid grid-cols-4 gap-4">
          <div class="flex items-center justify-center">
            <img 
              src="https://cdn.worldvectorlogo.com/logos/bcp-4.svg" 
              alt="BCP"
              class="h-8 object-contain"
            />
          </div>
          <div class="flex items-center justify-center">
            <img 
              src="https://cdn.worldvectorlogo.com/logos/bbva-2.svg" 
              alt="BBVA"
              class="h-8 object-contain"
            />
          </div>
          <div class="flex items-center justify-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Interbank_logo.svg/2560px-Interbank_logo.svg.png" 
              alt="Interbank"
              class="h-8 object-contain"
            />
          </div>
          <div class="flex items-center justify-center">
            <img 
              src="https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0010/8340/Banco-Sctiabank-mejores-depositos.jpg?1366299854" 
              alt="Scotiabank"
              class="h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>