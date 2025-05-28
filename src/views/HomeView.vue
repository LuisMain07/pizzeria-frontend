<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Header de prueba -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-pizza-600 mb-2">
          🍕 Pizzería App - Test Tailwind
        </h1>
        <p class="text-xl text-gray-600">
          Verificando que Tailwind CSS funciona correctamente
        </p>
      </div>

      <!-- Test de colores -->
      <div class="card mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900">
          Test de Colores Pizzería
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="bg-pizza-50 p-4 rounded-lg border border-pizza-200 text-center">
            <div class="text-pizza-800 font-semibold">Pizza 50</div>
            <div class="text-xs text-pizza-600">#fef7ed</div>
          </div>
          <div class="bg-pizza-200 p-4 rounded-lg text-center">
            <div class="text-pizza-800 font-semibold">Pizza 200</div>
            <div class="text-xs text-pizza-700">#fbd5a5</div>
          </div>
          <div class="bg-pizza-500 p-4 rounded-lg text-white text-center">
            <div class="font-semibold">Pizza 500</div>
            <div class="text-xs text-pizza-100">#f97316</div>
          </div>
          <div class="bg-pizza-700 p-4 rounded-lg text-white text-center">
            <div class="font-semibold">Pizza 700</div>
            <div class="text-xs text-pizza-200">#c2410c</div>
          </div>
          <div class="bg-pizza-900 p-4 rounded-lg text-white text-center">
            <div class="font-semibold">Pizza 900</div>
            <div class="text-xs text-pizza-300">#7c2d12</div>
          </div>
        </div>
      </div>

      <!-- Test de botones -->
      <div class="card mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900">
          Test de Botones
        </h2>
        <div class="flex flex-wrap gap-4">
          <button class="btn-primary">
            🍕 Botón Primario
          </button>
          <button class="btn-secondary">
            ⚙️ Botón Secundario
          </button>
          <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            ❌ Botón Rojo
          </button>
        </div>
      </div>

      <!-- Test de formulario -->
      <div class="card mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900">
          Test de Formulario
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Sucursal
            </label>
            <input 
              type="text" 
              placeholder="Ej: Pizzería Centro"
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email de Contacto
            </label>
            <input 
              type="email" 
              placeholder="contacto@pizzeria.com"
              class="input-field"
            />
          </div>
        </div>
      </div>

      <!-- Test de alertas -->
      <div class="space-y-4 mb-8">
        <div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          ✅ <strong>¡Éxito!</strong> Si ves este mensaje con colores bonitos, Tailwind CSS funciona perfectamente.
        </div>
        <div class="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
          ℹ️ <strong>Información:</strong> Tu configuración de Tailwind está correcta.
        </div>
        <div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
          ⚠️ <strong>Nota:</strong> Una vez que confirmes que funciona, implementaremos el dashboard real.
        </div>
      </div>

      <!-- Test de grid responsive -->
      <div class="card">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900">
          Test de Grid Responsive
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-pizza-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">🏪</div>
            <h3 class="font-semibold text-pizza-800 mb-2">Sucursales</h3>
            <p class="text-pizza-600 text-sm">Gestión de ubicaciones y estadísticas</p>
          </div>
          <div class="bg-pizza-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">🍕</div>
            <h3 class="font-semibold text-pizza-800 mb-2">Órdenes Pizza</h3>
            <p class="text-pizza-600 text-sm">Gestión de pedidos y seguimiento</p>
          </div>
          <div class="bg-pizza-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">🧄</div>
            <h3 class="font-semibold text-pizza-800 mb-2">Ingredientes Extra</h3>
            <p class="text-pizza-600 text-sm">Gestión de extras y personalización</p>
          </div>
        </div>
      </div>

      <!-- Estado actual -->
      <div class="card mt-8 bg-pizza-50 border-pizza-200">
        <h2 class="text-2xl font-semibold mb-4 text-pizza-900">
          Estado del Proyecto
        </h2>
        <div class="space-y-2 text-pizza-800">
          <p>✅ <strong>Backend Laravel:</strong> API completa implementada</p>
          <p>🔄 <strong>Frontend Vue.js:</strong> Configurando Tailwind CSS</p>
          <p>⏳ <strong>Próximo paso:</strong> Implementar componentes de la pizzería</p>
          <p class="text-sm mt-4 italic text-pizza-700">
            Una vez que confirmes que Tailwind funciona, implementaremos el dashboard completo de la pizzería.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vista de prueba para verificar Tailwind CSS
// Una vez que funcione, implementaremos el dashboard real
</script>