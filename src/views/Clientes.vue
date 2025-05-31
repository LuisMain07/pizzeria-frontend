<template>
  <div class="container">
    <h1 class="text-start">Listado de Clientes
      <button @click="newClient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID de Usuario</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clients" :key="client.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ client.user_id }}</td>
          <td>{{ client.address || 'Sin dirección' }}</td>
          <td>{{ client.phone || 'Sin teléfono' }}</td>
          <td>
            <button @click="editClient(client.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteClient(client.id)" class="btn btn-danger mx-2">
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
  name: 'Cliente',
  data() {
    return {
      clients: []
    }
  },
  methods: {
    newClient() {
      this.$router.push({ name: 'NewCliente' })
    },
    editClient(id) {
      this.$router.push({ name: 'EditarCliente', params: { id } })
    },
    deleteClient(id) {
      Swal.fire({
        title: `¿Desea eliminar el cliente con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/client/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.clients = response.data.clients
              }
            })
            .catch(error => {
              Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/client')
      .then(response => {
        this.clients = response.data.clients
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo cargar la lista de clientes.', 'error')
      })
  }
}
</script>
