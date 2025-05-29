<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Relación</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Pizza - Materia Prima
      </div>
      <div class="card-body">
        <form v-if="!loading" @submit.prevent="updateRelation">

          <div class="mb-3">
            <label for="id" class="form-label">ID</label>
            <input type="text" class="form-control" id="id" v-model="form.id" disabled />
          </div>

          <div class="mb-3">
            <label class="form-label">Materia Prima:</label>
            <select v-model="form.raw_material_id" class="form-select" required>
              <option value="" disabled>Seleccione una materia prima</option>
              <option v-for="material in rawMaterials" :key="material.id" :value="material.id">
                {{ material.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad:</label>
            <input type="number" step="0.01" class="form-control" v-model.number="form.quantity" required />
          </div>

          <button class="btn btn-primary" type="submit">Actualizar</button>
          <button class="btn btn-secondary mx-2" @click="cancelar" type="button">Cancelar</button>
        </form>

        <div v-else>
          Cargando datos...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditarPizzaRawMaterial',
  data() {
    return {
      form: {
        id: 0,
        raw_material_id: '',
        quantity: null
      },
      rawMaterials: [],
      loading: true
    }
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'PizzaRawMaterial' }) // Ajusta según tu ruta
    },
    async updateRelation() {
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/pizza-raw-material/${this.form.id}`, this.form)
        if (res.status === 200) {
          this.$router.push({ name: 'PizzaRawMaterial' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Relación actualizada exitosamente',
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
    },
    async fetchRawMaterials() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/raw-material')
        this.rawMaterials = res.data.raw_materials
      } catch (error) {
        console.error('Error al cargar materias primas:', error)
      }
    },
    async fetchRelation() {
      try {
        const id = this.$route.params.id
        const res = await axios.get(`http://127.0.0.1:8000/api/pizza-raw-material/${id}`)
        // Asumiendo que la respuesta es la relación directa sin anidamiento
        this.form = {
          id: res.data.id,
          pizza_id: res.data.pizza_id,
          raw_material_id: res.data.raw_material_id,
          quantity: res.data.quantity
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar la relación', 'error')
        this.$router.push({ name: 'PizzaRawMaterial' })
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchRawMaterials()
    this.fetchRelation()
  }
}
</script>
