<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Cliente</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Cliente
      </div>
      <div class="card-body">
        <form @submit.prevent="updateClient">

          <div class="row mb-3">
            <label for="id" class="form-label">ID Cliente</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
              <input type="text" class="form-control" id="id" disabled v-model="client.id" />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="user" /></div>
              <input type="text" class="form-control" id="name" v-model="user.name" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo electrónico :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
              <input type="email" class="form-control" id="email" v-model="user.email" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="map-marker-alt" /></div>
              <input type="text" class="form-control" id="address" v-model="client.address" />
            </div>
          </div>

          <div class="row mb-3">
            <label for="phone" class="form-label">Teléfono :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="phone" /></div>
              <input type="text" class="form-control" id="phone" v-model="client.phone" />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
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
  name: 'EditarCliente',
  data() {
    return {
      client: {
        id: null,
        user_id: null,
        address: '',
        phone: ''
      },
      user: {
        id: null,
        name: '',
        email: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Cliente' })
    },
    async updateClient() {
      try {
        await axios.put(`http://127.0.0.1:8000/api/users/${this.user.id}`, {
          name: this.user.name,
          email: this.user.email
        })

        const res = await axios.put(`http://127.0.0.1:8000/api/clients/${this.client.id}`, {
          address: this.client.address,
          phone: this.client.phone
        })

        if (res.status === 200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente actualizado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
          this.$router.push({ name: 'Cliente' })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el cliente',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  },
  async mounted() {
    const id = this.$route.params.id
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/clients/${id}`)
      this.client = res.data.client
      // Suponiendo que el API incluye el user o user_id para obtener usuario aparte
      if (res.data.client.user) {
        this.user = res.data.client.user
      } else if (this.client.user_id) {
        // Si no viene user embebido, consulta el usuario aparte
        const userRes = await axios.get(`http://127.0.0.1:8000/api/users/${this.client.user_id}`)
        this.user = userRes.data.user
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar el cliente',
        text: error.response?.data?.message || 'No se pudo obtener la información'
      })
      this.$router.push({ name: 'Cliente' })
    }
  }
}
</script>
