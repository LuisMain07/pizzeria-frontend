<template>
  <div class="container">
    <h1 class="text-start">Listado Pizza - Materia Prima |
      <button @click="newRelation()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Pizza</th>
          <th>Materia Prima</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(relation, index) in pizzaRawMaterials" :key="relation.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ relation.id }}</td>
          <td>{{ relation.pizza_name || relation.pizza_id }}</td>
          <td>{{ relation.raw_material_name || relation.raw_material_id }}</td>
          <td>{{ relation.quantity }}</td>
          <td>
            <button @click="deleteRelation(relation.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editRelation(relation.id)" class="btn btn-warning mx-2">
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
  name: 'PizzaRawMaterialList',
  data() {
    return {
      pizzaRawMaterials: []
    }
  },
  methods: {
    deleteRelation(id) {
      Swal.fire({
        title: `¿Deseas eliminar la relación con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza-raw-material/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                // Corrige aquí
                this.pizzaRawMaterials = response.data.relations
              }
            })
            .catch(error => {
              Swal.fire('Error', 'No se pudo eliminar la relación', 'error')
            })
        }
      })
    },
    editRelation(id) {
      this.$router.push({ name: 'EditarPizzaRawMaterial', params: { id: `${id}` } })
    },
    newRelation() {
      this.$router.push({ name: 'NewPizzaRawMaterial' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizza-raw-material')
      // Corrige aquí
      .then(response => {
        this.pizzaRawMaterials = response.data.relations
      })
      .catch(error => {
        console.error('Error al cargar relaciones:', error)
      })
  }
}
</script>

