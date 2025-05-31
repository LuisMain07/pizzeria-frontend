<template>
  <div class="container">
    <h1 class="text-start">Editar Orden</h1>
    
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="updateOrder">
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
            <font-awesome-icon icon="save" /> Actualizar
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
  name: 'EditarOrder',
  data() {
    return {
      order: {
        id: '',
        customer_name: '',
        customer_phone: '',
        pizza_id: '',
        quantity: 1,
        total_price: 0,
        status: '',
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
    async updateOrder() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/order/${this.order.id}`, 
          this.order
        )
        
        if (response.data.success) {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'La orden se ha actualizado correctamente.',
            icon: 'success'
          }).then(() => {
            this.$router.push({ name: 'Orders' })
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar la orden.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'Orders' })
    },
    async loadOrder() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${id}`)
        this.order = response.data.order
        
        // Formatear la fecha para el input datetime-local
        if (this.order.order_date) {
          const date = new Date(this.order.order_date)
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          
          this.order.order_date = `${year}-${month}-${day}T${hours}:${minutes}`
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar la orden.', 'error')
        this.$router.push({ name: 'Orders' })
      }
    },
    async loadPizzas() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pizza')
        this.pizzas = response.data.pizzas || []
      } catch (error) {
        console.error('Error cargando pizzas:', error)
      }
    }
  },
  async mounted() {
    await this.loadOrder()
    await this.loadPizzas()
  }
}
</script>