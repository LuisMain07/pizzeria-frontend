<template>
  <div class="container">
    <h1 class="text-start">Listado de Proveedores |
      <button @click="newSupplier()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Información de Contacto</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(supplier, index) in suppliers" :key="supplier.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ supplier.id }}</td>
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.contact_info || 'N/A' }}</td>
          <td>
            <button @click="deleteSupplier(supplier.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editSupplier(supplier.id)" class="btn btn-warning mx-2">
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
  name: 'Suppliers',
  data() {
    return {
      suppliers: []
    }
  },
  methods: {
    deleteSupplier(id) {
      Swal.fire({
        title: `¿Deseas eliminar el proveedor con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.suppliers = response.data.suppliers
              }
            })
        }
      })
    },
    editSupplier(id) {
      this.$router.push({ name: 'EditarProveedor', params: { id: `${id}` } })
    },
    newSupplier() {
      this.$router.push({ name: 'NuevoProveedor' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/suppliers')
      .then(response => (this.suppliers = response.data.suppliers))
  }
}
</script>
