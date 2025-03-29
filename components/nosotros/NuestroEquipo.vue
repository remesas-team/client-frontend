<script setup lang="ts">
interface Founder {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  previousCompanies: {
    name: string;
    logo: string;
  }[];
  linkedin?: string;
  twitter?: string;
}

// Mock data for founders
const founders: Founder[] = [
  {
    id: 1,
    name: "Alex Zuñiga",
    role: "CPO & Co-Fundador",
    bio: "Ex-ejecutiva de finanzas con 12 años de experiencia en el sector bancario internacional. Lideró operaciones en mercados emergentes.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    previousCompanies: [
      { name: "JP Morgan", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/JPMorgan_Chase_logo.svg/320px-JPMorgan_Chase_logo.svg.png" },
      { name: "HSBC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/320px-HSBC_logo_%282018%29.svg.png" }
    ],
    linkedin: "https://linkedin.com/in",
    twitter: "https://twitter.com"
  },
  {
    id: 2,
    name: "Cristian Vega",
    role: "CTO & Co-Fundador",
    bio: "Ingeniero de software con experiencia en sistemas de pago y blockchain. Lideró equipos técnicos en empresas tecnológicas de primer nivel.",
    image: "/images/nosotros/Cristian Vega.png",
    previousCompanies: [
      { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
      { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/320px-PayPal.svg.png" }
    ],
    linkedin: "https://linkedin.com/in",
    twitter: "https://twitter.com"
  },
  {
    id: 3,
    name: "Raúl Auccatoma",
    role: "CMO & Co-Fundador",
    bio: "Experta en operaciones con enfoque en mercados latinoamericanos. Desarrolló estrategias de expansión exitosas para fintechs globales.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    previousCompanies: [
      { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/320px-Stripe_Logo%2C_revised_2016.svg.png" },
      { name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/320px-Visa_Inc._logo.svg.png" }
    ],
    linkedin: "https://linkedin.com/in",
    twitter: "https://twitter.com"
  },
  {
    id: 4,
    name: "Melissa Hernándeza",
    role: "CEO & Co-Fundador",
    bio: "Financiero con especialización en modelos de riesgo y cumplimiento regulatorio internacional. Experto en mercados emergentes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    previousCompanies: [
      { name: "Goldman Sachs", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/320px-Goldman_Sachs.svg.png" },
      { name: "World Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/World_Bank_logo.svg/320px-World_Bank_logo.svg.png" }
    ],
    linkedin: "https://linkedin.com/in",
    twitter: "https://twitter.com"
  }
];
</script>

<template>
  <section class="py-16 bg-gradient-to-b from-white to-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div class="inline-block px-3 py-1 rounded-full bg-green-wather/10 text-green-wather font-medium text-sm mb-4">
          Nuestro Equipo
        </div>
        
        <h2 class="text-4xl font-bold text-green-dark mb-4">
          Somos expertos apasionados por la <span class="text-green-wather">innovación financiera</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Nuestro equipo combina décadas de experiencia en fintech, blockchain y mercados emergentes.
        </p>
      </div>
      <!-- Team Grid -->
      <div class="flex flex-wrap justify-center items-center gap-10 max-w-7xl mx-auto">
        <div v-for="founder in founders" :key="founder.id" 
          :class="[
            'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300',
            founder.id === founders.length ? 'lg:flex w-2/3 h-100' : 'w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)]'
          ]"
        >
          <!-- Profile Image -->
          <div :class="[
            'relative overflow-hidden',
            founder.id === founders.length ? 'lg:w-1/3 lg:h-auto' : 'h-80'
          ]">
            <img 
              :src="founder.image" 
              :alt="founder.name" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-white">
              <h3 class="text-xl font-bold">{{ founder.name }}</h3>
              <p class="font-medium text-gray-200">{{ founder.role }}</p>
            </div>
          </div>
          <!-- Content -->
          <div :class="[
            'p-6'
          ]">
            <p class="text-gray-600 mb-4">{{ founder.bio }}</p>
            
            <!-- Previous Companies -->
            <div class="mb-4">
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Experiencia Previa</h4>
              <div class="flex space-x-4">
                <div v-for="(company, idx) in founder.previousCompanies" :key="idx" class="flex items-center space-x-2">
                  <img 
                    :src="company.logo" 
                    :alt="company.name" 
                    class="h-5 object-contain"
                  />
                  <span class="text-sm text-gray-600">{{ company.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="flex justify-end space-x-3">
              <a v-if="founder.linkedin" :href="founder.linkedin" class="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a v-if="founder.twitter" :href="founder.twitter" class="p-2 text-blue-400 hover:bg-blue-50 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
/* No additional custom styles needed - using Tailwind */
</style>