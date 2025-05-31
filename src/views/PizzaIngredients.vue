<template>
  <div class="container">
    <h1 class="text-start">Listado de Ingredientes de Pizza |
      <button @click="newPizzaIngredient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Pizza</th>
          <th>Ingrediente</th>
          <th>Fecha de Creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pizzaIngredient, index) in pizzaIngredients" :key="pizzaIngredient.id">
          <th>{{ index + 1 }}</th>
          <td>{{ pizzaIngredient.id }}</td>
          <td>{{ pizzaIngredient.pizza?.name || 'N/A' }}</td>
          <td>{{ pizzaIngredient.ingredient?.name || 'N/A' }}</td>
          <td>{{ formatDate(pizzaIngredient.created_at) }}</td>
          <td>
            <button @click="deletePizzaIngredient(pizzaIngredient.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editPizzaIngredient(pizzaIngredient.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
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
  name: 'PizzaIngredients',
  data() {
    return {
      pizzaIngredients: []
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString()
    },
    deletePizzaIngredient(id) {
      Swal.fire({
        title: `¿Deseas eliminar el ingrediente de pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza-ingredient/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.pizzaIngredients = response.data.pizzaIngredients
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el ingrediente de pizza.', 'error')
            })
        }
      })
    },
    editPizzaIngredient(id) {
      this.$router.push({ name: 'EditarPizzaIngredients', params: { id: `${id}` } })
    },
    newPizzaIngredient() {
      this.$router.push({ name: 'NewPizzaIngredients' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizza-ingredient')
      .then(response => {
        this.pizzaIngredients = response.data.pizzaIngredients
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de ingredientes de pizza.', 'error')
      })
  }
}
</script>