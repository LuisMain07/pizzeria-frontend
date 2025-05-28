<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Proveedor
      </div>
      <div class="card-body">
        <form @submit.prevent="saveSupplier">

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="building" /></div>
              <input type="text" class="form-control" id="name" placeholder="Nombre del proveedor"
                     v-model="supplier.name" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="contact_info" class="form-label">Información de Contacto :</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="envelope" /></div>
              <input type="text" class="form-control" id="contact_info" placeholder="Correo, teléfono, etc."
                     v-model="supplier.contact_info" />
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
  name: 'NewSupplier',
  data() {
    return {
      supplier: {
        name: '',
        contact_info: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Suppliers' })
    },
    async saveSupplier() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/suppliers', this.supplier)
        if (res.status === 201) {
          this.$router.push({ name: 'Suppliers' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Proveedor registrado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el proveedor',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  }
}
</script>
