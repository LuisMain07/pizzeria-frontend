<template>
  <div class="container">
    <h1 class="text-start">Listado de Ingredientes Extra |
      <button @click="newExtraIngredient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Fecha de Creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(extraIngredient, index) in extraIngredients" :key="extraIngredient.id">
          <th>{{ index + 1 }}</th>
          <td>{{ extraIngredient.id }}</td>
          <td>{{ extraIngredient.name }}</td>
          <td>${{ extraIngredient.price ? Number(extraIngredient.price).toFixed(2) : '0.00' }}</td>
          <td>{{ formatDate(extraIngredient.created_at) }}</td>
          <td>
            <button @click="deleteExtraIngredient(extraIngredient.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editExtraIngredient(extraIngredient.id)" class="btn btn-warning mx-2">
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
  name: 'ExtraIngredients',
  data() {
    return {
      extraIngredients: []
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString()
    },
    deleteExtraIngredient(id) {
      Swal.fire({
        title: `¿Deseas eliminar el ingrediente extra con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/extra-ingredient/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.extraIngredients = response.data.extraIngredients
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el ingrediente extra.', 'error')
            })
        }
      })
    },
    editExtraIngredient(id) {
      this.$router.push({ name: 'EditarExtraIngredients', params: { id: `${id}` } })
    },
    newExtraIngredient() {
      this.$router.push({ name: 'NewExtraIngredients' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/extra-ingredient')
      .then(response => {
        this.extraIngredients = response.data.extraIngredients
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de ingredientes extra.', 'error')
      })
  }
}
</script>