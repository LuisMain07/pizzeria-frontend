<template>
  <div class="container">
    <h1 class="text-start">Listado de Órdenes |
      <button @click="newOrder()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Cliente</th>
          <th>Teléfono</th>
          <th>Pizza</th>
          <th>Cantidad</th>
          <th>Precio Total</th>
          <th>Estado</th>
          <th>Dirección</th>
          <th>Fecha Pedido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <th>{{ index + 1 }}</th>
          <td>{{ order.id }}</td>
          <td>{{ order.customer_name }}</td>
          <td>{{ order.customer_phone }}</td>
          <td>{{ order.pizza_name || 'N/A' }}</td>
          <td>{{ order.quantity }}</td>
          <td>${{ order.total_price ? Number(order.total_price).toFixed(2) : '0.00' }}</td>
          <td>
            <span :class="getStatusClass(order.status)">
              {{ order.status }}
            </span>
          </td>
          <td>{{ order.delivery_address }}</td>
          <td>{{ formatDate(order.order_date) }}</td>
          <td>
            <button @click="deleteOrder(order.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editOrder(order.id)" class="btn btn-warning mx-2">
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
  name: 'Orders',
  data() {
    return {
      orders: []
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString()
    },
    getStatusClass(status) {
      switch (status) {
        case 'pendiente':
          return 'badge bg-warning text-dark'
        case 'en preparación':
          return 'badge bg-info'
        case 'entregado':
          return 'badge bg-success'
        default:
          return 'badge bg-secondary'
      }
    },
    deleteOrder(id) {
      Swal.fire({
        title: `¿Deseas eliminar la orden con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/order/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.orders = response.data.orders
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar la orden.', 'error')
            })
        }
      })
    },
    editOrder(id) {
      this.$router.push({ name: 'EditarOrder', params: { id: `${id}` } })
    },
    newOrder() {
      this.$router.push({ name: 'NewOrder' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/order')
      .then(response => {
        this.orders = response.data.orders
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de órdenes.', 'error')
      })
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.75em;
}
</style> 