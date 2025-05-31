<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Editar Ingrediente</h2>
        <form @submit.prevent="updateIngredient">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" v-model="ingredient.name" required>
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
  name: 'EditIngredient',
  data() {
    return {
      ingredient: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    async updateIngredient() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/ingredients/${this.ingredient.id}`, this.ingredient)
        
        if (res.status === 200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ingrediente actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push({ name: 'Ingredients' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar el ingrediente'
        })
      }
    },
    cancel() {
      this.$router.push({ name: 'Ingredients' })
    }
  },
  mounted() {
    this.ingredient.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/ingredients/${this.ingredient.id}`)
      .then(response => {
        this.ingredient = response.data
      })
  }
}
</script>