<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <TheHeader />
    
    <main class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-lg">
        <!-- Success Card -->
        <div class="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <!-- Title Section -->
          <div class="text-center space-y-2">
            <div class="success-checkmark">
              <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div>
            <h1 class="text-3xl font-bold">Transacción exitosa</h1>
            <p class="text-gray-600">Move your money where it matters</p>
          </div>

          <!-- Transaction Details -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Dinero transferido</span>
              <span class="font-medium">S/300</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Impuestos</span>
              <span class="font-medium">S/20</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Comisión</span>
              <span class="font-medium">S/20</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Dinero en destino</span>
              <span class="font-medium">BRL3300</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Código de operación</span>
              <span class="font-medium">74112</span>
            </div>
          </div>

          <!-- Action Button -->
          <div class="space-y-4">
            <NuxtLink 
              to="/tracking/74112"
              class="block w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium text-center"
            >
              Dale seguimiento
            </NuxtLink>
            
            <p class="text-center text-gray-600">
              Tu dinero estará disponible en máximo 6h
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: relative;
  animation: appear 0.3s ease;
}

.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4CAF50;
}

.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

.icon-line {
  height: 5px;
  background-color: #4CAF50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

.icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}

.icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}

.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, .5);
}

.icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #fff;
}

@keyframes appear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 46px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>