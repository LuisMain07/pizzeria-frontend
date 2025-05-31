<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Nuevo Ingrediente</h2>
        <form @submit.prevent="saveIngredient">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" v-model="ingredient.name" required>
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
  name: 'NewIngredient',
  data() {
    return {
      ingredient: {
        name: ''
      }
    }
  },
  methods: {
    async saveIngredient() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/ingredients', this.ingredient)
        
        if (res.status === 201) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ingrediente creado',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Ingredients' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al crear el ingrediente'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Ingredients' })
    }
  }
}
</script>