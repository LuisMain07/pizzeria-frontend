<template>
  <div class="container">
    <h1 class="text-start">Listado de Materias Primas |
      <button @click="newRawMaterial()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Unidad</th>
          <th scope="col">Stock Actual</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(material, index) in rawMaterials" :key="material.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ material.id }}</td>
          <td>{{ material.name }}</td>
          <td>{{ material.unit }}</td>
          <td>{{ material.current_stock }}</td>
          <td>
            <button @click="deleteRawMaterial(material.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editRawMaterial(material.id)" class="btn btn-warning mx-2">
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
  name: 'RawMaterials',
  data() {
    return {
      rawMaterials: []
    }
  },
  methods: {
    deleteRawMaterial(id) {
      Swal.fire({
        title: `¿Deseas eliminar la materia prima con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/raw-material/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.rawMaterials = response.data.raw_materials
              }
            })
        }
      })
    },
    editRawMaterial(id) {
      this.$router.push({ name: 'EditarRawMaterials', params: { id: `${id}` } })
    },
    newRawMaterial() {
      this.$router.push({ name: 'NewRawMaterials' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/raw-material')
      .then(response => (this.rawMaterials = response.data.raw_materials))
  }
}
</script>
