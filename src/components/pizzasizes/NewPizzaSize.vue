<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Nuevo Tamaño de Pizza</h2>
        <form @submit.prevent="savePizzaSize">
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza:</label>
            <select class="form-select" v-model="pizzaSize.pizza_id" required>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">{{ pizza.name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="size" class="form-label">Tamaño:</label>
            <select class="form-select" v-model="pizzaSize.size" required>
              <option value="pequeña">Pequeña</option>
              <option value="mediana">Mediana</option>
              <option value="grande">Grande</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Precio:</label>
            <input type="number" step="0.01" class="form-control" id="price" v-model="pizzaSize.price" required>
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
          <button type="button" class="btn btn-secondary ms-3" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewPizzaSize',
  data() {
    return {
      pizzaSize: {
        pizza_id: '',
        size: 'mediana',
        price: 0
      },
      pizzas: []
    }
  },
  methods: {
    async savePizzaSize() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/pizza-sizes', this.pizzaSize)
        
        if (res.status === 201) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tamaño de pizza creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'PizzaSizes' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear el tamaño de pizza'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'PizzaSizes' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizzas')
      .then(response => {
        this.pizzas = response.data
      })
  }
}
</script>