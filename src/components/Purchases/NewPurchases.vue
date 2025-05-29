<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nueva Compra</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Datos de la Compra
      </div>
      <div class="card-body">
        <form @submit.prevent="savePurchase">

          <div class="row mb-3">
            <label for="supplier_id" class="form-label">Proveedor:</label>
            <select class="form-select" v-model="purchase.supplier_id" required>
              <option value="" disabled selected>Seleccione un proveedor</option>
              <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="raw_material_id" class="form-label">Materia Prima:</label>
            <select class="form-select" v-model="purchase.raw_material_id" required>
              <option value="" disabled selected>Seleccione una materia prima</option>
              <option v-for="material in rawMaterials" :key="material.id" :value="material.id">
                {{ material.name }}
              </option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="quantity" class="form-label">Cantidad:</label>
            <input type="number" class="form-control" v-model.number="purchase.quantity" min="1" required />
          </div>

          <div class="row mb-3">
            <label for="purchase_price" class="form-label">Precio de Compra:</label>
            <input type="number" class="form-control" v-model.number="purchase.purchase_price" min="0" step="0.01" required />
          </div>

          <div class="row mb-3">
            <label for="purchase_date" class="form-label">Fecha de Compra:</label>
            <input type="date" class="form-control" v-model="purchase.purchase_date" required />
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
  name: 'NewPurchase',
  data() {
    return {
      purchase: {
        supplier_id: '',
        raw_material_id: '',
        quantity: null,
        purchase_price: null,
        purchase_date: ''
      },
      suppliers: [],
      rawMaterials: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Purchases' })
    },
    async savePurchase() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/purchase', this.purchase)
        if (res.status === 201) {
          this.$router.push({ name: 'Purchases' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Compra registrada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la compra',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    },
    async fetchDropdownData() {
      try {
        const [suppliersRes, materialsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/supplier'),
          axios.get('http://127.0.0.1:8000/api/raw-material')
        ])
        this.suppliers = suppliersRes.data.suppliers
        this.rawMaterials = materialsRes.data.raw_materials
      } catch (err) {
        console.error('Error al cargar datos de proveedores o materias primas', err)
      }
    }
  },
  mounted() {
    this.fetchDropdownData()
  }
}
</script>
