<script setup>
const logos = [
    'Banco de la nación.png',
    'Banco do Brasil.png',
    'BBVA.png',
    'Bcp.png',
    'Bradesco.png',
    'Caiza.png',
    'Inter.png',
    'Interbank.png',
    'Itau.png',
    'NuBank.png',
    'PagBank.png',
    'PicPay.png',
    'Scotiabank.png'
]
</script>

<template>
    <h2 class="text-2xl text-center font-bold mb-5 md:text-4xl lg:max-w-[800px] mx-auto md:mt-20 md:mb-15"><span class="text-green-600">Enviamos remesas</span> a los principales bancos de Perú y Brasil</h2>
    <div class="flex flex-wrap justify-center items-center gap-8 w-full py-8">
        <div v-for="(logo, index) in logos" :key="index" class="flex justify-center items-center">
            <img 
                :src="`/images/logos/${logo}`" 
                :alt="`Logo ${index + 1}`" 
                class="max-h-[30px] object-contain grayscale transition-all duration-300 hover:grayscale-0" 
            />
        </div>
    </div>
</template>

<style scoped>
/* You can remove this entire style block as we've moved everything to Tailwind classes */
</style>