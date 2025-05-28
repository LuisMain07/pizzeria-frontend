<template>
  <div class="container">
    <h1 class="text-start">Listado de Compras |
      <button @click="newPurchase()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Proveedor</th>
          <th scope="col">Materia Prima</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio de Compra</th>
          <th scope="col">Fecha de Compra</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(purchase, index) in purchases" :key="purchase.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ purchase.id }}</td>
          <td>{{ purchase.supplier_name }}</td>
          <td>{{ purchase.raw_material_name }}</td>
          <td>{{ purchase.quantity }}</td>
          <td>{{ purchase.purchase_price }}</td>
          <td>{{ formatDate(purchase.purchase_date) }}</td>
          <td>
            <button @click="deletePurchase(purchase.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editPurchase(purchase.id)" class="btn btn-warning mx-2">
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
  name: 'Purchases',
  data() {
    return {
      purchases: []
    }
  },
  methods: {
    deletePurchase(id) {
      Swal.fire({
        title: `¿Deseas eliminar la compra con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/purchase/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.purchases = response.data.purchases
              }
            })
        }
      })
    },
    editPurchase(id) {
      this.$router.push({ name: 'EditarPurchases', params: { id: `${id}` } })
    },
    newPurchase() {
      this.$router.push({ name: 'NewPurchases' })
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString('es-CO')
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/purchase')
      .then(response => (this.purchases = response.data.purchases))
  }
}
</script>
