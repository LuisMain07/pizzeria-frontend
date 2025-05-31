<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Editar Pizza</h2>
        <form @submit.prevent="updatePizza">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" v-model="pizza.name" required>
          </div>
          <button type="submit" class="btn btn-primary">Actualizar</button>
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
  name: 'EditPizza',
  data() {
    return {
      pizza: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    async updatePizza() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`, this.pizza)
        
        if (res.status === 200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pizza actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Pizzas' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la pizza'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Pizzas' })
    }
  },
  mounted() {
    this.pizza.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`)
      .then(response => {
        this.pizza = response.data
      })
  }
}
</script>