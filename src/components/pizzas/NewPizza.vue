<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Nueva Pizza</h2>
        <form @submit.prevent="savePizza">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" v-model="pizza.name" required>
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
  name: 'NewPizza',
  data() {
    return {
      pizza: {
        name: ''
      }
    }
  },
  methods: {
    async savePizza() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/pizzas', this.pizza)
        
        if (res.status === 201) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pizza creada',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Pizzas' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear la pizza'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Pizzas' })
    }
  }
}
</script>