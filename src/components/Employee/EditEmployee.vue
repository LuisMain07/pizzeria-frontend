<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Empleado</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Empleado
      </div>
      <div class="card-body">

        <!-- Mostrar error si hay -->
        <div v-if="error" class="text-danger">
          {{ error }}
        </div>

        <!-- Mostrar formulario si cargó el empleado y tiene user -->
        <div v-else-if="employee && employee.user">
          <form @submit.prevent="updateEmployee">
            <!-- ID -->
            <div class="row mb-3">
              <label for="id" class="form-label">ID</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="tag" /></div>
                <input type="text" class="form-control" id="id" disabled v-model="employee.id" />
              </div>
            </div>

            <!-- Nombre -->
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="user" /></div>
                <input type="text" class="form-control" id="name" placeholder="Nombre completo" v-model="employee.user.name" required />
              </div>
            </div>

            <!-- Email -->
            <div class="row mb-3">
              <label for="email" class="form-label">Correo electrónico :</label>
              <div class="input-group">
                <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
                <input type="email" class="form-control" id="email" placeholder="Correo electrónico" v-model="employee.user.email" required />
              </div>
            </div>

            <!-- Posición -->
            <div class="row mb-3">
              <label for="position" class="form-label">Posición :</label>
              <select class="form-select" id="position" v-model="employee.position" required>
                <option disabled value="">Seleccione una posición</option>
                <option value="cajero">Cajero</option>
                <option value="administrador">Administrador</option>
                <option value="cocinero">Cocinero</option>
                <option value="mensajero">Mensajero</option>
              </select>
            </div>

            <!-- Número de identificación -->
            <div class="row mb-3">
              <label for="identification_number" class="form-label">Número de Identificación :</label>
              <input type="text" id="identification_number" class="form-control" placeholder="Número de identificación" v-model="employee.identification_number" required />
            </div>

            <!-- Salario -->
            <div class="row mb-3">
              <label for="salary" class="form-label">Salario :</label>
              <input type="number" step="0.01" min="0" id="salary" class="form-control" placeholder="Salario" v-model.number="employee.salary" required />
            </div>

            <!-- Fecha de contratación -->
            <div class="row mb-3">
              <label for="hire_date" class="form-label">Fecha de Contratación :</label>
              <input type="date" id="hire_date" class="form-control" v-model="employee.hire_date" required />
            </div>

            <button class="btn btn-primary" type="submit">Actualizar</button>
            <button class="btn btn-secondary mx-2" @click="cancel" type="button">Cancelar</button>
          </form>
        </div>

        <div v-else>
          <!-- Aquí puedes poner un spinner o texto si quieres -->
          <p>Cargando datos...</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditEmployee',
  data() {
    return {
      employee: null,
      error: null,
      loading: true
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Employees' })
    },
    async updateEmployee() {
      try {
        const payload = {
          user: {
            name: this.employee.user.name,
            email: this.employee.user.email,
          },
          position: this.employee.position,
          identification_number: this.employee.identification_number,
          salary: this.employee.salary,
          hire_date: this.employee.hire_date
        }

        const res = await axios.put(`http://127.0.0.1:8000/api/employee/${this.employee.id}`, payload);

        if (res.status === 200) {
          this.$router.push({ name: 'Employees' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado actualizado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el empleado',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/employee/${id}`)
      .then(response => {
        console.log('Empleado API:', response.data)
        // Asegurar que employee y user existan para que el formulario funcione
        let emp = response.data.employee

        if (emp && !emp.user) {
          emp.user = { name: '', email: '' }
        }

        this.employee = emp
      })
      .catch(() => {
        this.error = 'No se pudo obtener la información del empleado'
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
