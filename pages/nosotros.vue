<script setup lang="ts">
definePageMeta({
	auth: false,
})
import { ref } from 'vue'

const stats = ref([
  { label: 'Usuarios atendidos', value: '+20 mil', icon: 'users' },
  { label: 'Envíos mensuales', value: '+1.4 mil', icon: 'refresh' },
  { label: 'Monto total último año', value: 'USD +13 millones', icon: 'chart' },
  { label: 'Bancos con los que trabajamos', value: '+30 bancos', icon: 'globe' },
])

const team = ref([
  {
    name: 'Alex Zuñiga',
    position: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    bio: 'Reconocida en el MIT como joven innovadora, tiene más de 10 años de experiencia liderando empresas disruptivas y equipos de fintech.'
  },
  {
    name: 'Cristian Vega',
    position: 'Director de Operaciones',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    bio: 'Con 12 años de experiencia en finanzas y economía estratégica con gobiernos y empresas de Latinoamérica, lidera nuestras operaciones para garantizar el mejor servicio.'
  },
  {
    name: 'Melissa Hernández',
    position: 'Director de Operaciones',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    bio: 'Con 12 años de experiencia en finanzas y economía estratégica con gobiernos y empresas de Latinoamérica, lidera nuestras operaciones para garantizar el mejor servicio.'
  },
  {
    name: 'Raul Auccatoma',
    position: 'Director de Operaciones',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    bio: 'Con 12 años de experiencia en finanzas y economía estratégica con gobiernos y empresas de Latinoamérica, lidera nuestras operaciones para garantizar el mejor servicio.'
  }
])

const testimonials = ref([
  {
    name: 'Maria Santos',
    location: 'Brasileña en Lima',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    quote: 'Llevo 3 años usando Remesas.com y nunca he tenido un problema. El dinero siempre llega en minutos a mi familia en Brasil.'
  },
  {
    name: 'Carlos Mendoza',
    location: 'Peruano en São Paulo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    quote: 'Las tasas son increíbles y la app es muy fácil de usar. He recomendado Remesas.com a todos mis amigos peruanos aquí en Brasil.'
  },
])

const partners = ref([
  { name: 'Banco Itaú', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Ita%C3%BA_logo.svg/320px-Banco_Ita%C3%BA_logo.svg.png' },
  { name: 'Banco de Crédito del Perú', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/BCP_logo.svg/320px-BCP_logo.svg.png' },
  { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png' },
  { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/320px-Mastercard-logo.svg.png' },
])

const certifications = ref([
  { name: 'PCI DSS Compliant', icon: 'shield' },
  { name: 'ISO 27001 Certified', icon: 'certificate' },
  { name: 'Regulado por BCRP y BCB', icon: 'bank' },
  { name: '256-bit Encryption', icon: 'lock' },
])
</script>

<template>
  <div class="min-h-screen bg-light">
    <!-- Hero section -->
    <section class="bg-gradient-to-br from-light via-white to-light py-24 px-6 md:px-12 relative overflow-hidden">
      <div class="absolute -right-64 -top-64 w-96 h-96 bg-green-wather/20 rounded-full blur-3xl"></div>
      <div class="absolute -left-64 -bottom-64 w-96 h-96 bg-green-grass/10 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div class="md:w-1/2">
          <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-6">
            Sobre Nosotros
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold text-green-dark leading-tight mb-6">
            Enviamos más que dinero, conectamos <span class="text-green-wather">familias</span> 🙌
          </h1>
          
          <p class="text-lg text-gray-600 mb-8">
            Somos una empresa jóven que busca romper las barreras entre países y a través de nuestra plataforma de envío de dinero, conectamos a personas de todo el mundo. 
          </p>
          <p class="text-lg text-gray-600 mb-8 font-bold">
            Queremos garantizarte:
          </p>          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-wather/10 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-wather" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-green-dark">Transferencias inmediatas</h3>
                <p class="text-gray-600">Trabajamos en hacer el proceso siempre más rápido</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-wather/10 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-wather" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-green-dark">Sin costos ocultos</h3>
                <p class="text-gray-600">Tarifas transparentes y competitivas</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-wather/10 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-wather" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-green-dark">Servicio 24/7</h3>
                <p class="text-gray-600">Soporte disponible todo el tiempo vía Whatsapp</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-wather/10 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-wather" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-green-dark">100% Seguro</h3>
                <p class="text-gray-600">Protegemos tu dinero y tus datos con tecnología</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="md:w-1/2 relative">
          <img src="/public/images/nosotros/enviar_dinero.png" alt="">
        </div>
      </div>
    </section>

    <!-- Statistics section -->
    <section class="py-20 px-6 md:px-12 bg-white">
      <div class="max-w-7xl mx-auto text-center mb-16">
        <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-4">
          Datos que te van a interesar
        </div>
        
        <h2 class="text-4xl font-bold text-green-dark mb-4">
          Cada día conectamos a <span class="text-green-wather">decenas de familias</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Más de 20,000 personas han confiado en nosotros para enviar dinero a sus seres queridos de forma rápida y segura.
        </p>
      </div>
      
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 max-w-7xl mx-auto">
        <div v-for="stat in stats" :key="stat.label" class="p-2 md:p-8 bg-light rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-14 h-14 mb-6 bg-green-wather/10 rounded-full flex items-center justify-center mx-auto">
            <svg v-if="stat.icon === 'users'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-if="stat.icon === 'refresh'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-if="stat.icon === 'chart'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <svg v-if="stat.icon === 'globe'" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <p class="text-xl md:text-3xl font-bold text-green-wather text-center mb-2">{{ stat.value }}</p>
          <p class="text-gray-600 text-center">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Team section -->
    <section class="py-20 px-6 md:px-12 bg-light">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-4">
            Nuestro Equipo
          </div>
          
          <h2 class="text-4xl font-bold text-green-dark mb-4">
            Expertos apasionados por la <span class="text-green-wather">innovación financiera</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo combina décadas de experiencia en fintech, blockchain y mercados emergentes.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div v-for="person in team" :key="person.name" class="bg-white rounded-xl p-10 shadow-soft relative group overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-wather to-green-grass transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            
            <div class="flex flex-col md:flex-row gap-8 items-start">
              <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-light shadow-sm">
                <img :src="person.image" :alt="person.name" class="w-full h-full object-cover">
              </div>
              
              <div>
                <h3 class="text-2xl font-bold text-green-dark">{{ person.name }}</h3>
                <p class="text-green-wather font-medium mb-4">{{ person.position }}</p>
                
                <p class="text-gray-600 mb-6">{{ person.bio }}</p>
                
                <div class="flex gap-3">
                  <a href="#" class="w-8 h-8 rounded-full bg-light flex items-center justify-center text-gray-600 hover:bg-green-wather hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-8 h-8 rounded-full bg-light flex items-center justify-center text-gray-600 hover:bg-green-wather hover:text-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust badges 
    <section class="py-20 px-6 md:px-12 bg-gradient-to-br from-green-grass to-green-dark text-white">
      <div class="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-white font-medium text-sm mb-4 mx-auto text-center block">
          Seguridad Garantizada
        </div>
        
        <h2 class="text-4xl font-bold text-center mb-16">
          Tecnología de punta para proteger tu dinero
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="cert in certifications" :key="cert.name" class="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white border-opacity-10 text-center hover:bg-opacity-10 transition-all duration-300">
            <div class="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <svg v-if="cert.icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <svg v-if="cert.icon === 'certificate'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <svg v-if="cert.icon === 'bank'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <svg v-if="cert.icon === 'lock'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-wather" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h3 class="text-xl font-bold mb-2">{{ cert.name }}</h3>
            <p class="text-gray-300 text-sm">Cumplimos con los más altos estándares de seguridad del sector financiero</p>
          </div>
        </div>
      </div>
    </section>
-->
    <!-- Manifesto section -->
    <section class="py-20 px-6 md:px-12 bg-white">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-4">
            Nuestra Visión
          </div>
          
          <h2 class="text-4xl md:text-6xl font-bold text-green-dark mb-8 leading-tight">
            Cambiamos<br/>
            las<br/>
            <span class="relative">
              reglas del juego
              <span class="absolute -bottom-2 left-0 h-1 w-16 bg-green-wather"></span>
            </span>
          </h2>
          
          <div class="bg-light rounded-xl shadow-soft mt-12">
            <h3 class="text-2xl font-bold text-green-dark mb-4">Nuestra Misión</h3>
            <p class="text-gray-600 mb-6">
              Creemos que cada persona merece acceso a servicios financieros justos, rápidos y accesibles, sin importar dónde viva o trabaje.
            </p>
            <a href="#" class="inline-flex items-center text-green-wather font-medium">
              Descubre nuestra historia
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        <div class="space-y-8">
          <div class="bg-light p-8 rounded-xl shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-bold text-green-dark mb-3">¿Por qué hacemos Remesas.com?</h3>
            <p class="text-gray-600">
              Sabemos que la tecnología blockchain tiene el potencial de conectar a la humanidad como nunca antes. Estamos construyendo los puentes financieros del futuro, derribando barreras entre países y personas.
            </p>
          </div>
          
          <div class="bg-light p-8 rounded-xl shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-bold text-green-dark mb-3">¿Cómo es el futuro que imaginamos?</h3>
            <p class="text-gray-600">
              Un mundo donde enviar dinero internacionalmente sea tan simple, rápido y económico como enviar un mensaje de texto. Un sistema financiero verdaderamente libre, justo y descentralizado.
            </p>
          </div>
          
          <div class="bg-light p-8 rounded-xl shadow-soft transform hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xl font-bold text-green-dark mb-3">¿Cómo lo vamos a construir?</h3>
            <p class="text-gray-600">
              Con nuestra comunidad, paso a paso. Combinando tecnología de punta, regulación inteligente y centrando cada decisión en las necesidades reales de nuestros usuarios.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners section -->
    <section class="py-16 px-6 md:px-12 bg-light">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-4">
          Nuestros Aliados
        </div>
        
        <h2 class="text-2xl md:text-3xl font-bold text-green-dark mb-12">
          Trabajamos con las instituciones financieras más importantes
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="partner in partners" :key="partner.name" class="bg-white p-6 rounded-xl shadow-soft flex items-center justify-center h-24">
            <img :src="partner.logo" :alt="partner.name" class="max-h-10 max-w-full object-contain">
          </div>
        </div>
      </div>
    </section>

    <!-- CTA section -->
    <section class="py-20 px-6 md:px-12 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="bg-light rounded-2xl p-12 md:p-16 shadow-soft flex flex-col items-center text-center">
          <div class="flex flex-col items-center">
            <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-4">
              Empieza ahora
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold text-green-dark mb-4">Any Method, Anywhere.</h2>
            <p class="text-xl text-gray-600 mb-6">Experimenta pagos instantáneos para tus seres queridos.</p>
            
            <div class="flex gap-4 justify-center">
              <a href="#" class="bg-green-wather hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Registrarse gratis
              </a>
              <a href="#" class="border border-gray-300 hover:border-green-wather text-green-dark font-medium px-6 py-3 rounded-lg transition-colors duration-300">
                Programar una demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<style scoped>

/* Specific styles can be added here if needed */
</style>