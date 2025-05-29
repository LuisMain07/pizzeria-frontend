<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Materia Prima
      </div>
      <div class="card-body">
        <form @submit.prevent="updateRawMaterial">

          <div class="row mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
              <input type="text" class="form-control" id="id" disabled
                v-model="rawMaterial.id" />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="box" /></div>
              <input type="text" class="form-control" id="name" placeholder="Nombre de la materia prima"
                v-model="rawMaterial.name" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="unit" class="form-label">Unidad :</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="weight" /></div>
              <input type="text" class="form-control" id="unit" placeholder="Ej: kg, lt, unid."
                v-model="rawMaterial.unit" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="current_stock" class="form-label">Stock Actual :</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="warehouse" /></div>
              <input type="number" min="0" class="form-control" id="current_stock"
                v-model="rawMaterial.current_stock" required />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
          <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditRawMaterial',
  data() {
    return {
      rawMaterial: {
        id: 0,
        name: '',
        unit: '',
        current_stock: 0
      }
    }
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Rawmaterials' })
    },
    async updateRawMaterial() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/raw-material/${this.rawMaterial.id}`, this.rawMaterial)
        if (res.status === 200) {
          this.$router.push({ name: 'Rawmaterials' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Materia prima actualizada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/raw-material/${id}`)
      .then(response => {
        this.rawMaterial = response.data.raw_material
      })
  }
}
</script>
