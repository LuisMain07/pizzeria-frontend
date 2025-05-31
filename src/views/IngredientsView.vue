<template>
  <div class="container">
    <h1>Ingredientes</h1>
    <button @click="addIngredient" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Agregar Ingrediente
    </button>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredients" :key="ingredient.id">
          <td>{{ ingredient.id }}</td>
          <td>{{ ingredient.name }}</td>
          <td>
            <button @click="editIngredient(ingredient.id)" class="btn btn-warning me-2">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="deleteIngredient(ingredient.id)" class="btn btn-danger">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Ingredients',
  data() {
    return {
      ingredients: []
    }
  },
  methods: {
    getIngredients() {
      axios.get('http://127.0.0.1:8000/api/ingredients')
        .then(response => {
          this.ingredients = response.data
        })
    },
    addIngredient() {
      this.$router.push({ name: 'NewIngredient' })
    },
    editIngredient(id) {
      this.$router.push({ name: 'EditIngredient', params: { id } })
    },
    async deleteIngredient(id) {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrarlo!'
      })

      if (result.isConfirmed) {
        await axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
        Swal.fire(
          'Borrado!',
          'El ingrediente ha sido eliminado.',
          'success'
        )
        this.getIngredients()
      }
    }
  },
  mounted() {
    this.getIngredients()
  }
}
</script>