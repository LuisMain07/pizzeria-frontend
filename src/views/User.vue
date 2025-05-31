<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Usuarios
      <button @click="newUser()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="deleteUser(user.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editUser(user.id)" class="btn btn-warning mx-2">
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
  name: 'Users',
  data() {
    return {
      users: []
    }
  },
  methods: {
    deleteUser(id) {
      Swal.fire({
        title: `¿Deseas eliminar el usuario con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/user/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.fetchUsers()
              }
            })
        }
      })
    },
    editUser(id) {
      this.$router.push({ name: 'EditarUser', params: { id } })
    },
    newUser() {
      this.$router.push({ name: 'NewUser' })
    },
    fetchUsers() {
      axios.get('http://127.0.0.1:8000/api/user')
        .then(response => {
          this.users = response.data.users
        })
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>
