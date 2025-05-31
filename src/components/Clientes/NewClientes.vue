<template> 
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">Cliente</div>
      <div class="card-body">
        <form @submit.prevent="saveClient">

          <!-- Datos de usuario -->
          <div class="row mb-3">
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="user" /></div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre del cliente"
                v-model.trim="clientData.name"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo electrónico :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email del cliente"
                v-model.trim="clientData.email"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="password" class="form-label">Contraseña :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="lock" /></div>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Contraseña"
                v-model="clientData.password"
                required
              />
            </div>
          </div>

          <!-- Datos del cliente -->
          <div class="row mb-3">
            <label for="address" class="form-label">Dirección :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="map-marker-alt" /></div>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Dirección (opcional)"
                v-model.trim="clientData.address"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone" class="form-label">Teléfono :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
              <input
                type="text"
                class="form-control"
                id="phone"
                placeholder="Teléfono (opcional)"
                v-model.trim="clientData.phone"
              />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" type="button" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewCliente',
  data() {
    return {
      clientData: {
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Cliente' })
    },
    async saveClient() {
      try {
        const payload = {
          name: this.clientData.name,
          email: this.clientData.email,
          password: this.clientData.password,
          address: this.clientData.address,
          phone: this.clientData.phone
        }

        const res = await axios.post('http://127.0.0.1:8000/api/client', payload)

        if (res.status === 201) {
          this.$router.push({ name: 'Cliente' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente registrado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          // Por si la API devuelve 200 o algún otro código, mostrar mensaje genérico
          Swal.fire({
            icon: 'info',
            title: 'Atención',
            text: 'Respuesta inesperada del servidor.'
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el cliente',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  }
}
</script>
