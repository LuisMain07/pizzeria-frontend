<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nueva Relación</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Materia Prima
      </div>
      <div class="card-body">
        <form @submit.prevent="saveRelation">

          <!-- Campo Pizza removido/comentado -->
          <!--
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza:</label>
            <select v-model="form.pizza_id" class="form-select" required>
              <option value="" disabled>Seleccione una pizza</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>
          -->

          <div class="mb-3">
            <label for="raw_material_id" class="form-label">Materia Prima:</label>
            <select v-model="form.raw_material_id" class="form-select" required>
              <option value="" disabled selected>Seleccione una materia prima</option>
              <option v-for="material in rawMaterials" :key="material.id" :value="material.id">
                {{ material.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad:</label>
            <input type="number" step="0.01" class="form-control" v-model="form.quantity" required placeholder="Cantidad en unidades o gramos" />
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
  name: 'NewPizzaRawMaterial',
  data() {
    return {
      form: {
        // pizza_id: '', // <- comentado
        raw_material_id: '',
        quantity: ''
      },
      // pizzas: [], // <- comentado
      rawMaterials: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'PizzaRawMaterial' })
    },
    async saveRelation() {
      try {
        // Asegúrate de no enviar pizza_id si no se está usando
        const dataToSend = {
          raw_material_id: this.form.raw_material_id,
          quantity: this.form.quantity
        }

        const res = await axios.post('http://127.0.0.1:8000/api/pizza-raw-material', dataToSend)

        if (res.status === 201) {
          this.$router.push({ name: 'PizzaRawMaterial' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Relación registrada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la relación',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    },
    async fetchData() {
      try {
        const materialsRes = await axios.get('http://127.0.0.1:8000/api/raw-material')
        this.rawMaterials = materialsRes.data.raw_materials
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
