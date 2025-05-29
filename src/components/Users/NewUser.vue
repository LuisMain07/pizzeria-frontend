<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Usuario
      </div>
      <div class="card-body">
        <form @submit.prevent="saveUser">

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre del usuario"
                v-model="user.name"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo Electrónico:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="envelope" />
              </div>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="usuario@ejemplo.com"
                v-model="user.email"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="password" class="form-label">Contraseña:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="lock" />
              </div>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Contraseña segura"
                v-model="user.password"
                required
              />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewUser',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'User' })
    },
    async saveUser() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/user', this.user)
        if (res.status === 201) {
          this.$router.push({ name: 'User' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario registrado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el usuario',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  }
}
</script>
