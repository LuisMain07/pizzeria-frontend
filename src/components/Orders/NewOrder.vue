<template>
  <div class="container">
    <h1 class="text-start">Crear Nueva Orden</h1>
    
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="saveOrder">
          <div class="mb-3">
            <label for="customer_name" class="form-label">Nombre del Cliente</label>
            <input 
              v-model="order.customer_name" 
              type="text" 
              class="form-control" 
              id="customer_name" 
              required
            >
          </div>
          
          <div class="mb-3">
            <label for="customer_phone" class="form-label">Teléfono del Cliente</label>
            <input 
              v-model="order.customer_phone" 
              type="text" 
              class="form-control" 
              id="customer_phone" 
              required
            >
          </div>
          
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza</label>
            <select 
              v-model="order.pizza_id" 
              class="form-select" 
              id="pizza_id" 
              required
              @change="updateTotalPrice"
            >
              <option value="">Seleccione una pizza</option>
              <option 
                v-for="pizza in pizzas" 
                :key="pizza.id" 
                :value="pizza.id"
              >
                {{ pizza.name }} - ${{ Number(pizza.price).toFixed(2) }}
              </option>
            </select>
          </div>
          
          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad</label>
            <input 
              v-model.number="order.quantity" 
              type="number" 
              class="form-control" 
              id="quantity" 
              min="1"
              required
              @input="updateTotalPrice"
            >
          </div>
          
          <div class="mb-3">
            <label for="total_price" class="form-label">Precio Total</label>
            <input 
              v-model="order.total_price" 
              type="number" 
              step="0.01"
              class="form-control" 
              id="total_price" 
              readonly
            >
          </div>
          
          <div class="mb-3">
            <label for="status" class="form-label">Estado</label>
            <select 
              v-model="order.status" 
              class="form-select" 
              id="status" 
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en preparación">En Preparación</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>
          
          <div class="mb-3">
            <label for="delivery_address" class="form-label">Dirección de Entrega</label>
            <textarea 
              v-model="order.delivery_address" 
              class="form-control" 
              id="delivery_address" 
              rows="3"
              required
            ></textarea>
          </div>
          
          <div class="mb-3">
            <label for="order_date" class="form-label">Fecha del Pedido</label>
            <input 
              v-model="order.order_date" 
              type="datetime-local" 
              class="form-control" 
              id="order_date" 
              required
            >
          </div>
          
          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
          </button>
          <button @click="cancel" type="button" class="btn btn-secondary mx-2">
            <font-awesome-icon icon="times" /> Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewOrder',
  data() {
    return {
      order: {
        customer_name: '',
        customer_phone: '',
        pizza_id: '',
        quantity: 1,
        total_price: 0,
        status: 'pendiente',
        delivery_address: '',
        order_date: ''
      },
      pizzas: []
    }
  },
  methods: {
    updateTotalPrice() {
      if (this.order.pizza_id && this.order.quantity) {
        const selectedPizza = this.pizzas.find(pizza => pizza.id == this.order.pizza_id)
        if (selectedPizza) {
          this.order.total_price = (Number(selectedPizza.price) * this.order.quantity).toFixed(2)
        }
      }
    },
    async saveOrder() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/order', this.order)
        
        if (response.data.success) {
          Swal.fire({
            title: '¡Guardado!',
            text: 'La orden se ha creado correctamente.',
            icon: 'success'
          }).then(() => {
            this.$router.push({ name: 'Orders' })
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo guardar la orden.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'Orders' })
    },
    async loadPizzas() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pizza')
        this.pizzas = response.data.pizzas || []
      } catch (error) {
        console.error('Error cargando pizzas:', error)
      }
    },
    setCurrentDateTime() {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      
      this.order.order_date = `${year}-${month}-${day}T${hours}:${minutes}`
    }
  },
  async mounted() {
    await this.loadPizzas()
    this.setCurrentDateTime()
  }
}
</script>