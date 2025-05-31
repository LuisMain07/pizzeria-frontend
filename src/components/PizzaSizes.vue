<template>
  <div class="container">
    <h1>Tamaños de Pizza</h1>
    <button @click="addPizzaSize" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Agregar Tamaño
    </button>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Pizza</th>
          <th>Tamaño</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pizzaSize in pizzaSizes" :key="pizzaSize.id">
          <td>{{ pizzaSize.id }}</td>
          <td>{{ pizzaSize.pizza_name }}</td>
          <td>{{ pizzaSize.size }}</td>
          <td>{{ pizzaSize.price }}</td>
          <td>
            <button @click="editPizzaSize(pizzaSize.id)" class="btn btn-warning me-2">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="deletePizzaSize(pizzaSize.id)" class="btn btn-danger">
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
  name: 'PizzaSizes',
  data() {
    return {
      pizzaSizes: []
    }
  },
  methods: {
    getPizzaSizes() {
      axios.get('http://127.0.0.1:8000/api/pizza-sizes')
        .then(response => {
          this.pizzaSizes = response.data
        })
    },
    addPizzaSize() {
      this.$router.push({ name: 'NewPizzaSize' })
    },
    editPizzaSize(id) {
      this.$router.push({ name: 'EditPizzaSize', params: { id } })
    },
    async deletePizzaSize(id) {
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
        await axios.delete(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
        Swal.fire(
          'Borrado!',
          'El tamaño de pizza ha sido eliminado.',
          'success'
        )
        this.getPizzaSizes()
      }
    }
  },
  mounted() {
    this.getPizzaSizes()
  }
}
</script>