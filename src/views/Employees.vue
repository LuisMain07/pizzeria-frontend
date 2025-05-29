<template>
  <div class="container">
    <h1 class="text-start">Listado de Empleados |
      <button @click="newEmployee()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Posición</th>
          <th>Número de Identificación</th>
          <th>Salario</th>
          <th>Fecha de Contratación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.id">
          <th>{{ index + 1 }}</th>
          <td>{{ employee.id }}</td>
          <!-- Asumiendo que la API devuelve el nombre en employee.user.name -->
          <td>{{ employee.user?.name || 'N/A' }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ employee.identification_number }}</td>
          <td>{{ employee.salary.toFixed(2) }}</td>
          <td>{{ formatDate(employee.hire_date) }}</td>
          <td>
            <button @click="deleteEmployee(employee.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editEmployee(employee.id)" class="btn btn-warning mx-2">
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
  name: 'Employees',
  data() {
    return {
      employees: []
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString()
    },
    deleteEmployee(id) {
      Swal.fire({
        title: `¿Deseas eliminar al empleado con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/employees/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.employees = response.data.employees
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el empleado.', 'error')
            })
        }
      })
    },
    editEmployee(id) {
      this.$router.push({ name: 'EditEmployee', params: { id: `${id}` } })
    },
    newEmployee() {
      this.$router.push({ name: 'NewEmployee' })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/employees')
      .then(response => {
        this.employees = response.data.employees
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de empleados.', 'error')
      })
  }
}
</script>
