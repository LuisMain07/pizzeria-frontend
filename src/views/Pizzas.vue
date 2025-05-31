<template>
  <div class="container">
    <h1>Pizzas</h1>
    <button @click="addPizza" class="btn btn-success mb-3">
      <font-awesome-icon icon="plus" /> Agregar Pizza
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
        <tr v-for="pizza in pizzas" :key="pizza.id">
          <td>{{ pizza.id }}</td>
          <td>{{ pizza.name }}</td>
          <td>
            <button @click="editPizza(pizza.id)" class="btn btn-warning me-2">
              <font-awesome-icon icon="edit" />
            </button>
            <button @click="deletePizza(pizza.id)" class="btn btn-danger">
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
  name: 'Pizzas',
  data() {
    return {
      pizzas: []
    }
  },
  methods: {
    getPizzas() {
      axios.get('http://127.0.0.1:8000/api/pizzas')
        .then(response => {
          this.pizzas = response.data
        })
    },
    addPizza() {
      this.$router.push({ name: 'NewPizza' })
    },
    editPizza(id) {
      this.$router.push({ name: 'EditPizza', params: { id } })
    },
    async deletePizza(id) {
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
        await axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
        Swal.fire(
          'Borrado!',
          'La pizza ha sido eliminada.',
          'success'
        )
        this.getPizzas()
      }
    }
  },
  mounted() {
    this.getPizzas()
  }
}
</script>